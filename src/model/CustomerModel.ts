export interface requestResult {
    "mensagem": string,
    "erro": number,
    "dados": Array<salesData> | null
}

export interface salesData {
    "AtributoJSON": string,
    "cliente_nome": string,
    "cliente_telefone": string,
    "data_compra": number,
    "codigo_nota_fiscal": number,
    "valor_total": number
    "itens": Array<salesItens>
}

export interface salesItens {
    "nome": string,
    "valor": number,
    "quantidade": number
}