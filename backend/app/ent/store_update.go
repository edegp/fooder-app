// Code generated by ent, DO NOT EDIT.

package ent

import (
	"backend/app/ent/predicate"
	"backend/app/ent/record"
	"backend/app/ent/store"
	"context"
	"errors"
	"fmt"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/dialect/sql/sqljson"
	"entgo.io/ent/schema/field"
)

// StoreUpdate is the builder for updating Store entities.
type StoreUpdate struct {
	config
	hooks    []Hook
	mutation *StoreMutation
}

// Where appends a list predicates to the StoreUpdate builder.
func (su *StoreUpdate) Where(ps ...predicate.Store) *StoreUpdate {
	su.mutation.Where(ps...)
	return su
}

// SetName sets the "name" field.
func (su *StoreUpdate) SetName(s string) *StoreUpdate {
	su.mutation.SetName(s)
	return su
}

// SetCategoryID sets the "category_id" field.
func (su *StoreUpdate) SetCategoryID(i int) *StoreUpdate {
	su.mutation.ResetCategoryID()
	su.mutation.SetCategoryID(i)
	return su
}

// AddCategoryID adds i to the "category_id" field.
func (su *StoreUpdate) AddCategoryID(i int) *StoreUpdate {
	su.mutation.AddCategoryID(i)
	return su
}

// SetSubCategoryID sets the "sub_category_id" field.
func (su *StoreUpdate) SetSubCategoryID(i int) *StoreUpdate {
	su.mutation.ResetSubCategoryID()
	su.mutation.SetSubCategoryID(i)
	return su
}

// AddSubCategoryID adds i to the "sub_category_id" field.
func (su *StoreUpdate) AddSubCategoryID(i int) *StoreUpdate {
	su.mutation.AddSubCategoryID(i)
	return su
}

// SetPrice sets the "price" field.
func (su *StoreUpdate) SetPrice(i int) *StoreUpdate {
	su.mutation.ResetPrice()
	su.mutation.SetPrice(i)
	return su
}

// AddPrice adds i to the "price" field.
func (su *StoreUpdate) AddPrice(i int) *StoreUpdate {
	su.mutation.AddPrice(i)
	return su
}

// SetPayments sets the "payments" field.
func (su *StoreUpdate) SetPayments(s []string) *StoreUpdate {
	su.mutation.SetPayments(s)
	return su
}

// AppendPayments appends s to the "payments" field.
func (su *StoreUpdate) AppendPayments(s []string) *StoreUpdate {
	su.mutation.AppendPayments(s)
	return su
}

// SetScale sets the "scale" field.
func (su *StoreUpdate) SetScale(i int) *StoreUpdate {
	su.mutation.ResetScale()
	su.mutation.SetScale(i)
	return su
}

// AddScale adds i to the "scale" field.
func (su *StoreUpdate) AddScale(i int) *StoreUpdate {
	su.mutation.AddScale(i)
	return su
}

// SetAddress sets the "address" field.
func (su *StoreUpdate) SetAddress(s string) *StoreUpdate {
	su.mutation.SetAddress(s)
	return su
}

// SetRating sets the "rating" field.
func (su *StoreUpdate) SetRating(i int) *StoreUpdate {
	su.mutation.ResetRating()
	su.mutation.SetRating(i)
	return su
}

// AddRating adds i to the "rating" field.
func (su *StoreUpdate) AddRating(i int) *StoreUpdate {
	su.mutation.AddRating(i)
	return su
}

// SetNearbyStores sets the "nearby_stores" field.
func (su *StoreUpdate) SetNearbyStores(s []string) *StoreUpdate {
	su.mutation.SetNearbyStores(s)
	return su
}

// AppendNearbyStores appends s to the "nearby_stores" field.
func (su *StoreUpdate) AppendNearbyStores(s []string) *StoreUpdate {
	su.mutation.AppendNearbyStores(s)
	return su
}

// SetBusinessHours sets the "business_hours" field.
func (su *StoreUpdate) SetBusinessHours(i []int) *StoreUpdate {
	su.mutation.SetBusinessHours(i)
	return su
}

