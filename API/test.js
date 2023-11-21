const axios = require("axios");
const prisma = require(`../utils/prisma`);
require(`dotenv`).config()
const {API_FOOTBALL} = process.env


async function run (){
    for (let i = 1; i <= 38; i++) {
        const options = {
            method: "GET",
            url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
            params: {
                league: "39",
                season: "2023",
                round: `Regular Season - ${i}`,
                timezone: "Asia/Bangkok",
            },
            headers: {
                "X-RapidAPI-Key":API_FOOTBALL,
                "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
            },
        };
    
        const response = await axios.request(options)
        const match = response.data.response;
        const create = match.map((item, index) => {
            return {
                home:item.teams.home.name,
                away:item.teams.away.name,
                season: item.league.season,
                rounded: 1+``,
                homeScore: item.goals.home,
                awayScore: item.goals.away,
                date: item.fixture.date.slice(0,10),
                time: item.fixture.date.slice(11,16),
                fullDate:item.fixture.date,
                status:item.fixture.status.short,
                homeLogo:item.teams.home.logo,
                awayLogo:item.teams.away.logo,
            };
        });
        // console.log(create);
        create.forEach(async(item,index)=>{
            console.log(item);
            await prisma.match.updateMany({
                data:item,
                where:{
                    AND:[{home:item.home},{away:item.away}]
                }
            })
        })

        // await create.match.updateMany({
        //     data:create,
        //     where:{
        //         AND:[{home:item.home},{away:item.away}]
        //     }
        // })

        console.log(`done`);
        
        

    }

}
run()