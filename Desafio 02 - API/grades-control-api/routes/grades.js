import express from "express"
import {promises} from "fs"

const router = express.Router()
const readFile = promises.readFile
const writeFile = promises.writeFile

router.post("/", async (req, res) => {
    let grade = req.body
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        grade = {id: json.nextId++, timestamp: new Date(), ...grade}
        json.grades.push(grade)

        await writeFile(global.fileName, JSON.stringify(json))
        res.send(grade)
        //logger.info(`POST /grade - ${JSON.stringify(grade)}`)
    } catch (err){
        res.status(400).send({error: err.message})
        //logger.error(`POST /grade - ${err.message}`)
    }
})

router.put("/", async (req, res) => {
    let newGrade = req.body
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        let index = json.grades.findIndex(grade => grade.id === newGrade.id)

        if(index === -1) {
            throw new Error("ID não encontrado")
        }
        
        if(newGrade.student) {
            json.grades[index].student = newGrade.student
        }
        if(newGrade.subject) {
            json.grades[index].subject = newGrade.subject
        }
        if(newGrade.type) {
            json.grades[index].type = newGrade.type
        }
        if(newGrade.value) {
            json.grades[index].value = newGrade.value
        }

        await writeFile(global.fileName, JSON.stringify(json))

        res.send(json.grades[index])
        
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.delete("/:id", async (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        let index = json.grades.findIndex(grade => grade.id == req.params.id)

        if(index === -1) {
            throw new Error("ID não encontrado")
        }

        json.grades.splice(index, 1)

        await writeFile(global.fileName, JSON.stringify(json))

        res.end()
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})
router.get("/:id", async (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        const grade = json.grades.find(grade => grade.id == req.params.id)

        if(grade) {
            res.send(grade)
        } else {
            throw new Error("ID não encontrado")
        }
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.post("/total", (req, res) => {
    try {
        const params = req.body

        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)
        
        const grades = json.grades.filter(grade => grade.student == params.student && grade.subject == params.subject)

        const total = grades.reduce((prev, curr) => {
            return prev + curr.value
        }, 0)
        res.send({total})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.get("/average/:subject/:type", (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        const params = req.params
        
        const grades = json.grades.filter(grade => grade.type == params.type && grade.subject == params.subject)

        if(!grades.length) {
            throw new Error("Não encontrado")
        }

        const total = grades.reduce((prev, curr) => {
            return prev + curr.value
        }, 0)

        res.send({average: total/grades.length})
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

router.post("/best", (req, res) => {
    try {
        let data = await readFile(global.fileName, "utf8")
        let json = JSON.parse(data)

        const params = req.body
        const grades = json.grades.filter(grade => grade.type == params.type && grade.subject == params.subject)

        if(!grades.length) {
            throw new Error("Não encontrado")
        }

        grades.sort((a, b) => {
            if (a.value < b.value) return 1
            else if (a.value > b.value) return -1
            else return 0
        })

        res.send(grades.slice(0, 3))
    } catch (err) {
        res.status(400).send({error: err.message})
    }
})

export default router