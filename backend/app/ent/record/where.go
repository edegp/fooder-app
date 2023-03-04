// Code generated by ent, DO NOT EDIT.

package record

import (
	"backend/app/ent/predicate"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
)

// ID filters vertices based on their ID field.
func ID(id string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldID, id))
}

// IDEQ applies the EQ predicate on the ID field.
func IDEQ(id string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldID, id))
}

// IDNEQ applies the NEQ predicate on the ID field.
func IDNEQ(id string) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldID, id))
}

// IDIn applies the In predicate on the ID field.
func IDIn(ids ...string) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldID, ids...))
}

// IDNotIn applies the NotIn predicate on the ID field.
func IDNotIn(ids ...string) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldID, ids...))
}

// IDGT applies the GT predicate on the ID field.
func IDGT(id string) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldID, id))
}

// IDGTE applies the GTE predicate on the ID field.
func IDGTE(id string) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldID, id))
}

// IDLT applies the LT predicate on the ID field.
func IDLT(id string) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldID, id))
}

// IDLTE applies the LTE predicate on the ID field.
func IDLTE(id string) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldID, id))
}

// UserID applies equality check predicate on the "user_id" field. It's identical to UserIDEQ.
func UserID(v string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldUserID, v))
}

// PlaceID applies equality check predicate on the "place_id" field. It's identical to PlaceIDEQ.
func PlaceID(v string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldPlaceID, v))
}

// VisitAt applies equality check predicate on the "visit_at" field. It's identical to VisitAtEQ.
func VisitAt(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldVisitAt, v))
}

// PaymentAmount applies equality check predicate on the "payment_amount" field. It's identical to PaymentAmountEQ.
func PaymentAmount(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldPaymentAmount, v))
}

// LeaveAt applies equality check predicate on the "leave_at" field. It's identical to LeaveAtEQ.
func LeaveAt(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldLeaveAt, v))
}

// Evaluation applies equality check predicate on the "evaluation" field. It's identical to EvaluationEQ.
func Evaluation(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldEvaluation, v))
}

// UserIDEQ applies the EQ predicate on the "user_id" field.
func UserIDEQ(v string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldUserID, v))
}

// UserIDNEQ applies the NEQ predicate on the "user_id" field.
func UserIDNEQ(v string) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldUserID, v))
}

// UserIDIn applies the In predicate on the "user_id" field.
func UserIDIn(vs ...string) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldUserID, vs...))
}

// UserIDNotIn applies the NotIn predicate on the "user_id" field.
func UserIDNotIn(vs ...string) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldUserID, vs...))
}

// UserIDGT applies the GT predicate on the "user_id" field.
func UserIDGT(v string) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldUserID, v))
}

// UserIDGTE applies the GTE predicate on the "user_id" field.
func UserIDGTE(v string) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldUserID, v))
}

// UserIDLT applies the LT predicate on the "user_id" field.
func UserIDLT(v string) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldUserID, v))
}

// UserIDLTE applies the LTE predicate on the "user_id" field.
func UserIDLTE(v string) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldUserID, v))
}

// UserIDContains applies the Contains predicate on the "user_id" field.
func UserIDContains(v string) predicate.Record {
	return predicate.Record(sql.FieldContains(FieldUserID, v))
}

// UserIDHasPrefix applies the HasPrefix predicate on the "user_id" field.
func UserIDHasPrefix(v string) predicate.Record {
	return predicate.Record(sql.FieldHasPrefix(FieldUserID, v))
}

// UserIDHasSuffix applies the HasSuffix predicate on the "user_id" field.
func UserIDHasSuffix(v string) predicate.Record {
	return predicate.Record(sql.FieldHasSuffix(FieldUserID, v))
}

// UserIDEqualFold applies the EqualFold predicate on the "user_id" field.
func UserIDEqualFold(v string) predicate.Record {
	return predicate.Record(sql.FieldEqualFold(FieldUserID, v))
}

// UserIDContainsFold applies the ContainsFold predicate on the "user_id" field.
func UserIDContainsFold(v string) predicate.Record {
	return predicate.Record(sql.FieldContainsFold(FieldUserID, v))
}

// PlaceIDEQ applies the EQ predicate on the "place_id" field.
func PlaceIDEQ(v string) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldPlaceID, v))
}

// PlaceIDNEQ applies the NEQ predicate on the "place_id" field.
func PlaceIDNEQ(v string) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldPlaceID, v))
}

// PlaceIDIn applies the In predicate on the "place_id" field.
func PlaceIDIn(vs ...string) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldPlaceID, vs...))
}

