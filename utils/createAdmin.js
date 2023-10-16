const bcrypt = require(`bcryptjs`)
const prisma = require(`./prisma`)



async function createAdmin(req,res,next){
    try {
        const hash = await bcrypt.hash(`asd123`,12)
        await prisma.user.create({
            data:{
                firstname:`Admin`,
                lastname:`Admin`,
                email:`admin@gmail.com`,
                password:hash,
                isAdmin:true

            }
        })
        console.log(`create admin done`);

    } catch (error) {
        console.log(error)
    }
}

module.exports = {createAdmin}