package main

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"fmt"

	"github.com/go-faker/faker/v4"
)

func main2() {

	for i := 0; i < 30; i++ {
		price, _ := faker.RandomInt(10000)
		fmt.Println(price[0])

		product := models.Product{
			Title:       faker.Word(),
			Price:       float32(price[0]) / 10.0,
			Image:       faker.URL(),
			Description: faker.Sentence(),
		}
		database.Connect()
		database.DB.Create(&product)
	}
}
