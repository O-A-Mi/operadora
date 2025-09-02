# Documentação do Componente `TabelaPadrao`

## Visão Geral

O componente `TabelaPadrao` é uma tabela React flexível e altamente configurável, projetada para exibir dados de forma dinâmica. Ele oferece uma ampla gama de recursos, como ordenação, paginação, seleção de linhas e colunas, diferentes visualizações e uma barra de ferramentas personalizável, tudo controlado através das props.

## Configuração Básica

Para usar o componente, é necessário fornecer um array de colunas (`columns`), um array de dados (`data`) e um `tabelaId` para identificação única.

### Props Essenciais

|      Prop      |       Tipo       |                                                                        Descrição                                                                        |
|:--------------:|:----------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **`tabelaId`** | `String`         | **(Obrigatório)** Um identificador único para o componente, usado para referenciar o container da tabela e garantir a acessibilidade.                   |
| **`columns`**  | `Array<Object>`  | **(Obrigatório)** Define a estrutura das colunas da tabela. Cada objeto no array representa uma coluna.                                                 |
| **`data`**     | `Array<Object>`  | **(Obrigatório)** O array de objetos que contém os dados a serem exibidos. As chaves de cada objeto devem corresponder aos values definidos em columns. |
| **`footer`**   | `Array<Object>`  | **(Obrigatório)** Um array de objetos que define as colunas do rodapé. Usado em conjunto com options.showFooter.                                        |
| **`options`**  | `Object`         | Objeto opcional para personalizar o comportamento geral da tabela, como paginação, toolbar e seleção.                                                   |

### Exemplo de Uso Básico

```js
  import TabelaPadrao from './TabelaPadrao';

  const meusDados = [
      { id: 1, nome: 'João', idade: 30 },
      { id: 2, nome: 'Maria', idade: 25 },
      { id: 3, nome: 'Carlos', idade: 35 },
  ];

  const minhasColunas = [
      { name: 'ID', value: 'id', sortable: true },
      { name: 'Nome', value: 'nome', sortable: true },
      { name: 'Idade', value: 'idade', sortable: true },
  ];

  const App = () => {
      return (
          <TabelaPadrao
              tabelaId="minha-tabela-exemplo"
              columns={minhasColunas}
              data={meusDados}
          />
      );
  };

  export default App;
```

### Colunas e Tipos de Dados

O componente permite a definição de colunas simples ou agrupadas (com sub-colunas) e oferece diversas opções de formatação.

### Estrutura do Objeto `columns`

Cada objeto de coluna pode conter as seguintes propriedades para controle total da apresentação:

* **`name`**: `string`. O nome da coluna exibido no cabeçalho.
* **`value`**: `string`. A chave do objeto de dados que a coluna deve renderizar.
* **`sortable`**: `boolean`, (padrão: true). Habilita a ordenação dos dados por esta coluna.
* **`align`**: `string`, (padrão: 'center'). Alinhamento do conteúdo da célula ('left', 'center', 'right').
* **`visible`**: `boolean`, (padrão: true). Define a visibilidade inicial da coluna.
* **`headerStyle`**: `object`. Um objeto de estilo CSS para o cabeçalho da coluna.
* **`cellStyle`**: `object`. Um objeto de estilo CSS para as células da coluna.
* **`rowsClassName`**: `string`. Nome de classe CSS adicional para as células da coluna.
* **`type`**: `string`, (padrão: 'text'). Define o tipo da coluna para renderização especial, como 'select' para checkboxes.
* **`formatter`**: `function`. Uma função personalizada para formatar o valor da célula. Recebe (value, row, column) como argumentos.
* **`format`**: `string`. String de formatação predefinida para tipos de dados comuns:
  * **`'currency`**': Formata valores como R$ 1.234,56.
  * **`'date'`**: Formata datas em DD/MM/AAAA.
  * **`'brDate'`**: Lida com formatos de data AAAA-MM-DD e DD/MM/AAAA.
  * **`'boolean'`**: Converte valores booleanos para 'Sim' ou 'Não'.
  * **`'percentage'`**: Formata valores como 12,34%.
