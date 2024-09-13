package models

type Product struct {
	Model
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
	Image       string  `json:"image"`
}
