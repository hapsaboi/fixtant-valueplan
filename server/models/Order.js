const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    product_id:{
        type: String, 
        required: true
    },
	product_name:{
        type: String, 
        required: true
    },
    quantity:{
        type: Number, 
        required: true
    },
	variation:{
        type: String, 
    },
    price:{
        type: Number, 
        required: true
    }
    

});

const OrderSchema = new Schema(
	{
		name: {
			type: String
		},
		phone: {
			type: String
		},
		address: {
			type: String,
		},
		email:{type:String,required:true},
        items:[itemSchema],
		status:{type:String, default:"Not Processed"},
		date:{
			type: Date, 
			default: Date.now
		}
	}
);


module.exports = mongoose.model('Orders', OrderSchema);
