// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cloudsql

import (
	"backend/app/ent"
	"fmt"

	"log"

	"os"

	"entgo.io/ent/dialect/sql"
)

// connectUnixSocket initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL.
func ConnectUnixSocket(options ...ent.Option) (*ent.Client, error) {
	mustGetenv := func(k string) string {
		v := os.Getenv(k)
		if v == "" {
			log.Fatalf("Fatal Error in connect_unix.go: %s environment variable not set.", k)
		}
		return v
	}
	// Note: Saving credentials in environment variables is convenient, but not
	// secure - consider a more secure solution such as
	// Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
	// keep secrets safe.
	var (
		dbUser = mustGetenv("DB_USER")                  // e.g. 'my-db-user'
		dbPwd  = mustGetenv("DB_PASS")                  // e.g. 'my-db-password'
		dbName = mustGetenv("DB_NAME")                  // e.g. 'my-database'
		dbHost = mustGetenv("INSTANCE_CONNECTION_NAME") // e.g. '/cloudsql/project:region:instance'
	)

	dbURI := fmt.Sprintf("%s:%s@unix(/app/cloudsql/%s)/%s?parseTime=true&loc=Local",
		dbUser, dbPwd, dbHost, dbName)

	// dbPool is the pool of database connections.
	dbPool, err := sql.Open("mysql", dbURI)
	if err != nil {
		return nil, fmt.Errorf("sql.Open: %v", err)
	}
	return ent.NewClient(append(options, ent.Driver(dbPool))...), nil
}
