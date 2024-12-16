import type { TFormField } from "@/types/form";
import { isFormValid } from "@/singltons/isFormValid";

export const validateForm = (fields: TFormField[]) => {
  for (const field of fields) {
    if (field.isValidatable) {
      let isRequiredValid = true;
      let isMinValid = true;
      let isMaxValid = true;
      let isRegExpValid = true;
      let isEqualValid = true;

      if (field.isRequired) {
        if (field.value.trim().length === 0) {
          field.error = field.fieldErrors?.required;
          isRequiredValid = false;
          continue;
        } else {
          isRequiredValid = true;
        }
      }

      if (field.regExp) {
        if (!field.regExp.test(field.value.trim())) {
          field.error = field.fieldErrors?.regExp;
          isRegExpValid = false;
        } else {
          isRegExpValid = true;
        }
      }

      if (field.min) {
        if (field.value.trim().length < field.min) {
          field.error = field.fieldErrors?.min;
          isMinValid = false;
        } else {
          isMinValid = true;
        }
      }

      if (field.max) {
        if (field.value.trim().length > field.max) {
          field.error = field.fieldErrors?.max;
          isMaxValid = false;
        } else {
          isMaxValid = true;
        }
      }

      if (field.equal) {
        const fieldEqualValue = fields.find(item => item.name === field.equal);
        if (fieldEqualValue && fieldEqualValue.value === field.value) {
          isEqualValid = true;
        } else {
          isEqualValid = false;
          field.error = field.fieldErrors?.equal;
        }
      }

      if (isRequiredValid && isMinValid && isMaxValid && isRegExpValid && isEqualValid) {
        field.isValid = true;
      } else {
        field.isValid = false;
      }
    }
  }
  isFormValid.value = fields.find(item => !item.isValid) ? false : true;
}
