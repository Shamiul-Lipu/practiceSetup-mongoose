import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

export const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const statusCode = 400;

  const errorSources: TErrorSources = Object.values(err.errors).map(
    (valu: mongoose.Error.CastError | mongoose.Error.ValidatorError) => {
      return {
        path: valu?.path,
        message: valu?.message,
      };
    },
  );

  return {
    statusCode,
    message: 'Validation error!',
    errorSources,
  };
};
