const { log } = require("console")
const cloudinary = require(`../middleware/cloudinary`)
const prisma = require(`../utils/prisma`)
const fs = require(`fs/promises`)

require(`dotenv`).config()
const {cloud_name,api_key,api_secret} = process.env



const news = async (req,res,next)=>{
    try {
        const {title,team,newsContent} = req.body
        console.log(JSON.parse(req.body.newsContent));
        // const news = await prisma.news.create({
        //     data:{
        //         newsTitle:title,newsCont:message,team
        //     }
        // })
        // console.log(`post news complete`);
        res.status(200).json({news:`post news complete`})
    } catch (error) {
        next(error)
    }finally{
        if(req.file) fs.unlink(req.file.path)
    }
}

const newsImg = async (req,res,next)=>{
    try {
        // if(req.file) {

        //     const result = await cloudinary.uploader.upload(req.file.path)
        //     // secure_url

        //     const newsId = await prisma.news.findMany({
        //         orderBy:{date:"desc"},
        //         take:1
        //     })
        //     // console.log(newsId[0].id);


        //     await prisma.news.update({
        //         data:{
        //             newsImg:result.secure_url
        //         },
        //         where:{
        //             id:newsId[0].id
        //         }
        //     })
        // }
        // console.log(`post newsImg complete`);
        res.status(200).json({news:`post newsImg complete`})
    } catch (err) {
        next(err)
        
    }
}


module.exports = {news,newsImg}