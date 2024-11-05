import bcrypt from 'bcrypt';
import crypto from 'crypto'
import UsersModel from '../models/userModel.js'

const createApiKey = ({ id, email }) => {
    const randomString = crypto.randomBytes(16).toString('hex');
    return `mern-${id}-${email}-${randomString}`
}
export const apiKeyCache = {}

const users = {
    register: async (req, res) => {
        try {
            const { userName, email, password } = req.body
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(password, salt)
            const exists = await UsersModel.findOne({ email })
            if (!userName) throw new Error('UserName is required!');
            if (!email) throw new Error('Email is required!');
            if (!password) throw new Error('Password is required!')
            if (exists) {
                return res.json({
                    success: false,
                    message: 'Email da ton tai'
                })
            }
            const createUser = new UsersModel({
                userName,
                email,
                password: hashPassword
            })
            const user = await createUser.save()
            res.json({
                message: 'Register successful!',
                success: true,
                users: user
            })
        } catch (error) {
            res.json({
                message: error.message,
                success: false
            });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await UsersModel.findOne({ email })
            const hashPasswordLogin = bcrypt.compareSync(password, user.password)
            if (!user) {
                return res.json({
                    success: false,
                    message: 'User khong ton tai'
                })
            }
            if (!hashPasswordLogin) {
                return res.json({
                    success: false,
                    message: "Mat khau sai",
                })
            }
            const apiKey = createApiKey({ id: user._id, email: user.email })
            apiKeyCache[apiKey] = { userId: user._id, email: user.email }
            console.log("apiKeyCache:", apiKeyCache);

            res.json({
                message: "Dang nhap thanh cong",
                success: true,
                apiKey
            })

        } catch (error) {
            res.json({
                message: error.message,
                success: false
            });
        }
    }
}

export default users