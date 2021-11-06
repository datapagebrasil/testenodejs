export enum SQL_TABLE {
    CUSTOMER = 'cliente',
    SALES = 'vendas',
    SOLD_ITEMS = 'vendas_itens'
}

export enum SQL_TABLE_CUSTOMER {
    ID = 'cliente.id',
    NAME = 'cliente.nome',
    PHONE = 'cliente.telefone',
    CPF = 'cliente.cpf',
    REGISTERED_AT = 'cliente.data_cadastro',
    MODIFY_AT = 'cliente.data_alteracao'
}

export enum SQL_TABLE_SALES {
    ID = 'vendas.id',
    CUSTOMER_ID = 'vendas.cliente_id',
    INVOICE_CODE = 'vendas.codigo_nota_fiscal',
    PURCHASE_DATE = 'vendas.data_cadastro',
    UPDATED_AT = 'vendas.data_atualizado',
    VALUE_PAID = 'vendas.valor_pago',
}

export enum SQL_TABLE_SOLD_ITEMS {
    ID = 'vendas_itens.id',
    SALE_ID = 'vendas_itens.venda_id',
    ITEM_NAME = 'vendas_itens.nome',
    ITEM_VALUE = 'vendas_itens.valor',
    QUANTITY = 'vendas_itens.quantidade'
}