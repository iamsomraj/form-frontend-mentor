import {
  EmailLayoutItem,
  LAYOUT_ITEM_TYPE_VALUES,
  TextLayoutItem,
} from '../../constants';

interface InputTypeProps {
  layout: TextLayoutItem | EmailLayoutItem;
}

const InputType = ({ layout }: InputTypeProps) => {
  const { name, label, type: layoutType, placeholder, required } = layout;

  const type = layoutType === LAYOUT_ITEM_TYPE_VALUES.TEXT ? 'text' : 'email';

  return (
    <div key={name} className="flex flex-col gap-1 px-4">
      <div className="flex justify-between">
        <label className="font-primary-regular text-base text-marine-blue">{label}</label>
        <span className="font-primary-medium text-base font-medium text-strawberry-red">
          This field is required
        </span>
      </div>
      <div className="flex flex-col">
        <input
          className="rounded-lg border border-light-gray p-2 font-primary-bold font-bold text-marine-blue outline-none placeholder:font-primary-bold placeholder:font-bold placeholder:text-cool-gray focus:border-purplish-blue"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
};

export default InputType;
