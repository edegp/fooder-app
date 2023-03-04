// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/app/ent/predicate"
	"backend/app/ent/record"
	"backend/app/ent/user"
	"errors"
	"fmt"
	"time"
)

// RecordWhereInput represents a where input for filtering Record queries.
type RecordWhereInput struct {
	Predicates []predicate.Record  `json:"-"`
	Not        *RecordWhereInput   `json:"not,omitempty"`
	Or         []*RecordWhereInput `json:"or,omitempty"`
	And        []*RecordWhereInput `json:"and,omitempty"`

	// "id" field predicates.
	ID      *string  `json:"id,omitempty"`
	IDNEQ   *string  `json:"idNEQ,omitempty"`
	IDIn    []string `json:"idIn,omitempty"`
	IDNotIn []string `json:"idNotIn,omitempty"`
	IDGT    *string  `json:"idGT,omitempty"`
	IDGTE   *string  `json:"idGTE,omitempty"`
	IDLT    *string  `json:"idLT,omitempty"`
	IDLTE   *string  `json:"idLTE,omitempty"`

	// "user_id" field predicates.
	UserID             *string  `json:"userID,omitempty"`
	UserIDNEQ          *string  `json:"userIDNEQ,omitempty"`
	UserIDIn           []string `json:"userIDIn,omitempty"`
	UserIDNotIn        []string `json:"userIDNotIn,omitempty"`
	UserIDGT           *string  `json:"userIDGT,omitempty"`
	UserIDGTE          *string  `json:"userIDGTE,omitempty"`
	UserIDLT           *string  `json:"userIDLT,omitempty"`
	UserIDLTE          *string  `json:"userIDLTE,omitempty"`
	UserIDContains     *string  `json:"userIDContains,omitempty"`
	UserIDHasPrefix    *string  `json:"userIDHasPrefix,omitempty"`
	UserIDHasSuffix    *string  `json:"userIDHasSuffix,omitempty"`
	UserIDEqualFold    *string  `json:"userIDEqualFold,omitempty"`
	UserIDContainsFold *string  `json:"userIDContainsFold,omitempty"`

	// "place_id" field predicates.
	PlaceID             *string  `json:"placeID,omitempty"`
	PlaceIDNEQ          *string  `json:"placeIDNEQ,omitempty"`
	PlaceIDIn           []string `json:"placeIDIn,omitempty"`
	PlaceIDNotIn        []string `json:"placeIDNotIn,omitempty"`
	PlaceIDGT           *string  `json:"placeIDGT,omitempty"`
	PlaceIDGTE          *string  `json:"placeIDGTE,omitempty"`
	PlaceIDLT           *string  `json:"placeIDLT,omitempty"`
	PlaceIDLTE          *string  `json:"placeIDLTE,omitempty"`
	PlaceIDContains     *string  `json:"placeIDContains,omitempty"`
	PlaceIDHasPrefix    *string  `json:"placeIDHasPrefix,omitempty"`
	PlaceIDHasSuffix    *string  `json:"placeIDHasSuffix,omitempty"`
	PlaceIDEqualFold    *string  `json:"placeIDEqualFold,omitempty"`
	PlaceIDContainsFold *string  `json:"placeIDContainsFold,omitempty"`

	// "visit_at" field predicates.
	VisitAt      *time.Time  `json:"visitAt,omitempty"`
	VisitAtNEQ   *time.Time  `json:"visitAtNEQ,omitempty"`
	VisitAtIn    []time.Time `json:"visitAtIn,omitempty"`
	VisitAtNotIn []time.Time `json:"visitAtNotIn,omitempty"`
	VisitAtGT    *time.Time  `json:"visitAtGT,omitempty"`
	VisitAtGTE   *time.Time  `json:"visitAtGTE,omitempty"`
	VisitAtLT    *time.Time  `json:"visitAtLT,omitempty"`
	VisitAtLTE   *time.Time  `json:"visitAtLTE,omitempty"`

	// "payment_amount" field predicates.
	PaymentAmount       *int  `json:"paymentAmount,omitempty"`
	PaymentAmountNEQ    *int  `json:"paymentAmountNEQ,omitempty"`
	PaymentAmountIn     []int `json:"paymentAmountIn,omitempty"`
	PaymentAmountNotIn  []int `json:"paymentAmountNotIn,omitempty"`
	PaymentAmountGT     *int  `json:"paymentAmountGT,omitempty"`
	PaymentAmountGTE    *int  `json:"paymentAmountGTE,omitempty"`
	PaymentAmountLT     *int  `json:"paymentAmountLT,omitempty"`
	PaymentAmountLTE    *int  `json:"paymentAmountLTE,omitempty"`
	PaymentAmountIsNil  bool  `json:"paymentAmountIsNil,omitempty"`
	PaymentAmountNotNil bool  `json:"paymentAmountNotNil,omitempty"`

	// "leave_at" field predicates.
	LeaveAt       *int  `json:"leaveAt,omitempty"`
	LeaveAtNEQ    *int  `json:"leaveAtNEQ,omitempty"`
	LeaveAtIn     []int `json:"leaveAtIn,omitempty"`
	LeaveAtNotIn  []int `json:"leaveAtNotIn,omitempty"`
	LeaveAtGT     *int  `json:"leaveAtGT,omitempty"`
	LeaveAtGTE    *int  `json:"leaveAtGTE,omitempty"`
	LeaveAtLT     *int  `json:"leaveAtLT,omitempty"`
	LeaveAtLTE    *int  `json:"leaveAtLTE,omitempty"`
	LeaveAtIsNil  bool  `json:"leaveAtIsNil,omitempty"`
	LeaveAtNotNil bool  `json:"leaveAtNotNil,omitempty"`

	// "evaluation" field predicates.
	Evaluation      *int  `json:"evaluation,omitempty"`
	EvaluationNEQ   *int  `json:"evaluationNEQ,omitempty"`
	EvaluationIn    []int `json:"evaluationIn,omitempty"`
	EvaluationNotIn []int `json:"evaluationNotIn,omitempty"`
	EvaluationGT    *int  `json:"evaluationGT,omitempty"`
	EvaluationGTE   *int  `json:"evaluationGTE,omitempty"`
	EvaluationLT    *int  `json:"evaluationLT,omitempty"`
	EvaluationLTE   *int  `json:"evaluationLTE,omitempty"`

	// "user" edge predicates.
	HasUser     *bool             `json:"hasUser,omitempty"`
	HasUserWith []*UserWhereInput `json:"hasUserWith,omitempty"`
}

