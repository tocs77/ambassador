package main

import (
	"ambassador/src/database"
	"ambassador/src/models"

	"github.com/go-faker/faker/v4"
)

func main() {
	for i := 0; i < 30; i++ {
		ambassador := models.User{
			FirstName:    faker.FirstName(),
			LastName:     faker.LastName(),
			Email:        faker.Email(),
			IsAmbassador: true,
		}
		ambassador.SetPassword("1234")
		database.Connect()
		database.DB.Create(&ambassador)
	}
}
