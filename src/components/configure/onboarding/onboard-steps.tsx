import StepsCircle from '@components/steps-circle';
import {Button} from '@components/ui/button';
import {useGetOnBoardingSteps} from '@queries/use-onboard-step';
import React, {useMemo, useState} from 'react';
import {EditOnBoardStep} from './edit-onboard-step';

export const OnboardSteps = ({onBoardId}: {onBoardId: number}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [steps, setSteps] = useState<string[]>([]);

  const {data: onboardingSteps, isLoading} = useGetOnBoardingSteps(onBoardId, {
    onSuccess: newData => {
      if (newData?.length === 0) {
        return;
      }
      setSteps(newData?.map(x => x?.type));
    },
  });
  const isCreating = onboardingSteps && steps.length > onboardingSteps?.length;

  const handleCreateStep = () => {
    setActiveStepIndex(steps.length);
    setSteps(currSteps => {
      const nextStep = (currSteps.length + 1).toString();
      return [...currSteps, nextStep];
    });
  };

  const activeStep = useMemo(
    () => onboardingSteps?.find((_, i) => i === activeStepIndex),
    [activeStepIndex, onboardingSteps],
  );
  const prevOrder = onboardingSteps?.[onboardingSteps?.length - 1]?.order;

  if (isLoading) {
    return (
      <div
        className="flex center justify-center mt-4"
        aria-label="Loading..."
        role="status">
        <svg className="h-10 w-10 animate-spin" viewBox="3 3 18 18">
          <path
            className="fill-gray-200"
            d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"></path>
          <path
            className="fill-gray-800"
            d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"></path>
        </svg>
      </div>
    );
  }

  console.log('activeStepIndex', activeStepIndex);

  return (
    <div className="mt-10">
      <StepsCircle
        currentStepIndex={activeStepIndex}
        setCurrentStepIndex={setActiveStepIndex}
        steps={steps}
      />
      {/* showing next step order  */}
      {!isCreating ? (
        <Button
          onClick={handleCreateStep}
          className="mb-3 mr-8 ml-auto border-primary bg-slate-50 text-black hover:bg-slate-200">
          Create New Step {steps.length + 1}
        </Button>
      ) : null}
      {activeStepIndex >= 0 ? (
        <EditOnBoardStep
          step={activeStepIndex}
          onBardStepId={activeStep?.id}
          onBoardId={onBoardId}
          prevOrder={prevOrder}
        />
      ) : null}
    </div>
  );
};
