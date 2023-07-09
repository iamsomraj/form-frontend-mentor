import { MultiCardLayoutItem } from '../../constants';
import { useAddOns } from '../../features/payment/paymentSlice';
import AddOnCard from '../AddOnCard';

interface MultiCardTypeProps {
  layout: MultiCardLayoutItem;
}

const MultiCardType = ({ layout }: MultiCardTypeProps) => {
  const addOns = useAddOns().map((addOn) => addOn.value);

  const flexContent = (
    <div className="flex flex-col gap-3 pb-8 desktop:p-0">
      {layout.options.map((option, index) => (
        <AddOnCard
          key={option.value + '_' + addOns.includes(option.value) + '_' + index}
          option={option}
          isAdded={addOns.includes(option.value)}
        />
      ))}
    </div>
  );
  return <div>{flexContent}</div>;
};

export default MultiCardType;
