# StepperPadrao

Componente de stepper reutilizável para navegação entre etapas em formulários multi-step com suporte a condições dinâmicas.

## Propriedades

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `steps` | Array | `[]` | Array de objetos com as etapas do stepper |
| `currentStep` | Number | `0` | ID da etapa atual |
| `onStepChange` | Function | `undefined` | Função chamada quando uma etapa é clicada |
| `showStepper` | Boolean | `true` | Controla se o stepper deve ser exibido |
| `stepConditions` | Object | `{}` | Objeto com condições para cada etapa (`'disabled'` ou `'invisible'`) |
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

## Estados das Etapas (`stepConditions`)

O objeto `stepConditions` permite definir diferentes estados para as etapas:

```javascript
const stepConditions = {
  1: 'disabled',   // Etapa visível mas não clicável (aparece com indicador visual)
  2: 'invisible',  // Etapa completamente oculta (não aparece no stepper)
  4: 'disabled'    // Outra etapa desabilitada
}
```

### Estados Disponíveis:
- **Normal** (sem condição): Etapa visível e clicável
- **`'disabled'`**: Etapa visível com opacidade reduzida e linha diagonal, não clicável
- **`'invisible'`**: Etapa não aparece no stepper

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

## Exemplo com Condições Dinâmicas

```jsx
import React, { useState } from 'react';
import StepperPadrao from '@/components/StepperPadrao';

const FormularioCondicional = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [utilizaFaixaIdade, setUtilizaFaixaIdade] = useState(false);
  const [adicionaDependentes, setAdicionaDependentes] = useState(true);
  const [cobraDependentes, setCobraDependentes] = useState(false);
  const [utilizaVigencia, setUtilizaVigencia] = useState(false);
  
  const steps = [
    { id: 0, name: 'Plano', icon: 'fa-solid fa-clipboard-list', color: '#3b82f6' },
    { id: 1, name: 'Faixa do Titular', icon: 'fa-solid fa-user', color: '#10b981' },
    { id: 2, name: 'Faixa do Dependente', icon: 'fa-solid fa-child', color: '#8b5cf6' },
    { id: 3, name: 'Produto/Serviço', icon: 'fa-solid fa-wrench', color: '#ef4444' },
    { id: 4, name: 'Vigência/Limite', icon: 'fa-solid fa-calendar', color: '#f59e0b' },
    { id: 5, name: 'Comissionamento', icon: 'fa-solid fa-dollar-sign', color: '#10b981' }
  ];

  // Definir condições baseadas no estado da aplicação
  const getStepConditions = () => {
    const conditions = {};

    // Step 1: Faixa Titular - invisible se não utiliza faixa de idade
    if (!utilizaFaixaIdade) {
      conditions[1] = 'invisible';
    }

    // Step 2: Faixa Dependente - invisible se não adiciona OU não cobra dependentes
    if (!adicionaDependentes || !cobraDependentes) {
      conditions[2] = 'invisible';
    }

    // Step 4: Vigência - disabled se não utiliza vigência (visível mas não clicável)
    if (!utilizaVigencia) {
      conditions[4] = 'disabled';
    }

    return conditions;
  };

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  const handleToggleChange = (toggleName, value) => {
    switch (toggleName) {
      case 'utilizaFaixaIdade':
        setUtilizaFaixaIdade(value);
        // Se desabilitar faixa de idade e estiver no step 1, voltar para step 0
        if (!value && currentStep === 1) {
          setCurrentStep(0);
        }
        break;
      case 'adicionaDependentes':
        setAdicionaDependentes(value);
        // Se desabilitar dependentes e estiver no step 2, ir para step 3
        if (!value && currentStep === 2) {
          setCurrentStep(3);
        }
        break;
      case 'cobraDependentes':
        setCobraDependentes(value);
        // Se desabilitar cobrança de dependentes e estiver no step 2, ir para step 3
        if (!value && currentStep === 2) {
          setCurrentStep(3);
        }
        break;
      case 'utilizaVigencia':
        setUtilizaVigencia(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>Formulário com Condições</h1>
      
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        stepConditions={getStepConditions()}
      >
        {currentStep === 0 && (
          <div>
            <h2>Configuração do Plano</h2>
            
            {/* Toggles que controlam as condições */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={utilizaFaixaIdade}
                  onChange={(e) => handleToggleChange('utilizaFaixaIdade', e.target.checked)}
                />
                Utiliza Faixa de Idade (mostra/oculta Step 1)
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={adicionaDependentes}
                  onChange={(e) => handleToggleChange('adicionaDependentes', e.target.checked)}
                />
                Adiciona Dependentes
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={cobraDependentes}
                  onChange={(e) => handleToggleChange('cobraDependentes', e.target.checked)}
                />
                Cobra Dependentes (mostra/oculta Step 2)
              </label>
              
              <label>
                <input
                  type="checkbox"
                  checked={utilizaVigencia}
                  onChange={(e) => handleToggleChange('utilizaVigencia', e.target.checked)}
                />
                Utiliza Vigência (habilita/desabilita Step 4)
              </label>
            </div>
          </div>
        )}
        
        {currentStep === 1 && (
          <div>
            <h2>Faixa do Titular por Idade</h2>
            <p>Esta etapa só aparece se "Utiliza Faixa de Idade" estiver marcado.</p>
          </div>
        )}
        
        {currentStep === 2 && (
          <div>
            <h2>Faixa do Dependente por Idade</h2>
            <p>Esta etapa só aparece se "Adiciona Dependentes" E "Cobra Dependentes" estiverem marcados.</p>
          </div>
        )}
        
        {currentStep === 3 && (
          <div>
            <h2>Produto/Serviço</h2>
            <p>Esta etapa sempre aparece.</p>
          </div>
        )}
        
        {currentStep === 4 && (
          <div>
            <h2>Vigência/Limite de Transmissão</h2>
            <p>Esta etapa fica desabilitada se "Utiliza Vigência" não estiver marcado.</p>
          </div>
        )}
        
        {currentStep === 5 && (
          <div>
            <h2>Comissionamento</h2>
            <p>Esta etapa sempre aparece.</p>
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
  const [stepConditions, setStepConditions] = useState({});
  
  const steps = [
    { id: 0, name: 'Plano', icon: 'fa-solid fa-clipboard-list', color: '#3b82f6' },
    { id: 1, name: 'Faixa Titular', icon: 'fa-solid fa-user', color: '#10b981' },
    { id: 2, name: 'Faixa Dependente', icon: 'fa-solid fa-users', color: '#8b5cf6' },
    { id: 3, name: 'Produto/Serviço', icon: 'fa-solid fa-wrench', color: '#ef4444' }
  ];

  const handleStepChange = (stepId) => {
    setCurrentStep(stepId);
  };

  // Função para encontrar o próximo step válido (não invisible)
  const getNextValidStep = () => {
    const visibleSteps = steps.filter(step => stepConditions[step.id] !== 'invisible');
    const currentIndex = visibleSteps.findIndex(step => step.id === currentStep);
    return currentIndex < visibleSteps.length - 1 ? visibleSteps[currentIndex + 1].id : null;
  };

  // Função para encontrar o step anterior válido (não invisible)
  const getPreviousValidStep = () => {
    const visibleSteps = steps.filter(step => stepConditions[step.id] !== 'invisible');
    const currentIndex = visibleSteps.findIndex(step => step.id === currentStep);
    return currentIndex > 0 ? visibleSteps[currentIndex - 1].id : null;
  };

  const handleAnterior = () => {
    const prevStep = getPreviousValidStep();
    if (prevStep !== null) {
      setCurrentStep(prevStep);
    }
  };

  const handleProximo = () => {
    const nextStep = getNextValidStep();
    if (nextStep !== null) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <div>
      <StepperPadrao
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        stepConditions={stepConditions}
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
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
        <button 
          onClick={handleAnterior} 
          disabled={getPreviousValidStep() === null}
        >
          Anterior
        </button>
        <button 
          onClick={handleProximo} 
          disabled={getNextValidStep() === null}
        >
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
- **Condições Dinâmicas**: Suporte a etapas condicionais (disabled/invisible)
- **Navegação Inteligente**: Pula automaticamente etapas invisíveis/desabilitadas
- **Indicadores Visuais**: Estados disabled com feedback visual claro

## Comportamento das Condições

### Estados Visuais:
- **Normal**: Ícone colorido, clicável, sem restrições
- **Disabled**: Ícone acinzentado com linha diagonal, tooltip informativo, não clicável
- **Invisible**: Não aparece no stepper

### Navegação Automática:
- Botões anterior/próximo pulam etapas invisíveis automaticamente
- Clique em etapas desabilitadas não executa `onStepChange`
- Tooltips mostram "(Desabilitado)" para etapas com estado disabled

## Comportamento Mobile

Em dispositivos móveis (365px - 767px), o stepper se comporta como um seletor com navegação por setas e dropdown:

1. **Layout Centralizado**: Ícone e título da etapa atual no centro
2. **Navegação por Setas**: Botões de seta nas laterais para navegar (pulam etapas invisíveis)
3. **Dropdown no Ícone**: Clique no ícone central para abrir lista de etapas visíveis
4. **Estados Desabilitados**: Etapas disabled aparecem no dropdown mas não são clicáveis
5. **Feedback Visual**: Efeitos hover no ícone central e setas
6. **Fechamento Automático**: Dropdown fecha ao clicar fora do stepper

### Layout Mobile

```
┌─────────────────────────────────┐
│ ◀ [🔵] Nome da Etapa Atual ▶ │ ← Seletor com navegação
└─────────────────────────────────┘
┌─────────────────────────────────┐
│ [🔵] Etapa 1                   │ ← Dropdown (apenas etapas visíveis)
│ [🚫] Etapa 2 (Desabilitada)   │ ← Etapa disabled
│ [⚪] Etapa 3                   │
└─────────────────────────────────┘
```

## Media Queries

O componente utiliza as seguintes breakpoints:
- `@media (min-width: 365px) and (max-width: 767px)`: Layout dropdown para mobile
- `@media (min-width: 768px)`: Layout horizontal para tablet
- `@media (min-width: 1024px)`: Layout otimizado para desktop
- `@media (min-width: 1280px)`: Layout para telas grandes
- `@media (min-width: 1650px)`: Layout para telas muito grandes

## Classes CSS Disponíveis

O componente inclui as seguintes classes CSS que podem ser usadas para customização:

### Classes Principais:
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

### Classes Mobile:
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