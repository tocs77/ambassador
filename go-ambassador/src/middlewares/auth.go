package middlewares

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

func IsAuthenticated(c *fiber.Ctx) error {

	cookieToken := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookieToken, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte("secret"), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	claims := token.Claims.(*jwt.RegisteredClaims)
	id, _ := strconv.Atoi(claims.Subject)
	c.Locals("id", uint(id))
	return c.Next()
}
