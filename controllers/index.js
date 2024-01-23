//Controlador de rutas
const fs = require('fs');
const path = require('path');
const view = path.join(__dirname, '..', 'views');
const ejs = require('ejs');
const querystring = require('querystring');

//importando modelos
const MongoUtils = require('../models/mongoUtils');
const students = new MongoUtils();

//Exportando funciones de controladores de rutas
module.exports = {
    //Página principal al cargar será el login
    index(req, res){        
        students.findAll()
            .then((result)=>{
                fs.readFile(path.join(view ,'index.html'), 'utf-8', (err, html) => {
                    res.writeHead(200, { "Content-Type": 'text/html' });
                    const renderedHTML = ejs.render(html, { students:result, count:result.length });
                    res.end(renderedHTML);
                });
            })
            .catch(error=>{
                console.error(error);
                fs.readFile(path.join(view ,'index.html'), 'utf-8', (err, html) => {
                    res.writeHead(200, { "Content-Type": 'text/html' });                
                    const renderedHTML = ejs.render(html, { students:{}, count:0 });
                    res.end(renderedHTML);
                });
            });
        
    },

    delete(req, res){
        
    },

    edit(req, res){
        
    }
}
