import ClientLayout from '@components/layouts/client-layout';
import StepsCircle from '@components/steps-circle';
import {MetaHeader} from '@components/ui/meta-header';
import {useGetMyOnBoardingSteps} from '@queries/use-onboard-step';
import {useGetContract, useUpdateMyContract} from '@queries/use-user-contract';
import {useUserContractStore} from '@zustand/user.store';
import Link from 'next/link';
import {useState} from 'react';
import ReactMarkdown from 'react-markdown';

const AppOnboardingPage = () => {
  const {activeContract} = useUserContractStore();
  const {data, isLoading} = useGetMyOnBoardingSteps();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  useGetContract(activeContract?.id, {
    onSuccess: newData => {
      const indexOfContract = data?.findIndex(
        x => x.order === newData?.current_onboard_order,
      );
      if (!indexOfContract) {
        return;
      }
      setCurrentStepIndex(indexOfContract);
    },
    enabled: !!activeContract?.id && !!data && data?.length > 0,
  });
  const steps = data?.map(x => x.type) ?? [];

  const {mutate} = useUpdateMyContract();

  const renderStepContent = (
    type: Exclude<typeof data, undefined>[number]['type'],
    step: Exclude<typeof data, undefined>[number],
  ) => {
    switch (type) {
      case 'image':
        return (
          <img
            src={step?.image?.data?.attributes?.url}
            className="w-10/12 h-auto"
          />
        );
      case 'video_url':
        return (
          <a href={step.video_url} target={'_blank'} className="underline">
            Click here to open link
          </a>
        );
      case 'document':
        return (
          <a
            className="underline"
            target={'_blank'}
            href={step?.document?.data?.attributes?.url}
            download={step?.document?.data?.attributes?.name}>
            Download this document
          </a>
        );
      case 'user_profile_update_data':
        return (
          <Link href={'/user'}>
            <a className="underline">Go to profile to update your info</a>
          </Link>
        );
      default:
        return null;
    }
  };

  const setStepIndex = (index: number) => {
    const stepIndex = data?.find((_, i) => i === index);
    if (!stepIndex) {
      return;
    }
    mutate({
      current_onboard_order: stepIndex.order + 1,
    });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <MetaHeader title="Onboarding" />
      <ClientLayout>
        <div className="px-4 mt-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Onboarding
              </h1>
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
                {data &&
                  data.map((step, stepIdx) =>
                    currentStepIndex === stepIdx ? (
                      <div>
                        <ReactMarkdown className="prose">
                          {step.content}
                        </ReactMarkdown>
                        <div>{step.type}</div>
                        {renderStepContent(step.type, step)}
                      </div>
                    ) : null,
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
                      onClick={() => {
                        setStepIndex(currentStepIndex);
                        setCurrentStepIndex(currentStepIndex + 1);
                      }}
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
    </>
  );
};

export default AppOnboardingPage;