// AppendBusinessHours appends i to the "business_hours" field.
func (su *StoreUpdate) AppendBusinessHours(i []int) *StoreUpdate {
	su.mutation.AppendBusinessHours(i)
	return su
}

// SetTypes sets the "types" field.
func (su *StoreUpdate) SetTypes(s []string) *StoreUpdate {
	su.mutation.SetTypes(s)
	return su
}

// AppendTypes appends s to the "types" field.
func (su *StoreUpdate) AppendTypes(s []string) *StoreUpdate {
	su.mutation.AppendTypes(s)
	return su
}

// AddRecordIDs adds the "record" edge to the Record entity by IDs.
func (su *StoreUpdate) AddRecordIDs(ids ...string) *StoreUpdate {
	su.mutation.AddRecordIDs(ids...)
	return su
}

// AddRecord adds the "record" edges to the Record entity.
func (su *StoreUpdate) AddRecord(r ...*Record) *StoreUpdate {
	ids := make([]string, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return su.AddRecordIDs(ids...)
}

// Mutation returns the StoreMutation object of the builder.
func (su *StoreUpdate) Mutation() *StoreMutation {
	return su.mutation
}

// ClearRecord clears all "record" edges to the Record entity.
func (su *StoreUpdate) ClearRecord() *StoreUpdate {
	su.mutation.ClearRecord()
	return su
}

// RemoveRecordIDs removes the "record" edge to Record entities by IDs.
func (su *StoreUpdate) RemoveRecordIDs(ids ...string) *StoreUpdate {
	su.mutation.RemoveRecordIDs(ids...)
	return su
}

// RemoveRecord removes "record" edges to Record entities.
func (su *StoreUpdate) RemoveRecord(r ...*Record) *StoreUpdate {
	ids := make([]string, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return su.RemoveRecordIDs(ids...)
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (su *StoreUpdate) Save(ctx context.Context) (int, error) {
	return withHooks[int, StoreMutation](ctx, su.sqlSave, su.mutation, su.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (su *StoreUpdate) SaveX(ctx context.Context) int {
	affected, err := su.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (su *StoreUpdate) Exec(ctx context.Context) error {
	_, err := su.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (su *StoreUpdate) ExecX(ctx context.Context) {
	if err := su.Exec(ctx); err != nil {
		panic(err)
	}
}

func (su *StoreUpdate) sqlSave(ctx context.Context) (n int, err error) {
	_spec := sqlgraph.NewUpdateSpec(store.Table, store.Columns, sqlgraph.NewFieldSpec(store.FieldID, field.TypeString))
	if ps := su.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := su.mutation.Name(); ok {
		_spec.SetField(store.FieldName, field.TypeString, value)
	}
	if value, ok := su.mutation.CategoryID(); ok {
		_spec.SetField(store.FieldCategoryID, field.TypeInt, value)
	}
	if value, ok := su.mutation.AddedCategoryID(); ok {
		_spec.AddField(store.FieldCategoryID, field.TypeInt, value)
	}
	if value, ok := su.mutation.SubCategoryID(); ok {
		_spec.SetField(store.FieldSubCategoryID, field.TypeInt, value)
	}
	if value, ok := su.mutation.AddedSubCategoryID(); ok {
		_spec.AddField(store.FieldSubCategoryID, field.TypeInt, value)
	}
	if value, ok := su.mutation.Price(); ok {
		_spec.SetField(store.FieldPrice, field.TypeInt, value)
	}
	if value, ok := su.mutation.AddedPrice(); ok {
		_spec.AddField(store.FieldPrice, field.TypeInt, value)
	}
	if value, ok := su.mutation.Payments(); ok {
		_spec.SetField(store.FieldPayments, field.TypeJSON, value)
	}
	if value, ok := su.mutation.AppendedPayments(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldPayments, value)
		})
	}
	if value, ok := su.mutation.Scale(); ok {
		_spec.SetField(store.FieldScale, field.TypeInt, value)
	}
	if value, ok := su.mutation.AddedScale(); ok {
		_spec.AddField(store.FieldScale, field.TypeInt, value)
	}
	if value, ok := su.mutation.Address(); ok {
		_spec.SetField(store.FieldAddress, field.TypeString, value)
	}
	if value, ok := su.mutation.Rating(); ok {
		_spec.SetField(store.FieldRating, field.TypeInt, value)
	}
	if value, ok := su.mutation.AddedRating(); ok {
		_spec.AddField(store.FieldRating, field.TypeInt, value)
	}
	if value, ok := su.mutation.NearbyStores(); ok {
		_spec.SetField(store.FieldNearbyStores, field.TypeJSON, value)
	}
	if value, ok := su.mutation.AppendedNearbyStores(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldNearbyStores, value)
		})
	}
	if value, ok := su.mutation.BusinessHours(); ok {
		_spec.SetField(store.FieldBusinessHours, field.TypeJSON, value)
	}
	if value, ok := su.mutation.AppendedBusinessHours(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldBusinessHours, value)
		})
	}
	if value, ok := su.mutation.Types(); ok {
		_spec.SetField(store.FieldTypes, field.TypeJSON, value)
	}
	if value, ok := su.mutation.AppendedTypes(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldTypes, value)
		})
	}
	if su.mutation.RecordCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.RemovedRecordIDs(); len(nodes) > 0 && !su.mutation.RecordCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := su.mutation.RecordIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, su.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{store.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	su.mutation.done = true
	return n, nil
}

