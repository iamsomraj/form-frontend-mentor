import { ReactNode } from 'react';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  return (
    <form className="mx-6 -mt-[10%] flex flex-col gap-6 rounded-lg bg-white py-4 shadow-xl desktop:m-0 desktop:mr-8  desktop:pt-10 desktop:shadow-none">
      {props.children}
    </form>
  );
};

export default FormWrapper;
