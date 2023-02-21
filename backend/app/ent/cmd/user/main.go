package main

import (
	"backend/app/ent"
	"context"
	"errors"
	"log"
	"net/http"

	"github.com/go-sql-driver/mysql"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
   e := echo.New()

   var entOptions []ent.Option
   entOptions = append(entOptions, ent.Debug())

   mc := mysql.Config{
      User:                 "root",
      Passwd:               "root",
      Net:                  "tcp",
      Addr:                 "localhost" + ":" + "3307",
      DBName:               "golang_ent_gqlgen",
      AllowNativePasswords: true,
      ParseTime:            true,
   }
   client, err := ent.Open("mysql", mc.FormatDSN(), entOptions...)
   if err != nil {
      log.Fatalf("Error: mysql client: %v\n", err)
   }
   defer client.Close()
   // Run the migration here
   if err := client.Schema.Create(context.Background()); !errors.Is(err, nil) {
      log.Fatalf("Error: failed creating schema resources %v\n", err)
   }

   e.Use(middleware.Logger())
   e.Use(middleware.Recover())
   e.GET("/", func(c echo.Context) error {
      return c.String(http.StatusOK, "Welcome!")
   })

   e.Logger.Fatal(e.Start(":8080"))
}
