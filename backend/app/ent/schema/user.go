package schema

import (
    "time"
	"entgo.io/contrib/entgql"
	"entgo.io/ent"
	"entgo.io/ent/schema"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}


// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
        field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
            Immutable().
            Annotations(
                entgql.OrderField("ID"),
            ),
        field.String("id_token").
            NotEmpty().
            Annotations(
                entgql.OrderField("ID_TOKEN"),
            ),
        field.Time("create_at").
            Default(time.Now).
            Immutable().
            Annotations(
                entgql.OrderField("CREATED_AT"),
            ),
        field.Time("latest_login_at").
            Default(time.Now).
            UpdateDefault(time.Now).
            Annotations(
                entgql.OrderField("LATEST_LOGIN_AT"),
            ),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}

// Mutation of the User.
func (User) Annotations()  []schema.Annotation {
    return  []schema.Annotation{
        entgql.QueryField(),
        entgql.Mutations(entgql.MutationCreate(), entgql.MutationUpdate()),
    }
}