// StoreUpdateOne is the builder for updating a single Store entity.
type StoreUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *StoreMutation
}

// SetName sets the "name" field.
func (suo *StoreUpdateOne) SetName(s string) *StoreUpdateOne {
	suo.mutation.SetName(s)
	return suo
}

// SetCategoryID sets the "category_id" field.
func (suo *StoreUpdateOne) SetCategoryID(i int) *StoreUpdateOne {
	suo.mutation.ResetCategoryID()
	suo.mutation.SetCategoryID(i)
	return suo
}

// AddCategoryID adds i to the "category_id" field.
func (suo *StoreUpdateOne) AddCategoryID(i int) *StoreUpdateOne {
	suo.mutation.AddCategoryID(i)
	return suo
}

// SetSubCategoryID sets the "sub_category_id" field.
func (suo *StoreUpdateOne) SetSubCategoryID(i int) *StoreUpdateOne {
	suo.mutation.ResetSubCategoryID()
	suo.mutation.SetSubCategoryID(i)
	return suo
}

// AddSubCategoryID adds i to the "sub_category_id" field.
func (suo *StoreUpdateOne) AddSubCategoryID(i int) *StoreUpdateOne {
	suo.mutation.AddSubCategoryID(i)
	return suo
}

// SetPrice sets the "price" field.
func (suo *StoreUpdateOne) SetPrice(i int) *StoreUpdateOne {
	suo.mutation.ResetPrice()
	suo.mutation.SetPrice(i)
	return suo
}

// AddPrice adds i to the "price" field.
func (suo *StoreUpdateOne) AddPrice(i int) *StoreUpdateOne {
	suo.mutation.AddPrice(i)
	return suo
}

// SetPayments sets the "payments" field.
func (suo *StoreUpdateOne) SetPayments(s []string) *StoreUpdateOne {
	suo.mutation.SetPayments(s)
	return suo
}

// AppendPayments appends s to the "payments" field.
func (suo *StoreUpdateOne) AppendPayments(s []string) *StoreUpdateOne {
	suo.mutation.AppendPayments(s)
	return suo
}

// SetScale sets the "scale" field.
func (suo *StoreUpdateOne) SetScale(i int) *StoreUpdateOne {
	suo.mutation.ResetScale()
	suo.mutation.SetScale(i)
	return suo
}

// AddScale adds i to the "scale" field.
func (suo *StoreUpdateOne) AddScale(i int) *StoreUpdateOne {
	suo.mutation.AddScale(i)
	return suo
}

