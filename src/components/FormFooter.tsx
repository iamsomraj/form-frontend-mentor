import { useAppDispatch } from '../app/hooks';
import { SIDE_BAR_MENU_OPTIONS } from '../constants';
import {
  saveCart,
  selectStep,
  StepSlugType,
  useHasError,
  useSaving,
} from '../features/payment/paymentSlice';

interface FormFooterProps {
  currentStepSlug: StepSlugType;
}

const FormFooter: React.FC<FormFooterProps> = ({ currentStepSlug }) => {
  const hasError = useHasError();
  const saving = useSaving();
  const isFirstStep = currentStepSlug === SIDE_BAR_MENU_OPTIONS[0].slug;
  const isLastStep =
    currentStepSlug === SIDE_BAR_MENU_OPTIONS[SIDE_BAR_MENU_OPTIONS.length - 1].slug;
  const dispatch = useAppDispatch();

  const onNext: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (isLastStep) {
      dispatch(saveCart());
      return;
    }

    const index = SIDE_BAR_MENU_OPTIONS.findIndex(
      (menu) => menu.slug === currentStepSlug,
    );
    dispatch(selectStep(SIDE_BAR_MENU_OPTIONS[index + 1].slug));
  };

  const onBack: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (isFirstStep) {
      return;
    }

    const index = SIDE_BAR_MENU_OPTIONS.findIndex(
      (menu) => menu.slug === currentStepSlug,
    );
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
          disabled={hasError || saving}
          onClick={onNext}
          className={`rounded-md ${
            isLastStep ? 'bg-purplish-blue text-white' : 'bg-marine-blue text-light-blue'
          }  px-4 py-2 font-primary-medium text-sm text-light-blue disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {saving ? 'Saving...' : isLastStep ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </div>
  );
};

export default FormFooter;
