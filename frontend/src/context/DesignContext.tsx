import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Definitions matching Pydantic schemas
export interface Requirement {
  id: string;
  description: string;
  cases_count: number;
}

export interface ClarifyingQuestion {
  id: string;
  requirement_id: string;
  question: string;
}

export interface UserAnswer {
  question_id: string;
  question: string;
  answer: string;
}

export interface TestScenario {
  id: string;
  name: string;
  priority: string;
  preconditions: string[];
  steps: string[];
  expected_results: string[];
  coverage: string[];
}

export type DesignMode = 'new' | 'existing';

interface DesignContextType {
  mode: DesignMode | null;
  currentStage: number;
  requirements: Requirement[];
  questions: ClarifyingQuestion[];
  answers: UserAnswer[];
  scenarios: TestScenario[];
  comparisonReport: string;
  oldScenariosText: string;
  additionalInfoText: string;
  rawRequirementsText: string;
  loading: boolean;
  error: string | null;
  
  // Actions
  startNewDesign: () => void;
  startExistingDesign: () => void;
  setStage: (stage: number) => void;
  prevStage: () => void;
  nextStage: () => void;
  resetSession: () => void;
  
  // Stage 1 Actions
  parseRequirements: (text: string, additionalInfo: string, oldScenarios?: string, files?: File[]) => Promise<void>;
  
  // Stage 2 Actions
  setRequirements: (reqs: Requirement[]) => void;
  addRequirement: (desc: string) => void;
  editRequirement: (id: string, desc: string) => void;
  deleteRequirement: (id: string) => void;
  
  // Stage 3 Actions
  fetchQuestions: () => Promise<void>;
  submitAnswer: (questionId: string, answer: string) => void;
  skipQuestion: (questionId: string) => void;
  
  // Stage 4 Actions
  generateTestScenarios: () => Promise<void>;
  setScenarios: (scenarios: TestScenario[]) => void;
  addScenario: (scenario: TestScenario) => void;
  editScenario: (id: string, updated: Partial<TestScenario>) => void;
  deleteScenario: (id: string) => void;
  
  // Stage 5 Actions (Existing Design)
  compareTestScenarios: () => Promise<void>;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

const API_BASE = 'http://127.0.0.1:8000/api';

export const DesignProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<DesignMode | null>(null);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [requirements, setRequirementsState] = useState<Requirement[]>([]);
  const [questions, setQuestions] = useState<ClarifyingQuestion[]>([]);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [scenarios, setScenariosState] = useState<TestScenario[]>([]);
  const [comparisonReport, setComparisonReport] = useState<string>('');
  const [oldScenariosText, setOldScenariosText] = useState<string>('');
  const [additionalInfoText, setAdditionalInfoText] = useState<string>('');
  const [rawRequirementsText, setRawRequirementsText] = useState<string>('');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const startNewDesign = () => {
    resetSession();
    setMode('new');
    setCurrentStage(1);
  };

  const startExistingDesign = () => {
    resetSession();
    setMode('existing');
    setCurrentStage(1);
  };

  const setStage = (stage: number) => {
    setCurrentStage(stage);
  };

  const prevStage = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  const nextStage = () => {
    const maxStages = mode === 'existing' ? 6 : 5;
    if (currentStage < maxStages) {
      setCurrentStage(currentStage + 1);
    }
  };

  const resetSession = () => {
    setMode(null);
    setCurrentStage(1);
    setRequirementsState([]);
    setQuestions([]);
    setAnswers([]);
    setScenariosState([]);
    setComparisonReport('');
    setOldScenariosText('');
    setAdditionalInfoText('');
    setRawRequirementsText('');
    setError(null);
    setLoading(false);
  };

