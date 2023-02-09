import '../style/InfoCard.scss';
import { InfoCardProps } from '../lib/types';

function InfoCard({ title, amount, color }: InfoCardProps) {
  return (
    <div className='info-card'>
      <div style={{ color }} className='info-card__amount'>
        {amount}
      </div>
      <div className='info-card__title'>{title}</div>
    </div>
  );
}

export default InfoCard;
