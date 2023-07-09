import SideBarImage from '../../src/assets/images/bg-sidebar-desktop.svg';
import { SIDE_BAR_MENU_OPTIONS } from '../constants';
import { StepType } from '../features/payment/paymentSlice';
import NavItem from './NavItem';

interface SideBarProps {
  currentStep: StepType;
}

const SideBar = ({ currentStep }: SideBarProps) => {
  return (
    <aside
      className="-mx-10 flex h-[30vh] items-start justify-center bg-cover bg-bottom pt-6 desktop:m-3 desktop:h-auto desktop:flex-col desktop:justify-start desktop:gap-6 desktop:rounded-lg desktop:bg-center desktop:py-8"
      style={{
        backgroundImage: `url(${SideBarImage})`,
      }}
    >
      {/* SIDE BAR MENU ITEM */}
      {SIDE_BAR_MENU_OPTIONS.map((menuItem) => (
        <NavItem key={menuItem.step} menuItem={menuItem} currentStep={currentStep} />
      ))}
      {/* SIDE BAR MENU ITEM */}
    </aside>
  );
};

export default SideBar;
