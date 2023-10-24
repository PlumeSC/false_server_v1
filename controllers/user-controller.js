const cloudinary = require(`../middleware/cloudinary`)
const prisma = require(`../utils/prisma`)
const fs = require(`fs/promises`)
const {updateUserSchema} = require(`../validator/validate`)
const bcrypt = require(`bcryptjs`)




const updateUser = async (req,res,next)=>{
    try {
        const {value,error} = updateUserSchema.validate(req.body)
        if(error) return res.status(401).json({msg:`error`})

        const userPass = await prisma.user.findFirst({
            where:{
                id:req.user.id
            },
            select:{
                password:true
            }
        })
        const compare = await bcrypt.compare(value.password,userPass.password)

        if(compare){
            if(req.file) {
                const result = await cloudinary.uploader.upload(req.file.path)
                await prisma.user.update({
                    data:{
                        profileImg:result.secure_url
                    },
                    where:{
                        id:req.user.id
                    }
                })
            }
            async function update(data){
                await prisma.user.update({
                    where:{
                        id:req.user.id
                    },
                    data:{
                        [data]:value[data]
                    }
                })
            }
            if(value.firstname) update(`firstname`)
            if(value.lastname) update(`lastname`)
            if(value.email) update(`email`)
            if(value.phoneNumber) update(`phoneNumber`)


            res.status(200).json({msg:`done`})

        }



    } catch (error) {
        next(error)
    }
}





module.exports = {updateUser}