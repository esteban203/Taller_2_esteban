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

    db = client.db('test');

    // Iniciar servidor
    app.listen(3000);
    console.log("Escuchando servidor")
});

/*Esta parte es para cargar las paginas*/
app.get('/', (req, res) => {
    var prod = db.collection('camisas')
        .find();

    if (req.query.tematica)
        prod.filter({
            tematica: req.query.tematica
        });

    if (req.query.idioma)
        prod.filter({
            idioma: req.query.idioma
        });

    if (req.query.editorial)
        prod.filter({
            editorial: req.query.editorial
        });

    if (req.query.calificacion)
        prod.filter({
            calificacion: parseInt(req.query.calificacion)
        });
    prod.toArray((err, result) => {
        res.render('index', {       
            camisas: result,
        });
    })
});
/*app.get('/', (req, res) => {

    var camisas = db.collection('camisas')
        .find();

        camisas.toArray((err, result) => {
        console.log('Escuchando servidor')
        res.render('index', {
            camisas: result
        });
    })
});*/