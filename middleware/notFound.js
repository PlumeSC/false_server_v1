


const notFound = (req,res)=>{
    console.log(`400 not found`);
    res.status(400).json({error:`400 not found`})
}


module.exports = notFound