import { FORM_TEMPLATES } from '../constants';
import { useCurrentStep } from '../features/payment/paymentSlice';
import DesktopBackground from './DesktopBackground';
import FormBody from './FormBody';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';
import FormWrapper from './FormWrapper';
import SideBar from './SideBar';

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
      <DesktopBackground />

      <section className="h-screen w-full flex-1 bg-light-blue shadow-2xl desktop:flex desktop:h-[70vh] desktop:flex-col desktop:rounded-lg desktop:px-40 desktop:py-12">
        <div className="mx-auto w-full justify-start desktop:flex desktop:h-[60vh] desktop:gap-16 desktop:rounded-lg desktop:bg-white desktop:shadow-xl">
          <SideBar currentStep={currentStep} />

          <div className="flex-1 bg-[transparent]">
            <FormWrapper>
              <FormHeader title={header.title} description={header.description} />
              <FormBody layout={layout} />
              <FormFooter currentStep={currentStep} />
            </FormWrapper>
          </div>
        </div>
      </section>
    </main>
  );
};

export default FormContainer;
