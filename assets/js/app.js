//Tipos de cartas, las primeras son corazó, trébol, picas y diamantes.Las otras son el as, rey, reina y jocker

let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0, puntosComputadora = 0;

//Referencias HTML-
//Creo la const para que no se tenga que cargar el documento completo al utilizar el btn

const btnPedir = document.querySelector('#btnPedir');

const btnDetener = document.querySelector('#btnDetener');

const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');

const divCartasComputadora = document.querySelector('#computadora-cartas');

const marcadorPuntos = document.querySelectorAll('small');



const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) { // en el bucle siempre ; 
        for( let tipo of tipos ) {
            deck.push(i + tipo);
        }
    }
    // en el bucle siempre ; 
        for( let tipo of tipos ) {
            for( let esp of especiales ) {
            deck.push( esp + tipo );
        }
    } 
    //trabajo con función de underscore
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}
 crearDeck();

 //Esta función me permite tomar una carta
 const pedirCarta = () => {

    if(deck.length === 0){
        throw 'No hay más cartas'; // el throw arroja un error
    }

    const carta = deck.pop();

    deck.pop(carta);

    // console.log(deck);
    // console.log(carta); 
    return carta;
 }
//  pedirCarta();
const valorCarta = ( carta ) => {
    const valor = carta.substring(0,carta.length - 1);
    return( isNaN( valor ) ) ?
            (valor === 'A') ? 11 : 10
                              : valor *1; 
}

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) =>{
        do{
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            
            marcadorPuntos[1].innerHTML = puntosComputadora;
        

            const imgCarta = document.createElement('img');
      
            imgCarta.src = `assets/cartas/${carta}.png`; 
           
            imgCarta.classList.add('carta');
        
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21){
                break;
            }


        }while (( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        setTimeout(()=>{

            if( puntosComputadora === puntosMinimos){
                alert('Nadie gana');
            }else if( puntosMinimos > 21){
                alert('Computadora gana');
            }else if( puntosComputadora > 21){
                alert('Jugador gana');
            }else{
                (alert('Computadora gana'));
            }

        },10);
    }

        //Eventos
        //El evento addEventListener recibe dos parámetros, el primero es la acción ante la cual va a reaccionar y el segundo es un función. Esa función que es pasada como parámetro es un callback. Puede ser de flecha. 
        btnPedir.addEventListener('click', () =>{

            const carta = pedirCarta();

            puntosJugador = puntosJugador + valorCarta(carta);
            // console.log(puntosJugador);
            marcadorPuntos[0].innerHTML = puntosJugador;

            //Para hacer que la carta cambie
            //1- con este codigo le decimos que cree un elemento, en este caso una imagen
            const imgCarta = document.createElement('img');
            //2-la ruta de esa imagen
            imgCarta.src = `assets/cartas/${carta}.png`; //la combinación hace el nombre en este caso
            //3- le agregamos la clase css, puede ser una clase de bootstrap
            imgCarta.classList.add('carta');

            divCartasJugador.append(imgCarta);

            if (puntosJugador > 21 ){
                console.log('Lo siento, perdiste');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);


            } else if (puntosJugador === 21) {
                console.log('21,Ganaste');
                btnPedir.disabled = true;
                btnDetener.disabled = true;
                turnoComputadora(puntosJugador);
            } 
        });

        btnDetener.addEventListener('click', ()=> {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        });

        btnNuevo.addEventListener('click', ()=> {
             deck = [];
             deck = crearDeck();

             puntosJugador = 0;
             puntosComputadora = 0;

             marcadorPuntos[0].innerText = 0;
             marcadorPuntos[1].innerText = 0;

             divCartasComputadora.innerHTML = "";
             divCartasJugador.innerHTML = "";

             btnPedir.disabled = false;
             btnDetener.disabled = false;
        });