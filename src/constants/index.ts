import { StepType } from '../features/payment/paymentSlice';

export enum LAYOUT_ITEM_TYPE_VALUES {
  TEXT,
  EMAIL,
  SINGLE_CARD,
  CHECKBOX,
  MULTI_CARD,
}

export type TextLayoutItem = {
  type: LAYOUT_ITEM_TYPE_VALUES.TEXT;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type EmailLayoutItem = {
  type: LAYOUT_ITEM_TYPE_VALUES.EMAIL;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

export type SingleCardLayoutItem = {
  type: LAYOUT_ITEM_TYPE_VALUES.SINGLE_CARD;
  options: {
    label: string;
    value: string;
    monthlyPrice: number;
    yearlyPrice: number;
  }[];
};

export type CheckboxLayoutItem = {
  type: LAYOUT_ITEM_TYPE_VALUES.CHECKBOX;
  options: {
    true: {
      label: string;
      value: string;
    };
    false: {
      label: string;
      value: string;
    };
  };
};

export type MultiCardLayoutItem = {
  type: LAYOUT_ITEM_TYPE_VALUES.MULTI_CARD;
  options: {
    label: string;
    description: string;
    value: string;
    monthlyPrice: number;
    yearlyPrice: number;
  }[];
};

export type LayoutItemType =
  | TextLayoutItem
  | EmailLayoutItem
  | SingleCardLayoutItem
  | CheckboxLayoutItem
  | MultiCardLayoutItem;

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
        type: LAYOUT_ITEM_TYPE_VALUES.TEXT,
        name: 'name',
        label: 'Name',
        placeholder: 'e.g. Stephen King',
        required: true,
      },
      {
        type: LAYOUT_ITEM_TYPE_VALUES.EMAIL,
        name: 'email',
        label: 'Email Address',
        placeholder: 'e.g. stephenking@lorem.com',
        required: true,
      },
      {
        type: LAYOUT_ITEM_TYPE_VALUES.TEXT,
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
      title: 'Select your plan',
      description: 'You have the option of monthly or yearly billing.',
    },
    layout: [
      {
        type: LAYOUT_ITEM_TYPE_VALUES.SINGLE_CARD,
        options: [
          {
            label: 'Arcade',
            value: 'arcade',
            monthlyPrice: 9,
            yearlyPrice: 99,
          },
          {
            label: 'Advanced',
            value: 'advanced',
            monthlyPrice: 12,
            yearlyPrice: 129,
          },
          {
            label: 'Arcade',
            value: 'arcade',
            monthlyPrice: 15,
            yearlyPrice: 159,
          },
        ],
      },
      {
        type: LAYOUT_ITEM_TYPE_VALUES.CHECKBOX,
        options: {
          true: {
            label: 'Monthly',
            value: 'monthly',
          },
          false: {
            label: 'Yearly',
            value: 'yearly',
          },
        },
      },
    ],
  },
  {
    slug: 'step-3-add-ons',
    header: {
      title: 'Pick add-ons',
      description: 'Add-ons help enhance your gaming experience.',
    },
    layout: [
      {
        type: LAYOUT_ITEM_TYPE_VALUES.MULTI_CARD,
        options: [
          {
            label: 'Online service',
            description: 'Access to multiplayer games',
            value: 'online-service',
            monthlyPrice: 1,
            yearlyPrice: 9,
          },
          {
            label: 'Larger storage',
            description: 'Extra 1TB of cloud save',
            value: 'large-storage',
            monthlyPrice: 2,
            yearlyPrice: 15,
          },
          {
            label: 'Customizable Profile',
            description: 'Custom theme on your profile',
            value: 'custom-profile',
            monthlyPrice: 3,
            yearlyPrice: 21,
          },
        ],
      },
    ],
  },
  {
    slug: 'step-4-summary',
    header: {
      title: 'Finishing up',
      description: 'Double-check everything looks OK before confirming.',
    },
    layout: [],
  },
];
