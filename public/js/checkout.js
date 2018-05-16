console.log(arreglo);

fetch('http://localhost:3000/productosPorIds?id=' + arreglo)
    .then(function (res) {
        return res.json();
    })
    .then(function (res) {
        console.log(res);

        var lista = document.querySelector('.lista');
        res.forEach(function (elem) {
            lista.innerHTML += '<li class="camisita"><div class="contp"> <div class="contimagenc" style="background-image: url(' + elem.camisa + ')"></div><div class="continfo"><p class="nombre">' + elem.nombre + '</p><p class="coleccion"><span>Colección</span> ' + elem.coleccion + '</p> <p class="precio">  <span>$</span> ' + elem.precio + '</p></div></div></li>';
        });
    });

    
    
       
           
      
          
          
           
  