const MongoClient = require('mongodb').MongoClient
ObjectID = require('mongodb').ObjectID,
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

    if (req.query.color)
        prod.filter({
            color: req.query.color
        });
    prod.toArray((err, result) => {
        res.render('index', {       
            camisas: result,
        });
    })
});

app.get('/checkout', (req, res) => {
    res.render('checking', {
        tittle: "Checkout"
    });
});

//Cambio de pagina a producto individual
app.get('/producto/:nombre', (req, res) => {
    db.collection('camisas').find({
        nombre: req.params.nombre
    }).toArray((err, result) => res.render('producto', {
        camisitas: result[0]
    }))

});

app.get('/productosPorIds', (req, res) => {
    var arreglo = req.query.id.split(',');
    arreglo = arreglo.map(function(id) {
        return new ObjectID(id);
    });
    var prod = db.collection('camisas')
        .find({ _id: { $in: arreglo } })
        .toArray((err, result) => {
            res.send(result);
        });
});