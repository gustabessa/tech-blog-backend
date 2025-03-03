import { checkAscendingNumericSequence } from '../functions/check-ascending-numeric-sequence';
import { checkDescendingNumericSequence } from '../functions/check-descending-numeric-sequence';

interface IPasswordValidationRules {
  ruleFn: (password: string) => boolean;
  ruleDescription: string;
}

/**
 * This section of code represents a regular expression for password validation with the following rules:
 *
 * - `/^(?=.*[a-z]).+$/` : This expression ensures that there is at least one lowercase letter in the password.
 * - `/^(?=.*[A-Z]).+$/` : This expression ensures that there is at least one uppercase letter in the password.
 * - `/^(?=.*[0-9]).+$/` : This expression ensures that there is at least one number in the password.
 * - `/^(?=.*[!@#$%^&*()\-__+.]).+$/` : This expression ensures that there is at least one special character in the password.
 * - `/^.{8,}$/` : This quantifier ensures that the password is at least 8 characters long.
 */
export const passwordStrengthValidationRules: IPasswordValidationRules[] = [
  {
    ruleFn: (password: string) => password.match(/^(?=.*[a-z]).+$/) !== null,
    ruleDescription: 'Add a lowercase letter (a-z)',
  },
  {
    ruleFn: (password: string) => password.match(/^(?=.*[A-Z]).+$/) !== null,
    ruleDescription: 'Include an uppercase letter (A-Z)',
  },
  {
    ruleFn: (password: string) => password.match(/^(?=.*[0-9]).+$/) !== null,
    ruleDescription: 'Use at least one number (0-9)',
  },
  {
    ruleFn: (password: string) =>
      password.match(/^(?=.*[!@#$%^&*()\-__+.]).+$/) !== null,
    ruleDescription: 'Insert a special character, such as: @, #, $, % or !',
  },
  {
    ruleFn: (password: string) => password.match(/^.{8,}$/) !== null,
    ruleDescription: 'Make sure it has at least 8 characters',
  },
  {
    ruleFn: (password: string) => {
      const hasAscendingNumericSequence = checkAscendingNumericSequence({
        text: password,
        sequenceLength: 3,
      });
      const hasDescendingNumericSequence = checkDescendingNumericSequence({
        text: password,
        sequenceLength: 3,
      });

      return !hasAscendingNumericSequence && !hasDescendingNumericSequence;
    },
    ruleDescription:
      'Avoid numeric sequences, such as 123 or 321 (in any order)',
  },
];
