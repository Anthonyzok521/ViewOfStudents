//importando módulos para la creación del servidor
const http = require('http');
const path = require('path');
const fs = require('fs');

//Llamando al controlador principal
const app = require('./controllers/index');

//Función que carga los recursos(.css, .js, .png, ..., etc.)
const loadingResource = (req, res, filePath, extname) => {

    //Comprobando si la extensión del archivo de código o imagen
    const file = extname == '.css' || extname == '.js' 
            ? fs.createReadStream(filePath, 'utf-8') 
            : fs.createReadStream(filePath);        

    const img = `image/${extname}`;
    const src = {
        '.css' : 'text/css',
        '.js' : 'text/javascript'
    };

    res.writeHead(200, {'Content-Type' : src[extname] || img});
    file.pipe(res); 

    //Evento que captura errores de carga de archivos
    file.on('error', (error) => {
        console.error(error);
    });
}

//Creando el servidor
const server = http.createServer((req, res) => {
    
    //Preguntando las rutas
    if(req.url === '/'){
        app.index(req, res);
    }else if(req.url === '/' && req.method === 'GET'){

    }else if(req.url === '/'){

    }
    else if(req.url.match('\.$')){ //Si en la ruta se encuenta alguna extensión de archivo se cargará
        const filePath = path.join(__dirname, 'views', req.url);
        const extname = path.extname(filePath);
        loadingResource(req, res, filePath, extname);
    }
    else{
        res.writeHead(404, {"Content-Type":'text/html'});
        res.end('Not found page');            
    }

    console.log(`Request for ${req.url} by method ${req.method} | status ${res.statusCode}`);
});

server.listen(3000 || process.env.PORT, () => {
    console.log('Server is running on port 3000');
});
