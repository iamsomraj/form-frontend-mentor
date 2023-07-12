import { useAppDispatch } from '../app/hooks';
import {
  selectStep,
  useAddOns,
  useIsTimePeriodYearly,
  useLongTimePeriod,
  usePlan,
  usePlanPrice,
  useTimePeriod,
  useTotalPrice,
} from '../features/payment/paymentSlice';

const Overview = () => {
  const dispatch = useAppDispatch();
  const plan = usePlan();
  const addOns = useAddOns();
  const hasAddOns = addOns.length > 0;
  const longTimePeriod = useLongTimePeriod();
  const timePeriod = useTimePeriod();
  const planPrice = usePlanPrice();
  const totalPrice = useTotalPrice();
  const isTimePeriodYearly = useIsTimePeriodYearly();
  const timelyTariff = isTimePeriodYearly ? 'year' : 'month';

  const goToSecondStep = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(selectStep('step-2-select-plan'));
  };

  if (!plan) {
    return (
      <div className="mx-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-lg bg-magnolia p-4 px-6 text-center font-primary-bold font-bold text-cool-gray">
          Shucks! Your cart is empty.
        </div>
      </div>
    );
  }

  const planContent = (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="font-primary-bold font-bold text-marine-blue">
          {plan.name} ({longTimePeriod})
        </div>
        <button
          onClick={goToSecondStep}
          className="cursor-pointer text-left font-primary-regular text-sm text-purplish-blue outline-none hover:underline hover:underline-offset-2"
        >
          Change
        </button>
      </div>
      <div className="flex items-center justify-center font-primary-bold font-bold">
        ${planPrice}/{timePeriod}
      </div>
    </div>
  );

  const addOnContent = addOns.map((addOn, index) => {
    const addOnPrice = isTimePeriodYearly ? addOn.yearlyPrice : addOn.monthlyPrice;
    return (
      <div
        key={addOn.name + '_' + addOn.value + '_' + index}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <div className="font-primary-regular text-sm text-light-gray">{addOn.name}</div>
          <div className="font-primary-regular text-sm text-marine-blue">
            +${addOnPrice}/{timePeriod}
          </div>
        </div>
      </div>
    );
  });

  const totalPriceContent = (
    <div className="flex justify-between px-6">
      <div className="font-primary-regular text-sm text-cool-gray">
        Total (per {timelyTariff})
      </div>
      <div className="font-primary-bold font-bold text-purplish-blue">
        ${totalPrice}/{timePeriod}
      </div>
    </div>
  );

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-lg bg-magnolia p-4 px-6">
        {planContent}
        {hasAddOns && <div className="my-1 h-px w-full bg-light-gray"></div>}
        {addOnContent}
      </div>
      {totalPriceContent}
    </div>
  );
};

export default Overview;
