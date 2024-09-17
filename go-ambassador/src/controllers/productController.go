package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"encoding/json"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Products(c *fiber.Ctx) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(products)
}

func GetProduct(c *fiber.Ctx) error {
	var product models.Product
	id := c.Params("id")
	database.DB.Find(&product, id)
	return c.JSON(product)
}

func CreateProduct(c *fiber.Ctx) error {
	var product models.Product
	if err := c.BodyParser(&product); err != nil {
		return err
	}
	database.DB.Create(&product)
	return c.JSON(product)
}

func UpdateProduct(c *fiber.Ctx) error {
	var product models.Product

	if err := c.BodyParser(&product); err != nil {
		return err
	}
	id, _ := strconv.Atoi(c.Params("id"))
	product.Id = uint(id)
	database.DB.Model(&product).Where("id = ?", id).Updates(&product)
	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	product := models.Product{}
	product.Id = uint(id)
	database.DB.Delete(&product)
	return c.JSON(product)
}

func ProductsFrontend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_frontend").Result()

	if err != nil {
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil {
			panic(err)
		}
		database.Cache.Set(ctx, "products_frontend", bytes, 30*time.Minute).Err()
	} else {
		json.Unmarshal([]byte(result), &products)
	}

	return c.JSON(products)
}
