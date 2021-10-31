import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'validCPF' })
@Injectable()
export class ValidCPFRule implements ValidatorConstraintInterface {
  validate(value: string) {
    const isValid = /^\d{3}\.\d{3}\.\d{3}\-\d{2}/;
    return isValid.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `CPF ($value) inválido.`;
  }
}
