// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/app/ent/record"
	"backend/app/ent/schema"
	"backend/app/ent/user"
	"time"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	recordFields := schema.Record{}.Fields()
	_ = recordFields
	// recordDescVisitAt is the schema descriptor for visit_at field.
	recordDescVisitAt := recordFields[3].Descriptor()
	// record.DefaultVisitAt holds the default value on creation for the visit_at field.
	record.DefaultVisitAt = recordDescVisitAt.Default.(func() time.Time)
	// recordDescEvaluation is the schema descriptor for evaluation field.
	recordDescEvaluation := recordFields[6].Descriptor()
	// record.DefaultEvaluation holds the default value on creation for the evaluation field.
	record.DefaultEvaluation = recordDescEvaluation.Default.(int)
	// record.EvaluationValidator is a validator for the "evaluation" field. It is called by the builders before save.
	record.EvaluationValidator = recordDescEvaluation.Validators[0].(func(int) error)
	// recordDescID is the schema descriptor for id field.
	recordDescID := recordFields[0].Descriptor()
	// record.DefaultID holds the default value on creation for the id field.
	record.DefaultID = recordDescID.Default.(string)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescAge is the schema descriptor for age field.
	userDescAge := userFields[1].Descriptor()
	// user.AgeValidator is a validator for the "age" field. It is called by the builders before save.
	user.AgeValidator = userDescAge.Validators[0].(func(int) error)
	// userDescCreateAt is the schema descriptor for create_at field.
	userDescCreateAt := userFields[2].Descriptor()
	// user.DefaultCreateAt holds the default value on creation for the create_at field.
	user.DefaultCreateAt = userDescCreateAt.Default.(func() time.Time)
	// userDescLatestLoginAt is the schema descriptor for latest_login_at field.
	userDescLatestLoginAt := userFields[3].Descriptor()
	// user.DefaultLatestLoginAt holds the default value on creation for the latest_login_at field.
	user.DefaultLatestLoginAt = userDescLatestLoginAt.Default.(func() time.Time)
	// user.UpdateDefaultLatestLoginAt holds the default value on update for the latest_login_at field.
	user.UpdateDefaultLatestLoginAt = userDescLatestLoginAt.UpdateDefault.(func() time.Time)
}
