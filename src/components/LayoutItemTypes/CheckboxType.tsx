import { useAppDispatch } from '../../app/hooks';
import { CheckboxLayoutItem } from '../../constants';
import {
  submitSecondStep,
  useIsTimePeriodYearly,
  usePlan,
} from '../../features/payment/paymentSlice';

interface CheckboxTypeProps {
  layout: CheckboxLayoutItem;
}

const CheckboxType = ({ layout }: CheckboxTypeProps) => {
  const plan = usePlan();
  const isTimePeriodYearly = useIsTimePeriodYearly();
  const dispatch = useAppDispatch();

  const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();

    dispatch(
      submitSecondStep({
        isTimePeriodYearly: !isTimePeriodYearly,
        plan,
      }),
    );
  };

  return (
    <div className="mx-4 flex items-center justify-center rounded-lg bg-magnolia py-2 font-primary-medium font-medium capitalize">
      <div className="flex items-center gap-4">
        <div className={`${!isTimePeriodYearly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          {layout.options.true.label}
        </div>
        <input
          className={`relative h-6 w-10 cursor-pointer appearance-none rounded-full bg-marine-blue outline-none after:absolute after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:duration-300 ${
            isTimePeriodYearly ? 'after:left-5' : 'after:left-1'
          } `}
          type="checkbox"
          checked={isTimePeriodYearly}
          onChange={onCheckboxChange}
        />
        <div className={`${isTimePeriodYearly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          {layout.options.false.label}
        </div>
      </div>
    </div>
  );
};

export default CheckboxType;
