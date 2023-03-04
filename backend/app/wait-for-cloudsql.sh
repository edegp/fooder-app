#!/bin/bash
set -e

sleep 5

until curl -o /dev/null -f http://192.22.0.5:8090/readiness; do
	echo >&2 "mysql is unavailable"
	sleep 3
done

echo "mysql is available"

exec "$@"
