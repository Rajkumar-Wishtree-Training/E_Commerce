const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true,
        validate(value){
            if(value < 0) {
                throw Error('Price must be positive')
            }
        }
    },
    description : {
        type : String,
        trim : true
    },
    image:{
        type : String,
        default : 'https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_960_720.jpg'
    },
    qty:{
    type : Number,
    trim : true,
    required : true,
    validate(value){
        if(value < 0){
            throw Error("Qty must be positive");
        }
    }
    },
    status:{
        type : Boolean,
        default : true
    }
    
})

const Product = new mongoose.model('Product',productSchema);
module.exports = Product;