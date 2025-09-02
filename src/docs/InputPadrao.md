# Documentação do Componente `InputPadrao`

## Visão Geral - InputPadrao

O componente InputPadrao é uma solução completa para renderizar campos de formulário de forma padronizada. Ele encapsula diferentes tipos de input (texto, senha, data, select, etc.), máscaras de entrada e comportamentos de layout, garantindo um visual e funcionalidade consistentes em toda a aplicação. O componente é construído com base em subcomponentes reutilizáveis, como InputField e InputPadrao, e utiliza um hook personalizado (UseInputMask) para lidar com formatação de entrada.

## 📖 Uso Básico - InputPadrao

Para usar o componente, basta importá-lo e passá-lo as props necessárias, como label, identifier e o tipo de campo (type). Ele lida automaticamente com a renderização do label, input e ícones.

### Props Essenciais

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

### Exemplo de Uso Básico

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
