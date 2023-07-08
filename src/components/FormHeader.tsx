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

export default FormHeader;