// AddPredicates adds custom predicates to the where input to be used during the filtering phase.
func (i *RecordWhereInput) AddPredicates(predicates ...predicate.Record) {
	i.Predicates = append(i.Predicates, predicates...)
}

// Filter applies the RecordWhereInput filter on the RecordQuery builder.
func (i *RecordWhereInput) Filter(q *RecordQuery) (*RecordQuery, error) {
	if i == nil {
		return q, nil
	}
	p, err := i.P()
	if err != nil {
		if err == ErrEmptyRecordWhereInput {
			return q, nil
		}
		return nil, err
	}
	return q.Where(p), nil
}

// ErrEmptyRecordWhereInput is returned in case the RecordWhereInput is empty.
var ErrEmptyRecordWhereInput = errors.New("ent: empty predicate RecordWhereInput")

// P returns a predicate for filtering records.
// An error is returned if the input is empty or invalid.
func (i *RecordWhereInput) P() (predicate.Record, error) {
	var predicates []predicate.Record
	if i.Not != nil {
		p, err := i.Not.P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'not'", err)
		}
		predicates = append(predicates, record.Not(p))
	}
	switch n := len(i.Or); {
	case n == 1:
		p, err := i.Or[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'or'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		or := make([]predicate.Record, 0, n)
		for _, w := range i.Or {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'or'", err)
			}
			or = append(or, p)
		}
		predicates = append(predicates, record.Or(or...))
	}
	switch n := len(i.And); {
	case n == 1:
		p, err := i.And[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'and'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		and := make([]predicate.Record, 0, n)
		for _, w := range i.And {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'and'", err)
			}
			and = append(and, p)
		}
		predicates = append(predicates, record.And(and...))
	}
	predicates = append(predicates, i.Predicates...)
	if i.ID != nil {
		predicates = append(predicates, record.IDEQ(*i.ID))
	}
	if i.IDNEQ != nil {
		predicates = append(predicates, record.IDNEQ(*i.IDNEQ))
	}
	if len(i.IDIn) > 0 {
		predicates = append(predicates, record.IDIn(i.IDIn...))
	}
	if len(i.IDNotIn) > 0 {
		predicates = append(predicates, record.IDNotIn(i.IDNotIn...))
	}
	if i.IDGT != nil {
		predicates = append(predicates, record.IDGT(*i.IDGT))
	}
	if i.IDGTE != nil {
		predicates = append(predicates, record.IDGTE(*i.IDGTE))
	}
	if i.IDLT != nil {
		predicates = append(predicates, record.IDLT(*i.IDLT))
	}
	if i.IDLTE != nil {
		predicates = append(predicates, record.IDLTE(*i.IDLTE))
	}
	if i.UserID != nil {
		predicates = append(predicates, record.UserIDEQ(*i.UserID))
	}
	if i.UserIDNEQ != nil {
		predicates = append(predicates, record.UserIDNEQ(*i.UserIDNEQ))
	}
	if len(i.UserIDIn) > 0 {
		predicates = append(predicates, record.UserIDIn(i.UserIDIn...))
	}
	if len(i.UserIDNotIn) > 0 {
		predicates = append(predicates, record.UserIDNotIn(i.UserIDNotIn...))
	}
	if i.UserIDGT != nil {
		predicates = append(predicates, record.UserIDGT(*i.UserIDGT))
	}
	if i.UserIDGTE != nil {
		predicates = append(predicates, record.UserIDGTE(*i.UserIDGTE))
	}
	if i.UserIDLT != nil {
		predicates = append(predicates, record.UserIDLT(*i.UserIDLT))
	}
	if i.UserIDLTE != nil {
		predicates = append(predicates, record.UserIDLTE(*i.UserIDLTE))
	}
	if i.UserIDContains != nil {
		predicates = append(predicates, record.UserIDContains(*i.UserIDContains))
	}
	if i.UserIDHasPrefix != nil {
		predicates = append(predicates, record.UserIDHasPrefix(*i.UserIDHasPrefix))
	}
	if i.UserIDHasSuffix != nil {
		predicates = append(predicates, record.UserIDHasSuffix(*i.UserIDHasSuffix))
	}
	if i.UserIDEqualFold != nil {
		predicates = append(predicates, record.UserIDEqualFold(*i.UserIDEqualFold))
	}
	if i.UserIDContainsFold != nil {
		predicates = append(predicates, record.UserIDContainsFold(*i.UserIDContainsFold))
	}
	if i.PlaceID != nil {
		predicates = append(predicates, record.PlaceIDEQ(*i.PlaceID))
	}
	if i.PlaceIDNEQ != nil {
		predicates = append(predicates, record.PlaceIDNEQ(*i.PlaceIDNEQ))
	}
	if len(i.PlaceIDIn) > 0 {
		predicates = append(predicates, record.PlaceIDIn(i.PlaceIDIn...))
	}
	if len(i.PlaceIDNotIn) > 0 {
		predicates = append(predicates, record.PlaceIDNotIn(i.PlaceIDNotIn...))
	}
	if i.PlaceIDGT != nil {
		predicates = append(predicates, record.PlaceIDGT(*i.PlaceIDGT))
	}
	if i.PlaceIDGTE != nil {
		predicates = append(predicates, record.PlaceIDGTE(*i.PlaceIDGTE))
	}
	if i.PlaceIDLT != nil {
		predicates = append(predicates, record.PlaceIDLT(*i.PlaceIDLT))
	}
	if i.PlaceIDLTE != nil {
		predicates = append(predicates, record.PlaceIDLTE(*i.PlaceIDLTE))
	}
	if i.PlaceIDContains != nil {
		predicates = append(predicates, record.PlaceIDContains(*i.PlaceIDContains))
	}
	if i.PlaceIDHasPrefix != nil {
		predicates = append(predicates, record.PlaceIDHasPrefix(*i.PlaceIDHasPrefix))
	}
	if i.PlaceIDHasSuffix != nil {
		predicates = append(predicates, record.PlaceIDHasSuffix(*i.PlaceIDHasSuffix))
	}
	if i.PlaceIDEqualFold != nil {
		predicates = append(predicates, record.PlaceIDEqualFold(*i.PlaceIDEqualFold))
	}
	if i.PlaceIDContainsFold != nil {
		predicates = append(predicates, record.PlaceIDContainsFold(*i.PlaceIDContainsFold))
	}
	if i.VisitAt != nil {
		predicates = append(predicates, record.VisitAtEQ(*i.VisitAt))
	}
	if i.VisitAtNEQ != nil {
		predicates = append(predicates, record.VisitAtNEQ(*i.VisitAtNEQ))
	}
	if len(i.VisitAtIn) > 0 {
		predicates = append(predicates, record.VisitAtIn(i.VisitAtIn...))
	}
	if len(i.VisitAtNotIn) > 0 {
		predicates = append(predicates, record.VisitAtNotIn(i.VisitAtNotIn...))
	}
	if i.VisitAtGT != nil {
		predicates = append(predicates, record.VisitAtGT(*i.VisitAtGT))
	}
	if i.VisitAtGTE != nil {
		predicates = append(predicates, record.VisitAtGTE(*i.VisitAtGTE))
	}
	if i.VisitAtLT != nil {
		predicates = append(predicates, record.VisitAtLT(*i.VisitAtLT))
	}
	if i.VisitAtLTE != nil {
		predicates = append(predicates, record.VisitAtLTE(*i.VisitAtLTE))
	}
	if i.PaymentAmount != nil {
		predicates = append(predicates, record.PaymentAmountEQ(*i.PaymentAmount))
	}
	if i.PaymentAmountNEQ != nil {
		predicates = append(predicates, record.PaymentAmountNEQ(*i.PaymentAmountNEQ))
	}
	if len(i.PaymentAmountIn) > 0 {
		predicates = append(predicates, record.PaymentAmountIn(i.PaymentAmountIn...))
	}
	if len(i.PaymentAmountNotIn) > 0 {
		predicates = append(predicates, record.PaymentAmountNotIn(i.PaymentAmountNotIn...))
	}
	if i.PaymentAmountGT != nil {
		predicates = append(predicates, record.PaymentAmountGT(*i.PaymentAmountGT))
	}
	if i.PaymentAmountGTE != nil {
		predicates = append(predicates, record.PaymentAmountGTE(*i.PaymentAmountGTE))
	}
	if i.PaymentAmountLT != nil {
		predicates = append(predicates, record.PaymentAmountLT(*i.PaymentAmountLT))
	}
	if i.PaymentAmountLTE != nil {
		predicates = append(predicates, record.PaymentAmountLTE(*i.PaymentAmountLTE))
	}
	if i.PaymentAmountIsNil {
		predicates = append(predicates, record.PaymentAmountIsNil())
	}
	if i.PaymentAmountNotNil {
		predicates = append(predicates, record.PaymentAmountNotNil())
	}
	if i.LeaveAt != nil {
		predicates = append(predicates, record.LeaveAtEQ(*i.LeaveAt))
	}
	if i.LeaveAtNEQ != nil {
		predicates = append(predicates, record.LeaveAtNEQ(*i.LeaveAtNEQ))
	}
	if len(i.LeaveAtIn) > 0 {
		predicates = append(predicates, record.LeaveAtIn(i.LeaveAtIn...))
	}
	if len(i.LeaveAtNotIn) > 0 {
		predicates = append(predicates, record.LeaveAtNotIn(i.LeaveAtNotIn...))
	}
	if i.LeaveAtGT != nil {
		predicates = append(predicates, record.LeaveAtGT(*i.LeaveAtGT))
	}
	if i.LeaveAtGTE != nil {
		predicates = append(predicates, record.LeaveAtGTE(*i.LeaveAtGTE))
	}
	if i.LeaveAtLT != nil {
		predicates = append(predicates, record.LeaveAtLT(*i.LeaveAtLT))
	}
	if i.LeaveAtLTE != nil {
		predicates = append(predicates, record.LeaveAtLTE(*i.LeaveAtLTE))
	}
	if i.LeaveAtIsNil {
		predicates = append(predicates, record.LeaveAtIsNil())
	}
	if i.LeaveAtNotNil {
		predicates = append(predicates, record.LeaveAtNotNil())
	}
	if i.Evaluation != nil {
		predicates = append(predicates, record.EvaluationEQ(*i.Evaluation))
	}
	if i.EvaluationNEQ != nil {
		predicates = append(predicates, record.EvaluationNEQ(*i.EvaluationNEQ))
	}
	if len(i.EvaluationIn) > 0 {
		predicates = append(predicates, record.EvaluationIn(i.EvaluationIn...))
	}
	if len(i.EvaluationNotIn) > 0 {
		predicates = append(predicates, record.EvaluationNotIn(i.EvaluationNotIn...))
	}
	if i.EvaluationGT != nil {
		predicates = append(predicates, record.EvaluationGT(*i.EvaluationGT))
	}
	if i.EvaluationGTE != nil {
		predicates = append(predicates, record.EvaluationGTE(*i.EvaluationGTE))
	}
	if i.EvaluationLT != nil {
		predicates = append(predicates, record.EvaluationLT(*i.EvaluationLT))
	}
	if i.EvaluationLTE != nil {
		predicates = append(predicates, record.EvaluationLTE(*i.EvaluationLTE))
	}

	if i.HasUser != nil {
		p := record.HasUser()
		if !*i.HasUser {
			p = record.Not(p)
		}
		predicates = append(predicates, p)
	}
	if len(i.HasUserWith) > 0 {
		with := make([]predicate.User, 0, len(i.HasUserWith))
		for _, w := range i.HasUserWith {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'HasUserWith'", err)
			}
			with = append(with, p)
		}
		predicates = append(predicates, record.HasUserWith(with...))
	}
	switch len(predicates) {
	case 0:
		return nil, ErrEmptyRecordWhereInput
	case 1:
		return predicates[0], nil
	default:
		return record.And(predicates...), nil
	}
}