* **`component`**: `React.Component`. Um componente React a ser renderizado na célula. Recebe value, row e column como props.
* **`subColumns`**: `Array<Object>`. Permite criar um cabeçalho com colunas agrupadas, aninhando objetos de coluna.

### Exemplo de Colunas Avançadas com Sub-colunas

```js
  const colunasAvancadas = [
    { name: 'Nome do Item', value: 'nome', align: 'left', sortable: true },
      {
        name: 'Dados Financeiros',
        isParent: true, // Indica que esta coluna é um grupo
        subColumns: [
          { name: 'Valor', value: 'valor', format: 'currency', sortable: true, visible: true },
          { name: 'Variação', value: 'variacao', format: 'percentage', sortable: false, visible: false },
        ],
      },
      { name: 'Em Estoque?', value: 'ativo', format: 'boolean' },
  ];

  const dadosFinanceiros = [
    { nome: 'Produto A', valor: 150000, variacao: 0.15, ativo: true },
    { nome: 'Produto B', valor: 75000, variacao: -0.05, ativo: false },
  ];

  <TabelaPadrao
    tabelaId="tabela-avancada"
    columns={colunasAvancadas}
    data={dadosFinanceiros}
  />
```

### Barra de Ferramentas (Toolbar)

A barra de ferramentas pode ser ativada e personalizada com botões para ações como exportação, alternância de visualização e mais.

### Opções da Toolbar

|        Opção           |       Tipo       |  Padrão  |                                 Descrição                                 |
|:----------------------:|:----------------:|:--------:|:-------------------------------------------------------------------------:|
| `toolbar`              | `boolean`        | true     | Ativa/desativa a barra de ferramentas.                                    |
| `toolbarPosition`      | `string`         | 'right'  | Posição dos botões na toolbar ('left', 'center', 'right').                |
| `showExport`           | `boolean`        | false    | Exibe o botão de exportar para .xlsx.                                     |
| `showColumnsSelector`  | `boolean`        | false    | Exibe o seletor de colunas visíveis.                                      |
| `showPaginationSwitch` | `boolean`        | false    | Exibe o botão para ativar/desativar a paginação.                          |
| `showToggleView`       | `boolean`        | false    | Exibe o botão para alternar entre as visualizações (Tabela/Lista/Custom). |
| `showToggleView`       | `boolean`        | false    | Exibe o botão para alternar entre as visualizações (Tabela/Lista/Custom). |
| `showSearch`           | `function`       | false    | Exibe um botão de pesquisa. onClick deve ser passado via prop.            |
| `additionalButtons`    | `Array< Object>` | [ ]      | Adiciona botões personalizados à barra de ferramentas.                    |

### Exemplo de Toolbar Personalizada

```js
  const opcoesToolbar = {
    toolbar: true,
    toolbarPosition: 'left',
    showExport: true,
    showColumnsSelector: true,
    showSearch: () => alert('Funcionalidade de pesquisa ativada!'),
    additionalButtons: [
      {
        title: 'Botão Customizado',
        icon: 'fas fa-plus',
        onClick: () => alert('Botão customizado clicado!'),
      },
    ],
  };

  <TabelaPadrao
      tabelaId="tabela-com-toolbar"
      columns={minhasColunas}
      data={meusDados}
      options={opcoesToolbar}
  />
```

### Paginação e Visualização

O componente oferece paginação integrada e a capacidade de alternar entre diferentes modos de exibição dos dados.

### Opções de Paginação

|         Opção          |       Tipo       |       Padrão      |                     Descrição                    |
|:----------------------:|:----------------:|:-----------------:|:------------------------------------------------:|
| `paginationEnabled`    | `boolean`        | true              | Habilita ou desabilita a paginação inicial.      |
| `cardsPerPage`         | `number`         | 10                | Quantidade de itens por página.                  |
| `cardsPerPageOptions`  | `Array< number>` | [10, 25, 50, 100] | Opções de quantidade de itens por página.        |

