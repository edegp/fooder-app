package schema

import (
	"time"

	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/dialect/entsql"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type Record struct {
	ent.Schema
}

// Fields of the Record.
func (Record) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").
			Default(uuid.NewString()).
			Immutable().
			Annotations(
				entgql.OrderField("ID"),
			),
		field.String("user_id"),
		field.String("place_id"),
		field.Time("visit_at").
			Default(time.Now).
			Annotations(
				entsql.Default("CURRENT_TIMESTAMP"),
				entgql.OrderField("VISIT_AT"),
			),
		field.Int("payment_amount").
			Optional().
			Annotations(
				entgql.OrderField("PAYMENT_AMOUNT"),
			),
		field.Int("leave_at").
			Optional(),
		field.Int("evaluation").
			Default(3).
			Range(1, 5).
			Annotations(
				entgql.OrderField("EVALUATION"),
			),
	}
}

// Edges of the Record.
func (Record) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("record").
			Unique().
			Required().
			Field("user_id"),
		edge.From("store", Store.Type).
			Ref("record").
			Unique().
			Required().
			Field("place_id"),
	}
}

// Mutation of the Record.
func (Record) Annotations() []schema.Annotation {
	return []schema.Annotation{
		entgql.QueryField(),
		entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
	}
}
