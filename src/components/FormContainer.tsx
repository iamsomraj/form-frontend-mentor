import { useAppDispatch } from '../app/hooks';
import { FORM_TEMPLATES, SIDE_BAR_MENU_OPTIONS } from '../constants';
import { selectStep, StepType, useCurrentStep } from '../features/payment/paymentSlice';

interface FormHeaderProps {
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-primary-bold text-2xl font-bold text-marine-blue">{title}</h1>
      <h3 className="font-primary-medium text-lg font-medium text-light-gray">
        {description}
      </h3>
    </div>
  );
};

type LayoutItem = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  required: boolean;
};

interface FormWrapperProps {
  layout: LayoutItem[];
}

const FormWrapper: React.FC<FormWrapperProps> = ({ layout }) => {
  return (
    <form>
      {layout.map(({ type, name, label, placeholder, required }) => (
        <div key={name} className="flex flex-col gap-4">
          <label className="font-primary-medium text-lg font-medium text-light-gray">
            {label}
          </label>
          <div className="flex flex-col gap-4">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              required={required}
            />
          </div>
        </div>
      ))}
    </form>
  );
};

type MenuOption = (typeof SIDE_BAR_MENU_OPTIONS)[0];

interface SideBarMenuItemProps {
  menuItem: MenuOption;
  currentStep: StepType;
}

const SideBarMenuItem: React.FunctionComponent<SideBarMenuItemProps> = ({
  menuItem,
  currentStep,
}) => {
  const isCurrentStepSelected = currentStep === menuItem.slug;
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

const FormContainer: React.FC = () => {
  const currentStep = useCurrentStep();

  const currentForm = FORM_TEMPLATES.find((template) => template.slug === currentStep);

  if (!currentForm) {
    return <div>Something Went Wrong</div>;
  }

  const layout = currentForm.layout;
  const header = currentForm.header;

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center desktop:px-12 desktop:py-24">
      {/* DESKTOP BACKGROUND */}
      <div className="absolute inset-0 -z-10 hidden bg-white desktop:block"></div>
      {/* DESKTOP BACKGROUND */}

      <section className="h-screen w-full bg-light-blue shadow-2xl desktop:flex desktop:h-[70vh] desktop:flex-col desktop:rounded-lg desktop:px-40 desktop:py-12">
        <div className="mx-auto w-full flex-1 justify-start gap-2 bg-white shadow-xl desktop:flex desktop:rounded-lg">
          {/* SIDE BAR */}
          <div className="-mx-10 flex h-[30vh] items-start justify-center bg-[url('../../src/assets/images/bg-sidebar-desktop.svg')] bg-cover bg-bottom pt-6 desktop:m-3 desktop:h-auto desktop:flex-col desktop:justify-start desktop:gap-6 desktop:rounded-lg desktop:bg-center desktop:py-8">
            {/* SIDE BAR MENU ITEM */}
            {SIDE_BAR_MENU_OPTIONS.map((menuItem) => (
              <SideBarMenuItem
                key={menuItem.step}
                menuItem={menuItem}
                currentStep={currentStep}
              />
            ))}
            {/* SIDE BAR MENU ITEM */}
          </div>
          {/* SIDE BAR */}

          {/* FORM SECTION */}
          <div className="flex-1">
            <FormHeader title={header.title} description={header.description} />
            <FormWrapper layout={layout} />
          </div>
          {/* FORM SECTION */}
        </div>
      </section>
    </main>
  );
};

export default FormContainer;
