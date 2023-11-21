const prisma = require(`../utils/prisma`)
const jwt = require(`jsonwebtoken`)
require(`dotenv`).config()
const {SECRET_KEY,EXP_KEY} = process.env




const authenticate = async (req,res,next)=>{
    try {
        const authorization = req.headers.authorization
        // console.log(req.headers);
        if(!authorization) return res.status(401).json({msg:`unauthorizationA`})
        if(!authorization.startsWith(`Bearer `)) return res.status(401).json({msg:`unauthorizationB`})
        const [bearer,token] = authorization.split(` `)
        const payload = await jwt.verify(token,SECRET_KEY)
        const user = await prisma.user.findFirst({
            where:{id:payload.userId}
        })
        if(!user) return res.status(401).json({msg:`unauthorizationC`})
        delete user.password

        req.user = user
        // if(user.isAdmin) return res.status(400).json({msg:`not admin`})

        // console.log(authorization);
        // console.log(payload);
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {authenticate}