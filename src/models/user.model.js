const bcrypt = require('bcryptjs/dist/bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true, 
        unique : true,
        required : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error('Invalid Email')
            }
        }
    },
    password : {
        type : String , 
        required : true
    },
    isAdmin:{
        type : Boolean,
        default : false
    },
    products : [{
        product: {
            type : mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }}
    ],
    token : {
        type : String,
        required : true
    }
})

userSchema.methods.getAuthToken = async function () {
     const token = jwt.sign({_id : this._id.toString()} , 'key' , {expiresIn : '7 days'})

    this.token = token;

    await this.save()
    return token;
}

userSchema.statics.findByEmailPassword = async (email , password) =>{
    const user = await User.findOne({email});
    if(!user){

        throw new Error('unable to login')

    }

    const isMatch =await bcrypt.compare(password , user.password)

    if(!isMatch){
        throw new Error('unable to login')
    }
    return user;    
} 

userSchema.pre('save' , async function(next){
    if(this.isModified('password')){
        // console.log(this.password);
        this.password = await bcrypt.hash(this.password , 8);
        // console.log(this.password);
    }
    next()
})

const User = new mongoose.model('User',userSchema)

module.exports = User;