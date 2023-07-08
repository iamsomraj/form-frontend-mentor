import { useState } from 'react';

import { CheckboxLayoutItem } from '../../constants';

interface CheckboxTypeProps {
  layout: CheckboxLayoutItem;
}

const CheckboxType = ({ layout }: CheckboxTypeProps) => {
  const [monthly, setMonthly] = useState<boolean>(false);

  const onCheckboxClick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMonthly(!e.target.checked);
  };

  return (
    <div className="mx-4 flex items-center justify-center rounded-lg bg-magnolia py-2 font-primary-medium font-medium capitalize">
      <div className="flex items-center gap-4">
        <div className={`${monthly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          {layout.options.true.label}
        </div>
        <input
          className="relative h-6 w-10 cursor-pointer appearance-none rounded-full bg-marine-blue outline-none after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:duration-300 checked:after:left-5"
          type="checkbox"
          checked={!monthly}
          onChange={onCheckboxClick}
          role="switch"
        />
        <div className={`${!monthly ? 'text-marine-blue' : 'text-cool-gray'}`}>
          {layout.options.false.label}
        </div>
      </div>
    </div>
  );
};

export default CheckboxType;
