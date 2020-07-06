import express from "express"
import gradesRouter from "./routes/grades.js"
//import winston from "winston"

const app = express()

global.fileName = "grades.json"
// global.logger = winston.createLogger({
//     level: "silly",
//     transports: [
//         new (winston.transports.Console)(),
//         new (winston.transports.File)({filename:"grades-control-api"})
//     ]
// })

app.use(express.json())
app.use("/grade", gradesRouter)

app.listen(3000, () => {
//    try {
        console.log("API started")
//         logger.info("API started")
//     } catch (err) {
//         logger.error(err)
//     }
})