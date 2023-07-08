import { StepType } from '../features/payment/paymentSlice';

export const SIDE_BAR_MENU_OPTIONS: {
  step: number;
  label: string;
  slug: StepType;
}[] = [
  {
    step: 1,
    label: 'YOUR INFO',
    slug: 'step-1-your-info',
  },
  {
    step: 2,
    label: 'SELECT PLAN',
    slug: 'step-2-select-plan',
  },
  {
    step: 3,
    label: 'ADD-ONS',
    slug: 'step-3-add-ons',
  },
  {
    step: 4,
    label: 'SUMMARY',
    slug: 'step-4-summary',
  },
];

export const FORM_TEMPLATES = [
  {
    slug: 'step-1-your-info',
    header: {
      title: 'Personal Info',
      description: 'Please provide your name, email address, and phone number.',
    },
    layout: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        required: true,
      },
    ],
  },
  {
    slug: 'step-2-select-plan',
    header: {
      title: 'Personal Info',
      description: 'Please provide your name, email address, and phone number.',
    },
    layout: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        required: true,
      },
    ],
  },
  {
    slug: 'step-3-add-ons',
    header: {
      title: 'Personal Info',
      description: 'Please provide your name, email address, and phone number.',
    },
    layout: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        required: true,
      },
    ],
  },
  {
    slug: 'step-4-summary',
    header: {
      title: 'Personal Info',
      description: 'Please provide your name, email address, and phone number.',
    },
    layout: [
      {
        type: 'text',
        name: 'name',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
      },
      {
        type: 'email',
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Phone Number',
        placeholder: 'e.g. +1 234 567 890',
        required: true,
      },
    ],
  },
];
