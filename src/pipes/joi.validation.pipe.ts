import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  //eslint-disable-next-line
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.content) value.content = JSON.parse(value.content);

    const { error } = this.schema.validate(value);

    if (error) throw new UnprocessableEntityException(error.details[0].message);

    return value;
  }
}
