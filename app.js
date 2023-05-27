const express = require("express");
const app = express();
const https = require("https");
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const city = req.body.cityName;
    const apiKey = "*********************";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    https.get(url, (resp) => {
        resp.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            res.write(`<h1>Current weather in ${city}</h1>`);
            res.write(`<h2>Current temperature: ${temp} <span>&#8451;</span></h2>`);
            res.write(`<h2>General description: ${description}</h2><img src="${iconURL}" alt="icon">`);
            res.send();
        })
    })
})

app.listen(3000, () => {
    console.log("listening on port 3000");
})
