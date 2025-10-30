const bcrypt = require('bcrypt');
const {User} = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req,res) =>{
    const schema = {
        name: 'string|empty:false',
        email: 'string|empty:false',
        password: 'string|empty:false|min:6',
        profession: 'string|optional',
        role: {type:'enum', values:['admin','operator'], optional:true},
        avatar: 'string|optional'
    };

    const validate = v.validate(req.body, schema);

    if(validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const user = await User.findOne({
        where: {
            email: req.body.email
        },
        attributes: ['id','name','email']
    });

    if(user){
        return res.status(409).json({
            status: 'error',
            message: 'Email already registered'
        });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: hashPass,
        profession: req.body.profession,
        role: req.body.role,
        avatar: req.body.avatar
    }

    const newUser = await User.create(data);
    return res.status(200).json({
        status: 'sukses',
        data: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
    });
}