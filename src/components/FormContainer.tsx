import { SIDE_BAR_MENU_OPTIONS } from '../constants';

type MenuOption = (typeof SIDE_BAR_MENU_OPTIONS)[0];

interface SideBarMenuItemProps {
  menuItem: MenuOption;
}

const SideBarMenuItem: React.FunctionComponent<SideBarMenuItemProps> = ({ menuItem }) => {
  return (
    <div className="flex items-center justify-start gap-4 pl-6 uppercase desktop:w-64">
      <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white font-primary-medium text-xs font-medium text-white">
        {menuItem.step}
      </div>
      <div className="hidden flex-col desktop:flex">
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

const FormContainer: React.FunctionComponent = () => {
  return (
    <main className=" relative flex min-h-screen w-full items-center justify-center desktop:px-12 desktop:py-24">
      {/* DESKTOP BACKGROUND */}
      <div className="absolute inset-0 -z-10 hidden bg-white desktop:block"></div>
      {/* DESKTOP BACKGROUND */}

      <section className="h-screen w-full bg-light-blue shadow-2xl desktop:flex desktop:h-[70vh] desktop:flex-col desktop:rounded-lg desktop:px-40 desktop:py-12">
        <div className="mx-auto w-full flex-1 justify-start gap-2 bg-white shadow-xl desktop:flex desktop:rounded-lg">
          {/* SIDE BAR */}
          <div className="-mx-5 flex h-[30vh] items-start justify-center bg-[url('../../src/assets/images/bg-sidebar-desktop.svg')] bg-cover bg-bottom pt-6 desktop:m-3 desktop:h-auto desktop:flex-col desktop:justify-start desktop:gap-6 desktop:rounded-lg desktop:bg-center desktop:py-8">
            {/* SIDE BAR MENU ITEM */}
            {SIDE_BAR_MENU_OPTIONS.map((menuItem) => (
              <SideBarMenuItem key={menuItem.step} menuItem={menuItem} />
            ))}
            {/* SIDE BAR MENU ITEM */}
          </div>
          {/* SIDE BAR */}

          {/* FORM SECTION */}
          <form className="flex-1">Hello World</form>
          {/* FORM SECTION */}
        </div>
      </section>
    </main>
  );
};

export default FormContainer;
