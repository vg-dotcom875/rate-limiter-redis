### Redis Key Design

* Each request is tracked using a Redis key of the form:
* rate:{ip_address}:{api_route}
* The value is an integer representing request count.

## Expiration Handling
* TTL is set using EXPIRE only when the key is first created.
* Redis automatically deletes the key after window_seconds.
* This resets the rate-limit window automatically.

## Assumptions
* Single Redis instance
* Fixed window rate limiting (not sliding window)
* No HTTP server involved
* Proof of concept only