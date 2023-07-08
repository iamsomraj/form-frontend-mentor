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
  return (
    <button className="flex items-center justify-start gap-4 rounded-lg border border-light-gray p-4 hover:border-marine-blue desktop:h-36 desktop:flex-col desktop:items-start">
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
          ${option.monthlyPrice}/mo
        </div>
      </div>
    </button>
  );
};

export default Card;
