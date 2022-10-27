/* This example requires Tailwind CSS v2.0+ */
import {CheckIcon} from '@heroicons/react/20/solid';

export interface StepsCircleProps {
  currentStepIndex: number;
  setCurrentStepIndex: any;
  steps: string[];
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const StepsCircle = ({
  currentStepIndex,
  setCurrentStepIndex,
  steps,
}: StepsCircleProps) => {
  return (
    <nav aria-label="Progress" className="flex w-full justify-center">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step}
            className={classNames(
              stepIdx !== steps.length - 1 ? 'pr-4 sm:pr-6 lg:pr-10' : '',
              'relative',
            )}>
            {currentStepIndex > stepIdx ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true">
                  <div className="h-0.5 w-full bg-amber-600" />
                </div>
                <a
                  onClick={() => setCurrentStepIndex(stepIdx)}
                  className="relative flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full bg-amber-600 hover:bg-amber-900">
                  <CheckIcon
                    className="h-3 w-3 lg:h-5 lg:w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step}</span>
                </a>
              </>
            ) : currentStepIndex === stepIdx ? (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full border-2 border-amber-600 bg-white"
                  aria-current="step">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-amber-600"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step}</span>
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-6 w-6 lg:h-8 lg:w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-transparent bg-gray-300"
                    aria-hidden="true"
                  />
                  <span className="sr-only">{step}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepsCircle;
