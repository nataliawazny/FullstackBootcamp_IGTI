const fs = require('fs')
const estados = require("../src/Estados.json")
const cidades = require("../src/Cidades.json")

let arrayNumeroCidades = []
let cidadesOrdenadasMax = []
let cidadesOrdenadasMin = []

let listaDeEstados = []
let listaDeCidades = []

listaDeEstados = estados.map(({ID, Sigla, Nome}) => {
    return {
        id: ID,
        sigla: Sigla,
        nome: Nome
    }
})

listaDeCidades = cidades.map(({ID, Nome, Estado}) => {
    return {
        id: ID,
        nome: Nome,
        estado: Estado
    }
})

function item1() {
    listaDeEstados.forEach((estado) => {
        const cidadesComEstados = listaDeCidades.filter((cidade) => {
            return cidade.estado == estado.id;
        })
        const cidadesJSON = JSON.stringify(cidadesComEstados)
    
        fs.writeFile(`./estados/${estado.sigla}.json`, cidadesJSON,
        // callback function
        function(err) { 
            if (err) {
                console.log(err.message)
            }
            // if no error
            //console.log("Data is appended to file successfully.")
        })
    })
}

const item2 = () => {
    let transf
    let count
    listaDeEstados.forEach((estado) => {
        const data = fs.readFileSync(`./estados/${estado.sigla}.json`,'utf8')
        transf = JSON.parse(data)
        count = transf.length
        console.log(`${estado.sigla} possui ${count} cidades`)
        arrayNumeroCidades.push({
            e: estado.sigla,
            c: count
        })
    })
    return arrayNumeroCidades
}

const item3 = () => {
    const top5 = item2()
  
      .sort((a, b) => b.c - a.c)
      .slice(0, 5)
      .map(data => `${data.e} - ${data.c}`)
  
    console.log(top5)
}
  
const item4 = () => {
    const bottom5 = item2()
  
      .sort((a, b) => b.c - a.c)
      .slice(-5)
      .map(data => `${data.e} - ${data.c}`)
  
    console.log(bottom5)
}

const item5 = () => {
    listaDeEstados.forEach((estado) => {
        const data = fs.readFileSync(`./estados/${estado.sigla}.json`,'utf8')
        transf = JSON.parse(data)
        let cidade = transf
            .sort((a, b) => b.nome.length - a.nome.length)
            .slice(0, 1)
            .map(data => `${data.nome} - ${estado.sigla}`)
        cidadesOrdenadasMax.push(cidade)
    })
    console.log(cidadesOrdenadasMax)
    return cidadesOrdenadasMax
}
    

const item6 = () => {
    listaDeEstados.forEach((estado) => {
        const data = fs.readFileSync(`./estados/${estado.sigla}.json`,'utf8')
        transf = JSON.parse(data)
        let cidade = transf
            .sort((a, b) => a.nome.length - b.nome.length)
            .slice(0, 1)
            .map(data => `${data.nome} - ${estado.sigla}`)
        cidadesOrdenadasMin.push(cidade)
    })
    console.log(cidadesOrdenadasMin)
    return cidadesOrdenadasMin
}

const item7 = () => {
    let maiorCidade = item5()
    maiorCidade = maiorCidade
        .flat()
        .sort((a, b) => b.length - a.length)
        .slice(0, 1)
    console.log(maiorCidade)
}

const item8 = () => {
    let menorCidade = item6()
    menorCidade = menorCidade
        .flat()
        .sort((a, b) => a.length - b.length)
        .slice(0, 1)
    console.log(menorCidade)
}
