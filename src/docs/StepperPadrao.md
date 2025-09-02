# StepperPadrao

Componente de stepper reutilizável para navegação entre etapas em formulários multi-step.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `steps` | Array | `[]` | Array de objetos com as etapas do stepper |
| `currentStep` | Number | `0` | ID da etapa atual |
| `onStepChange` | Function | `undefined` | Função chamada quando uma etapa é clicada |
| `showStepper` | Boolean | `true` | Controla se o stepper deve ser exibido |
| `children` | ReactNode | - | Conteúdo das etapas |

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

## Exemplo de Uso Básico

```jsx
import React, { useState } from 'react';
import StepperPadrao from '@/components/StepperPadrao';

const MinhaTela = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { id: 0, name: 'Dados Básicos', icon: 'fa-solid fa-user', color: '#3b82f6' },
    { id: 1, name: 'Configurações', icon: 'fa-solid fa-cog', color: '#10b981' },
    { id: 2, name: 'Revisão', icon: 'fa-solid fa-check', color: '#8b5cf6' }
  ];

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  return (
    <div>
      <h1>Meu Formulário</h1>
      
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
      >
        {currentStep === 0 && (
          <div>
            <h2>Dados Básicos</h2>
            {/* Conteúdo da primeira etapa */}
          </div>
        )}
        
        {currentStep === 1 && (
          <div>
            <h2>Configurações</h2>
            {/* Conteúdo da segunda etapa */}
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2>Revisão</h2>
            {/* Conteúdo da terceira etapa */}
          </div>
        )}
      </StepperPadrao>
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
        <button onClick={handleProximo} disabled={currentStep === 3}>
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

```text
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
