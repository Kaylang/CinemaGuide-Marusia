import type { TFormField } from "@/types/form";

export const clearFormFields = (fields: TFormField[]): TFormField[] => {
  return fields.map(item => {
    return {
      ...item,
      value: '',
      isTouched: false,
      isValid: false,
    }
  })
}
