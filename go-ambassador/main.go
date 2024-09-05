package main

import (
	"ambassador/src/database"
	"ambassador/src/routes"
	"time"

	"github.com/gofiber/fiber/v2"
)

func main() {
	time.Sleep(time.Second * 2)
	database.Connect()
	database.AutoMigrate()

	app := fiber.New()
	// app.Use(cors.New(cors.Config{
	// 	AllowCredentials: true}))
	routes.Setup(app)
	app.Listen(":3000")
}
