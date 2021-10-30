import { registerDecorator, ValidationOptions } from 'class-validator';
import { ValidCPFRule } from '../rules/valid-cpf.rule';

export function IsValidCPF(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'validCPF',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValidCPFRule,
    });
  };
}
