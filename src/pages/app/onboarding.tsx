import ClientLayout from '@components/layouts/client-layout';
import StepsCircle from '@components/steps-circle';
import {MetaHeader} from '@components/ui/meta-header';
import {useGetMyOnBoardingSteps} from '@queries/use-onboard-step';
import {useUpdateProfileMutation} from '@queries/use-profile';
import {useGetProfile} from '@queries/use-user';
import {useGetContract, useUpdateMyContract} from '@queries/use-user-contract';
import {uploadFiles} from '@utils/api-client';
import {useUserContractStore} from '@zustand/user.store';
import Link from 'next/link';
import {useState} from 'react';
import ReactMarkdown from 'react-markdown';

const AppOnboardingPage = () => {
  const {activeContract} = useUserContractStore();
  const {data, isLoading} = useGetMyOnBoardingSteps();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [imageUpload] = useState<Blob[]>();
  const {data: userProfile} = useGetProfile({});
  const {mutate: update} = useUpdateProfileMutation();

  const imgFileHandler = async (e: any) => {
    if (e.target.files.length === 0 || !userProfile?.id) {
      return;
    }
    const imgIds = await uploadFiles(e.target.files);
    console.log(imgIds);
    if (imgIds.length === 0) {
      return;
    }
    update({image_profile: imgIds[0], id: userProfile?.id});
  };
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
      case 'video_url': {
        let pos = step?.video_url?.lastIndexOf('youtube.com/watch?v=') ?? -1;
        const short = step?.video_url?.lastIndexOf('youtu.be/') ?? -1;
        if (pos == -1 && short == -1) {
          return (
            <a href={step.video_url} target={'_blank'} className="underline">
              Click here to open link
            </a>
          );
        } else {
          if (pos == -1) {
            pos = short;
          }
          const embeddedlink =
            'https://www.youtube.com/embed/' +
            step?.video_url?.substring(pos + 20);
          return (
            <iframe
              className="w-full aspect-video"
              src={embeddedlink}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          );
        }
      }
      case 'document':
        return (
          <a
            className="underline"
            target={'_blank'}
            href={step?.document?.data?.attributes?.url}
            download={step?.document?.data?.attributes?.name}>
            Download
          </a>
        );
      case 'user_profile_upload_image':
        return (
          <>
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div className="mt-1 flex items-center">
              <div className="h-12 w-12 overflow-hidden rounded-full ">
                {imageUpload && imageUpload?.length > 0 ? (
                  <img
                    className="w-full h-full"
                    src={URL.createObjectURL(imageUpload[0])}
                  />
                ) : userProfile?.image_profile?.data ? (
                  <img
                    className="w-full h-full"
                    src={userProfile.image_profile.data?.attributes?.url}
                  />
                ) : (
                  <span className="h-full w-full bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </div>
              <input
                onChange={imgFileHandler}
                type="file"
                className="ml-5 block text-sm text-gray-600 file:text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200 focus:border-amber-500 focus:ring-amber-500"
              />
            </div>
          </>
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
