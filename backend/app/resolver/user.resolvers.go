package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.24

import (
	"backend/app/ent"
	firebase "backend/app/firebase_admin"
	"backend/app/graph"
	"context"
	"log"
	"time"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, idToken *string) (*ent.User, error) {
	firebaseClient, err := firebase.InitFirebaseClient()
	log.Print(*firebaseClient)
	if err != nil {
		log.Printf("failed firebase client init %T", err)
		return nil, err
	}
	token, err := firebaseClient.VerifyIDToken(ctx, *idToken)
	log.Print(token)
	if err != nil {
		log.Printf("failed firebase verify IDToken %s", err)
		return nil, err
	}
	client := ent.FromContext(ctx)
	userID := token.UID
	return client.Debug().User.Create().SetID(userID).Save(ctx)
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id *string) (*ent.User, error) {
	client := ent.FromContext(ctx)
	return client.Debug().User.UpdateOneID(*id).SetLatestLoginAt(time.Now()).Save(ctx)
}

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }