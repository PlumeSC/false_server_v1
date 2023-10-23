const prisma =require(`../utils/prisma`)



const newsId = async (req,res,newt)=>{
    try {
        // console.log(req.params.newsId);
        const news = await prisma.news.findFirst({
            where:{
                id:(+req.params.newsId)
            }
        })
        // console.log(news);
        res.status(200).json(news)

    } catch (error) {
        console.log(error);
    }
}


const news = async (req,res,next)=>{
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

module.exports = {news,newsId}