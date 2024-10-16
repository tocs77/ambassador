package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"

	"github.com/redis/go-redis/v9"
)

func main() {

	database.Connect()
	database.SetupRedis()
	ctx := context.Background()
	database.Cache.Del(ctx, "rankings")

	var users []models.User
	database.DB.Find(&users, models.User{IsAmbassador: true})

	for _, user := range users {
		ambassador := models.Ambassador(user)
		ambassador.CalculateRevenue()

		database.Cache.ZAdd(ctx, "rankings", redis.Z{
			Score:  float64(*ambassador.Revenue),
			Member: models.Name(&user),
		})
	}

}
