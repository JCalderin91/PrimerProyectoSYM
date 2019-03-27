function isPar(value) {
    return ((value.toString().length) % 2) ? false : true;
}

function middle(value, k) {
    let start = ((value.toString().length - k) / 2);
    return value.toString().substring(start, start + k)
}

function cuadrado_medio(Xn, cant, k, result) {
    let newSeed = middle(Xn ** 2, k);
    result.push(newSeed / 10 ** k)
    cant--
    if (cant) cuadrado_medio(newSeed, cant, k, result);
    return result
}

function producto_medio(Xn1, Xn2, cant, k, result) {
    result.push(middle(Xn1 * Xn2, k) / 10 ** k)
    cant--
    if (cant) producto_medio(Xn2, middle(Xn1 * Xn2, k), cant, k, result);
    return result
}

function producto_medio_var(Xn1, val, cant, k, result) {
    result.push(middle(Xn1 * val, k) / 10 ** k)
    cant--
    if (cant) producto_medio_var(middle(Xn1 * val, k), val, cant, k, result);
    return result
}

function congruencial_mixto(Xn, a, b, mod, div, cant, result) {
    result.push(Xn / div)
    cant--
    if (cant) congruencial_mixto((a * Xn + b) % mod, a, b, mod, div, cant, result);
    return result
}

function congruencial_multiplicativo(Xn, a, mod, div, cant, result) {
    result.push((Xn / mod).toFixed(3))
    cant--
    if (cant) congruencial_multiplicativo((a * Xn) % mod, a, mod, div, cant, result)
    return result
}


/*************************************************/
//Determina el nivel de aceptacion de acuerdo a la cantidad de numeros aleatorios
function nivel_ks(cant) {
    //Si la cantidad de numeros aleatorios es 8, entonces se devuelve el nivel correspondiente
    if (cant == 22) {
        return 0.28087;
    }
    if (cant == 43) {
        return 0.20056;
    }
    if (cant > 50) {
        return 1.36 / Math.sqrt(cant);
    }

}



/*************************************************/
function prueba_ks(a) {
    let cant = a.length; //Para saber cuantos numeros aleatorios hay
    let arr_i = []; // este arreglo guarda los valores de la expresion: i/cantidad de numeros aleatorios. 
    let Dmax = []; // Guarda los valores de la expresion: arra_i[i] - numero aleatorio[i], Dmax es la distancia maxima
    let i_1 = []; // Guarda los valores de la expresion: (i-1)/cantidad de numeros aleatorios
    let Dmin = []; //Guarda los valores de la expresion: numero aleatorio[i] - i_1[i], Dmin es la distancia minima
    let max; //Guarda el valor maximo de la comparacion entre Dmax y Dmin
    let num = a; //Arreglo que contiene  los numeros aleatorios para no afectar al arreglo original

    num.sort(function (a, b) {
        return a - b
    }); //Se ordenan los numeros aleatorios de menor a mayor

    //console.log(num)
    //ciclo que se repite de acuerdo a la cantidad de numeros aleatorios
    //Por ejemplo: si hay 3 numeros aleatorio [0.05, 0.15, 0.34]
    //arr_i[0] = (i+1)/ cantidad de numeros aleatorios => (0+1)/3
    //arr_i[1] = (i+1)/ cantidad de numeros aleatorios => (1+1)/3
    //arr_i[2] = (i+1)/ cantidad de numeros aleatorios => (2+1)/3
    //arr_i = [0.33, 0.66, 1]
    //Se hace lo mismo con i_1
    for (let i = 0; i < cant; i++) {
        arr_i[i] = (i + 1) / cant;
        i_1[i] = ((i + 1) - 1) / cant;
    }

    //Ciclo para determinar las distancias maxima y minima
    //Tomando los valores de arr_i del ejemplo anterior [0.33, 0.66, 1] y num = [0.05, 0.15, 0.34]
    //Dmax[0] = arr_i[i] - num[i] => 0.33 - 0.05
    //Dmax[1] = arr_i[i] - num[i] => 0.66 - 0.15
    //Dmax[2] = arr_i[i] - num[i] => 1 - 0.34
    //Dmax = [0.28, 0.51, 0.66]
    //Se hace las operaciones pertinentes para Dmin
    for (let i = 0; i < cant; i++) {
        Dmax[i] = arr_i[i] - num[i];
        Dmin[i] = num[i] - i_1[i];
    }

    //Se ordenan de mayor a menor los valores de cada arreglo
    Dmax.sort(function (a, b) {
        return b - a
    });
    Dmin.sort(function (a, b) {
        return b - a
    });

    //Se toma el valor de mayor peso de cada arreglo y se comparan
    if (Dmax[0] > Dmin[0])
        max = Dmax[0];
    else {
        max = Dmin[0];
    }

    //Ahora si el valor de max es menor o igual al nivel de aceptacion, se aceptan los numeros aleatorios
    //Si no, se rechazan.
    console.log(max)
    console.log('*'+nivel_ks(cant))
    if (max <= nivel_ks(cant)) {
        return true;
    } else {
        return false;
    }

}


