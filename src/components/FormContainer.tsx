import { ReactNode } from 'react';

import { useAppDispatch } from '../app/hooks';
import { FORM_TEMPLATES, SIDE_BAR_MENU_OPTIONS } from '../constants';
import { selectStep, StepType, useCurrentStep } from '../features/payment/paymentSlice';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  return (
    <form className="mx-6 -mt-[10%] flex flex-1 flex-col gap-6 rounded-lg bg-white py-4 shadow-xl desktop:m-0 desktop:mr-8  desktop:pt-10 desktop:shadow-none">
      {props.children}
    </form>
  );
};

interface FormHeaderProps {
  title: string;
  description: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col gap-2 px-4 ">
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

interface FormBodyProps {
  layout: LayoutItem[];
}

const FormBody: React.FC<FormBodyProps> = ({ layout }) => {
  return (
    <div className="flex flex-col gap-2">
      {layout.map(({ type, name, label, placeholder, required }) => (
        <div key={name} className="flex flex-col gap-1 px-4">
          <div className="flex justify-between">
            <label className="font-primary-regular text-base text-marine-blue">
              {label}
            </label>
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
      ))}
    </div>
  );
};

interface FormFooterProps {
  currentStep: StepType;
}

const FormFooter: React.FC<FormFooterProps> = ({ currentStep }) => {
  const isLastStep =
    currentStep === SIDE_BAR_MENU_OPTIONS[SIDE_BAR_MENU_OPTIONS.length - 1].slug;

  return (
    <div className="fixed inset-x-0 bottom-0 w-full bg-light-blue desktop:static">
      <div className="flex justify-between bg-white px-4 py-4 desktop:py-0">
        <button className="bg-[transparent] font-primary-medium text-sm text-cool-gray">
          Go Back
        </button>
        <button className="rounded-md bg-marine-blue px-4 py-2 font-primary-medium text-sm text-light-blue">
          {isLastStep ? 'Confirm' : 'Next Step'}
        </button>
      </div>
    </div>
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
    <main className="relative flex max-h-screen min-h-screen w-full items-start justify-center desktop:items-center desktop:px-12 desktop:py-24">
      {/* DESKTOP BACKGROUND */}
      <div className="absolute inset-0 -z-10 hidden bg-white desktop:block"></div>
      {/* DESKTOP BACKGROUND */}

      <section className="h-screen w-full flex-1 bg-light-blue shadow-2xl desktop:flex desktop:h-[70vh] desktop:flex-col desktop:rounded-lg desktop:px-40 desktop:py-12">
        <div className="mx-auto w-full flex-1 justify-start desktop:flex desktop:gap-16 desktop:rounded-lg desktop:bg-white desktop:shadow-xl">
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
          <div className="flex-1 bg-[transparent]">
            <FormWrapper>
              <FormHeader title={header.title} description={header.description} />
              <FormBody layout={layout} />
              <div className="flex-1"></div>
              <FormFooter currentStep={currentStep} />
            </FormWrapper>
          </div>
          {/* FORM SECTION */}
        </div>
      </section>
    </main>
  );
};

export default FormContainer;
