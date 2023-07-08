import AdvancedImage from '../../assets/images/icon-advanced.svg';
import ArcadeImage from '../../assets/images/icon-arcade.svg';
import ProImage from '../../assets/images/icon-pro.svg';
import { SingleCardLayoutItem } from '../../constants';
import Card from '../Card';

interface SingleCardTypeProps {
  layout: SingleCardLayoutItem;
}

interface Option {
  item: {
    label: string;
    value: string;
    monthlyPrice: number;
    yearlyPrice: number;
  };
}
const getIcon = ({ item }: Option) => {
  switch (item.value) {
    case 'arcade':
      return ArcadeImage;
    case 'advanced':
      return AdvancedImage;
    default:
      return ProImage;
  }
};

const SingleCardType = ({ layout }: SingleCardTypeProps) => {
  const gridContent = (
    <div className="grid grid-cols-1 gap-3 px-4 desktop:grid-cols-3 desktop:gap-6">
      {layout.options.map((option, index) => (
        <Card option={option} key={index} icon={getIcon({ item: option })} />
      ))}
    </div>
  );
  return <div>{gridContent}</div>;
};

export default SingleCardType;
