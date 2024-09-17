package controllers

import (
	"ambassador/src/database"
	"ambassador/src/middlewares"
	"ambassador/src/models"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "passwords do not match"})
	}

	user := models.User{
		FirstName:    data["first_name"],
		LastName:     data["last_name"],
		Email:        data["email"],
		IsAmbassador: strings.Contains(c.Path(), "/api/ambassador"),
	}
	user.SetPassword(data["password"])

	database.DB.Create(&user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var user models.User
	database.DB.Where("email = ?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{"message": "Invalid credentials"})
	}

	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "Invalid credentials"})
	}

	var scope string
	isAmbassador := strings.Contains(c.Path(), "/api/ambassador")
	if isAmbassador {
		scope = "ambassador"
	} else {
		scope = "admin"
	}

	if !isAmbassador && user.IsAmbassador {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "unauthorized"})
	}

	token, err := middlewares.GenerateJwt(user.Id, scope)
	if err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "error creating token"})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(user)
}

func User(c *fiber.Ctx) error {
	id := c.Locals("id").(uint)
	var user models.User
	database.DB.Where("id = ?", id).First(&user)
	if strings.Contains(c.Path(), "/api/ambassador") {
		ambassador := models.Ambassador(user)
		ambassador.CalculateRevenue()
		return c.JSON(ambassador)
	}
	return c.JSON(user)
}

func Users(c *fiber.Ctx) error {
	var users []models.User
	database.DB.Find(&users)
	return c.JSON(users)
}

func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{"message": "success"})
}

func UpdateUser(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	newUser := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
	}
	id := c.Locals("id").(uint)
	var user models.User
	database.DB.Where("id = ?", id).First(&user)

	if newUser.Email != "" {
		user.Email = newUser.Email
	}
	if newUser.FirstName != "" {
		user.FirstName = newUser.FirstName
	}
	if newUser.LastName != "" {
		user.LastName = newUser.LastName
	}

	database.DB.Save(&user)
	return c.JSON(user)
}

func UpdatePassword(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["password"] != data["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{"message": "passwords do not match"})
	}
	id := c.Locals("id").(uint)
	var user models.User

	database.DB.Where("id = ?", id).First(&user)
	user.SetPassword(data["password"])
	database.DB.Save(&user)

	return c.JSON(user)
}
