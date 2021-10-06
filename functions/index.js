const functions = require("firebase-functions")
const express = require("express")
const cors = require("cors")
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require("./src/products")
const {createCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer} = require("./src/customers")
const {createOrder, getAllOrders, getOrderById} = require("./src/orders")

const app = express() 
app.use(cors())

app.get("/products/:productId", getProductById)
app.get("/products", getAllProducts)
app.post("/products", createProduct)
app.patch("/products/:productId", updateProduct)
app.delete("/products/:productId", deleteProduct)
app.post("/customers",createCustomer)
app.get("/customers/:customerId", getCustomerById)
app.get("/customers", getAllCustomers)
app.patch("/customers/:customerId", updateCustomer)
app.delete("/customers/:customerId", deleteCustomer)
app.post("/orders", createOrder)
app.get("/orders", getAllOrders)
app.get("/orders/:orderId",getOrderById)
//app.get("/orders/customer/:customersId",getOrderByCustomer)


exports.app = functions.https.onRequest(app)


