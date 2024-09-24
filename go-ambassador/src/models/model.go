package models

import "gorm.io/gorm"

type Model struct {
	gorm.Model
	Id uint `json:"id"`
}
