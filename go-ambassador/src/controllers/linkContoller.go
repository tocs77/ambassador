package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"strconv"

	"github.com/go-faker/faker/v4"
	"github.com/gofiber/fiber/v2"
)

func Link(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))

	var links []models.Link
	database.DB.Where("user_id = ?", id).Find(&links)
	for i, link := range links {
		var orders []models.Order
		database.DB.Where("code = ? and complete = true", link.Code).Find(&orders)
		links[i].Orders = orders
	}
	return c.JSON(links)
}

type CreateLinkRequest struct {
	Products []int
}

func GetAmbassadorLinks(c *fiber.Ctx) error {
	id := c.Locals("id").(uint)
	var links []models.Link
	database.DB.Where("user_id = ?", id).Find(&links)
	return c.JSON(links)
}
func Stats(c *fiber.Ctx) error {
	id := c.Locals("id").(uint)
	var links []models.Link
	database.DB.Where("user_id = ?", id).Find(&links)
	var result []interface{}
	var orders []models.Order
	for _, link := range links {
		database.DB.Preload("OrderItems").Find(&orders, &models.Order{Code: link.Code, Complete: true})

		var revenue float32 = 0
		for _, order := range orders {
			revenue += order.GetTotal()
		}

		result = append(result, fiber.Map{
			"code":    link.Code,
			"count":   len(orders),
			"revenue": revenue,
		})
	}
	return c.JSON(result)
}

func CreateLink(c *fiber.Ctx) error {
	var request CreateLinkRequest
	if err := c.BodyParser(&request); err != nil {
		return err
	}
	id := c.Locals("id").(uint)
	link := models.Link{
		UserId: id,
		Code:   faker.Username(),
	}
	for _, productId := range request.Products {
		product := models.Product{}
		product.Id = uint(productId)
		link.Products = append(link.Products, product)
	}

	database.DB.Create(&link)
	return c.JSON(link)
}

func GetLink(c *fiber.Ctx) error {
	code := c.Params("code")
	var link models.Link
	database.DB.Where("code = ?", code).Preload("Products").Preload("User").First(&link)
	return c.JSON(link)
}
