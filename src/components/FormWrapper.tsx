import { ReactNode } from 'react';

import ThankYouImage from '../assets/images/icon-thank-you.svg';
import { usePurchaseConfirmed } from '../features/payment/paymentSlice';

interface FormWrapperProps {
  children: ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = (props) => {
  const confirmed = usePurchaseConfirmed();
  const thankYouContent = (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <img
        src={ThankYouImage}
        alt={'Thank You'}
        className="h-12  w-12 flex-shrink-0 overflow-hidden rounded-full object-cover object-center"
      />
      <div className="text-center font-primary-bold text-2xl font-bold">Thank you!</div>
      <div className="max-w-[240px] break-words text-center font-primary-regular text-base text-cool-gray desktop:max-w-xs">
        Thanks for confirming your subscription! We hope you have fun using our platform.
        If you ever need support, please feel free to email us at support@loremgaming.com.
      </div>
    </div>
  );
  return (
    <form className="mx-6 -mt-[15vh] flex min-h-[50vh] flex-1 flex-col gap-6 rounded-lg bg-white py-4 shadow-xl desktop:m-0 desktop:mb-6 desktop:mr-8 desktop:pt-10 desktop:shadow-none">
      {confirmed ? thankYouContent : props.children}
    </form>
  );
};

export default FormWrapper;
