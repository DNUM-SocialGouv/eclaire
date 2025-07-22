#!/bin/bash
# Add allowlist config via JAVA_OPTS
export OPENSEARCH_JAVA_OPTS="$OPENSEARCH_JAVA_OPTS -Dreindex.remote.allowlist=eclaire-api-1994.elasticsearch.a.osc-fr1.scalingo-dbs.com:32098"

# Run OpenSearch using the original entrypoint from the image
exec /usr/local/bin/docker-entrypoint.sh "$@"