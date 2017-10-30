"use strict"
const http = require("http");
const express = require("express");
const app = express();

const CronJob = require('cron').CronJob;

console.log("Le programme est lancé !" + new Date());

app.get("/", (req, res) => {

  res.write('<h1>"Progamme LaPauseHetic !"</h1>' + '\n<h2>"Le programme est lancé !"' + new Date() + '</h2>');

  new CronJob('*/5 * * * *', () => {

      if ((new Date().getHours() == "10") && (new Date().getMinutes() == "30")) {
        console.log("Il est 10 h 30 passé ? C'est déjà l'heure de la pause !");
        console.log("Il est : " + new Date());
        res.write('<p>"Il est 10 h 30 passé ? C\'est déjà l\'heure de la pause !"</p>' + '\n<p>"Il est : "' + new Date() + '</p>');
      } else {
        console.log("Ce n'est pas encore l'heure de la pause.");
        console.log("Il est : " + new Date());
        res.write('<p>"Ce n\'est pas encore l\'heure de la pause."</p>' + '\n<p>"Ce n\'est pas encore l\'heure de la pause."</p>');
      }

    }, () => {},
    true
  );

});


app.set('port', (process.env.PORT || 3000));

http.createServer(app).listen(process.env.PORT || 3000);
