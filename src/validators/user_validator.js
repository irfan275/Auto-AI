const { body,query } = require('express-validator')
const { Messages } = require('../constants/messageConstant')

const validationRules = {
  login : () => {
    return [
      body('email', Messages.EMAIL_PSWD_REQ).exists().isEmail().withMessage(Messages.EMAIL_FORMAT_INVALID),
      body('password',Messages.EMAIL_PSWD_REQ).exists(),
    ]
  },
  register_user : () => {
    return [
      body('email', "Please enter your Email .").exists().isEmail(),
      body('password',"Please enter your Password.").exists(),
      body('first_name',"Please send first name.").exists(),
      body('last_name',"Please send last name.").exists(),
      body('address',"Please send address.").exists(),
      body('phone',"Please send phone.").exists(),
      //body('zip_code',"Please send zip code.").exists()
    ]
  },

  search_user : () => {
    return [
      body('name', "Please enter name .").exists().isString(),
    ]
  },
  updatePassword : () => {
    return [
      //body('email', "Please send email or password.").exists(),
      body('password', "Please send email or password.").exists()
    ]
  },
  forgotPassword : () => {
    return [
      body('email', "Please send email.").exists()
    ]
  },
  resetPassword : () => {
    return [
      //body('email', "Please send email.").exists(),
      body('password', "Please send password.").exists(),
      //body('confirmPassword', "Please send password.").exists(),
    ]
  }


}



module.exports = {
  validationRules
}