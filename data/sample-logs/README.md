# Sample Logs

This folder contains stable demo logs for IncidentPilot.

## Current Scenario

`db-connection-pool-exhaustion.log`

The checkout API begins returning HTTP 500 errors because database connections cannot be acquired from the pool. The file includes useful evidence as well as unrelated service logs to make the sample more realistic.

Expected root cause:

```text
Database connection pool exhaustion
```

Expected affected services:

```text
checkout-api
postgres-primary
```

