import { useAppDispatch } from '../app/hooks';
import { SIDE_BAR_MENU_OPTIONS } from '../constants';
import {
  confirmPurchase,
  selectStep,
  StepType,
  useHasError,
} from '../features/payment/paymentSlice';

interface FormFooterProps {
  currentStep: StepType;
}

const FormFooter: React.FC<FormFooterProps> = ({ currentStep }) => {
  const hasError = useHasError();
  const isFirstStep = currentStep === SIDE_BAR_MENU_OPTIONS[0].slug;
  const isLastStep =
    currentStep === SIDE_BAR_MENU_OPTIONS[SIDE_BAR_MENU_OPTIONS.length - 1].slug;
  const dispatch = useAppDispatch();

  const onNext: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (isLastStep) {
      dispatch(confirmPurchase());
      return;
    }

    const index = SIDE_BAR_MENU_OPTIONS.findIndex((menu) => menu.slug === currentStep);
    dispatch(selectStep(SIDE_BAR_MENU_OPTIONS[index + 1].slug));
  };

  const onBack: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (isFirstStep) {
      return;
    }

    const index = SIDE_BAR_MENU_OPTIONS.findIndex((menu) => menu.slug === currentStep);
    dispatch(selectStep(SIDE_BAR_MENU_OPTIONS[index - 1].slug));
  };
  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-light-blue desktop:static">
      <div
        className={`flex bg-white px-4 py-4 desktop:py-0 ${
          isFirstStep ? 'justify-end' : 'justify-between'
        }`}
      >
        {!isFirstStep && (
          <button
            onClick={onBack}
            className="bg-[transparent] font-primary-medium text-sm  text-cool-gray hover:text-marine-blue"
          >
            Go Back
          </button>
        )}
        <button
          disabled={hasError}
          onClick={onNext}
          className={`rounded-md ${
            isLastStep ? 'bg-purplish-blue text-white' : 'bg-marine-blue text-light-blue'
          }  px-4 py-2 font-primary-medium text-sm text-light-blue disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isLastStep ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
