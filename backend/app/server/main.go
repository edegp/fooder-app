package main

import (
	"backend/app/ent"
	"backend/app/graph"
	"context"
	"errors"
	"log"
    "os"
	"net/http"

    "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	_ "github.com/go-sql-driver/mysql"
)

const defaultPort = "8080"

func main() {
    port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
    var entOptions []ent.Option
    entOptions = append(entOptions, ent.Debug())
    // open mysql server
    client, err := ent.Open("mysql", "docker:password@tcp(mysql_host)/fooder", entOptions...)
    if err != nil {
        log.Fatalf("Error: mysql client: %v\n", err)
    }
    defer client.Close()
    // Run the migration here
    if err := client.Debug().Schema.Create(context.Background()); !errors.Is(err, nil) {
        log.Fatalf("Error: failed creating schema resources %v\n", err)
    }
    // open grahphql server
    srv := handler.NewDefaultServer((graph.NewSchema(client)))
    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.Handle("/query", srv)

    log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
    log.Fatal(http.ListenAndServe(":"+port, nil))
}
