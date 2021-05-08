/* Aca se generan los componentes dinamicos HTML de las tareas. */



import {Todo} from '../classes';
import {todoList} from '../index'; // importo la instancia, o sea el arreglo de tareas que se declaro en index.js porque lo voy a usar para almacenar
                                   // las nuevas tareas que se vayan creando (linea 53). 

// Referencias en el HTML:
const divTodoList = document.querySelector('.todo-list'); //extraigo la referencia al <ul> del index de la linea 18 que tiene la clase todo-list.
const txtInput = document.querySelector('.new-todo');//constante que maneja la referencia al input del index (linea 12). txtInput apunta al input del index.
const btnBorrarTodosCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


// Vamos a crear una funcion que me permita crear en el HTML cada una de las tareas:
export const crearTodoHtml = ( todo ) => { // recido una tarea, y en base a esa tarea yo voy a construir en el html.

    const htmlTodo = `
    <li class="${ (todo.completado === true) ? 'completed' : '' }" data-id="${ todo.id }">
		<div class="view">
		    <input class="toggle" type="checkbox" ${ (todo.completado === true) ? 'checked' : '' }>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>`;

    const div = document.createElement('div') /*creamos un div que se usara para insertar todo el <li> de arriba. Basicamente el div se crea a modo de  
                                              contenedor, porque no puedo agregar todo el codigo html de arriba directamente, tengo que usar un div que 
                                              haga de intermediario, pero el div como tal no lo usaremos para insertarlo en ninguna parte, lo que usaremos 
                                              es el <li> que tenga adentro. */
    
    div.innerHTML= htmlTodo; //inserto el <li> en el div creado arriba.

    divTodoList.append( div.firstElementChild ); /* div.firstElementChild: lo que hace es sacar el primer elemento hijo que tiene dentro ese div, que es un 
                                                    <li>, y lo inserto dentro del <ul> que esta en el index mediante la referencia que almacena divTodoList.
                                                    Entonces lo que estoy insertando con el append no es un div sino un <li> */

    return div.firstElementChild; // retorno el <li> generado.
}


// Eventos :

/* Evento que detecta lo que la persona escribe.  */
txtInput.addEventListener('keyup', (event) => { // keyup cuando la persona suelta la tecla, cuando la suelte voy a disparar la funcion de flecha que tiene
                                                // como parametro el evento.

    if(event.keyCode === 13 && txtInput.value.length > 0){ // Cuando keyCode es 13 significa que la persona presiono enter Y valiando que no mande un enter
                                                           // sin escribir nada, o sea un string vacio.             

        const nuevaTarea = new Todo(txtInput.value); // se crea una nueva tarea y se manda el valor del input al constructor para que se seteen sus campos.

        // Ahora debo insertar la nueva tarea en el arreglo de tareas:
        todoList.nuevoTodo(nuevaTarea); //llamo al metodo del arreglo, el cual es nuevoTodo que insertará la nuevaTarea en el arreglo de tareas.
        console.log(todoList);

        //Ahora debemos insertar esa nueva tarea en el html mediante la funcion de arriba crearTodoHtml:
        crearTodoHtml(nuevaTarea);

        //limpiamos el input:
        txtInput.value = '';
    }   
} );


