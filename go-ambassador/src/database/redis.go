package database

import (
	"context"

	"github.com/redis/go-redis/v9"
)

var Cache *redis.Client
var CacheChannel chan string

func SetupRedis() {
	Cache = redis.NewClient(&redis.Options{
		Addr:     "redis:6379",
		Password: "",
		DB:       0,
	})
}

func SetupCacheChannel() {
	CacheChannel = make(chan string)
	go func(ch chan string) {
		for {
			Cache.Del(context.Background(), <-ch)
		}
	}(CacheChannel)
}

func ClearCache(keys ...string) {
	for _, key := range keys {
		CacheChannel <- key
	}
}
