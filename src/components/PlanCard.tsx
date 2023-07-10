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
      className={`flex h-20 items-center justify-start gap-4 rounded-lg border p-3 hover:border-marine-blue desktop:h-40 desktop:flex-col desktop:items-start desktop:p-4 ${
        isSelected ? 'border-marine-blue' : 'border-light-gray'
      }`}
    >
      <div className="flex h-full items-start justify-start desktop:flex-1">
        <img
          src={icon}
          alt={option.value}
          className="h-12  w-12 flex-shrink-0 overflow-hidden rounded-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-end gap-1 transition-all duration-300">
        <div className="flex text-left font-primary-bold text-sm font-bold">
          {option.label}
        </div>
        <div className="flex text-left font-primary-medium text-xs font-medium text-cool-gray">
          ${price}/{tariff}
        </div>
        {yearly && <div className="font-primary-regular text-sm">2 months free</div>}
      </div>
    </button>
  );
};

export default Card;