$('#clear').on('click', function(){
    $('form')[0].reset();
    $('#tableResults tbody').html('');
})




//console.log('-----------cuadrado_medio-----------')
//console.log(cuadrado_medio(295, 10, 3, []))
//console.log(prueba_ks(cuadrado_medio(295, 10, 3, [])));
//console.log('-----------producto_medio-----------')
//console.log(producto_medio(519, 47, 4, 3, []))
//console.log('-----------producto_medio_var-----------')
//console.log(producto_medio_var(5, 847, 4, 3, []))
//console.log('-----------congruencial_mixto-----------')
//console.log(congruencial_mixto(11, 61, 421, 1000, 1000, 5, []))
//console.log('-----------congruencial_multiplicativo-----------')
//console.log(congruencial_multiplicativo(45, 11, 128, 128, 5, []))

function resolve(pseudos, dias) {
    let day, p, pAux, destino, cantPersonas, clase;
    let result = [];
    let results = [];
    let costo1, costo2 = 0;
    let content, data = ''
    let _pseudos = [...pseudos];

    console.log(_pseudos)
    console.log('-')
    console.log(pseudos)

    if(prueba_ks(_pseudos)){    
        for (let i = 0; i < dias; i++) {
            p = pseudos.slice(0, 1)[0]
            pAux = pseudos.slice(0, 1)[0]
            pseudos.shift()
            //console.log('Dia #'+(i+1)+' - Pseudoaleatorio: '+p)
            //console.log(searchPseudo(p, table4))
            day = searchPseudo(p, table4)
    
            for (let j = 1; j <= day.value; j++) {
                //console.log('Paquete #'+j)
                p = pseudos.slice(0, 1)[0]
                pseudos.shift()
                //console.log(searchPseudo(p, table1))  
                destino = {
                    value: searchPseudo(p, table1).value,
                    pseudo: p
                }
                costo1 = searchPseudo(p, table1).primera
                costo2 = searchPseudo(p, table1).turista            
    
    
                p = pseudos.slice(0, 1)[0]
                pseudos.shift()
                //console.log(searchPseudo(p, table3)) 
                cantPersonas = {
                    value: searchPseudo(p, table3).value,
                    pseudo: p
                }
    
    
                p = pseudos.slice(0, 1)[0]
                pseudos.shift()
                //console.log(p)
                //console.log(searchPseudo(p, table2)) 
                if (searchPseudo(p, table2).value === 'Primera') {
                    costo = costo1 * parseInt(cantPersonas.value)
                    clase = {
                        value: 'Alta',
                        pseudo: p
                    }
                } else {
                    costo = costo2 * parseInt(cantPersonas.value)
                    clase = {
                        value: 'Media',
                        pseudo: p
                    }
                }
    
    
    
    
                result.push({
                    paquete: j,
                    destino: destino,
                    costo: costo,
                    clase: clase,
                    cantPersonas: cantPersonas,
                    pseudo: pAux
                })
            }
            results.push({
                content: result,
                pseudo: pAux
            })
            result = []
        }
    
        results.forEach(function (item, index) {
            data = `<table class="table table-sm mb-0">`
            item.content.forEach(function (item) {
                data += `<tr>
                    <td class="row">
                        <div class="col-md-3"><strong>Destino</strong>: ${item.destino.value} <span class="text-primary">(${item.destino.pseudo})</span> </div>
                        <div class="col-md-3"><strong>Clase</strong>: ${item.clase.value} <span class="text-primary">(${item.clase.pseudo})</span> </div>
                        <div class="col-md-3"><strong>Personas</strong>: ${item.cantPersonas.value} <span class="text-primary">(${item.cantPersonas.pseudo})</span> </div>
                        <div class="col-md-3"><strong>Costo</strong>: ${item.costo} $</div>
                    </td>
                `
            })
            data += `</tr></table>`
    
            content += `<tr>
                <td><strong>Dia: </strong>${index+1} - <strong>Paquetes: </strong>${item.content.length} <span class="text-primary">(${item.pseudo})</span></td>
                <td>${data}</td>
            </tr>`
            data = ''
        })
    
        //OPERACIONES PARA RESPONDER PREGUNTAS
        console.log(results)
        destinos = getPackages(results);
        console.log(findMaxVisited(destinos, 'destino'));
        console.log(findMaxLevel(destinos, 'clase'));
        console.log(getTotal(destinos));
        return {
            estructure: content,
            data: '-'
        }
    }else{
        swal ( "Oops" ,  "Estos datos no generan numeros pseudoaleatorios validos" ,  "error" );
        $('form')[0].reset()
    }

}

