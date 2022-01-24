const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

// Code Model
const Code = require('../../models/Code');

let FrontEnd = "";
const port = process.env.PORT || process.env.LocalPort;
{process.env.LocalPort === port ? FrontEnd = process.env.FrontEndHost : FrontEnd = process.env.FrontEndHostProduction}


router.get('/checkcode/:code', async (req, res) => {
    const code = req.params.code;

    //Simple Validation
    if (!code) {
        return res.status(400).send({ msg: 'Code was not provided', status: false });
    }

    try {
        const found_code = await Code.findOne({ code });
        if (! found_code) {return res.status(401).send({ msg: 'Code does not exist or has been used - E01', status: false });}
        else{
            if( found_code.status==='available'){
                return res.status(200).send({ msg: 'Code Available', status: true, code:found_code });
            }else{
                return res.status(401).send({ msg: 'Code does not exist or has been used - E02', status: false }); 
            }
        }


    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
});


router.post('/generatecode', async (req, res) => {
    const {number,type} = req.body;
    var position = 1;
        
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;



    try {
        while(position <= number) {
            var result = ""
            for ( var i = 0; i < 6 ; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            const found_code = await Code.findOne({ result });
            if(!found_code){
                const newCode = new Code({ type, code:result });
                newCode.save();
                position++;
            }
        }    
        res.status(200).json({ msg: number+" codes of type "+type+"generated successfully", status: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
});


module.exports = router; 
