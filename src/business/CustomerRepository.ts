import { newUserDTO, requestResult, resultNewUserData, salesData, salesItens } from "../model/CustomerModel";

export default interface CustomerRepository {
    getSalesByCustomerId(customerId: number): Promise<Array<salesData & salesItens>> | null
    postNewCustomer(newUserDTO: newUserDTO): Promise<resultNewUserData>
}