function findMaxVisited (array, prop){
    return Object.values(groupBy(array, prop)).sort(function(a, b){
        return (b.cantidad - a.cantidad)
    }).slice(0,3);  
}

function findMaxLevel(array, prop){
    return Object.values(groupBy(array, prop)).sort(function(a, b){
        return (b.cantidad - a.cantidad)
    })[0];  
}

function getTotal(array){
    return array.reduce(function(acc,item){
        return acc +  item.costo;    
    }, 0);
}

function groupBy(array, prop){
   return array.reduce(function(groups, item) {
        var val = item[prop];
        if(prop == 'clase'){
            groups[val] = groups[val] || {clase: item.clase, cantidad: 0 };
            groups[val].cantidad += 1;
        }else{
            groups[val] = groups[val] || {destino: item.destino, cantidad: 0 };
            groups[val].cantidad += Number(item.cantidad);
        }
        return groups;
    }, {});
}

function getPackages (array){
    let d = [];
    array.forEach(function(item, index){
        item.content.forEach(function(item){
          d.push({
              destino: item.destino.value,
              cantidad: item.cantPersonas.value,
              costo: item.costo,
              clase: item.clase.value
          });
        });
    });
    return d; 
}

function loadTable(idTable, arr) {
    let content = '';
    arr.forEach(function (item) {
        content += `<tr>
                        <td>${item.value}</td>
                        <td>${item.fmin}</td>
                        <td>${item.fmay}</td>
                        <td>${item.min} - ${item.max}</td>
                    </tr>`
    })
    $('#' + idTable + ' tbody').html(content);
}

