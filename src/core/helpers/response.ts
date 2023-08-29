import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export interface ResponseDTO {
  data: object | null;
  message?: string;
  status?: number;
}

export const SuccessResponse = (res: Response, response: ResponseDTO) => {
  const { message, data, status } = response;
  const statusCode = status ?? HttpStatus.OK;

  res.status(statusCode).json({ success: true, message, data });
  return;
};

export const ErrorResponse = (res: any, error: any): ResponseDTO => {
  const message = typeof error.message === 'string' ? error.message : 'Something went wrong';

  let errors = null;
  if (typeof error.response == 'object') [(errors = error.response)];

  return res.status(error.status ?? HttpStatus.BAD_REQUEST).json({ success: false, message, errors });
};
