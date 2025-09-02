<h1 align="center">
  Documentação Sistema Hermanos (Interno)
</h1>

- [Tabela Padrão](#tabelapadrao)
- [Input Padrão](#inputpadrao)
- [Action Buttons Padrão](#actionbuttons)
- [Stepper Padrao](#stepperpadrao)

# TabelaPadrao

## Visão Geral - TabelaPadrao

O componente `TabelaPadrao` é uma tabela React flexível e altamente configurável, projetada para exibir dados de forma dinâmica. Ele oferece uma ampla gama de recursos, como ordenação, paginação, seleção de linhas e colunas, diferentes visualizações e uma barra de ferramentas personalizável, tudo controlado através das props.

## 📖 Uso Básico - TabelaPadrao

Para usar o componente, é necessário fornecer um array de colunas (`columns`), um array de dados (`data`) e um `tabelaId` para identificação única.

### Props Essenciais - TabelaPadrao

|      Prop      |       Tipo       |                                                                        Descrição                                                                        |
|:--------------:|:----------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **`tabelaId`** | `String`         | **(Obrigatório)** Um identificador único para o componente, usado para referenciar o container da tabela e garantir a acessibilidade.                   |
| **`columns`**  | `Array<Object>`  | **(Obrigatório)** Define a estrutura das colunas da tabela. Cada objeto no array representa uma coluna.                                                 |
| **`data`**     | `Array<Object>`  | **(Obrigatório)** O array de objetos que contém os dados a serem exibidos. As chaves de cada objeto devem corresponder aos values definidos em columns. |
| **`footer`**   | `Array<Object>`  | **(Obrigatório)** Um array de objetos que define as colunas do rodapé. Usado em conjunto com options.showFooter.                                        |
| **`options`**  | `Object`         | Objeto opcional para personalizar o comportamento geral da tabela, como paginação, toolbar e seleção.                                                   |

### Exemplo de Uso Básico - TabelaPadrao

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

- **`name`**: `string`. O nome da coluna exibido no cabeçalho.
- **`value`**: `string`. A chave do objeto de dados que a coluna deve renderizar.
- **`sortable`**: `boolean`, (padrão: true). Habilita a ordenação dos dados por esta coluna.
- **`align`**: `string`, (padrão: 'center'). Alinhamento do conteúdo da célula ('left', 'center', 'right').
- **`visible`**: `boolean`, (padrão: true). Define a visibilidade inicial da coluna.
- **`headerStyle`**: `object`. Um objeto de estilo CSS para o cabeçalho da coluna.
- **`cellStyle`**: `object`. Um objeto de estilo CSS para as células da coluna.
- **`rowsClassName`**: `string`. Nome de classe CSS adicional para as células da coluna.
- **`type`**: `string`, (padrão: 'text'). Define o tipo da coluna para renderização especial, como 'select' para checkboxes.
- **`formatter`**: `function`. Uma função personalizada para formatar o valor da célula. Recebe (value, row, column) como argumentos.
- **`format`**: `string`. String de formatação predefinida para tipos de dados comuns:
  - **`'currency`**': Formata valores como R$ 1.234,56.
  - **`'date'`**: Formata datas em DD/MM/AAAA.
  - **`'brDate'`**: Lida com formatos de data AAAA-MM-DD e DD/MM/AAAA.
  - **`'boolean'`**: Converte valores booleanos para 'Sim' ou 'Não'.
  - **`'percentage'`**: Formata valores como 12,34%.
- **`component`**: `React.Component`. Um componente React a ser renderizado na célula. Recebe value, row e column como props.
- **`subColumns`**: `Array<Object>`. Permite criar um cabeçalho com colunas agrupadas, aninhando objetos de coluna.

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

- `'table'` (padrão): Exibe os dados em um formato de tabela tradicional.
- `'list'`: Renderiza os dados como uma lista de cards, ideal para visualização em dispositivos móveis.
- `'custom'`: Permite fornecer um componente ou função personalizada para renderizar os dados. A prop options.customView deve ser utilizada para definir o conteúdo customizado.

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

---

# inputpadrao

## Visão Geral - InputPadrao

O componente InputPadrao é uma solução completa para renderizar campos de formulário de forma padronizada. Ele encapsula diferentes tipos de input (texto, senha, data, select, etc.), máscaras de entrada e comportamentos de layout, garantindo um visual e funcionalidade consistentes em toda a aplicação. O componente é construído com base em subcomponentes reutilizáveis, como InputField e InputPadrao, e utiliza um hook personalizado (UseInputMask) para lidar com formatação de entrada.

## 📖 Uso Básico - InputPadrao

Para usar o componente, basta importá-lo e passá-lo as props necessárias, como label, identifier e o tipo de campo (type). Ele lida automaticamente com a renderização do label, input e ícones.

### Props Essenciais - InputPadrao

|       Prop        |    Tipo    |                                                 Descrição                                                  |
|-------------------|------------|------------------------------------------------------------------------------------------------------------|
| **`label`**       | `string`   | **(Obrigatório)** O texto que aparecerá como label do campo. Defina como false para ocultar o label.       |
| **`identifier`**  | `string`   | **(Obrigatório)** Um identificador único para o campo, usado para associação entre o label e o input (id). |
| **`type`**        | `string`   | **(Obrigatório)** Define o tipo do campo. Padrão: 'text'.                                                  |
| **`value`**       | `any`      | O valor do campo controlado.                                                                               |
| **`onChange`**    | `function` | Callback executado quando o valor do campo é alterado.                                                     |
| **`required`**    | `boolean`  | **(Opcional)** Se true, adiciona um asterisco * ao lado do label.                                          |
| **`placeholder`** | `string`   | **(Opcional)** O texto de placeholder do campo.                                                            |
| **`width`**       | `number`   | **(Opcional)** Largura do campo em porcentagem (e.g., 50 para 50%).                                        |
| **`gap`**         | `number`   | **(Opcional)** Espaçamento entre os campos em rem. Padrão: 0.5.                                            |

### Exemplo de Uso Básico - InputPadrao

```JavaScript
  import { UseInputPadrao, useInputMask } from './caminho/para/o/componente';

  const Formulario = () => {
      const [name, setName, nameRef] = useInputMask();
      const [email, setEmail, emailRef] = useInputMask();

      return (
          <div>
              <UseInputPadrao
                  label="Nome Completo"
                  identifier="nome-completo"
                  type="text"
                  value={name}
                  onChange={setName}
                  inputRef={nameRef}
                  required
                  width={50}
              />
              <UseInputPadrao
                  label="Email"
                  identifier="email-user"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  inputRef={emailRef}
                  placeholder="exemplo@dominio.com"
                  width={50}
              />
          </div>
      );
  };
```

## 🎨 Tipos de Campos e Personalização

O componente `UseInputPadrao` suporta diversos tipos de inputs. Você pode personalizá-los com ícones, estilos, e botões.

### Tipos de Campo (`type`)

Além dos tipos HTML padrão (`text`, `email`, `number`, `tel`, etc.), o componente inclui tipos customizados:

- `'select'`: Renderiza um componente de dropdown customizável. Requer a prop options e pode ser searchable ou multiple.
- `'password'`: Renderiza um campo de senha com um botão de "mostrar/esconder" o texto.
- `'textarea'`: Renderiza um campo de texto de múltiplas linhas.
- `'file'`: Renderiza um campo para upload de arquivos.
- `'date'`: (`"date"`, `"data completa"`, `"mes e dia"`, `"apenas dia"`, `"competencia"`, `"data e hora"`, `"apenas hora"`, `"apenas ano"`)

#### Select

|          Prop         |       Tipo      | Padrão |                                         Descrição                                         |
|-----------------------|-----------------|--------|-------------------------------------------------------------------------------------------|
| **`defaultSelect`**   | `boolean`       | true   | Habilita uma opção padrão que não tem valor e é inicialmente selecionada                  |
| **`searchable`**      | `boolean`       | true   | Habilita um campo de busca que filtra as opções do select                                 |
| **`multiple`**        | `boolean`       | false  | Permite a multipla seleção das opções do select                                           |
| **`multipleButtons`** | `boolean`       | false  | Habilita os botões de "selecionar tudo" e "limpar" para o select multiplo                 |
| **`options`**         | `Array<Object>` | []     | Prop que insere as opções do select, deve passar { value: "", label: "" } para cada opção |

##### Exemplo de Select

```JavaScript
  import { UseInputPadrao, useInputMask } from './caminho/para/o/componente';

  const InputPersonalizado = () => {
      const [cliente, setCliente, clienteRef] = useInputMask();

      const clienteOptions = [
        { value: "1", label: "Pessoa 1" },
        { value: "2", label: "Pessoa 2" },
        { value: "3", label: "Pessoa 3" },
        ...
      ]

      return (
          <div>
              <UseInputPadrao
                  label="Nome"
                  identifier="nome"
                  value={cliente}
                  onChange={setCliente}
                  inputRef={clienteRef}
                  icon="fas fa-users"
                  multiple={true}
                  multipleButtons={true}
                  options={clienteOptions}
              />
          </div>
      );
  };
```

#### Password

|         Prop        |    Tipo   | Padrão |                            Descrição                            |
|---------------------|-----------|--------|-----------------------------------------------------------------|
| **`passwordIcon`**  | `boolean` | true   | Habilita um icone para alterar a visualização do campo de senha |

#### DatePicker

- `"date"`: Data completa `DD/MM/YYYY`
- `"data completa"`: Data completa `DD/MM/YYYY`
- `"mes e dia"`: Data parcial sem ano `DD/MM`
- `"apenas dia"`: Apenas um número de quantidade de dias `DD`
- `"competencia"`: Se refere ao mês e ano `MM/YYYY`
- `"data e hora"`: Data completa mais horário `DD/MM/YYYY HH:MM`
- `"apenas hora"`: Apenas horas `HH:MM`
- `"apenas ano"`: Apenas o ano `YYYY`

### Propriedades de Personalização

|                   Prop                  |       Tipo      |                                                 Descrição                                                                        |
|-----------------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------|
| **`className`**                         | `object`        | **(Opcional)** Substitui a classe padrão do input.                                                                               |
| **`icon`**                              | `string`        | **(Opcional)** Uma classe CSS para um ícone Font Awesome. Padrão é um ícone relacionado ao type. Use false para remover o ícone. |
| **`contentStyle`**                      | `object`        | **(Opcional)** Objeto de estilo CSS para customizar o container completo.                                                        |
| **`fieldStyle`**                        | `object`        | **(Opcional)** Objeto de estilo CSS para customizar o container do input.                                                        |
| **`inputStyle`**                        | `object`        | **(Opcional)** Objeto de estilo CSS para customizar o input.                                                                     |
| **`iconStyle`**                         | `object`        | **(Opcional)** Objeto de estilo CSS para customizar o icone do input.                                                            |
| **`inputButtonLeft, inputButtonRight`** | `Array<Object>` | **(Opcional)** Arrays de objetos para adicionar botões no lado esquerdo ou direito do input.                                     |
| **`...`**                               |                 | **(Opcional)** É possivel passar qualquer prop compativel com inputs para que eles recebam essa propriedade                      |

### Exemplo de Personalização

```JavaScript
  import { UseInputPadrao, useInputMask } from './caminho/para/o/componente';

  const InputPersonalizado = () => {
      const [name, setName, nameRef] = useInputMask();

      return (
          <div>
              <UseInputPadrao
                  label="Nome"
                  identifier="nome"
                  value={name}
                  onChange={setName}
                  inputRef={nameRef}
                  icon="fas fa-address-card"
                  upperCase // Exemplo de prop adicional compativel
                  // Outros exemplos...
                  // readOnly
                  // disabled
                  iconStyle={{
                    fontSize: "1rem",
                    color: "var(--cor-primaria)",
                  }}
                  inputButtonRight={[
                      {
                          text: 'Validar',
                          onClick: () => alert('CPF validado!'),
                          tooltip: 'Clique para validar o CPF',
                      },
                  ]}
              />
          </div>
      );
  };
```

## 🎭 Máscaras de Entrada (UseInputMask)

O hook UseInputMask é a base para a formatação de inputs. Ele pode ser usado separadamente ou de forma integrada através das props pattern e type no UseInputPadrao.

### Padrões de Máscara

A prop pattern aceita uma string com os seguintes caracteres:

- 9: Representa um dígito numérico (0-9).
- A: Representa um caractere alfabético (a-z, A-Z).
- Qualquer outro caractere: Representa um caractere literal (e.g., -, (, ), /).

Você também pode fornecer múltiplos padrões separados por | para criar máscaras dinâmicas.

### Exemplo de Máscara Dinâmica

```JavaScript
  const MyFormWithMask = () => {
      // Máscara dinâmica para telefone (8 ou 9 dígitos)
      const [phone, setPhone, phoneRef] = UseInputMask("9999-9999 | (99) 99999-9999");
      
      // Máscara para CEP
      const [zipCode, setZipCode, zipCodeRef] = UseInputMask("99999-999");

      return (
          <div>
              <UseInputPadrao
                  label="Telefone"
                  identifier="phone"
                  value={phone}
                  onChange={setPhone}
                  inputRef={phoneRef}
                  type="tel"
              />
              <UseInputPadrao
                  label="CEP"
                  identifier="zipCode"
                  value={zipCode}
                  onChange={setZipCode}
                  inputRef={zipCodeRef}
                  type="text"
              />
          </div>
      );
  };
```

## 🗂️ Referências (useRef)

O componente UseInputPadrao expõe uma ref para o elemento input subjacente através da prop inputRef. Isso é útil para focar o campo programaticamente ou interagir com a DOM diretamente.

### Exemplo de Uso com inputRef

```JavaScript
  import { UseInputPadrao, UseInputMask } from './caminho/para/o/componente';
  import { useEffect } from 'react';

  const MyFocusableInput = () => {
      const [name, setName, nameRef] = UseInputMask();

      useEffect(() => {
          // Foca o campo assim que o componente é montado
          nameRef.current.focus();
      }, [nameRef]);

      return (
          <UseInputPadrao
              label="Nome Completo"
              identifier="nome-completo"
              value={name}
              onChange={setName}
              inputRef={nameRef}
          />
      );
  };
```

---

# ActionButtons

## Visão Geral - ActionButtons

Um componente React reutilizável para criar barras de ação com botões personalizáveis e layout responsivo. Ideal para footers de páginas com ações comuns como criar, salvar, remover, navegar, etc.

## 📖 Uso Básico - ActionButtons

```jsx
import ActionButtons from './components/ActionButtons';

const MinhaPagina = () => {
  const handleNovo = () => console.log('Novo item');
  const handleSalvar = () => console.log('Salvando...');
  const handleVoltar = () => history.back();

  return (
    <div>
      <h1>Minha Página</h1>
      
      <ActionButtons
        buttons={{
          novo: true,        // Usa configuração padrão
          gravar: true,      // Usa configuração padrão
          voltar: true       // Usa configuração padrão
        }}
        handlers={{
          handleNovo: handleNovo,
          handleGravar: handleSalvar,
          handleVoltar: handleVoltar
        }}
      />
    </div>
  );
};
```

## 🎨 Personalização de Botões

### Configuração de um botão

Cada botão pode ser configurado de 3 formas:

```jsx
const buttonsConfig = {
  // 1. false = não exibe o botão
  novo: false,
  
  // 2. true = usa configuração padrão
  gravar: true,
  
  // 3. Objeto = personalização completa
  remover: {
    name: 'Excluir',           // Nome personalizado
    icon: 'fa-solid fa-trash', // Ícone personalizado
    color: '#dc2626',          // Cor de fundo
    hoverColor: '#b91c1c'      // Cor no hover
  }
};
```

### Botões Pré-definidos

| Botão     | Nome Padrão | Ícone Padrão              | Cor Padrão                                          |
|-----------|-------------|---------------------------|-----------------------------------------------------|
| novo      | Novo        | fa-solid fa-plus          | <span style="color: #3b82f6;">● #3b82f6 </span> |
| gravar    | Gravar      | fa-solid fa-save          | <span style="color: #10b981;">● #10b981</span>  |
| remover   | Remover     | fa-solid fa-trash         | <span style="color: #ef4444;">● #ef4444</span>  |
| voltar    | Voltar      | fa-solid fa-arrow-left    | <span style="color: #6b7280;">● #6b7280</span>  |
| anterior  | Anterior    | fa-solid fa-chevron-left  | <span style="color: #dc2626;">● #dc2626</span>  |
| proximo   | Próximo     | fa-solid fa-chevron-right | <span style="color: #059669;">● #059669</span>  |
| navegador | Navegador   | fa-solid fa-caret-up      | <span style="color: #7c3aed;">● #7c3aed</span>  |

## 🔄 Navegação por Steps

Para implementar navegação anterior/próximo:

```jsx
const [currentStep, setCurrentStep] = useState(0);
const totalSteps = 3;

<ActionButtons
  buttons={{
    anterior: true,
    proximo: true
  }}
  handlers={{
    handleAnterior: () => setCurrentStep(prev => Math.max(0, prev - 1)),
    handleProximo: () => setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1))
  }}
  isFirstStep={() => currentStep === 0}
  isLastStep={() => currentStep === totalSteps - 1}
/>
```

## 📂 Dropdown Navegador

O botão navegador inclui um dropdown personalizável:

```jsx
const [showNavegador, setShowNavegador] = useState(false);

const navegadorOptions = [
  { id: 1, label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
  { id: 2, label: 'Relatórios', icon: 'fa-solid fa-file-alt' },
  { id: 3, label: 'Configurações', icon: 'fa-solid fa-cog' }
];

<ActionButtons
  buttons={{
    navegador: {
      name: 'Menu',
      icon: 'fa-solid fa-bars',
      color: '#7c3aed'
    }
  }}
  navegadorOptions={navegadorOptions}
  showNavegador={showNavegador}
  onNavegadorClick={() => setShowNavegador(!showNavegador)}
  onNavegadorOption={(option) => {
    console.log('Selecionado:', option);
    setShowNavegador(false);
  }}
/>
```

## 📱 Layout Responsivo

O componente se adapta automaticamente:

- **Mobile (< 420px)**: Grid 2 colunas x 3 linhas
- **Tablet (420px+)**: Grid 3 colunas x 2 linhas  
- **Desktop (768px+)**: Flexbox horizontal

## 🎯 Exemplo Completo

```jsx
  import React, { useState } from 'react';
  import ActionButtons from './ActionButtons'; // Certifique-se de que o caminho está correto

  const ExemploCompleto = () => {
    const [showNavegador, setShowNavegador] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 3;

      // Função dedicada para fechar o dropdown
      const handleNavegadorClose = () => {
        setShowNavegador(false);
      };

    // Configuração personalizada dos botões
    const buttonsConfig = {
      novo: {
        name: 'Criar',
        icon: 'fa-solid fa-sparkles',
        color: '#8b5cf6',
        hoverColor: '#7c3aed'
      },
      gravar: {
        name: 'Salvar',
        icon: 'fa-solid fa-floppy-disk',
        color: '#059669',
        hoverColor: '#047857'
      },
      remover: true,
      voltar: true,
      anterior: true,
      proximo: true,
      navegador: {
        name: 'Menu',
        icon: 'fa-solid fa-bars',
        color: '#7c3aed',
        hoverColor: '#6d28d9'
      }
    };

    // Handlers dos botões
    const buttonHandlers = {
      handleNovo: () => alert('Novo item criado!'),
      handleGravar: () => alert('Dados salvos!'),
      handleDeletar: () => {
        if (confirm('Deseja realmente remover?')) {
          alert('Item removido!');
        }
      },
      handleVoltar: () => alert('Voltando...'),
      handleAnterior: () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
      },
      handleProximo: () => {
        if (currentStep < totalSteps - 1) setCurrentStep(currentStep + 1);
      }
    };

    // Opções do dropdown navegador
    const navegadorOptions = [
      { id: 1, label: 'Dashboard', icon: 'fa-solid fa-chart-line' },
      { id: 2, label: 'Relatórios', icon: 'fa-solid fa-file-alt' },
      { id: 3, label: 'Configurações', icon: 'fa-solid fa-cog' },
      { id: 4, label: 'Usuários', icon: 'fa-solid fa-users' }
    ];

    return (
      <div>
      <h1>Página com ActionButtons</h1>
      <p>Step {currentStep} de {totalSteps}</p>
      
      <ActionButtons
        buttons={buttonsConfig}
        handlers={buttonHandlers}
        isFirstStep={() => currentStep === 0}
        isLastStep={() => currentStep === totalSteps - 1}
        navegadorOptions={navegadorOptions}
        showNavegador={showNavegador}
        onNavegadorClick={() => setShowNavegador(!showNavegador)}
        onNavegadorClose={handleNavegadorClose}
        onNavegadorOption={(option) => {
          alert(`Navegando para: ${option.label}`);
        }}
      />
      </div>
    );
  };

  export default ExemploCompleto;
```

## 🔧 Props API

### ActionButtons Props

| Prop                | Tipo       | Padrão        | Descrição                                                                     |
|---------------------|------------|---------------|-------------------------------------------------------------------------------|
| `buttons`           | `Object`   | `{}`          | Configuração dos botões a exibir                                              |
| `handlers`          | `Object`   | `{}`          | Funções callback para cada botão                                              |
| `isFirstStep`       | `Function` | `() => false` | Função que retorna se é o primeiro step                                       |
| `isLastStep`        | `Function` | `() => false` | Função que retorna se é o último step                                         |
| `navegadorOptions`  | `Array`    | `[]`          | Opções do dropdown navegador                                                  |
| `showNavegador`     | `Boolean`  | `false`       | Estado de visibilidade do dropdown                                            |
| `onNavegadorClick`  | `Function` | `() => {}`    | Callback do clique no botão navegador                                         |
| `onNavegadorOption` | `Function` | `() => {}`    | Callback da seleção de opção do navegador                                     |
| `onNavegadorClose`  | `Function` | `() => {}`    | Callback para fechar o dropdown (acionado ao selecionar opção ou clicar fora) |

### Handlers Esperados

```jsx
const handlers = {
  handleNovo: () => void,      // Callback botão Novo
  handleGravar: () => void,    // Callback botão Gravar  
  handleDeletar: () => void,   // Callback botão Remover
  handleVoltar: () => void,    // Callback botão Voltar
  handleAnterior: () => void,  // Callback botão Anterior
  handleProximo: () => void    // Callback botão Próximo
};
```

## 🎨 Variáveis CSS

O componente usa as seguintes variáveis CSS que você pode customizar:

```css
:root {
  --cor-claro: #ffffff;
  --border-primary: #e5e5e5;
  --border-secondary: #f0f0f0;
  --text-primary: #333333;
  --primary-color: #3b82f6;
}
```

---

# StepperPadrao

## Visão Geral - StepperPadrao

Componente de stepper reutilizável para navegação entre etapas em formulários multi-step.

## Propriedades

| Propriedade    | Tipo      | Padrão      | Descrição                                 |
|----------------|-----------|-------------|-------------------------------------------|
| `steps`        | Array     | `[]`        | Array de objetos com as etapas do stepper |
| `currentStep`  | Number    | `0`         | ID da etapa atual                         |
| `onStepChange` | Function  | `undefined` | Função chamada quando uma etapa é clicada |
| `showStepper`  | Boolean   | `true`      | Controla se o stepper deve ser exibido    |
| `children`     | ReactNode | -           | Conteúdo das etapas                       |

## Estrutura do Array `steps`

Cada objeto no array `steps` deve ter a seguinte estrutura:

```javascript
{
  id: 0,                    // ID único da etapa (não precisa ser sequencial)
  name: 'Nome da Etapa',    // Nome exibido no tooltip
  icon: 'fa-solid fa-icon', // Classe do ícone FontAwesome
  color: '#3b82f6'         // Cor do ícone quando ativo
}
```

## 📖 Uso Básico - StepperPadrao

```jsx
import React, { useState } from 'react';
import StepperPadrao from '@/components/StepperPadrao';

const FormularioCompleto = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 0, name: 'Primeira Tela', icon: 'fa-solid fa-clipboard-list', color: '#3b82f6' },
    { id: 1, name: 'Segunda Tela', icon: 'fa-solid fa-user', color: '#10b981' },
    { id: 2, name: 'Terceira Tela', icon: 'fa-solid fa-users', color: '#8b5cf6' },
    { id: 3, name: 'Quarta Tela', icon: 'fa-solid fa-wrench', color: '#ef4444' }
  ];

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleAnterior = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  const handleProximo = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  return (
    <div>
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      >
        {/* Conteúdo das etapas */}
        <div>
          {currentStep === 0 && <div>Conteúdo Primeira Tela</div>}
          {currentStep === 1 && <div>Conteúdo Segunda Tela</div>}
          {currentStep === 2 && <div>Conteúdo Terceira Tela</div>}
          {currentStep === 3 && <div>Conteúdo Quarta Tela</div>}
        </div>
      </StepperPadrao>

      {/* Botões de navegação */}
      <div>
        <button onClick={handleAnterior} disabled={currentStep === 0}>
          Anterior
        </button>
        <button onClick={handleProximo} disabled={currentStep === 3}>
          Próximo
        </button>
      </div>
    </div>
  );
};
```

## Exemplo com Navegação Programática

```jsx
import React, { useState } from 'react';
import StepperPadrao from '@/components/StepperPadrao';

const FormularioCompleto = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 0, name: 'Plano', icon: 'fa-solid fa-clipboard-list', color: '#3b82f6' },
    { id: 1, name: 'Faixa Titular', icon: 'fa-solid fa-user', color: '#10b981' },
    { id: 2, name: 'Faixa Dependente', icon: 'fa-solid fa-users', color: '#8b5cf6' },
    { id: 3, name: 'Produto/Serviço', icon: 'fa-solid fa-wrench', color: '#ef4444' }
  ];

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleAnterior = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleProximo = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div>
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      >
        {/* Conteúdo das etapas */}
        <div>
          {currentStep === 0 && <div>Conteúdo do Plano</div>}
          {currentStep === 1 && <div>Conteúdo da Faixa Titular</div>}
          {currentStep === 2 && <div>Conteúdo da Faixa Dependente</div>}
          {currentStep === 3 && <div>Conteúdo do Produto/Serviço</div>}
        </div>
      </StepperPadrao>

      {/* Botões de navegação */}
      <div>
        <button onClick={handleAnterior} disabled={currentStep === 0}>
          Anterior
        </button>
        <button onClick={handleProximo} disabled={currentStep === steps.length - 1}>
          Próximo
        </button>
      </div>
    </div>
  );
};
```

## Exemplo Ocultando o Stepper

```jsx
import React, { useState } from 'react';
import StepperPadrao from '@/components/StepperPadrao';

const TelaCondicional = () => {
  const [showStepper, setShowStepper] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 0, name: 'Etapa 1', icon: 'fa-solid fa-star', color: '#3b82f6' },
    { id: 1, name: 'Etapa 2', icon: 'fa-solid fa-heart', color: '#ef4444' }
  ];

  return (
    <div>
      <button onClick={() => setShowStepper(!showStepper)}>
        {showStepper ? 'Ocultar' : 'Mostrar'} Stepper
      </button>
      
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
        showStepper={showStepper}
      >
        <div>Conteúdo da etapa {currentStep + 1}</div>
      </StepperPadrao>
    </div>
  );
};
```

## Características

- **Responsivo**: Adapta-se automaticamente a diferentes tamanhos de tela
- **Acessível**: Suporte a tooltips para melhor usabilidade
- **Customizável**: Cores e ícones personalizáveis por etapa
- **Flexível**: Pode ser ocultado condicionalmente
- **Interativo**: Clique nas etapas para navegar diretamente
- **Mobile-friendly**: Dropdown para dispositivos móveis
- **Navegação por ID**: Usa IDs de etapas em vez de índices para maior flexibilidade

## Comportamento Mobile

Em dispositivos móveis (365px - 767px), o stepper se comporta como um seletor com navegação por setas e dropdown:

1. **Layout Centralizado**: Ícone e título da etapa atual no centro
2. **Navegação por Setas**: Botões de seta nas laterais para navegar
3. **Dropdown no Ícone**: Clique no ícone central para abrir lista completa
4. **Estados Desabilitados**: Setas ficam desabilitadas na primeira/última etapa
5. **Feedback Visual**: Efeitos hover no ícone central e setas
6. **Fechamento Automático**: Dropdown fecha ao clicar fora do stepper

### Layout Mobile

```md
┌─────────────────────────────────┐
│ ◀ [🔵] Nome da Etapa Atual ▶ │ ← Seletor com navegação
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ [🔵] Etapa 1                   │ ← Dropdown (quando ícone clicado)
│ [⚪] Etapa 2                   │
│ [⚪] Etapa 3                   │
│ [⚪] Etapa 4                   │
└─────────────────────────────────┘
```

### Características do Layout Mobile

- **Ícone Centralizado**: 50px de diâmetro com cor da etapa (clicável)
- **Título Centralizado**: Nome da etapa abaixo do ícone
- **Setas de Navegação**: 40px de diâmetro nas laterais
- **Dropdown**: Lista completa ao clicar no ícone central
- **Estados Interativos**: Hover e disabled states
- **Responsivo**: Adapta-se a diferentes larguras de texto
- **Fechamento Intuitivo**: Dropdown fecha ao clicar fora da área do stepper

## Media Queries

O componente utiliza as seguintes breakpoints:

- `@media (min-width: 365px) and (max-width: 767px)`: Layout dropdown para mobile
- `@media (min-width: 768px)`: Layout horizontal para tablet
- `@media (min-width: 1024px)`: Layout otimizado para desktop
- `@media (min-width: 1280px)`: Layout para telas grandes
- `@media (min-width: 1700px)`: Layout para telas muito grandes

## Classes CSS Disponíveis

O componente inclui as seguintes classes CSS que podem ser usadas para customização:

- `.stepperContainer`: Container principal do stepper
- `.stepperWrapper`: Wrapper do componente completo
- `.stepper`: Container dos passos (desktop)
- `.step`: Passo individual
- `.stepIcon`: Ícone do passo
- `.activeStep`: Passo ativo
- `.stepLine`: Linha conectora entre passos
- `.stepperContent`: Container do conteúdo
- `.stepScreen`: Tela individual (para uso com activeScreen/hiddenScreen)
- `.activeScreen`: Tela ativa
- `.hiddenScreen`: Tela oculta
- `.mobileStepper`: Container mobile
- `.mobileStepSelector`: Seletor mobile
- `.mobileNavButton`: Botão de navegação mobile
- `.mobileStepContent`: Conteúdo do passo mobile
- `.mobileStepIcon`: Ícone do passo mobile
- `.mobileStepName`: Nome do passo mobile
- `.mobileDropdown`: Dropdown mobile
- `.mobileDropdownItem`: Item do dropdown mobile
- `.mobileDropdownIcon`: Ícone do item dropdown mobile
- `.mobileDropdownLabel`: Label do item dropdown mobile

### Atualizações futuras

- [ ] Feature - Células editaveis.
- [ ] Correção - rowSelecion funciona apenas no segundo clique ao carregar a tela.

> Última atualização: 21/08/2025 - _miguelanperibeiro@gmail.com_
