import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    pid:{
        type:Number,
        required:true
    },
    product_name:{
        type:String,
        required: true
    }, 
    product_catagory_tree:{
        type:Array,
        default:[]
    },
    retail_price:{
        type:Number,
        required:true
    },
    image:{
        type:Array,
        require:true
    },
    description:{
        type:String,
    },
    user_rating:{
        type:Number,
        default:0
    },
    product_sub_catagory:{
        type:String,
        require:true
    },
    reviews:{
        type:String,
    },
    review_rating:{
        type:Number,
        default:0
    },
    product_rating:{
        type:Number,
        default:0
    }
});

const Product=mongoose.model('products',productSchema);

export default mongoose.model.products || Product;