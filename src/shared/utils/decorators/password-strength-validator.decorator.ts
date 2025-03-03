import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { passwordStrengthValidationRules } from '../constants/password-strength-validation-rules';

@ValidatorConstraint({ name: 'password-strength', async: false })
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
  private errors: string[] = [];

  validate(value: string): boolean {
    if (typeof value !== 'string') {
      return false;
    }
    this.errors = [];
    for (const { ruleFn, ruleDescription } of passwordStrengthValidationRules) {
      if (!ruleFn(value)) {
        this.errors.push(ruleDescription);
      }
    }

    return this.errors.length === 0;
  }

  defaultMessage(): string {
    return `Please adjust your password: ${this.errors.join(', ').toLowerCase()}.`;
  }
}

/**
 * Checks if the string is a strong password.
 * If given value is not a string, then it returns false.
 */
export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        ...validationOptions,
      },
      constraints: [],
      validator: PasswordStrengthValidator,
    });
  };
}
