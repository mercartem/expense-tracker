import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Footer } from 'rsuite';
import MainHeader from '../../widgets/MainHeader/ui/MainHeader';
import style from './Fallback.module.scss'

interface FallbackProps {
  resetErrorBoundary: (...args: Array<unknown>) => void
}

function ErrorFallback({resetErrorBoundary}: FallbackProps) {
  const {t} = useTranslation()
  return (
      <div className={style.wrapper}>
        <MainHeader />
        <Box className={style.textWrapper}>
          <p className={style.text}>{t('error.globalError')}</p>
          <Button className={style.button} variant='outlined' onClick={resetErrorBoundary}>
            {t('error.try')}
          </Button>
        </Box>
        <Footer />
      </div>
    )
};

export default ErrorFallback