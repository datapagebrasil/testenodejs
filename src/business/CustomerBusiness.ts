import CustomError from "../error/CustomError";
import { requestResult } from "../model/CustomerModel";
import CustomerRepository from "./CustomerRepository";

export default class CustomerBusiness {

    constructor(
        private customerDatabase: CustomerRepository
    ) { }


    public async getSalesByCustomerId(customerId: number): requestResult {

        //fazer validação e sanitização do input

        try {

            const salesByCustomer: requestResult = await this.customerDatabase
                .getSalesByCustomerId(customerId)

            return salesByCustomer

        } catch (error) {
            throw new CustomError("Cliente não encontrado" || "Internal Error", 1, null)
        }

    }
}