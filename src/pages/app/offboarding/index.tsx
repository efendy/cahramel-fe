import ClientLayout from "@components/layouts/client-layout"
import StepsCircle from "@components/steps-circle";
import Head from "next/head";
import { useState } from "react";

const AppOffboardingPage = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const steps = [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5",
    "Step 6",
    "Step 7",
    "Step 8",
    "Step 9",
    "Step 10",
  ]

  return (
    <>
      <Head>
        <title>Offboarding</title>
      </Head>
      <ClientLayout>
        <div className="px-4 mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Offboarding</h1>
              <p className="mt-2 text-sm text-gray-700">
                The reverse of onboarding, and it involves separating an employee from a firm. This can include a process for sharing knowledge with other employees.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <StepsCircle currentStepIndex={currentStepIndex} setCurrentStepIndex={setCurrentStepIndex} steps={steps} />
            <form className="mt-8 space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                {steps.map((step, stepIdx) => (
                  currentStepIndex === stepIdx ? (
                    <div>{step} WIP</div>
                  ) : null
                ))}
              </div>

              <div className="pt-5">
                <div className="flex justify-end">
                  {currentStepIndex > 0 ? (
                    <button
                      onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                      type="button"
                      className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Back
                    </button>
                  ) : null}

                  {currentStepIndex < steps.length - 1 ? (
                    <button
                      onClick={() => setCurrentStepIndex(currentStepIndex + 1)}
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Next
                    </button>
                  ) : null}

                  {currentStepIndex === steps.length - 1 ? (
                    <button
                      onClick={() => {/* Submit */ }}
                      type="button"
                      className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Done
                    </button>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </ClientLayout>
    </>
  )
};

export default AppOffboardingPage;
