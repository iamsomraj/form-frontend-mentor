import {
  LAYOUT_ITEM_TYPE_VALUES,
  LayoutItemType,
  SIDE_BAR_MENU_OPTIONS,
} from '../constants';
import { StepSlugType } from '../features/payment/paymentSlice';
import CheckboxType from './LayoutItemTypes/CheckboxType';
import InputType from './LayoutItemTypes/InputType';
import MultiCardType from './LayoutItemTypes/MultiCardType';
import SingleCardType from './LayoutItemTypes/SingleCardType';
import Overview from './Overview';

interface FormBodyProps {
  layout: LayoutItemType[];
  currentStepSlug: StepSlugType;
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
    case LAYOUT_ITEM_TYPE_VALUES.MULTI_CARD:
      return <MultiCardType key={index} layout={layout} />;
    default:
      return <div key={index}>Could Not Find</div>;
  }
};

const FormBody: React.FC<FormBodyProps> = ({ layout, currentStepSlug }) => {
  const layoutContent = layout.map((layout, index) => getLayoutItem(layout, index));
  const finalOverviewContent = <Overview />;
  const isLastStep =
    currentStepSlug === SIDE_BAR_MENU_OPTIONS[SIDE_BAR_MENU_OPTIONS.length - 1].slug;
  const formBody = isLastStep ? finalOverviewContent : layoutContent;
  return <div className="flex flex-1 flex-col gap-2 desktop:gap-4">{formBody}</div>;
};

export default FormBody;
