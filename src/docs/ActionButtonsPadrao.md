# ActionButtons Component

Um componente React reutilizável para criar barras de ação com botões personalizáveis e layout responsivo. Ideal para footers de páginas com ações comuns como criar, salvar, remover, navegar, etc.

## 📋 Características

- ✅ **7 botões pré-definidos** com ícones e cores padrão
- ✅ **Totalmente personalizável** (nome, ícone, cor)
- ✅ **Layout responsivo** (grid em mobile, flexbox em desktop)
- ✅ **Dropdown navegador** com opções customizáveis
- ✅ **Fechamento automático do dropdown** ao clicar fora ou selecionar uma opção
- ✅ **Navegação por steps** (anterior/próximo)
- ✅ **CSS Modules** com variáveis CSS customizadas

## 🚀 Instalação

```bash
npm install # suas dependências
```

Certifique-se de ter o Font Awesome instalado para os ícones:

```html
<!-- No seu HTML ou import no seu CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

## 📖 Uso Básico

```jsx
import React from 'react';
import ActionButtons from './components/ActionButtons';

const MinhaPagina = () => {
  const handleNovo = () => console.log('Novo item');
  const handleSalvar = () => console.log('Salvando...');
  const handleVoltar = () => history.back();

  return (
    <div>
      <h1>Minha Página</h1>
      
      {/* Footer com botões */}
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

| Botão     | Nome Padrão | Ícone Padrão           | Cor Padrão |
|-----------|-------------|------------------------|------------|
| novo      | Novo        | fa-solid fa-plus       | #3b82f6    |
| gravar    | Gravar      | fa-solid fa-save       | #10b981    |
| remover   | Remover     | fa-solid fa-trash      | #ef4444    |
| voltar    | Voltar      | fa-solid fa-arrow-left | #6b7280    |
| anterior  | Anterior    | fa-solid fa-chevron-left | #dc2626  |
| proximo   | Próximo     | fa-solid fa-chevron-right | #059669 |
| navegador | Navegador   | fa-solid fa-caret-up   | #7c3aed    |

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

| Prop | Tipo | Padrão | Descrição |
|------|------|---------|-----------|
| `buttons` | `Object` | `{}` | Configuração dos botões a exibir |
| `handlers` | `Object` | `{}` | Funções callback para cada botão |
| `isFirstStep` | `Function` | `() => false` | Função que retorna se é o primeiro step |
| `isLastStep` | `Function` | `() => false` | Função que retorna se é o último step |
| `navegadorOptions` | `Array` | `[]` | Opções do dropdown navegador |
| `showNavegador` | `Boolean` | `false` | Estado de visibilidade do dropdown |
| `onNavegadorClick` | `Function` | `() => {}` | Callback do clique no botão navegador |
| `onNavegadorOption` | `Function` | `() => {}` | Callback da seleção de opção do navegador |
| `onNavegadorClose` | `Function` | `() => {}` | Callback para fechar o dropdown (acionado ao selecionar opção ou clicar fora) |

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

## 📄 Licença

MIT License - use como quiser! 🚀