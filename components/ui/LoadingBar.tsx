'use client';

import { useState, useEffect } from 'react';

const parameters = [
  "Fetching RTI Data...", "Verifying AIR Mapping...", "Checking Hostel Fees...",
  "Analyzing Bond Penalty...", "Validating Stipend...", "OPD Flow Audit...",
  "Seat Matrix Scan...", "State Quota Logic...", "Category Inflation...",
  "Mahaguru Intelligence...", "Finalizing Verdict..."
];

export function LoadingBar({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < 11) {
      const timer = setTimeout(() => setCurrentStep(s => s + 1), 400);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4 py-10">
      <div className="flex justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-[#06B6D4]">
        <span>Analyzing Parameter {currentStep + 1}/11</span>
        <span>{Math.round((currentStep / 11) * 100)}%</span>
      </div>
      
      <div className="flex gap-1 h-3">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-300 rounded-sm ${
              i <= currentStep ? 'bg-[#06B6D4] shadow-[0_0_10px_#06B6D4]' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
      
      <p className="text-center font-mono text-xs text-slate-400 animate-pulse">
        {parameters[currentStep] || "Analysis Complete"}
      </p>
    </div>
  );
}