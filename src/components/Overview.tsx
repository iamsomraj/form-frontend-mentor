import {
  useAddOns,
  useLongTariff,
  usePlan,
  usePlanPrice,
  useTariff,
  useTotalPrice,
  useYearly,
} from '../features/payment/paymentSlice';

const Overview = () => {
  const plan = usePlan();
  const addOns = useAddOns();
  const longTariff = useLongTariff();
  const tariff = useTariff();
  const planPrice = usePlanPrice();
  const totalPrice = useTotalPrice();
  const yearly = useYearly();
  const timelyTariff = yearly ? 'year' : 'month';

  if (!plan) {
    return (
      <div className="mx-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-lg bg-magnolia p-4 px-6 text-center font-primary-bold font-bold text-cool-gray">
          Plan not available!
        </div>
      </div>
    );
  }

  const planContent = (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="font-primary-bold font-bold text-marine-blue">
          {plan.name} ({longTariff})
        </div>
        <a className="cursor-pointer font-primary-regular text-sm text-purplish-blue hover:underline hover:underline-offset-2">
          Change
        </a>
      </div>
      <div className="flex items-center justify-center font-primary-bold font-bold">
        ${planPrice}/{tariff}
      </div>
    </div>
  );

  const addOnContent = addOns.map((addOn, index) => {
    const addOnPrice = yearly ? addOn.yearlyPrice : addOn.monthlyPrice;
    return (
      <div
        key={addOn.name + '_' + addOn.value + '_' + index}
        className="flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <div className="font-primary-regular text-sm text-light-gray">{addOn.name}</div>
          <div className="font-primary-regular text-sm text-marine-blue">
            +${addOnPrice}/{tariff}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-lg bg-magnolia p-4 px-6">
        {planContent}
        <div className="my-1 h-px w-full bg-light-gray"></div>
        {addOnContent}
      </div>

      <div className="flex justify-between px-6">
        <div className="font-primary-regular text-sm text-cool-gray">
          Total (per {timelyTariff})
        </div>
        <div className="font-primary-bold font-bold text-purplish-blue">
          ${totalPrice}/{tariff}
        </div>
      </div>
    </div>
  );
};

export default Overview;
