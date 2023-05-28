// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/app/ent/predicate"
	"backend/app/ent/record"
	"backend/app/ent/store"
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

	// "store" edge predicates.
	HasStore     *bool              `json:"hasStore,omitempty"`
	HasStoreWith []*StoreWhereInput `json:"hasStoreWith,omitempty"`
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
	if i.HasStore != nil {
		p := record.HasStore()
		if !*i.HasStore {
			p = record.Not(p)
		}
		predicates = append(predicates, p)
	}
	if len(i.HasStoreWith) > 0 {
		with := make([]predicate.Store, 0, len(i.HasStoreWith))
		for _, w := range i.HasStoreWith {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'HasStoreWith'", err)
			}
			with = append(with, p)
		}
		predicates = append(predicates, record.HasStoreWith(with...))
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

// StoreWhereInput represents a where input for filtering Store queries.
type StoreWhereInput struct {
	Predicates []predicate.Store  `json:"-"`
	Not        *StoreWhereInput   `json:"not,omitempty"`
	Or         []*StoreWhereInput `json:"or,omitempty"`
	And        []*StoreWhereInput `json:"and,omitempty"`

	// "id" field predicates.
	ID      *string  `json:"id,omitempty"`
	IDNEQ   *string  `json:"idNEQ,omitempty"`
	IDIn    []string `json:"idIn,omitempty"`
	IDNotIn []string `json:"idNotIn,omitempty"`
	IDGT    *string  `json:"idGT,omitempty"`
	IDGTE   *string  `json:"idGTE,omitempty"`
	IDLT    *string  `json:"idLT,omitempty"`
	IDLTE   *string  `json:"idLTE,omitempty"`

	// "name" field predicates.
	Name             *string  `json:"name,omitempty"`
	NameNEQ          *string  `json:"nameNEQ,omitempty"`
	NameIn           []string `json:"nameIn,omitempty"`
	NameNotIn        []string `json:"nameNotIn,omitempty"`
	NameGT           *string  `json:"nameGT,omitempty"`
	NameGTE          *string  `json:"nameGTE,omitempty"`
	NameLT           *string  `json:"nameLT,omitempty"`
	NameLTE          *string  `json:"nameLTE,omitempty"`
	NameContains     *string  `json:"nameContains,omitempty"`
	NameHasPrefix    *string  `json:"nameHasPrefix,omitempty"`
	NameHasSuffix    *string  `json:"nameHasSuffix,omitempty"`
	NameEqualFold    *string  `json:"nameEqualFold,omitempty"`
	NameContainsFold *string  `json:"nameContainsFold,omitempty"`

	// "category_id" field predicates.
	CategoryID      *int  `json:"categoryID,omitempty"`
	CategoryIDNEQ   *int  `json:"categoryIDNEQ,omitempty"`
	CategoryIDIn    []int `json:"categoryIDIn,omitempty"`
	CategoryIDNotIn []int `json:"categoryIDNotIn,omitempty"`
	CategoryIDGT    *int  `json:"categoryIDGT,omitempty"`
	CategoryIDGTE   *int  `json:"categoryIDGTE,omitempty"`
	CategoryIDLT    *int  `json:"categoryIDLT,omitempty"`
	CategoryIDLTE   *int  `json:"categoryIDLTE,omitempty"`

	// "sub_category_id" field predicates.
	SubCategoryID      *int  `json:"subCategoryID,omitempty"`
	SubCategoryIDNEQ   *int  `json:"subCategoryIDNEQ,omitempty"`
	SubCategoryIDIn    []int `json:"subCategoryIDIn,omitempty"`
	SubCategoryIDNotIn []int `json:"subCategoryIDNotIn,omitempty"`
	SubCategoryIDGT    *int  `json:"subCategoryIDGT,omitempty"`
	SubCategoryIDGTE   *int  `json:"subCategoryIDGTE,omitempty"`
	SubCategoryIDLT    *int  `json:"subCategoryIDLT,omitempty"`
	SubCategoryIDLTE   *int  `json:"subCategoryIDLTE,omitempty"`

	// "price" field predicates.
	Price      *int  `json:"price,omitempty"`
	PriceNEQ   *int  `json:"priceNEQ,omitempty"`
	PriceIn    []int `json:"priceIn,omitempty"`
	PriceNotIn []int `json:"priceNotIn,omitempty"`
	PriceGT    *int  `json:"priceGT,omitempty"`
	PriceGTE   *int  `json:"priceGTE,omitempty"`
	PriceLT    *int  `json:"priceLT,omitempty"`
	PriceLTE   *int  `json:"priceLTE,omitempty"`

	// "scale" field predicates.
	Scale      *int  `json:"scale,omitempty"`
	ScaleNEQ   *int  `json:"scaleNEQ,omitempty"`
	ScaleIn    []int `json:"scaleIn,omitempty"`
	ScaleNotIn []int `json:"scaleNotIn,omitempty"`
	ScaleGT    *int  `json:"scaleGT,omitempty"`
	ScaleGTE   *int  `json:"scaleGTE,omitempty"`
	ScaleLT    *int  `json:"scaleLT,omitempty"`
	ScaleLTE   *int  `json:"scaleLTE,omitempty"`

	// "address" field predicates.
	Address             *string  `json:"address,omitempty"`
	AddressNEQ          *string  `json:"addressNEQ,omitempty"`
	AddressIn           []string `json:"addressIn,omitempty"`
	AddressNotIn        []string `json:"addressNotIn,omitempty"`
	AddressGT           *string  `json:"addressGT,omitempty"`
	AddressGTE          *string  `json:"addressGTE,omitempty"`
	AddressLT           *string  `json:"addressLT,omitempty"`
	AddressLTE          *string  `json:"addressLTE,omitempty"`
	AddressContains     *string  `json:"addressContains,omitempty"`
	AddressHasPrefix    *string  `json:"addressHasPrefix,omitempty"`
	AddressHasSuffix    *string  `json:"addressHasSuffix,omitempty"`
	AddressEqualFold    *string  `json:"addressEqualFold,omitempty"`
	AddressContainsFold *string  `json:"addressContainsFold,omitempty"`

	// "rating" field predicates.
	Rating      *int  `json:"rating,omitempty"`
	RatingNEQ   *int  `json:"ratingNEQ,omitempty"`
	RatingIn    []int `json:"ratingIn,omitempty"`
	RatingNotIn []int `json:"ratingNotIn,omitempty"`
	RatingGT    *int  `json:"ratingGT,omitempty"`
	RatingGTE   *int  `json:"ratingGTE,omitempty"`
	RatingLT    *int  `json:"ratingLT,omitempty"`
	RatingLTE   *int  `json:"ratingLTE,omitempty"`

	// "record" edge predicates.
	HasRecord     *bool               `json:"hasRecord,omitempty"`
	HasRecordWith []*RecordWhereInput `json:"hasRecordWith,omitempty"`
}