// SetAddress sets the "address" field.
func (suo *StoreUpdateOne) SetAddress(s string) *StoreUpdateOne {
	suo.mutation.SetAddress(s)
	return suo
}

// SetRating sets the "rating" field.
func (suo *StoreUpdateOne) SetRating(i int) *StoreUpdateOne {
	suo.mutation.ResetRating()
	suo.mutation.SetRating(i)
	return suo
}

// AddRating adds i to the "rating" field.
func (suo *StoreUpdateOne) AddRating(i int) *StoreUpdateOne {
	suo.mutation.AddRating(i)
	return suo
}

// SetNearbyStores sets the "nearby_stores" field.
func (suo *StoreUpdateOne) SetNearbyStores(s []string) *StoreUpdateOne {
	suo.mutation.SetNearbyStores(s)
	return suo
}

// AppendNearbyStores appends s to the "nearby_stores" field.
func (suo *StoreUpdateOne) AppendNearbyStores(s []string) *StoreUpdateOne {
	suo.mutation.AppendNearbyStores(s)
	return suo
}

// SetBusinessHours sets the "business_hours" field.
func (suo *StoreUpdateOne) SetBusinessHours(i []int) *StoreUpdateOne {
	suo.mutation.SetBusinessHours(i)
	return suo
}

// AppendBusinessHours appends i to the "business_hours" field.
func (suo *StoreUpdateOne) AppendBusinessHours(i []int) *StoreUpdateOne {
	suo.mutation.AppendBusinessHours(i)
	return suo
}

// SetTypes sets the "types" field.
func (suo *StoreUpdateOne) SetTypes(s []string) *StoreUpdateOne {
	suo.mutation.SetTypes(s)
	return suo
}

// AppendTypes appends s to the "types" field.
func (suo *StoreUpdateOne) AppendTypes(s []string) *StoreUpdateOne {
	suo.mutation.AppendTypes(s)
	return suo
}

// AddRecordIDs adds the "record" edge to the Record entity by IDs.
func (suo *StoreUpdateOne) AddRecordIDs(ids ...string) *StoreUpdateOne {
	suo.mutation.AddRecordIDs(ids...)
	return suo
}

