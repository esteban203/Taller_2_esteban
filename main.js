const MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('camisas');

    // Iniciar servidor
    app.listen(5000);
    console.log("Escuchando servidor")
});

/*Esta parte es para cargar las paginas*/
app.get('/', (req, res) => {

    var fuentes = db.collection('camisas')
        .find();

        fuentes.toArray((err, result) => {
        console.log('Escuchando servidor')
        res.render('index', {
            fuentes: result
        });
    })
});