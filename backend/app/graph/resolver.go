package graph

import (
	"backend/app/ent"
	"github.com/99designs/gqlgen/graphql"
)

type Resolver struct{ client *ent.Client }

func NewSchema(client *ent.Client) graphql.ExecutableSchema {
	return NewExecutableSchema(Config{
		Resolvers: &Resolver{client},
	})
}

