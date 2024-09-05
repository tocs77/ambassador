package main

import (
	"ambassador/src/database"
	"time"

	"github.com/gofiber/fiber/v2"
)

func main() {
	time.Sleep(time.Second * 2)
	database.Connect()
	database.AutoMigrate()

	app := fiber.New()
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})
	app.Listen(":3000")
}
