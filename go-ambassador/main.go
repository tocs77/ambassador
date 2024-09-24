package main

import (
	"ambassador/src/database"
	"ambassador/src/migration"
	"ambassador/src/routes"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v79"
)

func main() {
	time.Sleep(time.Second * 2)
	database.Connect()
	migration.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChannel()
	stripe.Key = os.Getenv("stripeKey")

	app := fiber.New()
	// app.Use(cors.New(cors.Config{
	// 	AllowCredentials: true}))
	routes.Setup(app)
	app.Listen(":3000")
}
