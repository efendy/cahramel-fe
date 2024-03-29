import ClientLayout from '@components/layouts/client-layout';
import StepsCircle from '@components/steps-circle';
import {useState} from 'react';

const steps = ['Fill in your profile', 'Register your company'];

const AppWelcomePage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  return (
    <ClientLayout>
      <div className="px-4 mt-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Onboarding</h1>
            <p className="mt-2 text-sm text-gray-700">
              The action or process of integrating a new employee into an
              organization or familiarizing a new customer or client with
              one&apos;s products or services.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <StepsCircle
            currentStepIndex={currentStepIndex}
            setCurrentStepIndex={setCurrentStepIndex}
            steps={steps}
          />
          <form className="mt-8 space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              {steps.map((step, stepIdx) =>
                currentStepIndex === stepIdx ? <div>{step}</div> : null,
              )}
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                {currentStepIndex > 0 ? (
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                    type="button"
                    className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Back
                  </button>
                ) : null}

                {currentStepIndex < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                    type="button"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Next
                  </button>
                ) : null}

                {currentStepIndex === steps.length - 1 ? (
                  <button
                    onClick={() => {
                      /* Submit */
                    }}
                    type="button"
                    className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Done
                  </button>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </ClientLayout>
  );
};

export default AppWelcomePage;
