import { useState } from "react";

export function useMultistepForm(steps) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    const nextStep = () => {
        setCurrentStepIndex((i) => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    };

    const backStep = () => {
        setCurrentStepIndex((i) => {
            if (i <= 0) return i;
            return i - 1;
        });
    };

    const goTo = (index) => {
        setCurrentStepIndex(index);
    };

    return {
        currentStepIndex,
        currentStep: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === steps.length - 1,
        goTo,
        nextStep,
        backStep,
    };
}