let table1 = [{
        value: 'Tibet', fmin: 0.020, fmay: 0.020, min: 0.000, max: 0.019, primera: 750, turista: 630
    },    {
        value: 'Madrid', fmin: 0.070, fmay: 0.090, min: 0.020, max: 0.089, primera: 590, turista: 480
    },    {
        value: 'Venecia', fmin: 0.150, fmay: 0.240, min: 0.090, max: 0.239, primera: 540, turista: 420
    },    {
        value: 'Aruba', fmin: 0.200, fmay: 0.440, min: 0.240, max: 0.439, primera: 230, turista: 110
    },    {
        value: 'Miami', fmin: 0.200, fmay: 0.640, min: 0.440, max: 0.639, primera: 310, turista: 190
    },    {
        value: 'Acapulco', fmin: 0.160, fmay: 0.800, min: 0.640, max: 0.799, primera: 450, turista: 330
    },    {
        value: 'Paris', fmin: 0.100, fmay: 0.900, min: 0.800, max: 0.899, primera: 665, turista: 545
    },    {
        value: 'Rio de Janeiro', fmin: 0.060, fmay: 0.960, min: 0.900, max: 0.959, primera: 428, turista: 308
    },    {
        value: 'Buenos Aires', fmin: 0.050, fmay: 0.990, min: 0.960, max: 0.989, primera: 497, turista: 377
    },    {
        value: 'Londres', fmin: 0.010, fmay: 1.000, min: 0.990, max: 1.000, primera: 685, turista: 565
    },]

let table2 = [{
        value: 'Turista',
        fmin: 0.330,
        fmay: 0.330,
        min: 0.000,
        max: 0.329,
        clase: 'Media'
    },
    {
        value: 'Primera',
        fmin: 0.670,
        fmay: 1.000,
        min: 0.331,
        max: 1.000,
        clase: 'Alta'
    },
]

let table3 = [{
        value: '1',
        fmin: 0.250,
        fmay: 0.250,
        min: 0.000,
        max: 0.249
    },
    {
        value: '2',
        fmin: 0.480,
        fmay: 0.730,
        min: 0.250,
        max: 0.729
    },
    {
        value: '3',
        fmin: 0.150,
        fmay: 0.880,
        min: 0.730,
        max: 0.879
    },
    {
        value: '4',
        fmin: 0.080,
        fmay: 0.960,
        min: 0.880,
        max: 0.959
    },
    {
        value: '5',
        fmin: 0.040,
        fmay: 1.000,
        min: 0.960,
        max: 1.000
    },
]

let table4 = [{
        value: 0,
        fmin: 0.060,
        fmay: 0.060,
        min: 0.000,
        max: 0.059
    },
    {
        value: 1,
        fmin: 0.090,
        fmay: 0.150,
        min: 0.060,
        max: 0.149
    },
    {
        value: 2,
        fmin: 0.110,
        fmay: 0.260,
        min: 0.150,
        max: 0.259
    },
    {
        value: 3,
        fmin: 0.140,
        fmay: 0.400,
        min: 0.260,
        max: 0.399
    },
    {
        value: 4,
        fmin: 0.180,
        fmay: 0.580,
        min: 0.400,
        max: 0.579
    },
    {
        value: 5,
        fmin: 0.230,
        fmay: 0.810,
        min: 0.580,
        max: 0.809
    },
    {
        value: 6,
        fmin: 0.140,
        fmay: 0.950,
        min: 0.810,
        max: 0.949
    },
    {
        value: 7,
        fmin: 0.050,
        fmay: 1.000,
        min: 0.950,
        max: 1.000
    },
]

let content = '';
table1.forEach(function (item) {
    content += `<tr>
                    <td>${item.value}</td>
                    <td>${item.fmin}</td>
                    <td>${item.primera} $</td>
                    <td>${item.turista} $</td>
                    <td>${item.fmay}</td>
                    <td>${item.min} - ${item.max}</td>
                </tr>`
})
$('#table1 tbody').html(content);

content = '';
table2.forEach(function (item) {
    content += `<tr>
                    <td>${item.value}</td>
                    <td>${item.fmin}</td>
                    <td>Clase ${item.clase}</td>
                    <td>${item.fmay}</td>
                    <td>${item.min} - ${item.max}</td>
                </tr>`
})
$('#table2 tbody').html(content);

loadTable('table3', table3)
loadTable('table4', table4)


function searchPseudo(Pseudo, arr) {
    return arr.filter(item => item.min <= Pseudo && item.max >= Pseudo)[0]
}