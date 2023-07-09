import { useAppDispatch } from '../app/hooks';
import {
  submitSecondStep,
  usePlan,
  useTariff,
  useYearly,
} from '../features/payment/paymentSlice';

interface CardProps {
  option: {
    label: string;
    value: string;
    monthlyPrice: number;
    yearlyPrice: number;
  };
  icon: string;
}

const Card = ({ option, icon }: CardProps) => {
  const plan = usePlan();
  const yearly = useYearly();
  const tariff = useTariff();
  const price = yearly ? option.yearlyPrice : option.monthlyPrice;
  const isSelected = plan?.value === option.value;
  const dispatch = useAppDispatch();
  const onPlanSelect: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    dispatch(
      submitSecondStep({
        yearly,
        plan: {
          name: option.label,
          value: option.value,
          monthlyPrice: option.monthlyPrice,
          yearlyPrice: option.yearlyPrice,
        },
      }),
    );
  };
  return (
    <button
      onClick={onPlanSelect}
      className={`flex items-center justify-start gap-4 rounded-lg border p-4 hover:border-marine-blue desktop:h-36 desktop:flex-col desktop:items-start ${
        isSelected ? 'border-marine-blue' : 'border-light-gray'
      }`}
    >
      <div className="flex justify-start desktop:flex-1">
        <img
          src={icon}
          alt={option.value}
          className="h-12  w-12 flex-shrink-0 overflow-hidden rounded-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col items-start justify-start gap-1">
        <div className="flex text-left font-primary-bold text-sm font-bold">
          {option.label}
        </div>
        <div className="flex text-left font-primary-medium text-xs font-medium text-cool-gray">
          ${price}/{tariff}
        </div>
      </div>
    </button>
  );
};

export default Card;