/* Evento que detecta la tarea a la cual se le hace clic, esto servira para la parte de marcar la tarea como completado.  */
divTodoList.addEventListener('click', (event) => { //utilizo el divTodoList porque dentro de ese <ul> estan los <li> que son las tareas.

    //console.log(event.target.localName); //me interesa el target porque asi detecta donde hice clic, p.e: si hice clic en un boton, en un label, etc.
                                         //y localName me dira exactamente que evento fué, p.e: label, button , input.

    const nombreElemento = event.target.localName; //guardo lo del console.log de arriba, sera p.e: input, label, button.

    //Hacemos la referencia al <li> completamente:
    const tareaElemento = event.target.parentElement.parentElement; //son 2 parentElement, porque con uno hago referencia al elemento padre <div> que esta 
                                                                    //dentro del <li>, entonces con otro parentElement hare referencia al padre del <div>
                                                                   //que es el <li> ...recordar que en el <li> esta el checkbox,label y boton eliminar tarea.
    
    const tareaId = tareaElemento.getAttribute('data-id'); //extraigo el id de la tarea, data-id es un atributo que guarda el id de la tarea, se puede 
                                                           //ver en la linea 18.

    //Evaluo cuando el checkbox este marcado para poder tachar la tarea:
    if(nombreElemento.includes('input')){ //si nombreElemento incluye algo llamado input quiere decir que se hizo clic en el checkbox ya que el checkbox.                                                       
                                          //es detectado como un input.      
        todoList.marcarCompletado(tareaId); //aca cambia el estado de completado = false a completado = true, pero no lo tacha.
        tareaElemento.classList.toggle('completed'); //aca se tacha la tarea. toggle() se usa para cambiar una clase, de esta forma si existe la clase
                                                     //'completed' la va a quitar y si no existe la pondrá .   
    
    } 
    //Sino evaluo cuando haga clic en la X que es el button, que se usa para eliminar la tarea:
    else if (nombreElemento.includes('button')){ //Hay que borrar la tarea.

        todoList.eliminarTodo(tareaId); //Esto hara que se borre la tarea del arreglo.

        //Pero aun va a existir en el html, por eso tambien debo quitarlo de allí:
        divTodoList.removeChild(tareaElemento);

    }

    //console.log(todoList);                                                               
}); 


/* Evento que se ejecuta cuando se presiona el boton Borrar completados : */
btnBorrarTodosCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados(); //eliminamos los completados del arreglo.

    //Falta eliminar los completados del html:
    for(let i = divTodoList.children.length-1; i>=0; i-- ){ //necesito empezar a recorrer desde la ultima posicion, ya que p.e si borro el segundo elemento
                                                            //y despues borro el tercero, erroneamente se podria eliminar el cuarto elemento porque el indice
                                                            //ira cambiando. En cambio de abajo hacia arriba si borro el cuarto, la posicion indice de los
                                                            //demas elementos seguira siendo la misma y no se correrá su indice.
        
        //preguntamos si el elemento actual esta completado, si lo esta se borra:
        const elemento = divTodoList.children[i];
        if(elemento.classList.contains('completed')){ //Si la tarea posee la clase completed quiere decir que esta marcado como completado.
            divTodoList.removeChild(elemento);
        }

    }

});



/* Evento que se ejecuta cuando los botones de filtros todos, pendientes, completados: */
ulFiltros.addEventListener('click', (event) =>{

    const filtro = event.target.text; //Almacena el texto de boton que presione: todos, pendientes, completados, undefined por si apreto fuera del boton.
    if( !filtro ){
        return;
    }


    // Remuevo la clase selected de los botones de los filtros:
    anchorFiltros.forEach( elem => elem.classList.remove('selected') );

    // Y ahora solo le querre poner la clase selected al filtro que este seleccionado:
    event.target.classList.add('selected'); //recordar que event.target hace referencia al boton que acabo de hacer clic.
    



    //recorro cada una de las tareas:
    for(const elemento of divTodoList.children){
        
        //Limpiamos la clase hidden de todos los elementos, para que por defeto los muestre todos, tanto los completados como los pendientes:
        elemento.classList.remove('hidden');

        /* LÓGICA PARA LOS BOTONES PENDIENTES Y COMPLETADOS : */
        //necesito saber si la tarea actual esta marcado como completado o no:
        const completado = elemento.classList.contains('completed'); // true o false

        //por ultimo, determino si quiero mostrar los completados o no, mediante los botones de filtros:
        switch(filtro){
            case 'Pendientes':  //Si presiono el filtro pendiente:
                if(completado){ //y aparece una tarea esta completada
                    elemento.classList.add('hidden'); //la oculto, ya que estoy en el filtro de NO completados.
                }
                break;

            case 'Completados':  //Si presiono el filtro completados:
                if(!completado){ //y aparece una tarea no completado (pendiente)
                    elemento.classList.add('hidden'); //la oculto, ya que estoy en el filtro de completados.
                }
                break;
            
            /* NO HACE FALTA AGREGAR UN FILTRO PARA MOSTRAR TODOS, YA QUE COMO NO ESTOY PRESIONANDO PENDIENTE NI COMPLETADO NO HARÁ NADA. Y PARTE
               DE MI COMPORATAMIENTO DEFINIDO ARRIBA EN LA LINEA 142 ES QUE REMUEVA LA CLASE HIDDEN DE TODAS LAS TAREAS. */
        }
    }

});
