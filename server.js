require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const axios = require('axios');
const prisma = require(`./utils/prisma`)

const {createAdmin} = require(`./utils/createAdmin`)



const {axiosStanding,createTeams} = require(`./API/standings`)
const {match} = require(`./API/rounded`)



const authRoute = require(`./routes/authRoute`)
const adminRoute = require(`./routes/adminRoute`)
const newsRoute = require(`./routes/newsRoute`)
const dataRoute = require(`./routes/dataRoute`)
const userRoute = require(`./routes/userRoute`)
const notFound = require(`./middleware/notFound`)
const serverError = require(`./middleware/serverError`)



// createAdmin()

// createTeams()
// match()


app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.json());



app.use(`/auth`,authRoute)
app.use(`/admin`,adminRoute)
app.use(`/news`,newsRoute)
app.use(`/data`,dataRoute)
app.use(`/user`,userRoute)


app.use(notFound);
app.use(serverError);




app.listen(8000,()=>console.log(`run...`))




