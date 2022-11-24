import {OffBoardStepTypes} from '@interfaces/offboarding';
import {OnBoardStepTypes} from '@interfaces/onboarding';

export const OnBoardTypeOptions: {
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

export const OffBoardTypeOptions: {
  label: string;
  value: OffBoardStepTypes;
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
    label: 'Document',
    value: 'document',
  },
];
