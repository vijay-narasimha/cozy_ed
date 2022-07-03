const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')
const crypto=require('crypto')

const User=new mongoose.Schema({
name:{
    type:String,
    required:true
},
photo:{
    type:String,
    default:'default.jpg'
    
},
email:{
    type:String,
    unique:true,
},
password:String,
resettoken:String,
phonenumber:String,

})

User.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()

})

User.methods.correctPassword=async function(password,userpassword){
    return await bcrypt.compare(password,userpassword)
}


User.methods.createResetToken=function(){
    const resetToken=crypto.randomBytes(32).toString('hex');
    // this.resettoken = crypto
    // .createHash('sha256')
    // .update(resetToken)
    // .digest('hex');
this.resettoken=resetToken
    return resetToken
}

const model=mongoose.model('User',User);
module.exports=model;