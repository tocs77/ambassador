package controllers

import (
	"ambassador/src/database"
	"ambassador/src/models"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v79"
	"github.com/stripe/stripe-go/v79/checkout/session"
)

func Orders(c *fiber.Ctx) error {
	var orders []models.Order
	database.DB.Preload("OrderItem").Find(&orders)
	for i, order := range orders {
		orders[i].Name = order.FullName()
		orders[i].Total = order.GetTotal()
	}
	return c.JSON(orders)
}

type CreateOrderRequest struct {
	Code      string
	FirstName string
	LastName  string
	Email     string
	Address   string
	Country   string
	City      string
	Zip       string
	Products  []map[string]int
}

func CreateOrder(c *fiber.Ctx) error {

	var request CreateOrderRequest
	if err := c.BodyParser(&request); err != nil {
		return err
	}
	link := models.Link{Code: request.Code}

	database.DB.Preload("User").First(&link)
	if link.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid link",
		})
	}
	order := models.Order{
		Code:      link.Code,
		UserId:    link.UserId,
		Email:     link.User.Email,
		FirstName: request.FirstName,
		LastName:  request.LastName,
		Address:   request.Address,
		Country:   request.Country,
		City:      request.City,
		Zip:       request.Zip,
	}

	tx := database.DB.Begin()
	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var lineItems []*stripe.CheckoutSessionLineItemParams
	for _, requestProduct := range request.Products {
		product := models.Product{}
		product.Id = uint(requestProduct["product_id"])
		database.DB.First(&product)

		total := product.Price * float32(requestProduct["quantity"])
		item := models.OrderItem{
			OrderId:           order.Id,
			ProductTitle:      product.Title,
			Price:             product.Price,
			Quantity:          uint(requestProduct["quantity"]),
			AmbassadorRevenue: total * 0.1,
			AdminRevenue:      total * 0.9,
		}

		if err := tx.Create(&item).Error; err != nil {
			tx.Rollback()
			c.Status(fiber.StatusBadRequest)
			return c.JSON(fiber.Map{
				"message": err,
			})
		}

		pr := stripe.CheckoutSessionLineItemPriceDataProductDataParams{
			Name:        stripe.String(product.Title),
			Description: stripe.String(product.Description),
			Images:      []*string{stripe.String(product.Image)},
		}

		prdata := stripe.CheckoutSessionLineItemPriceDataParams{
			UnitAmount: stripe.Int64(int64(product.Price * 100)),
			Currency:   stripe.String(string(stripe.CurrencyUSD)),
		}
		prdata.ProductData = &pr

		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			PriceData: &prdata,
			Quantity:  stripe.Int64(int64(requestProduct["quantity"])),
		})

	}

	params := stripe.CheckoutSessionParams{
		SuccessURL: stripe.String("http://localhost:5000/success?source={CHECKOUT_SESSION_ID}"),
		CancelURL:  stripe.String("http://localhost:5000/error"),
		PaymentMethodTypes: stripe.StringSlice([]string{
			"card",
		}),
		LineItems: lineItems,
		Mode:      stripe.String("payment"),
	}

	source, err := session.New(&params)

	if err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	order.TransactionId = source.ID

	if err := tx.Save(&order).Error; err != nil {
		tx.Rollback()
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tx.Commit()
	return c.JSON(source)
}
