const Joi=require("joi");
const signupvalidation=(req,res,next)=>{
    console.log("validation main agya");
    const schema=Joi.object({
        Firstname:Joi.string().min(3).max(30).required(),
        Lastname:Joi.string().min(3).max(30).required(),
        Contact:Joi.string().required(),
        email:Joi.string().email().required(),
        Password:Joi.string().min(6).required(),
        ConfirmPassword: Joi.any().valid(Joi.ref('Password')).required().messages({
            'any.only': 'Confirm Password must match Password'
        }),
    });
    const {error}=schema.validate(req.body);
    if(error){
        console.log("validation main fail",error);
        return res.status(400).json({
            success:false,
            message:error.details[0].message});
    }
    next();
};
const Loginvalidation=(req,res,next)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        Password:Joi.string().min(6).required(),
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400).json({
            success:false,error:error.details[0].message});
    }
    next();
}
module.exports={signupvalidation,Loginvalidation};