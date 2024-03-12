const { body,query } = require('express-validator')

const validationRules = {
  login : () => {
    return [
      //body('email', "Please enter your Email and Password.").exists().isEmail(),
      //body('password',"Please enter your Email and Password.").exists(),
      //body('user_type',"Please send user type.").exists()
    ]
  },
  register_customer : () => {
    return [
      //body('email', "Please enter your Email .").exists().isEmail(),
      //body('password',"Please enter your Password.").exists(),
      body('phone',"Please send phone.").exists(),
      body('device_type',"Please send device type.").exists(),
      body('user_name',"Please send user name.").exists()
      //body('city',"Please send city.").exists(),
      //body('state',"Please send state.").exists(),
      //body('country',"Please send country.").exists(),
      //body('zip_code',"Please send zip code.").exists()
    ]
  },
  register_employ : () => {
    return [
      body('email', "Please enter your Email .").exists().isEmail(),
      body('password',"Please enter your Password.").exists(),
      body('first_name',"Please send first name.").exists(),
      body('last_name',"Please send last name.").exists(),
      body('address',"Please send address.").exists(),
      body('phone',"Please send phone.").exists(),
      body('device_type',"Please send device type.").exists(),
      body('user_name',"Please send user name.").exists(),
      body('lic_type_code',"Please send lic type code.").exists(),
      body('lic_type',"Please send lictype.").exists(),
      body('lic_number',"Please send lic number.").exists()
      //body('zip_code',"Please send zip code.").exists()
    ]
  },
  register_company : () => {
    return [
      body('email', "Please enter your Email .").exists().isEmail(),
      body('password',"Please enter your Password.").exists(),
      body('name',"Please send name.").exists(),
      body('sufix',"Please send sufix.").exists(),
      body('address1',"Please send address.").exists(),
      body('phone',"Please send phone.").exists(),
      body('expiry_date',"Please send expiry_date.").exists(),
      body('issue_date',"Please send issue_date.").exists()
      //body('city',"Please send city.").exists(),
      //body('state',"Please send state.").exists(),
      //body('country',"Please send country.").exists(),
      //body('zip_code',"Please send zip code.").exists()
    ]
  },
  update_user : () => {
    return [
      body('id', "Please enter id .").exists().isInt(),
    ]
  },

  search_user : () => {
    return [
      body('name', "Please enter name .").exists().isString(),
    ]
  },
  updatePassword : () => {
    return [
      body('email', "Please send email or password.").exists(),
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
      body('email', "Please send email.").exists(),
      body('token', "Some issue in your request.").exists(),
      body('password', "Please send password.").exists(),
    ]
  },
  likeData : () => {
    return [
      body('video_id', "Please send video id.").exists(),
      body('like_status', "Please send status.").exists(),
    ]
  },
  viewVideoData : () => {
    return [
      body('video_id', "Please send video id.").exists(),
      body('activity_for', "Please send user id.").exists()
    ]
  },
  followingData : () => {
    return [
      body('following_id', "Please send video id.").exists(),
      body('status', "Please send status.").exists(),
    ]
  }


}



module.exports = {
  validationRules
}