// UserWhereInput represents a where input for filtering User queries.
type UserWhereInput struct {
	Predicates []predicate.User  `json:"-"`
	Not        *UserWhereInput   `json:"not,omitempty"`
	Or         []*UserWhereInput `json:"or,omitempty"`
	And        []*UserWhereInput `json:"and,omitempty"`

	// "id" field predicates.
	ID      *string  `json:"id,omitempty"`
	IDNEQ   *string  `json:"idNEQ,omitempty"`
	IDIn    []string `json:"idIn,omitempty"`
	IDNotIn []string `json:"idNotIn,omitempty"`
	IDGT    *string  `json:"idGT,omitempty"`
	IDGTE   *string  `json:"idGTE,omitempty"`
	IDLT    *string  `json:"idLT,omitempty"`
	IDLTE   *string  `json:"idLTE,omitempty"`

	// "age" field predicates.
	Age       *int  `json:"age,omitempty"`
	AgeNEQ    *int  `json:"ageNEQ,omitempty"`
	AgeIn     []int `json:"ageIn,omitempty"`
	AgeNotIn  []int `json:"ageNotIn,omitempty"`
	AgeGT     *int  `json:"ageGT,omitempty"`
	AgeGTE    *int  `json:"ageGTE,omitempty"`
	AgeLT     *int  `json:"ageLT,omitempty"`
	AgeLTE    *int  `json:"ageLTE,omitempty"`
	AgeIsNil  bool  `json:"ageIsNil,omitempty"`
	AgeNotNil bool  `json:"ageNotNil,omitempty"`

	// "create_at" field predicates.
	CreateAt      *time.Time  `json:"createAt,omitempty"`
	CreateAtNEQ   *time.Time  `json:"createAtNEQ,omitempty"`
	CreateAtIn    []time.Time `json:"createAtIn,omitempty"`
	CreateAtNotIn []time.Time `json:"createAtNotIn,omitempty"`
	CreateAtGT    *time.Time  `json:"createAtGT,omitempty"`
	CreateAtGTE   *time.Time  `json:"createAtGTE,omitempty"`
	CreateAtLT    *time.Time  `json:"createAtLT,omitempty"`
	CreateAtLTE   *time.Time  `json:"createAtLTE,omitempty"`

	// "latest_login_at" field predicates.
	LatestLoginAt      *time.Time  `json:"latestLoginAt,omitempty"`
	LatestLoginAtNEQ   *time.Time  `json:"latestLoginAtNEQ,omitempty"`
	LatestLoginAtIn    []time.Time `json:"latestLoginAtIn,omitempty"`
	LatestLoginAtNotIn []time.Time `json:"latestLoginAtNotIn,omitempty"`
	LatestLoginAtGT    *time.Time  `json:"latestLoginAtGT,omitempty"`
	LatestLoginAtGTE   *time.Time  `json:"latestLoginAtGTE,omitempty"`
	LatestLoginAtLT    *time.Time  `json:"latestLoginAtLT,omitempty"`
	LatestLoginAtLTE   *time.Time  `json:"latestLoginAtLTE,omitempty"`

	// "record" edge predicates.
	HasRecord     *bool               `json:"hasRecord,omitempty"`
	HasRecordWith []*RecordWhereInput `json:"hasRecordWith,omitempty"`
}

