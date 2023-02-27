import style from './ButtonRound.module.scss';

export interface IButtonRoundProps {
  text: string;
  isActive: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function ButtonRound({ text, isActive, disabled, onClick }: IButtonRoundProps) {
  return (
    <button
      type='submit'
      className={isActive ? style.roundBtnActive : style.roundBtn}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default ButtonRound;
