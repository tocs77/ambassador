package models

type Order struct {
	Model
	TransactionId   string      `json:"transaction_id" gorm:"null"`
	UserId          uint        `json:"user_id"`
	Code            string      `json:"code"`
	AmbassadorEmail string      `json:"ambassador_email"`
	FirstName       string      `json:"-"`
	LastName        string      `json:"-"`
	Name            string      `json:"name" gorm:"-"`
	Email           string      `json:"email"`
	Address         string      `json:"address" gorm:"null"`
	City            string      `json:"city" gorm:"null"`
	Country         string      `json:"country" gorm:"null"`
	Zip             string      `json:"zip" gorm:"null"`
	Complete        bool        `json:"-" gorm:"default:false"`
	OrderItem       []OrderItem `json:"order_items" gorm:"foreignKey:OrderId"`
	Total           float32     `json:"total" gorm:"-"`
}

type OrderItem struct {
	Model
	OrderId           uint    `json:"order_id"`
	ProductTitle      string  `json:"product_title"`
	Quantity          uint    `json:"quantity"`
	Price             float32 `json:"price"`
	AdminRevenue      float32 `json:"admin_revenue"`
	AmbassadorRevenue float32 `json:"ambassador_revenue"`
}

func (o *Order) FullName() string {
	return o.FirstName + " " + o.LastName
}

func (o *Order) GetTotal() float32 {
	var total float32
	for _, orderItem := range o.OrderItem {
		total += orderItem.Price * float32(orderItem.Quantity)
	}
	return total
}
