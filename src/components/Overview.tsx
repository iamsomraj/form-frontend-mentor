const Overview = () => {
  return (
    <div className="mx-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2 rounded-lg bg-magnolia p-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-primary-bold font-bold text-marine-blue">
              Arcade (Monthly)
            </div>
            <a className="cursor-pointer font-primary-regular text-sm text-purplish-blue hover:underline hover:underline-offset-2">
              Change
            </a>
          </div>
          <div className="flex items-center justify-center font-primary-bold font-bold">
            $9/mo
          </div>
        </div>
        <div className="my-1 h-px w-full bg-light-gray"></div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="font-primary-regular text-sm text-light-gray">
              Online service
            </div>
            <div className="font-primary-regular text-sm text-marine-blue">+$1/mo</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-primary-regular text-sm text-light-gray">
              Larger storage
            </div>
            <div className="font-primary-regular text-sm text-marine-blue">+$1/mo</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-6">
        <div className="font-primary-regular text-sm text-cool-gray">
          Total (per month)
        </div>
        <div className="font-primary-bold font-bold text-purplish-blue">$12/mo</div>
      </div>
    </div>
  );
};

export default Overview;
