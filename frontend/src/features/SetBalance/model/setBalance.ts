import createBalance from '../../../entities/Balance/api/createBalance';
import { ICallback } from '../../../shared/lib/types';
import { validateBalance } from '../../../shared/utils/utils';
import { IUserAccess } from '../../Registration/lib/types';

const balanceInputProps = {
  label: 'Your balance',
  placeholder: '0',
  type: 'text',
  required: true,
};

function handleValidationError(value: string, handleError: ICallback<boolean>) {
  const isValid = validateBalance(value);
  handleError(isValid);
}

function handleOnChange(
  value: string,
  updateValueCallback: ICallback<string>,
  handleError: ICallback<boolean>,
) {
  updateValueCallback(value);
  handleValidationError(value, handleError);
}

async function handleSubmitBalance(
  e: React.FormEvent<HTMLFormElement>,
  balance: string,
  accessData: IUserAccess,
  approveUser: ICallback<boolean>,
  isValid: boolean,
  updateContext: ICallback<boolean>,
) {
  e.preventDefault();
  if (isValid) {
    const { token, id } = accessData;
    const balanceNum = +parseFloat(balance).toFixed(2)
    if (id && token) {
      await createBalance(balanceNum, id, token);
      approveUser(true);
      updateContext(true);
    }
  }
}

export {
  validateBalance,
  balanceInputProps,
  handleSubmitBalance,
  handleValidationError,
  handleOnChange,
};
