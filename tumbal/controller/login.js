const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({
      where: { email: email }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found or email incorrect'
      });
    }


    const isPasswordValid = await bcrypt.compare(password, user.password);


    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Password incorrect'
      });
    }

    
    const token = jwt.sign({
      id: user.id,
      email: user.email,
      username: user.username
    }, process.env.JWT_SECRET, {
      expiresIn: '1h' 
    });


    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      token: token
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
