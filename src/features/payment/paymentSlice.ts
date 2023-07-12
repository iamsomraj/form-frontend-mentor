import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppSelector } from '../../app/hooks';

export const saveCart = createAsyncThunk('payment/saveCart', async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
});

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

export type StepSlugType =
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
  currentStepSlug: StepSlugType;
  name: string;
  email: string;
  phone: string;
  plan: PlanType;
  addOns: AddOnType;
  isTimePeriodYearly: boolean;
  purchasedConfirmed: boolean;
  saving: boolean;
}

const initialState: PaymentState = {
  currentStepSlug: 'step-1-your-info',
  name: '',
  email: '',
  phone: '',
  plan: null,
  addOns: [],
  isTimePeriodYearly: false,
  purchasedConfirmed: false,
  saving: false,
};

type FirstStepActionPayload = {
  name: string;
  email: string;
  phone: string;
};

type SecondStepActionPayload = {
  plan: PlanType;
  isTimePeriodYearly: boolean;
};

type ThirdStepActionPayload = {
  addOns: AddOnType;
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    selectStep: (state, action: PayloadAction<StepSlugType>) => {
      state.currentStepSlug = action.payload;
    },
    submitFirstStep: (state, action: PayloadAction<FirstStepActionPayload>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    submitSecondStep: (state, action: PayloadAction<SecondStepActionPayload>) => {
      state.plan = action.payload.plan;
      state.isTimePeriodYearly = action.payload.isTimePeriodYearly;
    },
    submitThirdStep: (state, action: PayloadAction<ThirdStepActionPayload>) => {
      state.addOns = action.payload.addOns;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveCart.pending, (state) => {
      state.purchasedConfirmed = false;
      state.saving = true;
    });
    builder.addCase(saveCart.fulfilled, (state) => {
      state.purchasedConfirmed = true;
      state.saving = false;
    });
  },
});

export const { selectStep, submitFirstStep, submitSecondStep, submitThirdStep } =
  paymentSlice.actions;

export const useCurrentStepSlug = () =>
  useAppSelector((state) => state.payment.currentStepSlug);
export const useName = () => useAppSelector((state) => state.payment.name);
export const useEmail = () => useAppSelector((state) => state.payment.email);
export const usePhone = () => useAppSelector((state) => state.payment.phone);
export const usePlan = () => useAppSelector((state) => state.payment.plan);
export const usePurchaseConfirmed = () =>
  useAppSelector((state) => state.payment.purchasedConfirmed);
export const useSaving = () => useAppSelector((state) => state.payment.saving);
export const usePlanPrice = () =>
  useAppSelector((state) =>
    state.payment.isTimePeriodYearly
      ? state.payment.plan?.yearlyPrice
      : state.payment.plan?.monthlyPrice,
  );
export const useIsTimePeriodYearly = () =>
  useAppSelector((state) => state.payment.isTimePeriodYearly);
export const useTimePeriod = () =>
  useAppSelector((state) => (state.payment.isTimePeriodYearly ? 'yr' : 'mo'));
export const useLongTimePeriod = () =>
  useAppSelector((state) => (state.payment.isTimePeriodYearly ? 'Yearly' : 'Monthly'));
export const useAddOns = () => useAppSelector((state) => state.payment.addOns);
export const useTotalPrice = () =>
  useAppSelector((state) => {
    const plan = state.payment.plan;
    if (!plan) return 0;
    const addOns = state.payment.addOns;
    const isTimePeriodYearly = state.payment.isTimePeriodYearly;

    const planPrice = isTimePeriodYearly ? plan.yearlyPrice : plan.monthlyPrice;
    const addOnsPrice = addOns.reduce(
      (total, addOn) =>
        total + (isTimePeriodYearly ? addOn.yearlyPrice : addOn.monthlyPrice),
      0,
    );

    return planPrice + addOnsPrice;
  });

export const useHasError = () =>
  useAppSelector((state) => {
    const currentStepSlug = state.payment.currentStepSlug;
    const isFirstStep = currentStepSlug === 'step-1-your-info';
    const isSecondStep = currentStepSlug === 'step-2-select-plan';
    const isLastStep = currentStepSlug === 'step-4-summary';
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
