package main

import (
	"backend/app/ent"
	"backend/app/ent/migrate"
	"backend/app/resolver"
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"

	atlasMigrate "ariga.io/atlas/sql/migrate"
	atlas "ariga.io/atlas/sql/schema"
	"entgo.io/contrib/entgql"
	"entgo.io/ent/dialect"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/schema"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
	"github.com/rs/cors"
)

func connectSQL(env string) (client *ent.Client, err error) {
	var entOptions []ent.Option
	entOptions = append(entOptions, ent.Debug())
	if env == "development" {
		// open mysql server
		url := fmt.Sprintf("%s:%s@tcp(mysql_host)/%s?parseTime=true", os.Getenv("MYSQL_USER"), os.Getenv("MYSQL_PASSWORD"), os.Getenv("MYSQL_DATABASE"))
		return ent.Open("mysql", url, entOptions...)
	}
	return ConnectUnixSocket(entOptions...)
}

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	env := os.Getenv("ENV")
	if port == "" {
		port = defaultPort
	}
	client, err := connectSQL(env)
	if err != nil {
		log.Fatalf("Fatal to connect mysql. %s", err)
	}
	defer client.Close()
	// Run the migration here
	if err := client.Debug().Schema.Create(
		context.Background(),
		// allow uid
		migrate.WithGlobalUniqueID(true),
		// // Hook into Atlas Diff process.
		schema.WithDiffHook(DiffHook),
		// Hook into Atlas Apply process.
		schema.WithApplyHook(ApplyHook),
		// // reset database
		// migrate.WithDropIndex(true),
		// migrate.WithDropColumn(true),
	); !errors.Is(err, nil) {
		log.Printf("Error: failed creating schema resources %v\n", err)
	}
	// open graphql server
	mux := http.NewServeMux()
	srv := handler.NewDefaultServer(resolver.NewSchema(client))
	// use Transactioner
	srv.Use(entgql.Transactioner{TxOpener: client})

	isEnv := env == "development" || env == "dev-remote"
	corsOptions := cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000", "http://localhost:8080", "https://fooder-app.vercel.app", "https://fooder*.vercel.app"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowCredentials: true,
		Debug:            isEnv,
	}
	// cors setting
	handler := cors.New(corsOptions).Handler(mux)
	// add CORS responsive header
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	var url string
	if env == "" {
		url = os.Getenv("ENDPOINT")
	} else {
		url = "http://localhost"
	}

	log.Printf("connect to %s:%s/ for GraphQL playground", url, port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

func DiffHook(next schema.Differ) schema.Differ {
	{
		return schema.DiffFunc(func(current, desired *atlas.Schema) ([]atlas.Change, error) {
			// Before calculating changes.
			changes, err := next.Diff(current, desired)
			if err != nil {
				return nil, err
			}
			// After diff, you can filter
			// changes or return new ones.
			return changes, nil
		})
	}
}

func ApplyHook(next schema.Applier) schema.Applier {
	return schema.ApplyFunc(func(ctx context.Context, conn dialect.ExecQuerier, plan *atlasMigrate.Plan) error {
		// Example to hook into the apply process, or implement
		// a custom applier. For example, write to a file.
		return next.Apply(ctx, conn, plan)
	})
}

// connectUnixSocket initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
func ConnectUnixSocket(options ...ent.Option) (*ent.Client, error) {
	mustGetenv := func(k string) string {
		v := os.Getenv(k)
		if v == "" {
			log.Fatalf("Fatal Error in connect_unix.go: %s environment variable not set.", k)
		}
		return v
	}
	// Note: Saving credentials in environment variables is convenient, but not
	// secure - consider a more secure solution such as
	// Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
	// keep secrets safe.
	var (
		dbUser = mustGetenv("DB_USER")                  // e.g. 'my-db-user'
		dbPwd  = mustGetenv("DB_PASS")                  // e.g. 'my-db-password'
		dbName = mustGetenv("DB_NAME")                  // e.g. 'my-database'
		dbHost = mustGetenv("INSTANCE_CONNECTION_NAME") // e.g. '/cloudsql/project:region:instance'
	)

	dbURI := fmt.Sprintf("%s:%s@unix(/cloudsql/%s)/%s?parseTime=true",
		dbUser, dbPwd, dbHost, dbName)

	// dbPool is the pool of database connections.
	dbPool, err := sql.Open("mysql", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sql.Open: %v", err)
	}
	return ent.NewClient(append(options, ent.Driver(dbPool))...), nil
}
