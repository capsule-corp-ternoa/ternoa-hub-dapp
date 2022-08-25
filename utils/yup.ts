import * as yup from "yup";

export const init = () => {
  yup.setLocale({
    mixed: {
      notType: 'Invalid field type',
      default: "Invalid field",
    },
    number: {
      min: "This field has to be greater than ${min}",
      max: "This field has to be smaller than ${max}",
      integer: 'This field has to be a number',
    },
  });
};
