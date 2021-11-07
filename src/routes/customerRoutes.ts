import express from 'express'
import customerController from '../controller/CustomerController'

export const customerRoutes = express.Router()

customerRoutes.get("/:customerId/gerar-vendas", customerController.getSalesByCustomerId)
customerRoutes.post("", customerController.postNewCustomer)