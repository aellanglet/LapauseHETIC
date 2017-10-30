"use strict"
const http = require("http");
const express = require("express");
const app = express();

const bodyParser = require('body-parser');

const CronJob = require('cron').CronJob;

console.log("Le programme est lancé ! " + new Date());

app.get("/", (req, res) => {
  res.write('<h1>Progamme LaPauseHetic !</h1>' + '<br>' + '<h2>Le programme est lancé ! ' + new Date() + '</h2>');

  if ((new Date().getHours() > 10) && (new Date().getMinutes() > 30)) {
    res.write('<p>Il est 10 h 30 passé ? C\'est déjà l\'heure de la pause !</p>' + '<br>' + '<p>Il est : ' + new Date() + '</p>');
  } else {
    res.write('<p>Ce n\'est pas encore l\'heure de la pause.</p>' + '<br>' + '<p>Ce n\'est pas encore l\'heure de la pause.</p>');
  }

});

new CronJob('*/5 * * * *', () => {

    if ((new Date().getHours() > 10) && (new Date().getMinutes() > 30)) {
      console.log("Il est 10 h 30 passé ? C'est déjà l'heure de la pause !");
      console.log("Il est : " + new Date());
    } else {
      console.log("Ce n'est pas encore l'heure de la pause.");
      console.log("Il est : " + new Date());
    }

    app.get("/", (req, res) => {

      if ((new Date().getHours() > 10) && (new Date().getMinutes() > 30)) {
        res.write('<p>Il est 10 h 30 passé ? C\'est déjà l\'heure de la pause !</p>' + '<br>' + '<p>Il est : ' + new Date() + '</p>' + '<script>location.reload()</script>');
      } else {
        res.write('<p>Ce n\'est pas encore l\'heure de la pause.</p>' + '<br>' + '<p>Ce n\'est pas encore l\'heure de la pause.</p>' + '<script>location.reload()</script>');
      }

    });


  }, () => {},
  true
);

app.use(bodyParser.urlencoded({
  extended: false
}));


app.set('port', (process.env.PORT || 3000));

http.createServer(app).listen(process.env.PORT || 3000);
