const axios = require('axios');
const fs = require('fs');
const express = require("express");
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", __dirname + '/views');
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render("home.ejs")
    console.log("user hit hpg!")

})

app.post('/compile', async (req, res) => {
    const code = req.body.code;
    console.log(code);
    // try {
    //     fs.writeFileSync('file.scala', code);
    //     console.log("File has been saved.");
    // } catch (error) {
    //     console.log(error);
    // }
    const axios = require('axios');

    const options = {
        method: 'POST',
        url: 'https://online-code-compiler.p.rapidapi.com/v1/',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '95992756cbmshdd903a59b07377ap1b3e73jsn36c4b8682a30',
            'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
        },
        data: {
            language: 'cpp',
            version: 'latest',
            code: code,
            input: null
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }

    res.redirect('/eg');

})

app.get('/eg', (req, res) => {
    res.render('eg.ejs');
})


// app.post('/compile',(req,res)=>{

// })

app.listen(3000);