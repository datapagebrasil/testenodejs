import CustomError from "../error/CustomError";
import { requestResult } from "../model/CustomerModel";
import CustomerRepository from "./CustomerRepository";

export default class CustomerBusiness {

    constructor(
        private customerDatabase: CustomerRepository
    ) { console.log("acessou business")}


    public async getSalesByCustomerId(customerId: number): Promise<requestResult> {

        //fazer validação e sanitização do input
        console.log("acessou getSales")
        try {

            const salesByCustomer: requestResult = await this.customerDatabase
                .getSalesByCustomerId(customerId)

            return salesByCustomer

        } catch (error) {
            throw new CustomError(401,"Cliente não encontrado" || "Internal Error", 1, null).mountError()
        }

    }
}