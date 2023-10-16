const {registerSchema,loginSchema} = require(`../validator/validate`)
const prisma = require(`../utils/prisma`)
const bcrypt = require(`bcryptjs`)
const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const {SECRET_KEY,EXP_KEY} = process.env


const register = async (req,res,next)=>{
    try {
        const {value,error} = registerSchema.validate(req.body)
        if(error) return res.status(400).json({error:`400 validate error`})
        const check = await prisma.user.findFirst({
            where:{
                OR:[{email:value.email},{phoneNumber:value.phoneNumber}]
            }
        })
        if(check) return res.status(400).json({error:`400 Duplicate email or phone number`})
        value.password = await bcrypt.hash(value.password,12)
        const user = await prisma.user.create({
            data:value
        })

        delete user.password
        const payload = {userId:user.id}
        const TOKEN = jwt.sign(payload,SECRET_KEY,{expiresIn:"6h"})
        res.status(200).json({TOKEN,user})
        
        
    } catch (error) {
        next(error)
    }
}

const login = async (req,res,next)=>{
    try {
        console.log(req.body);
        const { value, error } = loginSchema.validate(req.body);
        if(error) return res.status(400).json({error:`400 validate error`})
        const user = await prisma.user.findFirst({
            where:{
                OR:[{email:value.emailPhoneNumber},{phoneNumber:value.emailPhoneNumber}]
            }
        })
        if(!user) return res.status(400).json({error:`400 no user found`})
        const compare = await bcrypt.compare(value.password,user.password)
        if(!compare) return res.status(400).json({error:`400 wrong password`})
        
        delete user.password
        const payload = {userId:user.id}
        const TOKEN = jwt.sign(payload,SECRET_KEY,{expiresIn:"6h"})
        
        res.status(200).json({TOKEN,user})
    } catch (error) {
        next(error)
    }
}

const me = async (req,res,next)=>{
    console.log(req.user);
    res.status(200).json({ user: req.user })
}

module.exports = {register,login,me}