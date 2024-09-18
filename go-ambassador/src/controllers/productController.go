package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"
	"context"
	"encoding/json"
	"sort"
	"strconv"
	"strings"
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
	go database.ClearCache("products_frontend", "products_backend")
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
	go database.ClearCache("products_frontend", "products_backend")

	return c.JSON(product)
}

func DeleteProduct(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	product := models.Product{}
	product.Id = uint(id)
	database.DB.Delete(&product)
	go database.ClearCache("products_frontend", "products_backend")
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

func ProductsBackend(c *fiber.Ctx) error {
	var products []models.Product
	var ctx = context.Background()
	result, err := database.Cache.Get(ctx, "products_backend").Result()

	if err != nil {
		database.DB.Find(&products)
		bytes, err := json.Marshal(products)
		if err != nil {
			panic(err)
		}
		database.Cache.Set(ctx, "products_backend", bytes, 30*time.Minute).Err()
	} else {
		json.Unmarshal([]byte(result), &products)
	}

	var searchedProducts []models.Product
	if s := c.Query("s"); s != "" {
		for _, product := range products {
			if strings.Contains(strings.ToLower(product.Title), strings.ToLower(s)) ||
				strings.Contains(strings.ToLower(product.Description), strings.ToLower(s)) {
				searchedProducts = append(searchedProducts, product)
			}
		}
		products = searchedProducts
	}

	if sortParm := c.Query("sort"); sortParm != "" {
		sortLower := strings.ToLower(sortParm)
		if sortLower != "asc" && sortLower != "desc" {
			sortLower = "asc"
		}
		sort.Slice(products, func(i, j int) bool {
			switch sortLower {
			case "asc":
				return products[i].Price < products[j].Price
			case "desc":
				return products[i].Price > products[j].Price
			default:
				return false
			}
		})
	}

	var total = len(products)

	perPage := 9
	page, _ := strconv.Atoi(c.Query("page", "1"))
	var data []models.Product = products
	if total < page*perPage && total >= (page-1)*perPage {
		data = products[(page-1)*perPage : total]
	} else if total >= page*perPage {
		data = products[(page-1)*perPage : page*perPage]
	} else {
		data = []models.Product{}
	}

	return c.JSON(fiber.Map{"data": data, "total": total, "page": page, "last_page": total/perPage + 1})
}
