package firebase

import (
	"context"
	"log"

	firebase "firebase.google.com/go"
	"firebase.google.com/go/auth"
)

type firebaseClientInterface interface {
	VerifyIDToken(ctx context.Context, idToken string) (*auth.Token, error)
}

type firebaseClient struct {
	*auth.Client
}


func InitFirebaseClient() (*firebaseClient, error){
	ctx := context.Background()
	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
		return nil, err
	}
	// Access auth service from the default app
	client, err := app.Auth(ctx)
	if err != nil {
		log.Fatalf("error getting Auth client: %v\n", err)
		return nil, err
	}
	return &firebaseClient{client}, nil
}

