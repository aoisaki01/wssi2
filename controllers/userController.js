// const { User } = require('../models');

// module.exports = {
//     getAllUsers: async (req, res) => {
//         try {
//             const users = await User.findAll({
//                 attributes: ['id', 'name', 'email', 'proffession', 'role', 'avatar']
//             });

//             res.json({
//                 message: "Successfully retrieved all users",
//                 data: users
//             });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({
//                 message: "Internal Server Error",
//                 error: error.message
//             });
//         }
//     }
// }

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'proffession', 'role', 'avatar']
            });

            res.json({
                message: "Successfully retrieved all users",
                data: users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    },

    createUser: async (req, res) => {
        try {
            // Skema validasi
            const schema = {
                name: { type: 'string', min: 3 },
                email: { type: 'email' },
                pass: { type: 'string', min: 6 },
                role: { type: 'string', optional: true, default: 'operator' },
                proffession: { type: 'string', optional: true },
            };

            const validationResponse = v.validate(req.body, schema);

            if (validationResponse !== true) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: validationResponse
                });
            }

            // Cek apakah email sudah ada
            const emailExists = await User.findOne({
                where: { email: req.body.email }
            });

            if (emailExists) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.pass, salt);

            const newUser = {
                name: req.body.name,
                email: req.body.email,
                pass: hashedPassword,
                role: req.body.role,
                proffession: req.body.proffession
            };

            const createdUser = await User.create(newUser);

            res.status(201).json({
                message: "User created successfully",
                data: {
                    id: createdUser.id,
                    name: createdUser.name,
                    email: createdUser.email,
                    role: createdUser.role
                }
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}