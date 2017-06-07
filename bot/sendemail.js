 var express = require('express');
 var app = express();
 var nodemailer = require('nodemailer');



 module.exports.mail = function (se, par) {
     var transporter = nodemailer.createTransport({
         service: 'Gmail',
         auth: {
             user: 'miraclebloodbot@gmail.com', // Your email id
             pass: 'alya0197' // Your password
         }
     });





     var mailOptions = {
         from: 'miraclebloodbot@gmail.com', // sender address
         to: se, // list of receivers
         subject: 'Greetings from Team Miracle Blood Bot', // Subject line
         html: '<h3>' + par + '</h3><br><h3> <a href="https://en-gb.facebook.com/people/BloodBot-Miracle/100017378285031">Link to our facebook home page</a><br>Please like, share and follow us on facebook if you like our service</h3>'
     };


     transporter.sendMail(mailOptions, function (error, info) {
         if (error) {
             console.log(error);
             res.send('error');
         } else {
             console.log('Message sent: ' + info.response);
             res.send('sent');
         };
     });

 }
