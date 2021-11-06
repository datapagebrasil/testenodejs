import CustomerRepository from '../business/CustomerRepository';
import CustomError from '../error/CustomError';
import { SQL_TABLE, SQL_TABLE_CUSTOMER, SQL_TABLE_SALES } from '../model/SQLDatabaseModel';
import { SQLBaseDatabase } from './SQLBaseDatabase';

export default class SQLCustomerDatabase extends SQLBaseDatabase implements CustomerRepository {

    public async getSalesByCustomerId(
        customerId: number
    ): Promise<any> {
        console.log("acessou get do SQL")
        try {
            const customer = await this.getConnection()
                .select({
                    cliente_nome: SQL_TABLE_CUSTOMER.NAME,
                    cliente_telefone: SQL_TABLE_CUSTOMER.PHONE,
                    data_compra: SQL_TABLE_SALES.PURCHASE_DATE,
                    codigo_nota_fiscal: SQL_TABLE_SALES.INVOICE_CODE,
                })
                .from(SQL_TABLE.CUSTOMER)
                .join(SQL_TABLE.SALES,
                    SQL_TABLE_CUSTOMER.ID,
                    SQL_TABLE_SALES.CUSTOMER_ID)
                .where({ id: customerId })

                console.log(customer)

        } catch (error) {
            throw new CustomError(500, "Internal Error", 1, "Internal Error. T").mountError()
        }
    }


}