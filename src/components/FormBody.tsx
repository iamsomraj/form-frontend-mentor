import { LAYOUT_ITEM_TYPE_VALUES, LayoutItemType } from '../constants';
import CheckboxType from './LayoutItemTypes/CheckboxType';
import InputType from './LayoutItemTypes/InputType';
import SingleCardType from './LayoutItemTypes/SingleCardType';

interface FormBodyProps {
  layout: LayoutItemType[];
}

const getLayoutItem = (layout: LayoutItemType, index: number) => {
  switch (layout.type) {
    case LAYOUT_ITEM_TYPE_VALUES.TEXT:
    case LAYOUT_ITEM_TYPE_VALUES.EMAIL:
      return <InputType key={index} layout={layout} />;
    case LAYOUT_ITEM_TYPE_VALUES.SINGLE_CARD:
      return <SingleCardType key={index} layout={layout} />;
    case LAYOUT_ITEM_TYPE_VALUES.CHECKBOX:
      return <CheckboxType key={index} layout={layout} />;
    default:
      return <div key={index}>Could Not Find</div>;
  }
};

const FormBody: React.FC<FormBodyProps> = ({ layout }) => {
  return (
    <div className="flex flex-1 flex-col gap-2 desktop:gap-4">
      {layout.map((layout, index) => getLayoutItem(layout, index))}
    </div>
  );
};

export default FormBody;
