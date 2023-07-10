import { useAppDispatch } from '../app/hooks';
import { SIDE_BAR_MENU_OPTIONS } from '../constants';
import { selectStep, StepSlugType } from '../features/payment/paymentSlice';

type MenuOption = (typeof SIDE_BAR_MENU_OPTIONS)[0];

interface NavItemProps {
  menuItem: MenuOption;
  currentStepSlug: StepSlugType;
}

const NavItem: React.FunctionComponent<NavItemProps> = ({
  menuItem,
  currentStepSlug,
}) => {
  const isCurrentStepSelected = currentStepSlug === menuItem.slug;
  const dispatch = useAppDispatch();

  const onStepClick = () => {
    dispatch(selectStep(menuItem.slug));
  };

  return (
    <div className="flex items-center justify-start gap-4 pl-6 uppercase desktop:w-64">
      <button
        onClick={onStepClick}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white font-primary-medium text-xs font-medium transition-all duration-500 ease-in-out  ${
          isCurrentStepSelected
            ? 'bg-light-blue text-marine-blue'
            : 'bg-purplish-blue text-white'
        }`}
      >
        {menuItem.step}
      </button>
      <div className="hidden flex-col items-start justify-start desktop:flex">
        <div className="font-primary-medium text-sm font-medium tracking-wide text-cool-gray">
          STEP {menuItem.step}
        </div>
        <div className="font-primary-bold text-base font-bold tracking-wider text-alabaster">
          {menuItem.label}
        </div>
      </div>
    </div>
  );
};
export default NavItem;
