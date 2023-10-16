const serverError = (err,req,res,next)=>{
    console.log(`500 : ${err.message}`);
    res.status(500).json({error:`500 : ${err.message}`})
}


module.exports = serverError