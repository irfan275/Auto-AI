const { Messages } = require("../constants/messageConstant");
const { StatusCode } = require("../constants/statusEnum");
const { ERROR, SUCCESS } = require("../helper/responseHelper");
const { User } = require("../model");
const { createToken } = require("../validators/middleware");


const loginUser = async (req,res) => {
    //console.log(req.originalUrl);
    try{
        let {email,password} = req.body;
        

        const  user = await User.findOne({email}).select('+password');
        
        if (!user) 
            return ERROR(res, StatusCode.NOT_FOUND,Messages.EMAIL_NOT_REG);
        // Call the comparePassword method to compare the entered password
        const passwordsMatch = await user.comparePassword(password);

        if (!passwordsMatch) {
            return ERROR(res,StatusCode.NOT_FOUND,Messages.LOGIN_INVALID);
        }
        const accessToken = createToken({
            email: user.email,
            role: user.role,
            id: user._id,
        });
        let userData = {
            ...user._doc,
            accessToken
        }
        // Passwords match, login successful
        return SUCCESS(res,userData);

    }catch (e){
        console.log(e)
        return ERROR(res,StatusCode.SERVER_ERROR,Messages.SERVER_ERROR);
    }
}

module.exports = {
    loginUser,
}