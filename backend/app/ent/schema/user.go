package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			Immutable().
			Annotations(
				entgql.OrderField("ID"),
			),
		field.Int("age").
			Optional().
			Range(0, 150).
			Annotations(
				entgql.OrderField("AGE"),
			),
		field.Time("create_at").
			Default(time.Now).
			Immutable().
			Annotations(
				entsql.Default("CURRENT_TIMESTAMP"),
				entgql.OrderField("CREATED_AT"),
			),
		field.Time("latest_login_at").
			Default(time.Now).
			UpdateDefault(time.Now).
			Annotations(
				entsql.Default("CURRENT_TIMESTAMP"),
				entgql.OrderField("LATEST_LOGIN_AT"),
			),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("record", Record.Type),
	}
}

// Mutation of the User.
func (User) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
