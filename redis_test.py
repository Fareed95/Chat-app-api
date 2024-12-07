import redis

try:
    r = redis.StrictRedis.from_url('my url')
    r.ping()
    print("Successfully connected to Redis!")
except redis.ConnectionError as e:
    print(f"Failed to connect to Redis: {e}")