// AddPredicates adds custom predicates to the where input to be used during the filtering phase.
func (i *StoreWhereInput) AddPredicates(predicates ...predicate.Store) {
	i.Predicates = append(i.Predicates, predicates...)
}

// Filter applies the StoreWhereInput filter on the StoreQuery builder.
func (i *StoreWhereInput) Filter(q *StoreQuery) (*StoreQuery, error) {
	if i == nil {
		return q, nil
	}
	p, err := i.P()
	if err != nil {
		if err == ErrEmptyStoreWhereInput {
			return q, nil
		}
		return nil, err
	}
	return q.Where(p), nil
}

// ErrEmptyStoreWhereInput is returned in case the StoreWhereInput is empty.
var ErrEmptyStoreWhereInput = errors.New("ent: empty predicate StoreWhereInput")

// P returns a predicate for filtering stores.
// An error is returned if the input is empty or invalid.
func (i *StoreWhereInput) P() (predicate.Store, error) {
	var predicates []predicate.Store
	if i.Not != nil {
		p, err := i.Not.P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'not'", err)
		}
		predicates = append(predicates, store.Not(p))
	}
	switch n := len(i.Or); {
	case n == 1:
		p, err := i.Or[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'or'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		or := make([]predicate.Store, 0, n)
		for _, w := range i.Or {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'or'", err)
			}
			or = append(or, p)
		}
		predicates = append(predicates, store.Or(or...))
	}
	switch n := len(i.And); {
	case n == 1:
		p, err := i.And[0].P()
		if err != nil {
			return nil, fmt.Errorf("%w: field 'and'", err)
		}
		predicates = append(predicates, p)
	case n > 1:
		and := make([]predicate.Store, 0, n)
		for _, w := range i.And {
			p, err := w.P()
			if err != nil {
				return nil, fmt.Errorf("%w: field 'and'", err)
			}
			and = append(and, p)
		}
		predicates = append(predicates, store.And(and...))
	}
	predicates = append(predicates, i.Predicates...)
	if i.ID != nil {
		predicates = append(predicates, store.IDEQ(*i.ID))
	}
	if i.IDNEQ != nil {
		predicates = append(predicates, store.IDNEQ(*i.IDNEQ))
	}
	if len(i.IDIn) > 0 {
		predicates = append(predicates, store.IDIn(i.IDIn...))
	}
	if len(i.IDNotIn) > 0 {
		predicates = append(predicates, store.IDNotIn(i.IDNotIn...))
	}
	if i.IDGT != nil {
		predicates = append(predicates, store.IDGT(*i.IDGT))
	}
	if i.IDGTE != nil {
		predicates = append(predicates, store.IDGTE(*i.IDGTE))
	}
	if i.IDLT != nil {
		predicates = append(predicates, store.IDLT(*i.IDLT))
	}
	if i.IDLTE != nil {
		predicates = append(predicates, store.IDLTE(*i.IDLTE))
	}
	if i.Name != nil {
		predicates = append(predicates, store.NameEQ(*i.Name))
	}
	if i.NameNEQ != nil {
		predicates = append(predicates, store.NameNEQ(*i.NameNEQ))
	}
	if len(i.NameIn) > 0 {
		predicates = append(predicates, store.NameIn(i.NameIn...))
	}
	if len(i.NameNotIn) > 0 {
		predicates = append(predicates, store.NameNotIn(i.NameNotIn...))
	}
	if i.NameGT != nil {
		predicates = append(predicates, store.NameGT(*i.NameGT))
	}
	if i.NameGTE != nil {
		predicates = append(predicates, store.NameGTE(*i.NameGTE))
	}
	if i.NameLT != nil {
		predicates = append(predicates, store.NameLT(*i.NameLT))
	}
	if i.NameLTE != nil {
		predicates = append(predicates, store.NameLTE(*i.NameLTE))
	}
	if i.NameContains != nil {
		predicates = append(predicates, store.NameContains(*i.NameContains))
	}
	if i.NameHasPrefix != nil {
		predicates = append(predicates, store.NameHasPrefix(*i.NameHasPrefix))
	}
	if i.NameHasSuffix != nil {
		predicates = append(predicates, store.NameHasSuffix(*i.NameHasSuffix))
	}
	if i.NameEqualFold != nil {
		predicates = append(predicates, store.NameEqualFold(*i.NameEqualFold))
	}
	if i.NameContainsFold != nil {
		predicates = append(predicates, store.NameContainsFold(*i.NameContainsFold))
	}
	if i.CategoryID != nil {
		predicates = append(predicates, store.CategoryIDEQ(*i.CategoryID))
	}
	if i.CategoryIDNEQ != nil {
		predicates = append(predicates, store.CategoryIDNEQ(*i.CategoryIDNEQ))
	}
	if len(i.CategoryIDIn) > 0 {
		predicates = append(predicates, store.CategoryIDIn(i.CategoryIDIn...))
	}
	if len(i.CategoryIDNotIn) > 0 {
		predicates = append(predicates, store.CategoryIDNotIn(i.CategoryIDNotIn...))
	}
	if i.CategoryIDGT != nil {
		predicates = append(predicates, store.CategoryIDGT(*i.CategoryIDGT))
	}
	if i.CategoryIDGTE != nil {
		predicates = append(predicates, store.CategoryIDGTE(*i.CategoryIDGTE))
	}
	if i.CategoryIDLT != nil {
		predicates = append(predicates, store.CategoryIDLT(*i.CategoryIDLT))
	}
	if i.CategoryIDLTE != nil {
		predicates = append(predicates, store.CategoryIDLTE(*i.CategoryIDLTE))
	}
	if i.SubCategoryID != nil {
		predicates = append(predicates, store.SubCategoryIDEQ(*i.SubCategoryID))
	}
	if i.SubCategoryIDNEQ != nil {
		predicates = append(predicates, store.SubCategoryIDNEQ(*i.SubCategoryIDNEQ))
	}
	if len(i.SubCategoryIDIn) > 0 {
		predicates = append(predicates, store.SubCategoryIDIn(i.SubCategoryIDIn...))
	}
	if len(i.SubCategoryIDNotIn) > 0 {
		predicates = append(predicates, store.SubCategoryIDNotIn(i.SubCategoryIDNotIn...))
	}
	if i.SubCategoryIDGT != nil {
		predicates = append(predicates, store.SubCategoryIDGT(*i.SubCategoryIDGT))
	}
	if i.SubCategoryIDGTE != nil {
		predicates = append(predicates, store.SubCategoryIDGTE(*i.SubCategoryIDGTE))
	}
	if i.SubCategoryIDLT != nil {
		predicates = append(predicates, store.SubCategoryIDLT(*i.SubCategoryIDLT))
	}
	if i.SubCategoryIDLTE != nil {
		predicates = append(predicates, store.SubCategoryIDLTE(*i.SubCategoryIDLTE))
	}
	if i.Price != nil {
		predicates = append(predicates, store.PriceEQ(*i.Price))
	}
	if i.PriceNEQ != nil {
		predicates = append(predicates, store.PriceNEQ(*i.PriceNEQ))
	}
	if len(i.PriceIn) > 0 {
		predicates = append(predicates, store.PriceIn(i.PriceIn...))
	}
	if len(i.PriceNotIn) > 0 {
		predicates = append(predicates, store.PriceNotIn(i.PriceNotIn...))
	}
	if i.PriceGT != nil {
		predicates = append(predicates, store.PriceGT(*i.PriceGT))
	}
	if i.PriceGTE != nil {
		predicates = append(predicates, store.PriceGTE(*i.PriceGTE))
	}
	if i.PriceLT != nil {
		predicates = append(predicates, store.PriceLT(*i.PriceLT))
	}
	if i.PriceLTE != nil {
		predicates = append(predicates, store.PriceLTE(*i.PriceLTE))
	}
	if i.Scale != nil {
		predicates = append(predicates, store.ScaleEQ(*i.Scale))
	}
	if i.ScaleNEQ != nil {
		predicates = append(predicates, store.ScaleNEQ(*i.ScaleNEQ))
	}
	if len(i.ScaleIn) > 0 {
		predicates = append(predicates, store.ScaleIn(i.ScaleIn...))
	}
	if len(i.ScaleNotIn) > 0 {
		predicates = append(predicates, store.ScaleNotIn(i.ScaleNotIn...))
	}
	if i.ScaleGT != nil {
		predicates = append(predicates, store.ScaleGT(*i.ScaleGT))
	}
	if i.ScaleGTE != nil {
		predicates = append(predicates, store.ScaleGTE(*i.ScaleGTE))
	}
	if i.ScaleLT != nil {
		predicates = append(predicates, store.ScaleLT(*i.ScaleLT))
	}
	if i.ScaleLTE != nil {
		predicates = append(predicates, store.ScaleLTE(*i.ScaleLTE))
	}
	if i.Address != nil {
		predicates = append(predicates, store.AddressEQ(*i.Address))
	}
	if i.AddressNEQ != nil {
		predicates = append(predicates, store.AddressNEQ(*i.AddressNEQ))
	}
	if len(i.AddressIn) > 0 {
		predicates = append(predicates, store.AddressIn(i.AddressIn...))
	}
	if len(i.AddressNotIn) > 0 {
		predicates = append(predicates, store.AddressNotIn(i.AddressNotIn...))
	}
	if i.AddressGT != nil {
		predicates = append(predicates, store.AddressGT(*i.AddressGT))
	}
	if i.AddressGTE != nil {
		predicates = append(predicates, store.AddressGTE(*i.AddressGTE))
	}
	if i.AddressLT != nil {
		predicates = append(predicates, store.AddressLT(*i.AddressLT))
	}
	if i.AddressLTE != nil {
		predicates = append(predicates, store.AddressLTE(*i.AddressLTE))
	}
	if i.AddressContains != nil {
		predicates = append(predicates, store.AddressContains(*i.AddressContains))
	}
	if i.AddressHasPrefix != nil {
		predicates = append(predicates, store.AddressHasPrefix(*i.AddressHasPrefix))
	}
	if i.AddressHasSuffix != nil {
		predicates = append(predicates, store.AddressHasSuffix(*i.AddressHasSuffix))
	}
	if i.AddressEqualFold != nil {
		predicates = append(predicates, store.AddressEqualFold(*i.AddressEqualFold))
	}
	if i.AddressContainsFold != nil {
		predicates = append(predicates, store.AddressContainsFold(*i.AddressContainsFold))
	}
	if i.Rating != nil {
		predicates = append(predicates, store.RatingEQ(*i.Rating))
	}
	if i.RatingNEQ != nil {
		predicates = append(predicates, store.RatingNEQ(*i.RatingNEQ))
	}
	if len(i.RatingIn) > 0 {
		predicates = append(predicates, store.RatingIn(i.RatingIn...))
	}
	if len(i.RatingNotIn) > 0 {
		predicates = append(predicates, store.RatingNotIn(i.RatingNotIn...))
	}
	if i.RatingGT != nil {
		predicates = append(predicates, store.RatingGT(*i.RatingGT))
	}
	if i.RatingGTE != nil {
		predicates = append(predicates, store.RatingGTE(*i.RatingGTE))
	}
	if i.RatingLT != nil {
		predicates = append(predicates, store.RatingLT(*i.RatingLT))
	}
	if i.RatingLTE != nil {
		predicates = append(predicates, store.RatingLTE(*i.RatingLTE))
	}

	if i.HasRecord != nil {
		p := store.HasRecord()
		if !*i.HasRecord {
			p = store.Not(p)
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
		predicates = append(predicates, store.HasRecordWith(with...))
	}
	switch len(predicates) {
	case 0:
		return nil, ErrEmptyStoreWhereInput
	case 1:
		return predicates[0], nil
	default:
		return store.And(predicates...), nil
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
