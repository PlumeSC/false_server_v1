require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');

const {createAdmin} = require(`./utils/createAdmin`)

const authRoute = require(`./routes/authRoute`)
const adminRoute = require(`./routes/adminRoute`)
const notFound = require(`./middleware/notFound`)
const serverError = require(`./middleware/serverError`)

// createAdmin()

app.use(cors());
app.use(express.json());



app.use(`/auth`,authRoute)
app.use(`/admin`,adminRoute)



app.use(notFound);
app.use(serverError);




app.listen(8000,()=>console.log(`run...`))