// AddPredicates adds custom predicates to the where input to be used during the filtering phase.
func (i *UserWhereInput) AddPredicates(predicates ...predicate.User) {
	i.Predicates = append(i.Predicates, predicates...)
}

// Filter applies the UserWhereInput filter on the UserQuery builder.
func (i *UserWhereInput) Filter(q *UserQuery) (*UserQuery, error) {
	if i == nil {
		return q, nil
	}
	p, err := i.P()
	if err != nil {
		if err == ErrEmptyUserWhereInput {
			return q, nil
		}
		return nil, err
	}
	return q.Where(p), nil
}

// ErrEmptyUserWhereInput is returned in case the UserWhereInput is empty.
var ErrEmptyUserWhereInput = errors.New("ent: empty predicate UserWhereInput")

// P returns a predicate for filtering users.
// An error is returned if the input is empty or invalid.
func (i *UserWhereInput) P() (predicate.User, error) {
	var predicates []predicate.User
	if i.Not != nil {
		p, err := i.Not.P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'not'", err)
		}
		predicates = append(predicates, user.Not(p))
	}
	switch n := len(i.Or); {
	case n == 1:
		p, err := i.Or[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'or'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		or := make([]predicate.User, 0, n)
		for _, w := range i.Or {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'or'", err)
			}
			or = append(or, p)
		}
		predicates = append(predicates, user.Or(or...))
	}
	switch n := len(i.And); {
	case n == 1:
		p, err := i.And[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'and'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		and := make([]predicate.User, 0, n)
		for _, w := range i.And {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'and'", err)
			}
			and = append(and, p)
		}
		predicates = append(predicates, user.And(and...))
	}
	predicates = append(predicates, i.Predicates...)
	if i.ID != nil {
		predicates = append(predicates, user.IDEQ(*i.ID))
	}
	if i.IDNEQ != nil {
		predicates = append(predicates, user.IDNEQ(*i.IDNEQ))
	}
	if len(i.IDIn) > 0 {
		predicates = append(predicates, user.IDIn(i.IDIn...))
	}
	if len(i.IDNotIn) > 0 {
		predicates = append(predicates, user.IDNotIn(i.IDNotIn...))
	}
	if i.IDGT != nil {
		predicates = append(predicates, user.IDGT(*i.IDGT))
	}
	if i.IDGTE != nil {
		predicates = append(predicates, user.IDGTE(*i.IDGTE))
	}
	if i.IDLT != nil {
		predicates = append(predicates, user.IDLT(*i.IDLT))
	}
	if i.IDLTE != nil {
		predicates = append(predicates, user.IDLTE(*i.IDLTE))
	}
	if i.Age != nil {
		predicates = append(predicates, user.AgeEQ(*i.Age))
	}
	if i.AgeNEQ != nil {
		predicates = append(predicates, user.AgeNEQ(*i.AgeNEQ))
	}
	if len(i.AgeIn) > 0 {
		predicates = append(predicates, user.AgeIn(i.AgeIn...))
	}
	if len(i.AgeNotIn) > 0 {
		predicates = append(predicates, user.AgeNotIn(i.AgeNotIn...))
	}
	if i.AgeGT != nil {
		predicates = append(predicates, user.AgeGT(*i.AgeGT))
	}
	if i.AgeGTE != nil {
		predicates = append(predicates, user.AgeGTE(*i.AgeGTE))
	}
	if i.AgeLT != nil {
		predicates = append(predicates, user.AgeLT(*i.AgeLT))
	}
	if i.AgeLTE != nil {
		predicates = append(predicates, user.AgeLTE(*i.AgeLTE))
	}
	if i.AgeIsNil {
		predicates = append(predicates, user.AgeIsNil())
	}
	if i.AgeNotNil {
		predicates = append(predicates, user.AgeNotNil())
	}
	if i.CreateAt != nil {
		predicates = append(predicates, user.CreateAtEQ(*i.CreateAt))
	}
	if i.CreateAtNEQ != nil {
		predicates = append(predicates, user.CreateAtNEQ(*i.CreateAtNEQ))
	}
	if len(i.CreateAtIn) > 0 {
		predicates = append(predicates, user.CreateAtIn(i.CreateAtIn...))
	}
	if len(i.CreateAtNotIn) > 0 {
		predicates = append(predicates, user.CreateAtNotIn(i.CreateAtNotIn...))
	}
	if i.CreateAtGT != nil {
		predicates = append(predicates, user.CreateAtGT(*i.CreateAtGT))
	}
	if i.CreateAtGTE != nil {
		predicates = append(predicates, user.CreateAtGTE(*i.CreateAtGTE))
	}
	if i.CreateAtLT != nil {
		predicates = append(predicates, user.CreateAtLT(*i.CreateAtLT))
	}
	if i.CreateAtLTE != nil {
		predicates = append(predicates, user.CreateAtLTE(*i.CreateAtLTE))
	}
	if i.LatestLoginAt != nil {
		predicates = append(predicates, user.LatestLoginAtEQ(*i.LatestLoginAt))
	}
	if i.LatestLoginAtNEQ != nil {
		predicates = append(predicates, user.LatestLoginAtNEQ(*i.LatestLoginAtNEQ))
	}
	if len(i.LatestLoginAtIn) > 0 {
		predicates = append(predicates, user.LatestLoginAtIn(i.LatestLoginAtIn...))
	}
	if len(i.LatestLoginAtNotIn) > 0 {
		predicates = append(predicates, user.LatestLoginAtNotIn(i.LatestLoginAtNotIn...))
	}
	if i.LatestLoginAtGT != nil {
		predicates = append(predicates, user.LatestLoginAtGT(*i.LatestLoginAtGT))
	}
	if i.LatestLoginAtGTE != nil {
		predicates = append(predicates, user.LatestLoginAtGTE(*i.LatestLoginAtGTE))
	}
	if i.LatestLoginAtLT != nil {
		predicates = append(predicates, user.LatestLoginAtLT(*i.LatestLoginAtLT))
	}
	if i.LatestLoginAtLTE != nil {
		predicates = append(predicates, user.LatestLoginAtLTE(*i.LatestLoginAtLTE))
	}

	if i.HasRecord != nil {
		p := user.HasRecord()
		if !*i.HasRecord {
			p = user.Not(p)
		}
		predicates = append(predicates, p)
	}
	if len(i.HasRecordWith) > 0 {
		with := make([]predicate.Record, 0, len(i.HasRecordWith))
		for _, w := range i.HasRecordWith {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'HasRecordWith'", err)
			}
			with = append(with, p)
		}
		predicates = append(predicates, user.HasRecordWith(with...))
	}
	switch len(predicates) {
	case 0:
		return nil, ErrEmptyUserWhereInput
	case 1:
		return predicates[0], nil
	default:
		return user.And(predicates...), nil
	}
}
