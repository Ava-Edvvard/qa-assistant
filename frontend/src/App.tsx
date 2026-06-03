import React from 'react';
import { DesignProvider, useDesign } from './context/DesignContext';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { StepProgress } from './components/StepProgress';
import { Stage1Requirements } from './views/Stage1Requirements';
import { Stage2TraceMatrix } from './views/Stage2TraceMatrix';
import { Stage3Questions } from './views/Stage3Questions';
import { Stage4TestScenarios } from './views/Stage4TestScenarios';
import { Stage5Comparison } from './views/Stage5Comparison';
import { StageOutput } from './views/StageOutput';

const MainLayout: React.FC = () => {
  const { mode, currentStage } = useDesign();

  // Define steps titles based on mode
  const newDesignStages = [
    'Ввод требований',
    'Матрица требований',
    'Вопросы ИИ',
    'Генерация сценариев',
    'Результаты'
  ];

  const existingDesignStages = [
    'Ввод требований',
    'Матрица требований',
    'Вопросы ИИ',
    'Генерация сценариев',
    'Сравнение',
    'Результаты'
  ];

  const activeStages = mode === 'existing' ? existingDesignStages : newDesignStages;

  // Render correct view according to the active stage
  const renderStageView = () => {
    switch (currentStage) {
      case 1:
        return <Stage1Requirements />;
      case 2:
        return <Stage2TraceMatrix />;
      case 3:
        return <Stage3Questions />;
      case 4:
        return <Stage4TestScenarios />;
      case 5:
        return mode === 'existing' ? <Stage5Comparison /> : <StageOutput />;
      case 6:
        return mode === 'existing' ? <StageOutput /> : null;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <Header />
      
      <main style={{ paddingBottom: '80px' }}>
        {mode === null ? (
          <Dashboard />
        ) : (
          <div className="container animated-in">
            <StepProgress stages={activeStages} currentStage={currentStage} />
            {renderStageView()}
          </div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DesignProvider>
      <MainLayout />
    </DesignProvider>
  );
};

export default App;
