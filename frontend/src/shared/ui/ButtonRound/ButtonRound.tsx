import style from './ButtonRound.module.scss';

export interface IButtonRoundProps {
  text: string;
  isActive: boolean;
  type: 'button' | 'submit' | 'reset' ;
  onClick?: () => void;
}

function ButtonRound({ text, isActive, type }: IButtonRoundProps) {
  return (
    <button type={type || 'button'} className={ isActive ? style.roundBtnActive : style.roundBtn }>
      {text}
    </button>
  );
}

export default ButtonRound;
