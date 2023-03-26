// import atau panggil package yg kita mau pake di aplikasi kita
const express = require('express')
const fs = require("fs")

const app = express();
const PORT = 3000;

// middlewere
app.use(express.json());

// proses baca file json nya dg FS module, dan json nya dibantu dibaca dg JSON.parse
const persons = JSON.parse(fs.readFileSync(`${__dirname}/person.json`))

// url utama dari aplikasi
// req = request
// res = response
// get post = http method
// "/" = URL
app.get('/', (req, res) => {
    res.send('Hello FSW 3 luar biasa dehh !! dari server niih')
})

app.post('/', (req, res) => {
    res.send('Kita bisa ngelakuin post niii widiii kerenn')
})

app.get('/person', (req, res) => {
    res.status(200).json({
        status: "success",
        data: {
            persons: persons
        }
    })
})

app.post('/person', (req, res) => {
    // console.log(req.body);
    // res.send('selesai proses Create User nya')
    console.log(persons.lenght - 1)
    const newId = persons.lenght - 1 + 10;
    const newPerson = Object.assign({
        id: newId
    }, req.body)

    persons.push(newPerson);
    fs.writeFile(
        `${__dirname}/person.json`,
        JSON.stringify(persons),
        errr => {
            res.status(201).json({
                status: 'success',
                data: {
                    persons: newPerson
                }
            })
        }
    )
})

// memulai server nya
app.listen(PORT, () => {
    console.log(`App running on Localhost: ${PORT}`)
})