### Modos de Visualização

O `TabelaPadrao` pode ser exibido em três modos, definidos por `options.tableView`:

* `'table'` (padrão): Exibe os dados em um formato de tabela tradicional.
* `'list'`: Renderiza os dados como uma lista de cards, ideal para visualização em dispositivos móveis.
* `'custom'`: Permite fornecer um componente ou função personalizada para renderizar os dados. A prop options.customView deve ser utilizada para definir o conteúdo customizado.

### Exemplo de Visualizações

```js
  const CustomViewComponent = ({ data }) => (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <h3>Visualização Customizada</h3>
      {data.map((item, index) => (
        <p key={index}>{item.nome} - Idade: {item.idade}</p>
      ))}
    </div>
  );

  const opcoesVisualizacao = {
    showToggleView: true,
    tableView: 'table', // Pode ser 'list' ou 'custom'
    customView: CustomViewComponent,
  };

  <TabelaPadrao
    tabelaId="tabela-visualizacoes"
    columns={minhasColunas}
    data={meusDados}
    options={opcoesVisualizacao}
  />
```

### Interações e Seleção de Dados

O componente permite interações com linhas e células, além de diferentes modos de seleção.

### Opções de Interação

|        Opção        |    Tipo    |  Padrão  |                                Descrição                                 |
|:-------------------:|:----------:|:--------:|:------------------------------------------------------------------------:|
| `rowOnClick`        | `function` | false    | Função chamada ao clicar em uma linha. Recebe `(row, rowIndex)`.         |
| `onRowSelectChange` | `function` | null     | Função chamada quando a seleção de linhas muda. Recebe `(selectedData)`. |

Também é possível definir callbacks específicos para linhas (`__onClick`) e colunas (`__onClick`) dentro dos objetos de dados e colunas, respectivamente.

### Opções de Seleção

|         Opção        |     Tipo    |   Padrão   |                                Descrição                                 |
|:--------------------:|:-----------:|:----------:|:------------------------------------------------------------------------:|
| `rowSelection`       | `boolean`   | false      | Habilita a seleção de linhas (com checkboxes ou radio buttons).          |
| `rowSelectionMode`   | `string`    | 'multiple' | Define o modo de seleção: `'single'` ou `'multiple'`.                    |
| `onRowSelectChange`  | `function`  | null       | Função chamada quando a seleção de linhas muda. Recebe `(selectedData)`. |

### Exemplo de Seleção de Linhas

```js
  const opcoesSelecao = {
      rowSelection: true,
      rowSelectionMode: 'multiple',
      onRowSelectChange: (selectedData) => {
          console.log('Linhas selecionadas:', selectedData);
      },
  };

  <TabelaPadrao
      tabelaId="tabela-selecao"
      columns={minhasColunas}
      data={meusDados}
      options={opcoesSelecao}
  />
```

### Callback para Alteração de Dados

O componente TabelaPadrao oferece um callback opcional chamado onDataChange para notificar sobre alterações nos dados exibidos.

|         Opção        |     Tipo    |   Padrão   |                                                               Descrição                                                                 |
|:--------------------:|:-----------:|:----------:|:---------------------------------------------------------------------------------------------------------------------------------------:|
| `onDataChange`       | `function`   | null      | Uma função de callback que é acionada sempre que os dados da tabela forem alterados de alguma forma. Recebe o array de dados .          |

```js
  const handleDataChange = (newData) => {
      // 'newData' contém o array de dados atualizado,
      // já com a paginação e ordenação aplicadas.
      console.log('Dados da tabela alterados:', newData);
  };

  const opcoesComCallback = {
      onDataChange: handleDataChange,
  };

  <TabelaPadrao
      tabelaId="tabela-com-callback"
      columns={minhasColunas}
      data={meusDados}
      options={opcoesComCallback}
  />
```
