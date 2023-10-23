const axios = require('axios');
const {PrismaClient} = require(`@prisma/client`)
const prisma = new PrismaClient()
const fs = require(`fs/promises`)

const options = {
  method: 'GET',
  url: 'https://api-football-v1.p.rapidapi.com/v3/standings',
  params: {
    season: '2023',
    league: '39'
  },
  headers: {
    'X-RapidAPI-Key': '7ebe202ab2msh4a5e6520f04bbbap12fbf7jsn3d5fef1a70a2',
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
  }
};
async function axiosStanding(){
    try {
        const response = await axios.request(options);
        const data = await fs.writeFile(`./standings.json`,JSON.stringify(response.data)) 
        console.log(data);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
    
}



async function createTeams(){
    try {
        const json = await fs.readFile(`./API/standings.json`,`utf-8`)
        const data = JSON.parse(json)
        const standings = data.response[0].league.standings[0]
        // console.log(standings);

        const create = [standings.map((item,index)=>{
            return ({
                rank:item.rank,
                team:item.team.name,
                logoTeam:item.team.logo,
                played:item.all.played,
                win:item.all.win,
                draw:item.all.draw,
                lose:item.all.lose,
                points:item.points,
                GF:item.all.goals.for,
                GA:item.all.goals.against,
                GD:item.goalsDiff,
                form:item.form,
            })
        })]
        const a =create[0].filter((item,index)=>item.rank<=10);
        const b =create[0].filter((item,index)=>item.rank>10);
        
        await prisma.teams.createMany({
            data:a
        })
        await prisma.teams.createMany({
            data:b
        })
        console.log(`create done`);
        
    } catch (error) {
        console.log(error);
    }
}
module.exports = {axiosStanding,createTeams}