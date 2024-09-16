package middlewares

import (
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

const SecretKey = "secret"

type ClaimsWithScope struct {
	jwt.RegisteredClaims
	Scope string `json:"scope"`
}

func IsAuthenticated(c *fiber.Ctx) error {

	cookieToken := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookieToken, &ClaimsWithScope{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(SecretKey), nil
	})

	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}
	is_ambassador := strings.Contains(c.Path(), "/api/ambassador")

	claims := token.Claims.(*ClaimsWithScope)
	scope := claims.Scope

	if (scope == "admin" && is_ambassador) || (scope == "ambassador" && !is_ambassador) {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "Unauthenticated",
		})
	}

	id, _ := strconv.Atoi(claims.Subject)
	c.Locals("id", uint(id))
	c.Locals("scope", scope)
	return c.Next()
}

func GenerateJwt(id uint, scope string) (string, error) {
	var claims ClaimsWithScope
	claims.Subject = strconv.Itoa(int(id))
	claims.ExpiresAt = jwt.NewNumericDate(time.Now().Add(24 * time.Hour))
	claims.Scope = scope
	return jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SecretKey))
}
