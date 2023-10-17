const cloudinary = require(`../middleware/cloudinary`)
const prisma = require(`../utils/prisma`)
const fs = require(`fs/promises`)

require(`dotenv`).config()
const {cloud_name,api_key,api_secret} = process.env



const newsPost = async (req,res,next)=>{
    try {
        const {title,team,newsContent} = req.body
        const content = JSON.parse(newsContent)

        // console.log(title,team,content);

        await prisma.news.create({
            data:{
                newsTitle:title,team,
                NewsContnt:{
                    create:
                        content.map((data,index)=>{
                            // console.log(data.message,data.messageId);
                            return ({message:data.message,indexContent:Number(data.messageId),})
                        })
                    }
                }
            })
        console.log(`post news complete`);
        res.status(200).json({news:`post news complete`})
    } catch (error) {
        next(error)
    }
}

const newsImg = async (req,res,next)=>{
    try {
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path)
            // secure_url

            const newsId = await prisma.news.findMany({
                orderBy:{date:"desc"},
                take:1
            })
            // console.log(newsId[0].id);


            await prisma.news.update({
                data:{
                    newsImg:result.secure_url
                },
                where:{
                    id:newsId[0].id
                }
            })
        }
        console.log(`post newsImg complete`);
        res.status(200).json({news:`post newsImg complete`})
    } catch (err) {
        next(err)
        
    }finally{
        if(req.file) fs.unlink(req.file.path)
    }
}

const news = async(req,res,next)=>{
    try {
        
    } catch (error) {
        next(error)
    }
}

module.exports = {newsPost,newsImg,news}