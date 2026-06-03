import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressProps {
  stages: string[];
  currentStage: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ stages, currentStage }) => {
  const progressPercent = ((currentStage - 1) / (stages.length - 1)) * 100;

  return (
    <div className="steps-container">
      <div className="steps-line">
        <div 
          className="steps-line-progress" 
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      {stages.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStage === stepNum;
        const isCompleted = currentStage > stepNum;
        
        let itemClass = "step-item";
        if (isActive) itemClass += " active";
        if (isCompleted) itemClass += " completed";

        return (
          <div key={label} className={itemClass}>
            <div className="step-dot">
              {isCompleted ? (
                <Check size={18} strokeWidth={3} />
              ) : (
                <span>{stepNum}</span>
              )}
            </div>
            <div className="step-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
};
