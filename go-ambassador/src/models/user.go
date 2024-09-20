package models

import (
	"ambassador/src/database"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Model
	FirstName    string   `json:"first_name"`
	LastName     string   `json:"last_name"`
	Email        string   `json:"email" gorm:"unique"`
	Password     []byte   `json:"-"`
	IsAmbassador bool     `json:"-"`
	Revenue      *float32 `json:"revenue,omitempty" gorm:"-"`
}

func (user *User) SetPassword(password string) {
	hashedPwd, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = hashedPwd
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}

type Admin User

type Ambassador User

func (ambassador *Ambassador) CalculateRevenue() {
	var orders []Order

	database.DB.Preload("OrderItem").Where("user_id = ? AND complete = true", ambassador.Id).Find(&orders)
	var revenue float32

	for _, order := range orders {
		revenue += order.GetAmbassadorRevenue()
	}

	ambassador.Revenue = &revenue
}

func (admin *Admin) CalculateRevenue() {
	var orders []Order

	database.DB.Preload("OrderItems").Where("user_id = ? AND complete = true", admin.Id).Find(&orders)
	var revenue float32

	for _, order := range orders {
		revenue += order.GetAdminRevenue()
	}

	admin.Revenue = &revenue
}

func Name(user *User) string {
	return user.FirstName + " " + user.LastName
}
