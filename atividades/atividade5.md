# Atividade 5

- [ ] Fazer a rota PUT /cliente/{cliente}  para atualizar o nome da Renata para "Juliana"


```
{
    msg: "Cliente atualizado com sucesso",
    erro: 0,
    dados: {
        id: ???,
        nome: "Juliana"
    }
}
```

- [ ] - Caso não enviar o o CPF completo, com mascara, não deve salvar.

```
{
    msg: "CPF não enviado corretamente",
    erro: 1,
    dados: [{
        mensagem: "CPF não enviado corretamente 111.123.123"
    }]
}
```

- [ ] - Caso não encontrar o cliente.

```
{
    msg: "Cliente não encontrado ",
    erro: 1,
    dados: [{
        mensagem: "Cliente não encontrado id: 15"
    }]
}
```

(Evidências no evidencia.doc)

- [ ] - Atualização do Cliente : nome Juliana 
- [ ] - Exception enviando um cpf com 111.123.123
- [ ] - Exception do cliente não encontrado id 15

---
Fim atividade 5