package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"math/rand"

	"github.com/go-faker/faker/v4"
)

func main() {
	database.Connect()

	// delete all order items
	database.DB.Exec("DELETE FROM order_items")
	database.DB.Exec("ALTER TABLE order_items AUTO_INCREMENT = 1")

	// delete all orders
	database.DB.Exec("DELETE FROM orders")
	database.DB.Exec("ALTER TABLE orders AUTO_INCREMENT = 1")

	for i := 0; i < 30; i++ {

		var orderItems []models.OrderItem
		for j := 0; j < rand.Intn(5); j++ {
			price, _ := faker.RandomInt(10, 1000, 1)
			quantity, _ := faker.RandomInt(1, 5, 1)
			orderItems = append(orderItems, models.OrderItem{
				ProductTitle:      faker.Word(),
				Quantity:          uint(quantity[0]),
				Price:             float32(price[0]) / 10.0,
				AdminRevenue:      0.9 * float32(price[0]) / 10.0,
				AmbassadorRevenue: 0.1 * float32(price[0]) / 10.0,
			})
		}

		order := models.Order{
			UserId:          uint(rand.Intn(30) + 1),
			Code:            faker.Username(),
			AmbassadorEmail: faker.Email(),
			FirstName:       faker.FirstName(),
			LastName:        faker.LastName(),
			Email:           faker.Email(),
			Complete:        true,
			OrderItem:       orderItems,
		}

		database.DB.Create(&order)
	}
}
