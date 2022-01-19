const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VariationSchema = new Schema(
	{
		variation: String,
		price: Number,
		quantity:{
			type:Number,
			default:0
		}
	}
);

const ProductSchema = new Schema({
	product_name: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: false
	},
	status: {
		type: Boolean,
		default: true
	},
	variations:[ VariationSchema ]

});

module.exports = mongoose.model('Product', ProductSchema);
