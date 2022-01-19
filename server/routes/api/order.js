const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

const {auth} = require('../../middleware/auth');
// Order Model
const Order = require('../../models/Order');
const User = require('../../models/User');
const Products = require('../../models/Product');

//@routes POST api/add_order/
//@desc create a order ---- used by product order and service order
//@response - status: true or false
// {
//     "buyer_name":"Hanis Hapsa",
//     "phone":"09094******",
//     "address":"Karewa Masakare",
//     "payment_method":"Cash",
//     "items":[
//          {"product_id":"60f71403c5b8cf2294520538","product_name":"Tecno Camon","quantity":10,"variation":"Medium","store":"Hive Store",price":20000}
//      ]
// }

router.post('/add_order', auth, async(req,res)=>{
    const newOrder = new Order(req.body);
    try{
        
        const order = await newOrder.save();

        if(newOrder.type==='order'){
            const items = req.body.items;
            const ids = items.map(s=>s.product_id);
            const products = await Products.find( { _id : { $in : ids } } ); 
            for (var item of items) {
                let temp = (products.filter(product => product._id == item.product_id))[0];
                let tempItem = temp.variations.filter(x => x.variation == item.variation)[0];
                tempItem.quantity = tempItem.quantity - item.quantity;
                await Products.findByIdAndUpdate(temp._id,temp);
            }
        };
       
        if(order){
            res.status(200).send({'status':true});
        }else{
            res.status(400).send({'status':false});
        }
    }catch(err){
        res.status(400).json(err);
    }

});

//@routes GET api/order/
//@desc Get all 
//@response - status: true or false | data | error
router.get('/show_orders', auth, async (req, res) => {
	let order; 
    
    order = await Order.find({email:req.query.email});
    
    try {
		if (!order){res.status(400).send({status:false, error:'Problem with the query'})};
		res.status(200).send({status:true,data:order});
        
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

router.get('/show_all_orders', auth, async (req, res) => {
	let order; 
    
    order = await Order.find();
    
    try {
		if (!order){res.status(400).send({status:false, error:'Problem with the query'})};
		res.status(200).send({status:true,data:order});
        
	} catch (err) {
		res.status(400).json({ msg: err });
	}
});

module.exports = router;