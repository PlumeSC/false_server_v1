const prisma = require(`../utils/prisma`)
const date = require('date-and-time');



const standings = async(req,res,next)=>{
    try {
        const data = await prisma.teams.findMany()
        res.status(200).json(data)
    } catch (error) {
        console.log(error);
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


module.exports = {standings,livescore}