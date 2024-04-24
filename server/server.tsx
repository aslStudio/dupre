import express from 'express'
import multer from 'multer'
import nodemailer from "nodemailer"
import fs from 'fs'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import compression from 'compression'
import { App } from '../src/app/App'
import {StaticRouter} from "react-router-dom/server";

// @ts-ignore
const server = express()
const upload = multer();

server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
server.use(compression())
server.use(express.json())
server.use(express.urlencoded({extended: true}));

server.use('/', express.static(path.join(__dirname, 'static')))
 
const manifest = fs.readFileSync(
  path.join(__dirname, 'static/manifest.json'),
  'utf-8'
)
const assets = JSON.parse(manifest)

// @ts-ignore
server.get('*', (req, res) => {
  const component = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
  )
  res.render('client', { assets, component })
})

server.post('/order', upload.single('file'), (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.mail.ru",
        port: 465,
        secure: true,
        auth: {
            user: "vlad-astahov04@mail.ru",
            pass: "rmnBbyYgrnFAqRbkPa9j"
        }
    })

    const mailOptions = {
        from: 'vlad-astahov04@mail.ru',
        to: 'vlad-astahov04@mail.ru',
        subject: 'Заявка',
        html: `
            <html lang="ru">
                <body>
                    ${[
                        `<strong>email</strong>: ${req.body.email}`,
                        req.body.comment && `<strong>Комментарий</strong>: ${req.body.comment}`
                    ].join(`<br/>`)}
                </body>
            </html>
        `,
        ...(req.file && {
            attachments: [
                {
                    filename: req.file.originalname,
                    content: req.file.buffer
                }
            ]
        }),
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Ошибка отправки письма');
        } else {
            console.log('Email sent: ' + info.response);
            res.sendStatus(200)
        }
    });
})
 
server.listen(8080, () => {
  console.log(`Server running on http://localhost:8080`)
})