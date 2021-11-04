import { requestResult } from "../model/CustomerModel";

export default interface CustomerRepository {
    getSalesByCustomerId(customerId: number): Promise<requestResult>
}