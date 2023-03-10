// Code generated by ent, DO NOT EDIT.

package user

import (
	"backend/app/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.User {
	return predicate.User(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.User {
	return predicate.User(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.User {
	return predicate.User(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.User {
	return predicate.User(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.User {
	return predicate.User(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.User {
	return predicate.User(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.User {
	return predicate.User(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.User {
	return predicate.User(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.User {
	return predicate.User(sql.FieldLTE(FieldID, id))
}

// Age applies equality check predicate on the "age" field. It's identical to AgeEQ.
func Age(v int) predicate.User {
	return predicate.User(sql.FieldEQ(FieldAge, v))
}

// CreateAt applies equality check predicate on the "create_at" field. It's identical to CreateAtEQ.
func CreateAt(v time.Time) predicate.User {
	return predicate.User(sql.FieldEQ(FieldCreateAt, v))
}

// LatestLoginAt applies equality check predicate on the "latest_login_at" field. It's identical to LatestLoginAtEQ.
func LatestLoginAt(v time.Time) predicate.User {
	return predicate.User(sql.FieldEQ(FieldLatestLoginAt, v))
}

// AgeEQ applies the EQ predicate on the "age" field.
func AgeEQ(v int) predicate.User {
	return predicate.User(sql.FieldEQ(FieldAge, v))
}

// AgeNEQ applies the NEQ predicate on the "age" field.
func AgeNEQ(v int) predicate.User {
	return predicate.User(sql.FieldNEQ(FieldAge, v))
}

// AgeIn applies the In predicate on the "age" field.
func AgeIn(vs ...int) predicate.User {
	return predicate.User(sql.FieldIn(FieldAge, vs...))
}

// AgeNotIn applies the NotIn predicate on the "age" field.
func AgeNotIn(vs ...int) predicate.User {
	return predicate.User(sql.FieldNotIn(FieldAge, vs...))
}

// AgeGT applies the GT predicate on the "age" field.
func AgeGT(v int) predicate.User {
	return predicate.User(sql.FieldGT(FieldAge, v))
}

// AgeGTE applies the GTE predicate on the "age" field.
func AgeGTE(v int) predicate.User {
	return predicate.User(sql.FieldGTE(FieldAge, v))
}

// AgeLT applies the LT predicate on the "age" field.
func AgeLT(v int) predicate.User {
	return predicate.User(sql.FieldLT(FieldAge, v))
}

// AgeLTE applies the LTE predicate on the "age" field.
func AgeLTE(v int) predicate.User {
	return predicate.User(sql.FieldLTE(FieldAge, v))
}

// AgeIsNil applies the IsNil predicate on the "age" field.
func AgeIsNil() predicate.User {
	return predicate.User(sql.FieldIsNull(FieldAge))
}

// AgeNotNil applies the NotNil predicate on the "age" field.
func AgeNotNil() predicate.User {
	return predicate.User(sql.FieldNotNull(FieldAge))
}

// CreateAtEQ applies the EQ predicate on the "create_at" field.
func CreateAtEQ(v time.Time) predicate.User {
	return predicate.User(sql.FieldEQ(FieldCreateAt, v))
}

// CreateAtNEQ applies the NEQ predicate on the "create_at" field.
func CreateAtNEQ(v time.Time) predicate.User {
	return predicate.User(sql.FieldNEQ(FieldCreateAt, v))
}

// CreateAtIn applies the In predicate on the "create_at" field.
func CreateAtIn(vs ...time.Time) predicate.User {
	return predicate.User(sql.FieldIn(FieldCreateAt, vs...))
}

// CreateAtNotIn applies the NotIn predicate on the "create_at" field.
func CreateAtNotIn(vs ...time.Time) predicate.User {
	return predicate.User(sql.FieldNotIn(FieldCreateAt, vs...))
}

// CreateAtGT applies the GT predicate on the "create_at" field.
func CreateAtGT(v time.Time) predicate.User {
	return predicate.User(sql.FieldGT(FieldCreateAt, v))
}

// CreateAtGTE applies the GTE predicate on the "create_at" field.
func CreateAtGTE(v time.Time) predicate.User {
	return predicate.User(sql.FieldGTE(FieldCreateAt, v))
}

// CreateAtLT applies the LT predicate on the "create_at" field.
func CreateAtLT(v time.Time) predicate.User {
	return predicate.User(sql.FieldLT(FieldCreateAt, v))
}

// CreateAtLTE applies the LTE predicate on the "create_at" field.
func CreateAtLTE(v time.Time) predicate.User {
	return predicate.User(sql.FieldLTE(FieldCreateAt, v))
}

// LatestLoginAtEQ applies the EQ predicate on the "latest_login_at" field.
func LatestLoginAtEQ(v time.Time) predicate.User {
	return predicate.User(sql.FieldEQ(FieldLatestLoginAt, v))
}

// LatestLoginAtNEQ applies the NEQ predicate on the "latest_login_at" field.
func LatestLoginAtNEQ(v time.Time) predicate.User {
	return predicate.User(sql.FieldNEQ(FieldLatestLoginAt, v))
}

// LatestLoginAtIn applies the In predicate on the "latest_login_at" field.
func LatestLoginAtIn(vs ...time.Time) predicate.User {
	return predicate.User(sql.FieldIn(FieldLatestLoginAt, vs...))
}

// LatestLoginAtNotIn applies the NotIn predicate on the "latest_login_at" field.
func LatestLoginAtNotIn(vs ...time.Time) predicate.User {
	return predicate.User(sql.FieldNotIn(FieldLatestLoginAt, vs...))
}

// LatestLoginAtGT applies the GT predicate on the "latest_login_at" field.
func LatestLoginAtGT(v time.Time) predicate.User {
	return predicate.User(sql.FieldGT(FieldLatestLoginAt, v))
}

// LatestLoginAtGTE applies the GTE predicate on the "latest_login_at" field.
func LatestLoginAtGTE(v time.Time) predicate.User {
	return predicate.User(sql.FieldGTE(FieldLatestLoginAt, v))
}

// LatestLoginAtLT applies the LT predicate on the "latest_login_at" field.
func LatestLoginAtLT(v time.Time) predicate.User {
	return predicate.User(sql.FieldLT(FieldLatestLoginAt, v))
}

// LatestLoginAtLTE applies the LTE predicate on the "latest_login_at" field.
func LatestLoginAtLTE(v time.Time) predicate.User {
	return predicate.User(sql.FieldLTE(FieldLatestLoginAt, v))
}

// HasRecord applies the HasEdge predicate on the "record" edge.
func HasRecord() predicate.User {
	return predicate.User(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, RecordTable, RecordColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasRecordWith applies the HasEdge predicate on the "record" edge with a given conditions (other predicates).
func HasRecordWith(preds ...predicate.Record) predicate.User {
	return predicate.User(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(RecordInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.O2M, false, RecordTable, RecordColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.User) predicate.User {
	return predicate.User(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.User) predicate.User {
	return predicate.User(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for i, p := range predicates {
			if i > 0 {
				s1.Or()
			}
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Not applies the not operator on the given predicate.
func Not(p predicate.User) predicate.User {
	return predicate.User(func(s *sql.Selector) {
		p(s.Not())
	})
}
