import { useAppDispatch } from '../app/hooks';
import CheckMarkIcon from '../assets/images/icon-checkmark.svg';
import {
  submitThirdStep,
  useAddOns,
  useTariff,
  useYearly,
} from '../features/payment/paymentSlice';

interface AddOnCardProps {
  option: {
    label: string;
    description: string;
    value: string;
    monthlyPrice: number;
    yearlyPrice: number;
  };
  isAdded: boolean;
}

const AddOnCard = ({ option, isAdded }: AddOnCardProps) => {
  const dispatch = useAppDispatch();
  const addOns = useAddOns();
  const yearly = useYearly();
  const tariff = useTariff();

  const price = yearly ? option.yearlyPrice : option.monthlyPrice;

  const onAddOnSelect: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    if (isAdded) {
      const newAddOns = addOns.filter((addOn) => addOn.value !== option.value);
      dispatch(submitThirdStep({ addOns: newAddOns }));
    } else {
      dispatch(
        submitThirdStep({
          addOns: [
            ...addOns,
            {
              name: option.label,
              value: option.value,
              monthlyPrice: option.monthlyPrice,
              yearlyPrice: option.yearlyPrice,
            },
          ],
        }),
      );
    }
  };
  return (
    <button
      className={`mx-4 flex items-center justify-between rounded-lg border p-3 px-4 ${
        isAdded ? 'border-purplish-blue' : 'border-light-gray'
      }`}
      onClick={onAddOnSelect}
    >
      <div className="flex items-center justify-start gap-4">
        {isAdded ? (
          <img
            src={CheckMarkIcon}
            alt={'Checked'}
            className="h-5 w-5 flex-shrink-0 overflow-hidden rounded bg-purplish-blue p-1"
          />
        ) : (
          <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-lg border border-light-gray" />
        )}
        <div className="flex flex-col items-start justify-start">
          <div className="font-primary-bold font-bold text-marine-blue">
            {option.label}
          </div>
          <div className="font-primary-medium font-medium text-light-gray">
            {option.description}
          </div>
        </div>
      </div>

      <div className="text-right font-primary-regular text-purplish-blue">
        +${price}/{tariff}
      </div>
    </button>
  );
};

export default AddOnCard;
