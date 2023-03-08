// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/app/ent/predicate"
	"backend/app/ent/record"
	"backend/app/ent/user"
	"context"
	"errors"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
)

// RecordUpdate is the builder for updating Record entities.
type RecordUpdate struct {
	config
	hooks    []Hook
	mutation *RecordMutation
}

// Where appends a list predicates to the RecordUpdate builder.
func (ru *RecordUpdate) Where(ps ...predicate.Record) *RecordUpdate {
	ru.mutation.Where(ps...)
	return ru
}

// SetUserID sets the "user_id" field.
func (ru *RecordUpdate) SetUserID(s string) *RecordUpdate {
	ru.mutation.SetUserID(s)
	return ru
}

// SetPlaceID sets the "place_id" field.
func (ru *RecordUpdate) SetPlaceID(s string) *RecordUpdate {
	ru.mutation.SetPlaceID(s)
	return ru
}

// SetVisitAt sets the "visit_at" field.
func (ru *RecordUpdate) SetVisitAt(t time.Time) *RecordUpdate {
	ru.mutation.SetVisitAt(t)
	return ru
}

// SetNillableVisitAt sets the "visit_at" field if the given value is not nil.
func (ru *RecordUpdate) SetNillableVisitAt(t *time.Time) *RecordUpdate {
	if t != nil {
		ru.SetVisitAt(*t)
	}
	return ru
}

// SetPaymentAmount sets the "payment_amount" field.
func (ru *RecordUpdate) SetPaymentAmount(i int) *RecordUpdate {
	ru.mutation.ResetPaymentAmount()
	ru.mutation.SetPaymentAmount(i)
	return ru
}

// SetNillablePaymentAmount sets the "payment_amount" field if the given value is not nil.
func (ru *RecordUpdate) SetNillablePaymentAmount(i *int) *RecordUpdate {
	if i != nil {
		ru.SetPaymentAmount(*i)
	}
	return ru
}

// AddPaymentAmount adds i to the "payment_amount" field.
func (ru *RecordUpdate) AddPaymentAmount(i int) *RecordUpdate {
	ru.mutation.AddPaymentAmount(i)
	return ru
}

// ClearPaymentAmount clears the value of the "payment_amount" field.
func (ru *RecordUpdate) ClearPaymentAmount() *RecordUpdate {
	ru.mutation.ClearPaymentAmount()
	return ru
}

// SetLeaveAt sets the "leave_at" field.
func (ru *RecordUpdate) SetLeaveAt(i int) *RecordUpdate {
	ru.mutation.ResetLeaveAt()
	ru.mutation.SetLeaveAt(i)
	return ru
}

// SetNillableLeaveAt sets the "leave_at" field if the given value is not nil.
func (ru *RecordUpdate) SetNillableLeaveAt(i *int) *RecordUpdate {
	if i != nil {
		ru.SetLeaveAt(*i)
	}
	return ru
}

// AddLeaveAt adds i to the "leave_at" field.
func (ru *RecordUpdate) AddLeaveAt(i int) *RecordUpdate {
	ru.mutation.AddLeaveAt(i)
	return ru
}

// ClearLeaveAt clears the value of the "leave_at" field.
func (ru *RecordUpdate) ClearLeaveAt() *RecordUpdate {
	ru.mutation.ClearLeaveAt()
	return ru
}

// SetEvaluation sets the "evaluation" field.
func (ru *RecordUpdate) SetEvaluation(i int) *RecordUpdate {
	ru.mutation.ResetEvaluation()
	ru.mutation.SetEvaluation(i)
	return ru
}

// SetNillableEvaluation sets the "evaluation" field if the given value is not nil.
func (ru *RecordUpdate) SetNillableEvaluation(i *int) *RecordUpdate {
	if i != nil {
		ru.SetEvaluation(*i)
	}
	return ru
}

// AddEvaluation adds i to the "evaluation" field.
func (ru *RecordUpdate) AddEvaluation(i int) *RecordUpdate {
	ru.mutation.AddEvaluation(i)
	return ru
}

// SetUser sets the "user" edge to the User entity.
func (ru *RecordUpdate) SetUser(u *User) *RecordUpdate {
	return ru.SetUserID(u.ID)
}

// Mutation returns the RecordMutation object of the builder.
func (ru *RecordUpdate) Mutation() *RecordMutation {
	return ru.mutation
}

