import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '../../app/hooks';

const isValidName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9+\-\s]+$/;
  return phoneRegex.test(phone);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

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
  purchasedConfirmed: boolean;
}

const initialState: PaymentState = {
  currentStep: 'step-1-your-info',
  name: '',
  email: '',
  phone: '',
  plan: null,
  addOns: [],
  yearly: false,
  purchasedConfirmed: false,
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
    confirmPurchase: (state) => {
      state.purchasedConfirmed = true;
    },
  },
});

export const {
  selectStep,
  submitFirstStep,
  submitSecondStep,
  submitThirdStep,
  confirmPurchase,
} = paymentSlice.actions;

export const useCurrentStep = () => useAppSelector((state) => state.payment.currentStep);
export const useName = () => useAppSelector((state) => state.payment.name);
export const useEmail = () => useAppSelector((state) => state.payment.email);
export const usePhone = () => useAppSelector((state) => state.payment.phone);
export const usePlan = () => useAppSelector((state) => state.payment.plan);
export const usePurchaseConfirmed = () =>
  useAppSelector((state) => state.payment.purchasedConfirmed);
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
export const useTotalPrice = () =>
  useAppSelector((state) => {
    const plan = state.payment.plan;
    if (!plan) return 0;
    const addOns = state.payment.addOns;
    const yearly = state.payment.yearly;

    const planPrice = yearly ? plan.yearlyPrice : plan.monthlyPrice;
    const addOnsPrice = addOns.reduce(
      (total, addOn) => total + (yearly ? addOn.yearlyPrice : addOn.monthlyPrice),
      0,
    );

    return planPrice + addOnsPrice;
  });

export const useHasError = () =>
  useAppSelector((state) => {
    const currentStep = state.payment.currentStep;
    const isFirstStep = currentStep === 'step-1-your-info';
    const isSecondStep = currentStep === 'step-2-select-plan';
    const isLastStep = currentStep === 'step-4-summary';
    if (isFirstStep) {
      const nameEmpty = state.payment.name.length === 0;
      const validName = isValidName(state.payment.name);
      const emailEmpty = state.payment.email.length === 0;
      const validEmail = isValidEmail(state.payment.email);
      const phoneEmpty = state.payment.phone.length === 0;
      const validPhone = isValidPhone(state.payment.phone);
      return (
        nameEmpty || !validName || emailEmpty || !validEmail || phoneEmpty || !validPhone
      );
    }
    if (isSecondStep) {
      const planEmpty = state.payment.plan === null;
      return planEmpty;
    }
    if (isLastStep) {
      const nameEmpty = state.payment.name.length === 0;
      const validName = isValidName(state.payment.name);
      const emailEmpty = state.payment.email.length === 0;
      const validEmail = isValidEmail(state.payment.email);
      const phoneEmpty = state.payment.phone.length === 0;
      const validPhone = isValidPhone(state.payment.phone);
      const planEmpty = state.payment.plan === null;
      return (
        nameEmpty ||
        !validName ||
        emailEmpty ||
        !validEmail ||
        phoneEmpty ||
        !validPhone ||
        planEmpty
      );
    }
    return false;
  });

export default paymentSlice.reducer;
