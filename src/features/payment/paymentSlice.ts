import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '../../app/hooks';

export type StepType =
  | 'step-1-your-info'
  | 'step-2-select-plan'
  | 'step-3-add-ons'
  | 'step-4-summary';

interface PaymentState {
  currentStep: StepType;
  name: string;
  email: string;
  phone: string;
}

const initialState: PaymentState = {
  currentStep: 'step-1-your-info',
  name: '',
  email: '',
  phone: '',
};

type FirstStepActionPayload = {
  name: string;
  email: string;
  phone: string;
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    selectStep: (state, action: PayloadAction<StepType>) => {
      state.currentStep = action.payload;
    },
    submitFirstStep: (state, action: PayloadAction<FirstStepActionPayload>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export const { selectStep, submitFirstStep } = paymentSlice.actions;

export const useCurrentStep = () => useAppSelector((state) => state.payment.currentStep);

export default paymentSlice.reducer;
