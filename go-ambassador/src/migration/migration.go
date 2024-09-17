package migration

import (
	"ambassador/src/database"
	"ambassador/src/models"
)

func AutoMigrate() {
	if database.DB == nil {
		panic("DB is not initialized")
	}
	database.DB.AutoMigrate(models.User{}, models.Product{}, models.Link{}, models.Order{}, models.OrderItem{})
}
