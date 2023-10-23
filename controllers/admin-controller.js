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
                NewsContent:{
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
        const news = await prisma.news.findMany({
            orderBy:{
              date:'desc'  
            },
            select:{
                newsTitle:true,
                newsImg:true,
                team:true,
                date:true,
                NewsContent:{
                    select:{
                        indexContent:true,
                        message:true,
                    }
                }
            }
        })
        res.status(200).json(news)
    } catch (error) {
        next(error)
    }
}

const uploadFile = async(req,res,next)=>{
    try {
        if(req.file){
            video = await cloudinary.uploader.upload(req.file.path)
        }
        await prisma.videos.create({
            data:{
                video:video?.secure_url
            }
        })
        res.status(200).json({msg:`upload done`})
    } catch (error) {
        console.log(error);
    }
}

const edit = async(req,res,next)=>{
    try {
        const {id,title,content,team} = req.body
        let heroImg =``
        if(req.file){
            heroImg = await cloudinary.uploader.upload(req.file.path)
        }
        // console.log(req.body);

        await prisma.news.update({
            where:{id:+id},
            data:{ 
                title,content,team,heroImg:heroImg?.secure_url
            }
        })
        res.status(200).json({msg:`edit done`})
    } catch (error) {
        console.log(error);
    }
}


const post = async(req,res,next)=>{
    try {
        const {title,content,team} = req.body
        let heroImg =``
        if(req.file){
            heroImg = await cloudinary.uploader.upload(req.file.path)
        }

        await prisma.news.create({
            data:{
                title,content,team,heroImg:heroImg.secure_url
            }
        })
        res.status(200).json({msg:`post done`})
    } catch (err) {
        console.log(err);
    } finally{
        if(req.file) fs.unlink(req.file.path)
    }
}

const deletePost = async(req,res,next)=>{
    try {
        console.log(req.body.data.id);
        await prisma.news.delete({
            where:{
                id:req.body.data.id
            }
        })
        res.status(200).json({msg:`delete done`})
    } catch (error) {
        console.log(error);
    }
}

const getAll = async (req,res,next)=>{
    try {
        const data = await prisma.news.findMany({
            orderBy:{
                date:`desc`
            },
            select:{
                id:true,
                title:true,
                heroImg:true,
                team:true,
                content:true,
                date:true
            }
        })
        // console.log(data);
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}



module.exports = {newsPost,newsImg,news,post,getAll,deletePost,edit,uploadFile}