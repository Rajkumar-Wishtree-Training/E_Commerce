const mongoose = require('mongoose')
const validator = require('validator')
const orderSchema = mongoose.Schema({
    address : {
        type : String,
        required : true,
        trim : true
    },
    contact : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(!validator.isMobilePhone(value)){
                throw Error('Invalid mobile number')
            }
            if(value.length < 10){
                throw Error('Invalid mobile number')
            }
        }
    },
    amount: {
       type : Number,
       trim : true
    },
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
})

const Order = new mongoose.model('Order',orderSchema);

module.exports = Order;