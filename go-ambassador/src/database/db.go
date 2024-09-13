package database

import (
	"ambassador/src/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(mysql.Open("root:root@tcp(db:3306)/ambassador"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database: " + err.Error())
	}
}

func AutoMigrate() {
	if DB == nil {
		panic("DB is not initialized")
	}
	DB.AutoMigrate(models.User{}, models.Product{}, models.Link{}, models.Order{}, models.OrderItem{})
}
