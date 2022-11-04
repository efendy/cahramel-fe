import {OnBoardStepTypes} from '@interfaces/onboarding';

export const TypeOptions: {
  label: string;
  value: OnBoardStepTypes;
}[] = [
  {
    label: 'Content',
    value: 'content',
  },
  {
    label: 'Image',
    value: 'image',
  },
  {
    label: 'Video',
    value: 'video_url',
  },
  {
    label: 'Document',
    value: 'document',
  },
  {
    label: 'Profile Upload Image',
    value: 'user_profile_upload_image',
  },
  {
    label: 'Profile Update Data',
    value: 'user_profile_update_data',
  },
  {
    label: 'User Document',
    value: 'user_document',
  },
];
