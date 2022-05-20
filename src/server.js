const express = require("express");
const cors = require('cors')
const router = require("./routes.js");

const app = express()

app.use(cors())

app.use(router)

app.listen(3000, () => console.log("Server is running on http://localhost:3000"))