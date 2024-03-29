import { FORM_TEMPLATES } from '../constants';
import { useCurrentStepSlug } from '../features/payment/paymentSlice';
import FormBody from './FormBody';
import FormFooter from './FormFooter';
import FormHeader from './FormHeader';
import FormWrapper from './FormWrapper';
import SideBar from './SideBar';

const FormContainer: React.FC = () => {
  const currentStepSlug = useCurrentStepSlug();

  const currentForm = FORM_TEMPLATES.find(
    (template) => template.slug === currentStepSlug,
  );

  if (!currentForm) {
    return <div>Something Went Wrong</div>;
  }

  const layout = currentForm.layout;
  const header = currentForm.header;

  return (
    <main className="flex max-h-screen min-h-screen w-full items-start justify-center bg-[#eef5ff]  desktop:items-center desktop:px-64 desktop:py-24">
      <section className="w-full justify-start desktop:flex desktop:h-[70vh] desktop:gap-16 desktop:rounded-lg desktop:bg-white desktop:shadow-xl">
        <SideBar currentStepSlug={currentStepSlug} />
        <div className="flex flex-1 flex-col bg-[transparent]">
          <FormWrapper>
            <FormHeader title={header.title} description={header.description} />
            <FormBody layout={layout} currentStepSlug={currentStepSlug} />
            <FormFooter currentStepSlug={currentStepSlug} />
          </FormWrapper>
        </div>
      </section>
    </main>
  );
};

export default FormContainer;
