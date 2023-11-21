const prisma = require(`../utils/prisma`)
const date = require('date-and-time');
const fs = require("fs");


const standings = async(req,res,next)=>{
    try {
        const data = await prisma.teams.findMany({
            orderBy:{
                rank:'asc'
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

const home = async(req,res,next)=>{
    try {
        const news = await prisma.news.findMany({
            orderBy:{
                date:'desc'
            },
            take:6,
        })
        const standings = await prisma.teams.findMany({
            orderBy:{
                rank:`asc`
            }
        })
        res.status(200).json({news,standings})
    } catch (error) {
        next(error)
    }
}

const livescore = async(req,res,next)=>{
    try {
        const today = date.format(new Date(), 'YYYY-MM-DD');
        const testToday = "2023-08-26"

        const rounded = await prisma.match.findFirst({
            orderBy:{
                rounded:'asc'  
            },
            where:{
                status:`NS`
            }
        })
        const present = rounded.rounded

        const data = await prisma.match.findMany({
            where:{
                rounded:{
                    in:[(present-2).toString(),(present-1).toString(),present,((+present)+1).toString(),((+present)+2).toString()]
                },
            },
            orderBy:{
                id:`asc`
            }
        })



        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

const videoId = async(req,res,next)=>{
    try {
        console.log(req.params.videoId);
        const data = await prisma.videos.findFirst({
            where:{
                id:+req.params.videoId
            }
        })
        console.log(data.video);
        const range = req.headers.range
        if(!range) res.status(400).send(`requires range header`)

        const videoPath = `./public/${data.video}`
        const videoSize = fs.statSync(videoPath).size
        
        const chunk =(10**6)
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start+chunk,videoSize-1)
        // console.log(range);
        // console.log(start);
        // console.log(end);
        const constentLength = end-start+1
        const headers = {
            "Content-Range":`bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges":"bytes",
            "Content-Length":constentLength,
            "Content-Type":"video/mp4"
        }
        res.writeHead(206, headers)
        const videoStream = fs.createReadStream(videoPath,{start,end})
        videoStream.pipe(res)
        // res.status(200).json(headers)

    } catch (error) {
        console.log(error)
        next(error)
    }
}




module.exports = {standings,livescore,home,videoId}