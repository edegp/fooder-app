// Code generated by ent, DO NOT EDIT.

package user

import (
	"time"

	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the user type in the database.
	Label = "user"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldIDToken holds the string denoting the id_token field in the database.
	FieldIDToken = "id_token"
	// FieldCreateAt holds the string denoting the create_at field in the database.
	FieldCreateAt = "create_at"
	// FieldLatestLoginAt holds the string denoting the latest_login_at field in the database.
	FieldLatestLoginAt = "latest_login_at"
	// Table holds the table name of the user in the database.
	Table = "users"
)

// Columns holds all SQL columns for user fields.
var Columns = []string{
	FieldID,
	FieldIDToken,
	FieldCreateAt,
	FieldLatestLoginAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// IDTokenValidator is a validator for the "id_token" field. It is called by the builders before save.
	IDTokenValidator func(string) error
	// DefaultCreateAt holds the default value on creation for the "create_at" field.
	DefaultCreateAt func() time.Time
	// DefaultLatestLoginAt holds the default value on creation for the "latest_login_at" field.
	DefaultLatestLoginAt func() time.Time
	// UpdateDefaultLatestLoginAt holds the default value on update for the "latest_login_at" field.
	UpdateDefaultLatestLoginAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)