import { useAppDispatch } from '../../app/hooks';
import {
  EmailLayoutItem,
  LAYOUT_ITEM_TYPE_VALUES,
  TextLayoutItem,
} from '../../constants';
import {
  submitFirstStep,
  useEmail,
  useName,
  usePhone,
} from '../../features/payment/paymentSlice';

interface InputTypeProps {
  layout: TextLayoutItem | EmailLayoutItem;
}

const InputType = ({ layout }: InputTypeProps) => {
  const name = useName();
  const email = useEmail();
  const phone = usePhone();

  const dispatch = useAppDispatch();

  const { name: layoutName, label, type: layoutType, placeholder, required } = layout;
  const value = layoutName === 'name' ? name : layoutName === 'email' ? email : phone;
  const isEmpty = value.length === 0;
  const isInvalid = !isEmpty && !layout.pattern.test(value);
  const type = layoutType === LAYOUT_ITEM_TYPE_VALUES.TEXT ? 'text' : 'email';

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    dispatch(
      submitFirstStep({
        name,
        email,
        phone,
        [layoutName]: value,
      }),
    );
  };

  return (
    <div key={layoutName} className="flex flex-col gap-1 px-4">
      <div className="flex justify-between">
        <label className="font-primary-regular text-base text-marine-blue">{label}</label>
        {isEmpty && (
          <span className="font-primary-medium text-base font-medium text-strawberry-red">
            This field is required
          </span>
        )}
        {isInvalid && (
          <span className="font-primary-medium text-base font-medium text-strawberry-red">
            This field is invalid
          </span>
        )}
      </div>
      <div className="flex flex-col">
        <input
          className="rounded-lg border border-light-gray p-2 font-primary-bold font-bold text-marine-blue outline-none placeholder:font-primary-bold placeholder:font-bold placeholder:text-cool-gray focus:border-purplish-blue"
          type={type}
          value={value}
          name={layoutName}
          placeholder={placeholder}
          required={required}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default InputType;
