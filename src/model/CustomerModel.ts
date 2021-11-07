export enum REQUEST_RESULT_KEYS {
    MESSAGE = 'menssagem',
    ERROR = 'erro',
    DATA = 'dados'
}

export class requestResult {

    public [REQUEST_RESULT_KEYS.MESSAGE]: string
    public [REQUEST_RESULT_KEYS.ERROR]: number
    public [REQUEST_RESULT_KEYS.DATA]: Array<salesData | resultNewCustomerData| null>

    static toSuccessfullyOutput(data: (salesData | null)[]) {
        return {
            [REQUEST_RESULT_KEYS.MESSAGE]: "Vendas carregadas do cliente",
            [REQUEST_RESULT_KEYS.ERROR]: 0,
            [REQUEST_RESULT_KEYS.DATA]: data
        }
    }

}

export enum RESULT_DATA_KEYS {
    JSON = 'AtributoJSON',
    NAME = 'cliente_nome',
    PHONE = 'cliente_telefone',
    PURCHASE_DATE = 'data_compra',
    INVOICE_CODE = 'codigo_nota_fiscal',
    TOTAL_PURCHASE_VALUE = 'valor_total',
    PURCHASED_ITEMS = 'itens',
}

export interface salesData {
    [RESULT_DATA_KEYS.JSON]: string,
    [RESULT_DATA_KEYS.NAME]: string,
    [RESULT_DATA_KEYS.PHONE]: string,
    [RESULT_DATA_KEYS.PURCHASE_DATE]: number,
    [RESULT_DATA_KEYS.INVOICE_CODE]: number,
    [RESULT_DATA_KEYS.TOTAL_PURCHASE_VALUE]: number,
    [RESULT_DATA_KEYS.PURCHASED_ITEMS]: Array<salesItens>
}

export enum RESULT_DATA_ITEM_KEYS {
    NAME = 'nome',
    VALUE = 'valor',
    QUANTITY = 'quantidade'
}

export interface salesItens {
    [RESULT_DATA_ITEM_KEYS.NAME]: string,
    [RESULT_DATA_ITEM_KEYS.VALUE]: number,
    [RESULT_DATA_ITEM_KEYS.QUANTITY]: number
}


export enum NEW_CUSTOMER_DTO {
    NAME = "nome",
    PHONE = "telefone",
    CPF = "cpf",
    CREATE_AT = "data_cadastro",
}

export interface newCustomerDTO {
    [NEW_CUSTOMER_DTO.NAME]: string,
    [NEW_CUSTOMER_DTO.PHONE]: string,
    [NEW_CUSTOMER_DTO.CPF]: number,
    [NEW_CUSTOMER_DTO.CREATE_AT]?: string
}


export enum RESULT_NEW_CUSTOMER {
    NAME = "nome",
    ID = "id"
}

export interface resultNewCustomerData {
    [RESULT_NEW_CUSTOMER.NAME]: string,
    [RESULT_NEW_CUSTOMER.ID]: number
}