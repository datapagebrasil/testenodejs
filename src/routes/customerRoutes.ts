import express from 'express'

export const customerRoutes = express.Router()

customerRoutes.get("/:customerId/gerar-vendas", /*aqui deve chamar a camada de controller*/)