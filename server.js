const express = require('express')
const app = express()
const port = 3000
const path = require('path')

let fs = require("fs");
let cors = require('cors');
app.use(cors())
app.use(express.static('.'));

let wordlist = fs.readFileSync("./br-utf8.txt", "UTF-8").split("\n")


let gerarPalavra = () => {
    return wordlist[Math.floor(Math.random() * wordlist.length)]
}

app.get('/palavra', (req, res) => {
    res.json({palavra: gerarPalavra().toUpperCase()});
});

app.get('/', (req,res) => {
    res.send(JSON.stringify({palavra: gerarPalavra().toUpperCase()}))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


