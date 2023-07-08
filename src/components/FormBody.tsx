import { LAYOUT_ITEM_TYPE_VALUES, LayoutItemType } from '../constants';
import InputType from './InputType';

interface FormBodyProps {
  layout: LayoutItemType[];
}

const getLayoutItem = (layout: LayoutItemType, index: number) => {
  switch (layout.type) {
    case LAYOUT_ITEM_TYPE_VALUES.TEXT:
    case LAYOUT_ITEM_TYPE_VALUES.EMAIL:
      return <InputType key={index} layout={layout} />;
    default:
      return <div key={index}>Could Not Find</div>;
  }
};

const FormBody: React.FC<FormBodyProps> = ({ layout }) => {
  return (
    <div className="flex flex-col gap-2">
      {layout.map((layout, index) => getLayoutItem(layout, index))}
    </div>
  );
};

export default FormBody;
