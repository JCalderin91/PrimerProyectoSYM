let num = 123411;
let sem = 295;


function isPar(value) {
	return ((value.toString().length) % 2) ? false : true;
}


function middle(value) {
	let start = ((value.toString().length - sem.toString().length) / 2);
	return value.toString().substring(start, start + sem.toString().length)
}


//CUADRADO MEDIO

function cuadrado_medio(seed, cant, k) {
	/*
		 cuadrado_medio( int: semilla, int: Cantidad de nuemeros pseudoaleatoreos )
	*/
	let newSeed = middle(seed ** 2);
	console.log(`Pseudoaleatorio: ${newSeed / 10**k }`);
	cant--
	if (cant) cuadrado_medio(newSeed, cant, k);

}

function producto_medio(Xn1, Xn2, cant, k) {
	//console.log(Xn1*Xn2)
	console.log('Pseudoaleatorio: ' + middle(Xn1 * Xn2) / 10 ** k)
	cant--
	if (cant) producto_medio(Xn2, middle(Xn1 * Xn2), cant, k);
}

function producto_medio_var(Xn1, val, cant, k) {
	console.log('Pseudoaleatorio: ' + middle(Xn1 * val) / 10 ** k)
	cant--
	if (cant) producto_medio_var(middle(Xn1 * val), val, cant, k);
}

console.log('-----------cuadrado_medio-----------')
cuadrado_medio(295, 3, 3);
console.log('-----------producto_medio-----------')
producto_medio(519, 47, 4, 3)
console.log('-----------producto_medio_var-----------')
producto_medio_var(5, 847, 4, 3)