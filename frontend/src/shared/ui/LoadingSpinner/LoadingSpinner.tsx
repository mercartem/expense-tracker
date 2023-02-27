import style from './LoadingSpinner.module.scss';

function LoadingSpinner () {
  return (
    <div className={style.loaderContainer}>
      <div className = {style.loader}/>
    </div>
  )
}

export default LoadingSpinner