require('dotenv').config();
const express = require("express");
const cors = require('cors')
const router = require("./routes.js");

const app = express()

app.use('/tags', express.static('public'));

app.use(cors())

app.use(router)

app.listen(process.env.PORT, () => console.log(`Server is running on ${process.env.APP_URL}${process.env.PORT}`))