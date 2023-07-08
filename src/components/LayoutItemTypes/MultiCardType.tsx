import { MultiCardLayoutItem } from '../../constants';

interface MultiCardTypeProps {
  layout: MultiCardLayoutItem;
}

const MultiCardType = ({ layout }: MultiCardTypeProps) => {
  const flexContent = (
    <div className="flex flex-col gap-3 pb-8 desktop:p-0">
      {layout.options.map((option, index) => (
        <button
          key={index}
          className="mx-4 flex items-center justify-between rounded-lg border border-light-gray p-3 px-4"
        >
          <div className="flex items-center justify-start gap-4">
            <input type="checkbox" className="block h-4 w-4 rounded-lg" />
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
            +${option.monthlyPrice}/mo
          </div>
        </button>
      ))}
    </div>
  );
  return <div>{flexContent}</div>;
};

export default MultiCardType;
