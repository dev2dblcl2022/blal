const validation = {
  phoneNumber: {
    presence: {
      message: 'Your mobile number is required',
    },
    format: {
      pattern: /^[6-9]\d{9}$/,
      // pattern: /^[0-9]{7,15}$/,
      message: 'Please enter a valid mobile number',
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: 'Your mobile number must be at least 10 digit',
    },
  },
  phoneNumberAddress: {
    presence: {
      message: 'Your mobile number is required',
    },
    format: {
      pattern: /^[6-9]\d{9}$/,
      // pattern: /^[0-9]{7,15}$/,
      message: 'Please enter a valid mobile number',
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: 'Your mobile number. must be at least 10 digit',
    },
  },
  age: {
    presence: {
      message: 'Your age is required',
    },
    format: {
      pattern: /^[1-9]/,
      message: 'Please enter a valid age',
    },
  },

  pinCode: {
    presence: {
      message: 'Your Pincode is required',
    },
    format: {
      pattern: /^[0-9]{6,6}$/,
      message: 'Please enter a valid Pincode',
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: 'Your Pincode must be 6 digit',
    },
  },

  required: {
    presence: {
      message: 'This field is required.',
    },
  },
  loginPassword: {
    presence: {
      message: 'This field is required.',
    },
  },

  instaUrl: {
    presence: {
      message: 'Your Instagram url is required',
    },
    format: {
      // pattern: /^((https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,\
      pattern: /^\s*(https:\/\/)?instagram\.com\/[a-z\d-_.]{1,255}\s*$/i,
      message: 'Please enter a valid url',
    },
  },

  facebookUrl: {
    presence: {
      message: 'Your Facebook url is required',
    },
    format: {
      // pattern: /^((https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
      // pattern: /^\s*(https:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/i,
      pattern:
        /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-_]*)?$/,
      message: 'Please enter a valid url',
    },
  },

  businessWebsite: {
    presence: {
      message: 'Your Business Website url is required',
    },
    format: {
      pattern: /^((https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,

      message: 'Please enter a valid url',
    },
  },

  number: {
    presence: {
      message: 'Please enter only numbers',
    },
    format: {
      pattern: /^(0|[1-9][0-9]*)$/,
      message: 'Please enter only numbers',
    },
  },
  email: {
    presence: {
      message: 'Your email is required',
    },
    format: {
      pattern: /^\w+([\.-1234567890]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
      message: 'Please enter a valid email',
    },
    length: {
      minimum: 3,
      maximum: 40,
      message: 'Your email must be valid',
    },
  },

  selectedFileName: {
    presence: {
      message: 'Please enter your file name',
    },
  },

  holderName: {
    presence: {
      message: 'Please enter card name',
    },
    format: {
      pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/,
      message: 'Card holder name only contain letters.',
    },
    length: {
      minimum: 3,
      maximum: 55,
      message: 'Your name must be within 3 to 30 character',
    },
  },

  streetNameOne: {
    presence: {
      message: 'Please enter your Street Address',
    },
  },

  streetNameTwo: {
    presence: {
      message: 'Please enter your Second Street Address',
    },
  },

  address: {
    presence: {
      message: 'Please enter your Address',
    },
  },

  expiryMonth: {
    presence: {
      message: 'Please enter expiry month',
    },
  },
  expiryYear: {
    presence: {
      message: 'Please enter expiry Year(s)',
    },
  },
  cardNumber: {
    presence: {
      message: 'Please enter card number',
    },

    format: {
      pattern: /^[\d\s]+$/,
      message: 'Please enter a valid card number',
    },
  },
  country: {
    presence: {
      message: 'Please enter your Country Name',
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: 'Please enter only Alphabate',
    },
  },
  newCategory: {
    presence: {
      message: 'Please enter your Category',
    },
    format: {
      pattern: /^[A-Za-z]+$/,
      message: 'Please enter only Alphabate',
    },
  },
  city: {
    presence: {
      message: 'Please enter your City Name',
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: 'Please enter only Alphabet',
    },
  },

  state: {
    presence: {
      message: 'Please enter your State Name',
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: 'Please enter only Alphabet',
    },
  },

  firstName: {
    presence: {
      message: 'Your last name is required',
    },

    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 55,
      message: 'Your name must be within 3 to 55 character',
    },
  },

  lastName: {
    presence: {
      message: 'Your last name is required',
    },

    format: {
      // pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/, // REGAX without space
      pattern: /^[a-zA-Z ]*$/, // REGAX for with space
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 55,
      message: 'Your name must be within 3 to 55 character',
    },
  },

  businessName: {
    presence: {
      message: 'Your Business name is required',
    },

    format: {
      pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/,
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 55,
      message: 'Your Business name must be within 3 to 55 character',
    },
  },

  // username: {
  //   presence: {
  //     message: 'Your User name is required',
  //   },

  //   format: {
  //     pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/,
  //     message: 'The field only contain letters',
  //   },
  // },

  usernameLogin: {
    presence: {
      message: 'Your Email / Mobile number / Username  is required',
    },

    format: {
      pattern: /^[a-zA-Z0-9_]*$/,
      // pattern: /^[-a-zA-Z]+(\+[-a-zA-Z]+)*$/,
      message: 'The field only contain letters',
    },
  },

  username: {
    presence: {
      message: 'Your User name is required',
    },

    format: {
      // pattern: /^[a-zA-Z0-9_@!.]*$/,
      pattern: /^[a-zA-Z ]*$/,
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 30,
      message: 'Your user name must be within 3 to 30 character',
    },
  },

  jobTitle: {
    presence: {
      message: 'Your Job Title name is required',
    },

    format: {
      // pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/,
      pattern: /^[a-zA-Z ]*$/,
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 30,
      message: 'Your job title must be within 3 to 30 character',
    },
  },

  eventName: {
    presence: {
      message: 'Your Event title is required',
    },

    format: {
      pattern: /^(?!\s*$|\s).[a-z A-Z]{1,49}$/,

      message: 'The field only contain letters',
    },
  },

  password: {
    presence: {
      message: 'This field is required',
    },
    format: {
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,16}$/,
      message:
        'Password must be at least 6 characters long with at least one alphabet, one number and may include special symbols',
    },
    length: {
      minimum: 6,
      message: 'Your password must be at least 6 characters long',
    },
  },

  oldPassword: {
    presence: {
      message: 'This field is required',
    },
    format: {
      pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{6,16}$/,
      message:
        'Password must be at least 6 characters long with at least one alphabet, one number and may include special symbols',
    },
    length: {
      minimum: 6,
      message: 'Your password must be at least 6 characters long',
    },
  },

  passwordLogin: {
    presence: {
      message: 'This field is required',
    },
  },

  change_password: {
    presence: {
      message: 'Please enter old password',
    },
    format: {
      pattern: /^\S*$/,
      message: 'Spaces are not allowed',
    },
    length: {
      minimum: 6,
      message: 'Your password must be at least 6 characters long',
    },
  },
  change_new_password: {
    presence: {
      message: 'Please enter new password',
    },
    format: {
      pattern: /^\S*$/,
      message: 'Spaces are not allowed',
    },
    length: {
      minimum: 6,
      message: 'Your password must be at least 6 characters',
    },
  },
  confirm_password: {
    presence: {
      message: 'This field is required',
    },

    length: {
      minimum: 1,
      message: 'Please enter confirm password',
    },
    match: {
      attribute: 'password',
      message: 'Your password needs to match with the above password',
    },
  },
  name: {
    presence: {
      message: 'Your Full Name is required',
    },

    format: {
      // pattern: /^[-a-zA-Z]+(\s+[-a-zA-Z]+)*$/,
      pattern: /^[a-zA-Z ]*$/,
      message: 'The field only contain letters',
    },
    length: {
      minimum: 3,
      maximum: 55,
      message: 'Your name must be within 3 to 55 character',
    },
  },

  message: {
    presence: {
      message: 'Your message is required',
    },
    length: {
      minimum: 3,
      maximum: 500,
      message: 'Your message  must be between 3-500 characters',
    },
  },

  delivery: {
    presence: {
      message: '',
    },
    length: {
      minimum: 3,
      maximum: 500,
      message: 'Your Delivery instructions  must be between 3-500 characters',
    },

    format: {
      pattern: /^[^-\s][a-zA-Z0-9_,-/.,'":()!\s-]+$/,
      message: 'The field only contain letters',
    },
  },

  instruction: {
    presence: {
      message: '',
    },
    length: {
      minimum: 3,
      maximum: 500,
      message: 'Your Instructions  must be between 3-500 characters',
    },

    format: {
      pattern: /^[^-\s][a-zA-Z0-9_,-/.,'":()!\s-]+$/,
      message: 'The field only contain letters',
    },
  },

  plotNumber: {
    presence: {
      message: 'Plot Number is Required',
    },

    format: {
      pattern: /^[^-\s][a-zA-Z0-9_,-/.,'":()\s-]+$/,
      message: 'Plot Number is invalid',
    },
  },

  inq: {
    presence: {
      message: '',
    },
    length: {
      minimum: 3,
      maximum: 500,
      message: 'Your Inquiry  must be between 3-500 characters',
    },

    format: {
      pattern: /^[^-\s][a-zA-Z0-9_,-/.,'":()!\s-]+$/,
      message: 'The field only contain letters',
    },
  },

  description: {
    presence: {
      message: 'Your Description is required',
    },
    length: {
      minimum: 10,
      maximum: 500,
      message: 'Your Description  must be between 10-500 characters',
    },

    format: {
      pattern: /^[^-\s][a-zA-Z0-9_,-/.,'":()!\s-]+$/,
      message: 'The field only contain letters',
    },
  },

  location: {
    presence: {
      message: 'Your location is required',
    },
  },
  zipCode: {
    presence: {
      message: 'Your Zip code is required',
    },
    format: {
      pattern: /^[-a-zA-Z0-9]+(\s+[-a-zA-Z0-9]+)*$/,
      message: 'Please enter a valid Zip code',
    },
    length: {
      minimum: 3,
      maximum: 10,
      message: 'Your Zip code.  must be between 3-10 digit',
    },
  },

  designation: {
    presence: {
      message: 'Please enter your designation',
    },
    format: {
      pattern: /^[a-zA-Z ]*$/,
      message: 'Please enter only Alphabate',
    },
  },
  userName: {
    presence: {
      message: 'Please enter username',
    },
  },
  otp: {
    presence: {
      message: 'An OTP is required to proceed',
    },
    format: {
      pattern: /[0-9]/,
      message: 'OTP must contain numbers',
    },
    length: {
      minimum: 6,
      maximum: 6,
      message: 'Your OTP must be 6 Digits',
    },
  },
};

export default validation;
