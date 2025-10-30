const {User} = require('../models');

module.exports = async (req,res) =>{
    const users = await User.findAll({
        attributes:['id','name','role','profession','email','avatar','profession']
    });

    return res.status(200).json({
        status:'sukses',
        data: users,
    });
}