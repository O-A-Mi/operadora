export const tableCollumns = [
        { value: "acao", name: "Ação", align: "center", sortable: true },
        { value: "referencia", name: "Referência", align: "center", sortable: true },
        { value: "vidas", name: "Vidas", align: "center", sortable: true },
        {
            name: "Datas",
            value: "datas",
            subColumns: [
                { value: "cadastro", name: "Cadastro" },
                { value: "transmissao", name: "Transmissão" },
            ]

        },
        {
            name: "Plano",
            value: "plano",
            subColumns: [
                { value: "tipo", name: "Tipo" },
                { value: "contratado", name: "Contratado" }
            ]
        },
        {
            name: "Contratante",
            value: "contratante",
            subColumns: [
                { value: "nome", name: "Nome" },
                { value: "cpfCnpj", name: "CPF/CNPJ" },
                { value: "email", name: "E-mail" }
            ]
        },
        {

            name: "Representante",
            value: "representante",
            subColumns: [
                { value: "corretora", name: "Corretora" },
                { value: "supervisor", name: "Supervisor" },
                { value: "consultor", name: "Consultor" }
            ]
        }
    ];