// PlaceIDNotIn applies the NotIn predicate on the "place_id" field.
func PlaceIDNotIn(vs ...string) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldPlaceID, vs...))
}

// PlaceIDGT applies the GT predicate on the "place_id" field.
func PlaceIDGT(v string) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldPlaceID, v))
}

// PlaceIDGTE applies the GTE predicate on the "place_id" field.
func PlaceIDGTE(v string) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldPlaceID, v))
}

// PlaceIDLT applies the LT predicate on the "place_id" field.
func PlaceIDLT(v string) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldPlaceID, v))
}

// PlaceIDLTE applies the LTE predicate on the "place_id" field.
func PlaceIDLTE(v string) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldPlaceID, v))
}

// PlaceIDContains applies the Contains predicate on the "place_id" field.
func PlaceIDContains(v string) predicate.Record {
	return predicate.Record(sql.FieldContains(FieldPlaceID, v))
}

// PlaceIDHasPrefix applies the HasPrefix predicate on the "place_id" field.
func PlaceIDHasPrefix(v string) predicate.Record {
	return predicate.Record(sql.FieldHasPrefix(FieldPlaceID, v))
}

// PlaceIDHasSuffix applies the HasSuffix predicate on the "place_id" field.
func PlaceIDHasSuffix(v string) predicate.Record {
	return predicate.Record(sql.FieldHasSuffix(FieldPlaceID, v))
}

// PlaceIDEqualFold applies the EqualFold predicate on the "place_id" field.
func PlaceIDEqualFold(v string) predicate.Record {
	return predicate.Record(sql.FieldEqualFold(FieldPlaceID, v))
}

// PlaceIDContainsFold applies the ContainsFold predicate on the "place_id" field.
func PlaceIDContainsFold(v string) predicate.Record {
	return predicate.Record(sql.FieldContainsFold(FieldPlaceID, v))
}

// VisitAtEQ applies the EQ predicate on the "visit_at" field.
func VisitAtEQ(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldVisitAt, v))
}

// VisitAtNEQ applies the NEQ predicate on the "visit_at" field.
func VisitAtNEQ(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldVisitAt, v))
}

// VisitAtIn applies the In predicate on the "visit_at" field.
func VisitAtIn(vs ...time.Time) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldVisitAt, vs...))
}

// VisitAtNotIn applies the NotIn predicate on the "visit_at" field.
func VisitAtNotIn(vs ...time.Time) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldVisitAt, vs...))
}

// VisitAtGT applies the GT predicate on the "visit_at" field.
func VisitAtGT(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldVisitAt, v))
}

// VisitAtGTE applies the GTE predicate on the "visit_at" field.
func VisitAtGTE(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldVisitAt, v))
}

// VisitAtLT applies the LT predicate on the "visit_at" field.
func VisitAtLT(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldVisitAt, v))
}

// VisitAtLTE applies the LTE predicate on the "visit_at" field.
func VisitAtLTE(v time.Time) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldVisitAt, v))
}

// PaymentAmountEQ applies the EQ predicate on the "payment_amount" field.
func PaymentAmountEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldPaymentAmount, v))
}

// PaymentAmountNEQ applies the NEQ predicate on the "payment_amount" field.
func PaymentAmountNEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldPaymentAmount, v))
}

// PaymentAmountIn applies the In predicate on the "payment_amount" field.
func PaymentAmountIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldPaymentAmount, vs...))
}

// PaymentAmountNotIn applies the NotIn predicate on the "payment_amount" field.
func PaymentAmountNotIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldPaymentAmount, vs...))
}

// PaymentAmountGT applies the GT predicate on the "payment_amount" field.
func PaymentAmountGT(v int) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldPaymentAmount, v))
}

// PaymentAmountGTE applies the GTE predicate on the "payment_amount" field.
func PaymentAmountGTE(v int) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldPaymentAmount, v))
}

// PaymentAmountLT applies the LT predicate on the "payment_amount" field.
func PaymentAmountLT(v int) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldPaymentAmount, v))
}

// PaymentAmountLTE applies the LTE predicate on the "payment_amount" field.
func PaymentAmountLTE(v int) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldPaymentAmount, v))
}

// PaymentAmountIsNil applies the IsNil predicate on the "payment_amount" field.
func PaymentAmountIsNil() predicate.Record {
	return predicate.Record(sql.FieldIsNull(FieldPaymentAmount))
}

