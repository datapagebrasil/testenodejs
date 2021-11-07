import { Request, Response } from "express";
import CustomerBusiness from "../business/CustomerBusiness";
import SQLCustomerDatabase from "../data/SQLCustomerDatabase";


export class CustomerController {

    constructor(
        private customerBusiness: CustomerBusiness
    ) { }


    public async getSalesByCustomerId(
        req: Request, res: Response
    ): Promise<any> {

        //to do: input params validation 

        try {

            const salesByCustomerId = await customerBusiness
                .getSalesByCustomerId(Number(req.params.customerId))

            return res
                .status(200)
                .send(salesByCustomerId)
                .end()

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }


    
    public async postNewCustomer(
        req: Request, res: Response
    ): Promise<any> {
       
        //to do: input params validation 


        try {

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }

}

const customerDatabase = new SQLCustomerDatabase();
const customerBusiness = new CustomerBusiness(customerDatabase);
const customerController = new CustomerController(customerBusiness);

export default customerController;