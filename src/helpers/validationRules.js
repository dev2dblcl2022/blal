// ******************************* Login validation ******************************* //
export const validationRules = {
  email: {
    required: {value: true, message: 'Email is Required'},
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: 'Email is not valid',
    },
  },
  mobile: {
    required: {value: true, message: 'Mobile number is Required'},
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: 'Mobile number is not valid',
    },
  },
};
// ******************************* Login Validation ends ******************************* //
