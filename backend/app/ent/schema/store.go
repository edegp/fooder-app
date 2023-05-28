package schema

import (
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type Store struct {
	ent.Schema
}

// Fields of Store
func (Store) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			Default(uuid.NewString()).
			Immutable().
			Annotations(
				entgql.OrderField("ID"),
			),
		field.String("name"),
		field.Int("category_id"),
		field.Int("sub_category_id"),
		field.Int("price"),
		field.JSON("payments", []string{}),
		field.Int("scale"),
		field.String("address"),
		field.Int("rating"),
		field.JSON("nearby_stores", []string{}),
		field.JSON("business_hours", []int{}),
		field.JSON("types", []string{}),
	}
}

// Edges of the Store.
func (Store) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("record", Record.Type),
	}
}

// Mutation of the Store.
func (Store) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