  // Stage 1: Parse requirements and file uploads
  const parseRequirements = async (
    text: string,
    additionalInfo: string,
    oldScenarios?: string,
    files?: File[]
  ) => {
    setLoading(true);
    setError(null);
    setRawRequirementsText(text);
    setAdditionalInfoText(additionalInfo);
    if (oldScenarios) setOldScenariosText(oldScenarios);

    const formData = new FormData();
    formData.append('requirements_text', text);
    if (additionalInfo) formData.append('additional_info', additionalInfo);
    
    if (files) {
      files.forEach((file) => {
        formData.append('files', file);
      });
    }

    try {
      const response = await axios.post(`${API_BASE}/design/parse-requirements`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setRequirementsState(response.data.requirements);
      nextStage();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка парсинга требований');
    } finally {
      setLoading(false);
    }
  };

  // Stage 2: Matrix row manipulation
  const setRequirements = (reqs: Requirement[]) => {
    setRequirementsState(reqs);
  };

  const addRequirement = (desc: string) => {
    const nextIdNum = requirements.length + 1;
    const nextId = `RQ-${nextIdNum < 10 ? '0' + nextIdNum : nextIdNum}`;
    const newReq: Requirement = {
      id: nextId,
      description: desc,
      cases_count: 0,
    };
    setRequirementsState([...requirements, newReq]);
  };

  const editRequirement = (id: string, desc: string) => {
    setRequirementsState(
      requirements.map((req) => (req.id === id ? { ...req, description: desc } : req))
    );
  };

  const deleteRequirement = (id: string) => {
    setRequirementsState(requirements.filter((req) => req.id !== id));
  };

  // Stage 3: Fetch clarifying questions
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/llm/generate-questions`, {
        requirements,
      });
      setQuestions(response.data.questions);
      setAnswers([]);
      nextStage();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка генерации вопросов');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = (questionId: string, answerText: string) => {
    const q = questions.find((item) => item.id === questionId);
    if (q) {
      const newAnswer: UserAnswer = {
        question_id: questionId,
        question: q.question,
        answer: answerText,
      };
      setAnswers([...answers, newAnswer]);
      // Remove from the active questions queue
      setQuestions(questions.filter((item) => item.id !== questionId));
    }
  };

  const skipQuestion = (questionId: string) => {
    const qIndex = questions.findIndex((item) => item.id === questionId);
    if (qIndex !== -1) {
      const q = questions[qIndex];
      const updatedQueue = [...questions];
      // Remove from current position and push to the back
      updatedQueue.splice(qIndex, 1);
      updatedQueue.push(q);
      setQuestions(updatedQueue);
    }
  };

  // Stage 4: Generate Test Scenarios
  const generateTestScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/llm/generate-scenarios`, {
        requirements,
        answers,
      });
      
      const generatedScenarios = response.data.scenarios;
      
      // Update requirements cases count based on coverage
      const updatedReqs = requirements.map((req) => {
        const matchingCasesCount = generatedScenarios.filter((sc: TestScenario) => 
          sc.coverage.includes(req.id)
        ).length;
        return { ...req, cases_count: matchingCasesCount };
      });
      
      setRequirementsState(updatedReqs);
      setScenariosState(generatedScenarios);
      nextStage();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка генерации тест-сценариев');
    } finally {
      setLoading(false);
    }
  };

  const setScenarios = (newScenarios: TestScenario[]) => {
    setScenariosState(newScenarios);
    
    // Recalculate requirements cases count
    const updatedReqs = requirements.map((req) => {
      const count = newScenarios.filter((sc) => sc.coverage.includes(req.id)).length;
      return { ...req, cases_count: count };
    });
    setRequirementsState(updatedReqs);
  };

  const addScenario = (newSc: TestScenario) => {
    const updated = [...scenarios, newSc];
    setScenarios(updated);
  };

  const editScenario = (id: string, updatedFields: Partial<TestScenario>) => {
    const updated = scenarios.map((sc) => (sc.id === id ? { ...sc, ...updatedFields } : sc));
    setScenarios(updated);
  };

  const deleteScenario = (id: string) => {
    const updated = scenarios.filter((sc) => sc.id !== id);
    setScenarios(updated);
  };

  // Stage 5: Compare old vs new scenarios (only in 'existing' mode)
  const compareTestScenarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE}/llm/compare-scenarios`, {
        old_scenarios_text: oldScenariosText,
        new_scenarios: scenarios,
      });
      setComparisonReport(response.data.changes_summary);
      nextStage();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Ошибка сравнения тест-сценариев');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DesignContext.Provider
      value={{
        mode,
        currentStage,
        requirements,
        questions,
        answers,
        scenarios,
        comparisonReport,
        oldScenariosText,
        additionalInfoText,
        rawRequirementsText,
        loading,
        error,
        
        startNewDesign,
        startExistingDesign,
        setStage,
        prevStage,
        nextStage,
        resetSession,
        
        parseRequirements,
        setRequirements,
        addRequirement,
        editRequirement,
        deleteRequirement,
        
        fetchQuestions,
        submitAnswer,
        skipQuestion,
        
        generateTestScenarios,
        setScenarios,
        addScenario,
        editScenario,
        deleteScenario,
        
        compareTestScenarios,
      }}
    >
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};
