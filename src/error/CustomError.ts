import { requestResult } from '../model/CustomerModel'

export default class CustomError extends Error {
    constructor(
        public httpStatusCode: number,
        public message: string,
        public quantityError: number,
        public data: any
    ) {
        super(message)
    }


    public mountError() {
        const errorBody: requestResult = {
            "mensagem": this.message,
            "erro": this.quantityError,
            "dados": this.data
        }
        return {
            code: this.httpStatusCode,
            message: errorBody
        }
    }
}