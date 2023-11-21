const axios = require("axios");
const prisma = require(`../utils/prisma`);
const { login } = require("../controllers/auth-controller");
const fs = require("fs");
require(`dotenv`).config()
const {API_FOOTBALL} = process.env

async function match() {
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

        
        const run = async () => {
            try {
                const response = await axios.request(options);
                const match = response.data.response;
                const create = match.map((item, index) => {
                    
                    // const homeTeamId = await getTeamIdByName(item.teams.home.name);
                    // const awayTeamId = await getTeamIdByName(item.teams.away.name);
                    // console.log(homeTeamId);
                    return {
                        home:item.teams.home.name,
                        away:item.teams.away.name,
                        season: item.league.season,
                        rounded: item.league.round.slice(17),
                        homeScore: item.goals.home,
                        awayScore: item.goals.away,
                        date: item.fixture.date.slice(0,10),
                        time: item.fixture.date.slice(11,16),
                        fullDate:item.fixture.date,
                        status:item.fixture.status.short,
                        homeLogo:item.teams.home.logo,
                        awayLogo:item.teams.away.logo,
                        // homeTeamId: homeTeamId,
                        // awayTeamId: awayTeamId,
                    };
                });
                // console.log(create);


                // async function getTeamIdByName(teamName) {
                //     const team = await prisma.teams.findUnique({
                //         where: {
                //             team: teamName,
                //         },
                //     });
                //     if (team) {
                //         return team.id;
                //     } else {
                //         return null;
                //     }
                // }



                await prisma.match.createMany({
                    data: create,
                });


                console.log(`craete done`);
            } catch (error) {
                console.error(error);
            }
        };
        run();
    }
}

// for (let i = 1; i <= 38; i++) {
//     fsmatch(i)
// }
async function fsmatch(i){
    console.log(i);
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
    const response = await axios.request(options);
    // console.log(JSON.stringify(response.data));
    const json = await response.data
    const data = await fs.writeFile(`./apimatchjson/match${i}.json`,JSON.stringify(json),()=>{}) 
    console.log(i);
    // console.log(response.data);
}


async function updateMatch(){
    // for (let i = 1; i <= 1; i++) {
        const json = await fs.readFile(`./API/apimatchjson/match1.json}`,`utf-8`,()=>{})
        console.log(json);
    // }



        
    //     const run = async () => {
    //         try {
    //             // const response = await axios.request(options);
    //             const match = response.data.response;
    //             const create = match.map((item, index) => {
    //                 return {
    //                     home:item.teams.home.name,
    //                     away:item.teams.away.name,
    //                     season: item.league.season,
    //                     rounded: item.league.round.slice(17),
    //                     homeScore: item.goals.home,
    //                     awayScore: item.goals.away,
    //                     date: item.fixture.date.slice(0,10),
    //                     time: item.fixture.date.slice(11,16),
    //                     fullDate:item.fixture.date,
    //                     status:item.fixture.status.short,
    //                     homeLogo:item.teams.home.logo,
    //                     awayLogo:item.teams.away.logo,
    //                 };
    //             });
    //             // console.log(create);

    //             create.forEach(async(item,index)=>{
    //                 console.log(item);
    //                 await prisma.match.updateMany({
    //                     data: item,
    //                     where:{
    //                         AND:[{home:item.home},{away:item.away}]
    //                     }
    //                 });

    //             })


    //             // console.log(`craete done`);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     };
    //     run();
    
}

module.exports = { match ,updateMatch,fsmatch};
