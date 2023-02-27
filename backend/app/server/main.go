package main

import (
	"backend/app/ent"
	"backend/app/ent/migrate"
	"backend/app/resolver"
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"time"

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

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	var entOptions []ent.Option
	entOptions = append(entOptions, ent.Debug())
	url := "docker:password@tcp(mysql_host)/fooder?parseTime=true"
	// open mysql server
	client, err := connectUnixSocket(entOptions...)
	if err != nil {
		client, err = ent.Open("mysql", url, entOptions...)
		if err == nil {
			log.Fatalf("Faital to connect mysql. %s", err)
		}
	}
	if err != nil {
		log.Fatalf("Error: mysql client: %v\n", err)
	}
	defer client.Close()
	// Run the migration here
	if err := client.Debug().Schema.Create(
		context.Background(),
		// Hook into Atlas Diff process.
		schema.WithDiffHook(DiffHook),
		// Hook into Atlas Apply process.
		schema.WithApplyHook(ApplyHook),
		// reset database
		migrate.WithDropIndex(true),
		migrate.WithDropColumn(true),
	); !errors.Is(err, nil) {
		log.Fatalf("Error: failed creating schema resources %v\n", err)
	}

	// open graphql server
	mux := http.NewServeMux()
	srv := handler.NewDefaultServer((resolver.NewSchema(client)))
	// use Transactioner
	srv.Use(entgql.Transactioner{TxOpener: client})
	// cors setting
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		// Debug:            true,
	}).Handler(mux)
	// add CORS responsive header
	mux.Handle("/", playground.Handler("GraphQL playground", "/query"))
	mux.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
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

func OpenMySQL() (*ent.Client, error) {
	drv, err := sql.Open("mysql", "docker:password@tcp(mysql_host)/fooder")
	if err != nil {
		return nil, err
	}
	// Get the underlying sql.DB object of the driver.
	db := drv.DB()
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(100)
	db.SetConnMaxLifetime(time.Hour)
	return ent.NewClient(ent.Driver(drv)), nil
}
