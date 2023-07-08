import { SIDE_BAR_MENU_OPTIONS } from '../constants';
import { StepType } from '../features/payment/paymentSlice';

interface FormFooterProps {
  currentStep: StepType;
}

const FormFooter: React.FC<FormFooterProps> = ({ currentStep }) => {
  const isLastStep =
    currentStep === SIDE_BAR_MENU_OPTIONS[SIDE_BAR_MENU_OPTIONS.length - 1].slug;

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-light-blue desktop:static">
      <div className="flex justify-between bg-white px-4 py-4 desktop:py-0">
        <button className="bg-[transparent] font-primary-medium text-sm text-cool-gray">
          Go Back
        </button>
        <button className="rounded-md bg-marine-blue px-4 py-2 font-primary-medium text-sm text-light-blue">
          {isLastStep ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
