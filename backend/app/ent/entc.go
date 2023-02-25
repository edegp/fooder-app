//go:build ignore
// +build ignore

package main

import (
	"log"
	"os"
	"strings"
	"backend/app/formatter"

	"entgo.io/contrib/entgql"
	"entgo.io/ent/entc"
	"entgo.io/ent/entc/gen"
	"github.com/vektah/gqlparser/v2/ast"
)

// https://github.com/ent/contrib/blob/master/entgql/schema.go#L964
func printSchema(schema *ast.Schema) string {
	sb := &strings.Builder{}
	formatter.
		NewFormatter(sb, formatter.WithIndent("  ")).
		FormatSchema(schema)
	return sb.String()
}

func outputWriter(s *ast.Schema) error {
	path := "./schema.graphql"
	return os.WriteFile(path, []byte(printSchema(s)), 0644)
}

func main() {
	ex, err := entgql.NewExtension(
		entgql.WithConfigPath("../gqlgen.yml"),
		entgql.WithSchemaGenerator(),
		entgql.WithSchemaPath("./schema.graphql"),
		entgql.WithOutputWriter(outputWriter),
		// entgql.WithWhereInputs(true),
		// entgql.WithNodeDescriptor(true),
	)
    if err != nil {
        log.Fatalf("creating entgql extension: %v", err)
    }
    if err := entc.Generate("../ent/schema", &gen.Config{}, entc.Extensions(ex)); err != nil {
        log.Fatalf("running ent codegen: %v", err)
    }
}
