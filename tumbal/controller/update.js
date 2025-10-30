const bcrypt = require('bcrypt');
const {User} = require('../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req,res) =>{
    const schema = {
        name: 'string|optional',
        email: 'string|optional',
        password: 'string|optional|min:6',
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

    const id = req.params.id;
    const user = await User.findByPk(id);

    if(!user){
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    const email = req.body.email;
    if(email){
        const checkEmail = await User.findOne({
            where: {email}
        });

        if(checkEmail && email !== user.email){
            return res.status(409).json({
                status: 'error',
                message: 'Email already registered'
            });
        }
    }

    const passwd = await bcrypt.hash(req.body.password, 10);
    const {name, profession, role, avatar} = req.body;

    await user.update({
        email,
        password: passwd,
        name,
        profession,
        role,
        avatar
    });

    return res.status(200).json({
        status: 'success',
        message: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });
}