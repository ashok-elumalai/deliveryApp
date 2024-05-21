const orderStatusText = {
	"PAID": ["Paid Successfully for your order", "Paid Successfully", "Payment Completed"],
	"UNPAID": ["Cash on Delivery", "Cash on Delivery", "Collect cash on Delivery"],
	"REST_ACCEPTED": ["Restaurant has been accepted your order!", "Order Accepted", "Restaurant has accepted the order"],
	"REST_CANCELED": ["Restaurant has canceled your order!", "Order Rejected", "Restaurant has canceled the order"],
	"PREPARING": ["Your order is being prepared!", "Order Preparing", "Order is being Prepared"],
	"READY_FOR_DELIVERY": ["Your order is ready for delivery!", "Order is ready", "Order is ready for delivery"],
	"OUT_FOR_DELIVERY": ["Your order is out for delivery!", "Out for Delivery", "Out for Delivery"],
	"DELIVERED": ["Your order is Delivered!", "Ordered Delivered", "Order Delivered successfully"],
};

const userTypeMapping = {
	"USER": 0,
	"RESTAURANT": 1,
	"DELIVERY_PARTNER": 2
};


export const getOrderStatusText = (orderStatus, userType) => {
	const orderStatusTextValue = orderStatusText?.[orderStatus]?.[userTypeMapping?.[userType]] || orderStatusText?.[orderStatus]?.[0] || "Being Prepared";
	return orderStatusTextValue;
}