// ClearUser clears the "user" edge to the User entity.
func (ru *RecordUpdate) ClearUser() *RecordUpdate {
	ru.mutation.ClearUser()
	return ru
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (ru *RecordUpdate) Save(ctx context.Context) (int, error) {
	return withHooks[int, RecordMutation](ctx, ru.sqlSave, ru.mutation, ru.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (ru *RecordUpdate) SaveX(ctx context.Context) int {
	affected, err := ru.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (ru *RecordUpdate) Exec(ctx context.Context) error {
	_, err := ru.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ru *RecordUpdate) ExecX(ctx context.Context) {
	if err := ru.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ru *RecordUpdate) check() error {
	if v, ok := ru.mutation.Evaluation(); ok {
		if err := record.EvaluationValidator(v); err != nil {
			return &ValidationError{Name: "evaluation", err: fmt.Errorf(`ent: validator failed for field "Record.evaluation": %w`, err)}
		}
	}
	if _, ok := ru.mutation.UserID(); ru.mutation.UserCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Record.user"`)
	}
	return nil
}

func (ru *RecordUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := ru.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(record.Table, record.Columns, sqlgraph.NewFieldSpec(record.FieldID, field.TypeString))
	if ps := ru.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ru.mutation.PlaceID(); ok {
		_spec.SetField(record.FieldPlaceID, field.TypeString, value)
	}
	if value, ok := ru.mutation.VisitAt(); ok {
		_spec.SetField(record.FieldVisitAt, field.TypeTime, value)
	}
	if value, ok := ru.mutation.PaymentAmount(); ok {
		_spec.SetField(record.FieldPaymentAmount, field.TypeInt, value)
	}
	if value, ok := ru.mutation.AddedPaymentAmount(); ok {
		_spec.AddField(record.FieldPaymentAmount, field.TypeInt, value)
	}
	if ru.mutation.PaymentAmountCleared() {
		_spec.ClearField(record.FieldPaymentAmount, field.TypeInt)
	}
	if value, ok := ru.mutation.LeaveAt(); ok {
		_spec.SetField(record.FieldLeaveAt, field.TypeInt, value)
	}
	if value, ok := ru.mutation.AddedLeaveAt(); ok {
		_spec.AddField(record.FieldLeaveAt, field.TypeInt, value)
	}
	if ru.mutation.LeaveAtCleared() {
		_spec.ClearField(record.FieldLeaveAt, field.TypeInt)
	}
	if value, ok := ru.mutation.Evaluation(); ok {
		_spec.SetField(record.FieldEvaluation, field.TypeInt, value)
	}
	if value, ok := ru.mutation.AddedEvaluation(); ok {
		_spec.AddField(record.FieldEvaluation, field.TypeInt, value)
	}
	if ru.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   record.UserTable,
			Columns: []string{record.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ru.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   record.UserTable,
			Columns: []string{record.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, ru.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{record.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	ru.mutation.done = true
	return n, nil
}

// RecordUpdateOne is the builder for updating a single Record entity.
type RecordUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *RecordMutation
}

// SetUserID sets the "user_id" field.
func (ruo *RecordUpdateOne) SetUserID(s string) *RecordUpdateOne {
	ruo.mutation.SetUserID(s)
	return ruo
}

// SetPlaceID sets the "place_id" field.
func (ruo *RecordUpdateOne) SetPlaceID(s string) *RecordUpdateOne {
	ruo.mutation.SetPlaceID(s)
	return ruo
}

// SetVisitAt sets the "visit_at" field.
func (ruo *RecordUpdateOne) SetVisitAt(t time.Time) *RecordUpdateOne {
	ruo.mutation.SetVisitAt(t)
	return ruo
}

// SetNillableVisitAt sets the "visit_at" field if the given value is not nil.
func (ruo *RecordUpdateOne) SetNillableVisitAt(t *time.Time) *RecordUpdateOne {
	if t != nil {
		ruo.SetVisitAt(*t)
	}
	return ruo
}

// SetPaymentAmount sets the "payment_amount" field.
func (ruo *RecordUpdateOne) SetPaymentAmount(i int) *RecordUpdateOne {
	ruo.mutation.ResetPaymentAmount()
	ruo.mutation.SetPaymentAmount(i)
	return ruo
}

// SetNillablePaymentAmount sets the "payment_amount" field if the given value is not nil.
func (ruo *RecordUpdateOne) SetNillablePaymentAmount(i *int) *RecordUpdateOne {
	if i != nil {
		ruo.SetPaymentAmount(*i)
	}
	return ruo
}

// AddPaymentAmount adds i to the "payment_amount" field.
func (ruo *RecordUpdateOne) AddPaymentAmount(i int) *RecordUpdateOne {
	ruo.mutation.AddPaymentAmount(i)
	return ruo
}

// ClearPaymentAmount clears the value of the "payment_amount" field.
func (ruo *RecordUpdateOne) ClearPaymentAmount() *RecordUpdateOne {
	ruo.mutation.ClearPaymentAmount()
	return ruo
}

// SetLeaveAt sets the "leave_at" field.
func (ruo *RecordUpdateOne) SetLeaveAt(i int) *RecordUpdateOne {
	ruo.mutation.ResetLeaveAt()
	ruo.mutation.SetLeaveAt(i)
	return ruo
}

// SetNillableLeaveAt sets the "leave_at" field if the given value is not nil.
func (ruo *RecordUpdateOne) SetNillableLeaveAt(i *int) *RecordUpdateOne {
	if i != nil {
		ruo.SetLeaveAt(*i)
	}
	return ruo
}

// AddLeaveAt adds i to the "leave_at" field.
func (ruo *RecordUpdateOne) AddLeaveAt(i int) *RecordUpdateOne {
	ruo.mutation.AddLeaveAt(i)
	return ruo
}

// ClearLeaveAt clears the value of the "leave_at" field.
func (ruo *RecordUpdateOne) ClearLeaveAt() *RecordUpdateOne {
	ruo.mutation.ClearLeaveAt()
	return ruo
}

// SetEvaluation sets the "evaluation" field.
func (ruo *RecordUpdateOne) SetEvaluation(i int) *RecordUpdateOne {
	ruo.mutation.ResetEvaluation()
	ruo.mutation.SetEvaluation(i)
	return ruo
}

// SetNillableEvaluation sets the "evaluation" field if the given value is not nil.
func (ruo *RecordUpdateOne) SetNillableEvaluation(i *int) *RecordUpdateOne {
	if i != nil {
		ruo.SetEvaluation(*i)
	}
	return ruo
}

// AddEvaluation adds i to the "evaluation" field.
func (ruo *RecordUpdateOne) AddEvaluation(i int) *RecordUpdateOne {
	ruo.mutation.AddEvaluation(i)
	return ruo
}

// SetUser sets the "user" edge to the User entity.
func (ruo *RecordUpdateOne) SetUser(u *User) *RecordUpdateOne {
	return ruo.SetUserID(u.ID)
}

// Mutation returns the RecordMutation object of the builder.
func (ruo *RecordUpdateOne) Mutation() *RecordMutation {
	return ruo.mutation
}

// ClearUser clears the "user" edge to the User entity.
func (ruo *RecordUpdateOne) ClearUser() *RecordUpdateOne {
	ruo.mutation.ClearUser()
	return ruo
}

// Where appends a list predicates to the RecordUpdate builder.
func (ruo *RecordUpdateOne) Where(ps ...predicate.Record) *RecordUpdateOne {
	ruo.mutation.Where(ps...)
	return ruo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (ruo *RecordUpdateOne) Select(field string, fields ...string) *RecordUpdateOne {
	ruo.fields = append([]string{field}, fields...)
	return ruo
}

// Save executes the query and returns the updated Record entity.
func (ruo *RecordUpdateOne) Save(ctx context.Context) (*Record, error) {
	return withHooks[*Record, RecordMutation](ctx, ruo.sqlSave, ruo.mutation, ruo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (ruo *RecordUpdateOne) SaveX(ctx context.Context) *Record {
	node, err := ruo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (ruo *RecordUpdateOne) Exec(ctx context.Context) error {
	_, err := ruo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ruo *RecordUpdateOne) ExecX(ctx context.Context) {
	if err := ruo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ruo *RecordUpdateOne) check() error {
	if v, ok := ruo.mutation.Evaluation(); ok {
		if err := record.EvaluationValidator(v); err != nil {
			return &ValidationError{Name: "evaluation", err: fmt.Errorf(`ent: validator failed for field "Record.evaluation": %w`, err)}
		}
	}
	if _, ok := ruo.mutation.UserID(); ruo.mutation.UserCleared() && !ok {
		return errors.New(`ent: clearing a required unique edge "Record.user"`)
	}
	return nil
}

func (ruo *RecordUpdateOne) sqlSave(ctx context.Context) (_node *Record, err error) {
	if err := ruo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(record.Table, record.Columns, sqlgraph.NewFieldSpec(record.FieldID, field.TypeString))
	id, ok := ruo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Record.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := ruo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, record.FieldID)
		for _, f := range fields {
			if !record.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != record.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := ruo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := ruo.mutation.PlaceID(); ok {
		_spec.SetField(record.FieldPlaceID, field.TypeString, value)
	}
	if value, ok := ruo.mutation.VisitAt(); ok {
		_spec.SetField(record.FieldVisitAt, field.TypeTime, value)
	}
	if value, ok := ruo.mutation.PaymentAmount(); ok {
		_spec.SetField(record.FieldPaymentAmount, field.TypeInt, value)
	}
	if value, ok := ruo.mutation.AddedPaymentAmount(); ok {
		_spec.AddField(record.FieldPaymentAmount, field.TypeInt, value)
	}
	if ruo.mutation.PaymentAmountCleared() {
		_spec.ClearField(record.FieldPaymentAmount, field.TypeInt)
	}
	if value, ok := ruo.mutation.LeaveAt(); ok {
		_spec.SetField(record.FieldLeaveAt, field.TypeInt, value)
	}
	if value, ok := ruo.mutation.AddedLeaveAt(); ok {
		_spec.AddField(record.FieldLeaveAt, field.TypeInt, value)
	}
	if ruo.mutation.LeaveAtCleared() {
		_spec.ClearField(record.FieldLeaveAt, field.TypeInt)
	}
	if value, ok := ruo.mutation.Evaluation(); ok {
		_spec.SetField(record.FieldEvaluation, field.TypeInt, value)
	}
	if value, ok := ruo.mutation.AddedEvaluation(); ok {
		_spec.AddField(record.FieldEvaluation, field.TypeInt, value)
	}
	if ruo.mutation.UserCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   record.UserTable,
			Columns: []string{record.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: user.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := ruo.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   record.UserTable,
			Columns: []string{record.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: user.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Record{config: ruo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, ruo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{record.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	ruo.mutation.done = true
	return _node, nil
}