// PaymentAmountNotNil applies the NotNil predicate on the "payment_amount" field.
func PaymentAmountNotNil() predicate.Record {
	return predicate.Record(sql.FieldNotNull(FieldPaymentAmount))
}

// LeaveAtEQ applies the EQ predicate on the "leave_at" field.
func LeaveAtEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldLeaveAt, v))
}

// LeaveAtNEQ applies the NEQ predicate on the "leave_at" field.
func LeaveAtNEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldLeaveAt, v))
}

// LeaveAtIn applies the In predicate on the "leave_at" field.
func LeaveAtIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldLeaveAt, vs...))
}

// LeaveAtNotIn applies the NotIn predicate on the "leave_at" field.
func LeaveAtNotIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldLeaveAt, vs...))
}

// LeaveAtGT applies the GT predicate on the "leave_at" field.
func LeaveAtGT(v int) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldLeaveAt, v))
}

// LeaveAtGTE applies the GTE predicate on the "leave_at" field.
func LeaveAtGTE(v int) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldLeaveAt, v))
}

// LeaveAtLT applies the LT predicate on the "leave_at" field.
func LeaveAtLT(v int) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldLeaveAt, v))
}

// LeaveAtLTE applies the LTE predicate on the "leave_at" field.
func LeaveAtLTE(v int) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldLeaveAt, v))
}

// LeaveAtIsNil applies the IsNil predicate on the "leave_at" field.
func LeaveAtIsNil() predicate.Record {
	return predicate.Record(sql.FieldIsNull(FieldLeaveAt))
}

// LeaveAtNotNil applies the NotNil predicate on the "leave_at" field.
func LeaveAtNotNil() predicate.Record {
	return predicate.Record(sql.FieldNotNull(FieldLeaveAt))
}

// EvaluationEQ applies the EQ predicate on the "evaluation" field.
func EvaluationEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldEQ(FieldEvaluation, v))
}

// EvaluationNEQ applies the NEQ predicate on the "evaluation" field.
func EvaluationNEQ(v int) predicate.Record {
	return predicate.Record(sql.FieldNEQ(FieldEvaluation, v))
}

// EvaluationIn applies the In predicate on the "evaluation" field.
func EvaluationIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldIn(FieldEvaluation, vs...))
}

// EvaluationNotIn applies the NotIn predicate on the "evaluation" field.
func EvaluationNotIn(vs ...int) predicate.Record {
	return predicate.Record(sql.FieldNotIn(FieldEvaluation, vs...))
}

// EvaluationGT applies the GT predicate on the "evaluation" field.
func EvaluationGT(v int) predicate.Record {
	return predicate.Record(sql.FieldGT(FieldEvaluation, v))
}

// EvaluationGTE applies the GTE predicate on the "evaluation" field.
func EvaluationGTE(v int) predicate.Record {
	return predicate.Record(sql.FieldGTE(FieldEvaluation, v))
}

// EvaluationLT applies the LT predicate on the "evaluation" field.
func EvaluationLT(v int) predicate.Record {
	return predicate.Record(sql.FieldLT(FieldEvaluation, v))
}

// EvaluationLTE applies the LTE predicate on the "evaluation" field.
func EvaluationLTE(v int) predicate.Record {
	return predicate.Record(sql.FieldLTE(FieldEvaluation, v))
}

// HasUser applies the HasEdge predicate on the "user" edge.
func HasUser() predicate.Record {
	return predicate.Record(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
		)
		sqlgraph.HasNeighbors(s, step)
	})
}

// HasUserWith applies the HasEdge predicate on the "user" edge with a given conditions (other predicates).
func HasUserWith(preds ...predicate.User) predicate.Record {
	return predicate.Record(func(s *sql.Selector) {
		step := sqlgraph.NewStep(
			sqlgraph.From(Table, FieldID),
			sqlgraph.To(UserInverseTable, FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
		)
		sqlgraph.HasNeighborsWith(s, step, func(s *sql.Selector) {
			for _, p := range preds {
				p(s)
			}
		})
	})
}

// And groups predicates with the AND operator between them.
func And(predicates ...predicate.Record) predicate.Record {
	return predicate.Record(func(s *sql.Selector) {
		s1 := s.Clone().SetP(nil)
		for _, p := range predicates {
			p(s1)
		}
		s.Where(s1.P())
	})
}

// Or groups predicates with the OR operator between them.
func Or(predicates ...predicate.Record) predicate.Record {
	return predicate.Record(func(s *sql.Selector) {
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
func Not(p predicate.Record) predicate.Record {
	return predicate.Record(func(s *sql.Selector) {
		p(s.Not())
	})
}