// AddRecord adds the "record" edges to the Record entity.
func (suo *StoreUpdateOne) AddRecord(r ...*Record) *StoreUpdateOne {
	ids := make([]string, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return suo.AddRecordIDs(ids...)
}

// Mutation returns the StoreMutation object of the builder.
func (suo *StoreUpdateOne) Mutation() *StoreMutation {
	return suo.mutation
}

// ClearRecord clears all "record" edges to the Record entity.
func (suo *StoreUpdateOne) ClearRecord() *StoreUpdateOne {
	suo.mutation.ClearRecord()
	return suo
}

// RemoveRecordIDs removes the "record" edge to Record entities by IDs.
func (suo *StoreUpdateOne) RemoveRecordIDs(ids ...string) *StoreUpdateOne {
	suo.mutation.RemoveRecordIDs(ids...)
	return suo
}

// RemoveRecord removes "record" edges to Record entities.
func (suo *StoreUpdateOne) RemoveRecord(r ...*Record) *StoreUpdateOne {
	ids := make([]string, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return suo.RemoveRecordIDs(ids...)
}

// Where appends a list predicates to the StoreUpdate builder.
func (suo *StoreUpdateOne) Where(ps ...predicate.Store) *StoreUpdateOne {
	suo.mutation.Where(ps...)
	return suo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (suo *StoreUpdateOne) Select(field string, fields ...string) *StoreUpdateOne {
	suo.fields = append([]string{field}, fields...)
	return suo
}

// Save executes the query and returns the updated Store entity.
func (suo *StoreUpdateOne) Save(ctx context.Context) (*Store, error) {
	return withHooks[*Store, StoreMutation](ctx, suo.sqlSave, suo.mutation, suo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (suo *StoreUpdateOne) SaveX(ctx context.Context) *Store {
	node, err := suo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (suo *StoreUpdateOne) Exec(ctx context.Context) error {
	_, err := suo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (suo *StoreUpdateOne) ExecX(ctx context.Context) {
	if err := suo.Exec(ctx); err != nil {
		panic(err)
	}
}

func (suo *StoreUpdateOne) sqlSave(ctx context.Context) (_node *Store, err error) {
	_spec := sqlgraph.NewUpdateSpec(store.Table, store.Columns, sqlgraph.NewFieldSpec(store.FieldID, field.TypeString))
	id, ok := suo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "Store.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := suo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, store.FieldID)
		for _, f := range fields {
			if !store.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != store.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := suo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := suo.mutation.Name(); ok {
		_spec.SetField(store.FieldName, field.TypeString, value)
	}
	if value, ok := suo.mutation.CategoryID(); ok {
		_spec.SetField(store.FieldCategoryID, field.TypeInt, value)
	}
	if value, ok := suo.mutation.AddedCategoryID(); ok {
		_spec.AddField(store.FieldCategoryID, field.TypeInt, value)
	}
	if value, ok := suo.mutation.SubCategoryID(); ok {
		_spec.SetField(store.FieldSubCategoryID, field.TypeInt, value)
	}
	if value, ok := suo.mutation.AddedSubCategoryID(); ok {
		_spec.AddField(store.FieldSubCategoryID, field.TypeInt, value)
	}
	if value, ok := suo.mutation.Price(); ok {
		_spec.SetField(store.FieldPrice, field.TypeInt, value)
	}
	if value, ok := suo.mutation.AddedPrice(); ok {
		_spec.AddField(store.FieldPrice, field.TypeInt, value)
	}
	if value, ok := suo.mutation.Payments(); ok {
		_spec.SetField(store.FieldPayments, field.TypeJSON, value)
	}
	if value, ok := suo.mutation.AppendedPayments(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldPayments, value)
		})
	}
	if value, ok := suo.mutation.Scale(); ok {
		_spec.SetField(store.FieldScale, field.TypeInt, value)
	}
	if value, ok := suo.mutation.AddedScale(); ok {
		_spec.AddField(store.FieldScale, field.TypeInt, value)
	}
	if value, ok := suo.mutation.Address(); ok {
		_spec.SetField(store.FieldAddress, field.TypeString, value)
	}
	if value, ok := suo.mutation.Rating(); ok {
		_spec.SetField(store.FieldRating, field.TypeInt, value)
	}
	if value, ok := suo.mutation.AddedRating(); ok {
		_spec.AddField(store.FieldRating, field.TypeInt, value)
	}
	if value, ok := suo.mutation.NearbyStores(); ok {
		_spec.SetField(store.FieldNearbyStores, field.TypeJSON, value)
	}
	if value, ok := suo.mutation.AppendedNearbyStores(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldNearbyStores, value)
		})
	}
	if value, ok := suo.mutation.BusinessHours(); ok {
		_spec.SetField(store.FieldBusinessHours, field.TypeJSON, value)
	}
	if value, ok := suo.mutation.AppendedBusinessHours(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldBusinessHours, value)
		})
	}
	if value, ok := suo.mutation.Types(); ok {
		_spec.SetField(store.FieldTypes, field.TypeJSON, value)
	}
	if value, ok := suo.mutation.AppendedTypes(); ok {
		_spec.AddModifier(func(u *sql.UpdateBuilder) {
			sqljson.Append(u, store.FieldTypes, value)
		})
	}
	if suo.mutation.RecordCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.RemovedRecordIDs(); len(nodes) > 0 && !suo.mutation.RecordCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := suo.mutation.RecordIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   store.RecordTable,
			Columns: []string{store.RecordColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: &sqlgraph.FieldSpec{
					Type:   field.TypeString,
					Column: record.FieldID,
				},
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &Store{config: suo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, suo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{store.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	suo.mutation.done = true
	return _node, nil
}