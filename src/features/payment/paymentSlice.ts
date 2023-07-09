import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '../../app/hooks';

export type StepType =
  | 'step-1-your-info'
  | 'step-2-select-plan'
  | 'step-3-add-ons'
  | 'step-4-summary';

export interface SellableItem {
  name: string;
  value: string;
  monthlyPrice: number;
  yearlyPrice: number;
}

export type PlanType = SellableItem | null;

export type AddOnType = SellableItem[];

interface PaymentState {
  currentStep: StepType;
  name: string;
  email: string;
  phone: string;
  plan: PlanType;
  addOns: AddOnType;
  yearly: boolean;
}

const initialState: PaymentState = {
  currentStep: 'step-1-your-info',
  name: '',
  email: '',
  phone: '',
  plan: null,
  addOns: [],
  yearly: false,
};

type FirstStepActionPayload = {
  name: string;
  email: string;
  phone: string;
};

type SecondStepActionPayload = {
  plan: PlanType;
  yearly: boolean;
};

type ThirdStepActionPayload = {
  addOns: AddOnType;
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
    submitSecondStep: (state, action: PayloadAction<SecondStepActionPayload>) => {
      state.plan = action.payload.plan;
      state.yearly = action.payload.yearly;
    },
    submitThirdStep: (state, action: PayloadAction<ThirdStepActionPayload>) => {
      state.addOns = action.payload.addOns;
    },
  },
});

export const { selectStep, submitFirstStep, submitSecondStep, submitThirdStep } =
  paymentSlice.actions;

export const useCurrentStep = () => useAppSelector((state) => state.payment.currentStep);
export const useName = () => useAppSelector((state) => state.payment.name);
export const useEmail = () => useAppSelector((state) => state.payment.email);
export const usePhone = () => useAppSelector((state) => state.payment.phone);
export const usePlan = () => useAppSelector((state) => state.payment.plan);
export const usePlanPrice = () =>
  useAppSelector((state) =>
    state.payment.yearly
      ? state.payment.plan?.yearlyPrice
      : state.payment.plan?.monthlyPrice,
  );
export const useYearly = () => useAppSelector((state) => state.payment.yearly);
export const useTariff = () =>
  useAppSelector((state) => (state.payment.yearly ? 'yr' : 'mo'));
export const useLongTariff = () =>
  useAppSelector((state) => (state.payment.yearly ? 'Yearly' : 'Monthly'));
export const useAddOns = () => useAppSelector((state) => state.payment.addOns);
export const useTotalPrice = () => {
  const plan = usePlan();
  if (!plan) return 0;
  const addOns = useAddOns();
  const yearly = useYearly();

  const planPrice = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const addOnsPrice = addOns.reduce(
    (total, addOn) => total + (yearly ? addOn.yearlyPrice : addOn.monthlyPrice),
    0,
  );

  return planPrice + addOnsPrice;
};

export default paymentSlice.reducer;
