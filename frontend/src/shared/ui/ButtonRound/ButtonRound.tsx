import style from './ButtonRound.module.scss';

export interface IButtonRoundProps {
  text: string;
  isActive: boolean;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

function ButtonRound({ text, isActive, type, disabled, onClick }: IButtonRoundProps) {
  return (
    <button
      type={type || 'button'}
      className={isActive ? style.roundBtnActive : style.roundBtn}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonRound;
