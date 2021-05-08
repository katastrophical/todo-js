/**
 * Necesito almancear mi lista de tareas en un arreglo, pero hay un problema, que tenemos tareas pendientes, completadas y tambien eliminadas...
 * Entonces en vez de un arreglo se me ocurre crear una clase especializada para manejar todo o referente a mi lista de tareas .
 */


import { Todo } from './todo.class'; // Importo la clase Todo porque lo uso en la linea 93 para llamar al metodo estatico.


//Esta clase va a agruparme toda mi lista de taraes (todo's).
export class TodoList{



    // Lo que hare en el constructor sera crear un arreglo vacio donde se almancenaran todas las tareas.
    constructor(){

        //this.todos = [];
        this.cargarLocalStorage(); //Ahora el arreglo de tareas se inicializa en este metodo.
    }


    // Este metodo inserta una nueva tarea al arreglo de todo's de arriba.
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage(); //actualizo local Storage.
    }

    //Este metodo elimina una tarea del arreglo de todo's:
    eliminarTodo(id){

        this.todos = this.todos.filter( tarea => tarea.id != id ); // filter regresa un nuevo arreglo que tendra todas las tareas excepto la que coincida 
                                                                   // con el id que yo tenga como argumento.
        this.guardarLocalStorage(); //actualizo local Storage.
    }

    //Metodo que cambia el estado de la tarea de no completado a completada y viceversa:
    marcarCompletado(id){

        //Tengo que recorrer el arreglo de tareas, buscar el id que me pasan y marcar esa tarea:
        for(const tarea of this.todos ){

            //Si el id de la tarea que estoy evaluando en este preciso instante es igual al id que me pasan, ese tengo que cambiar a completado:
            if(tarea.id == id){ //pongo == porque tarea.id sera un numero y id del parametro sera un string.

                tarea.completado = !tarea.completado;
                this.guardarLocalStorage(); //actualizo local Storage.
                break; // hago un break para salir del for, ya que se supone que no habra otra tarea con el mismo id.

            } 

        }

    }

    //Metodo que acciona el boton de "Borrar completados" para eliminar todas las tareas completadas:
    eliminarCompletados(){ //se van a eliminar todas las tareas que tengan en el campo completado = true.
        this.todos = this.todos.filter( tarea => !tarea.completado ); //necesito todas las tareas que NO esten completadas, de esta forma se mantienen
                                                                      //las tareas que no esten completadas, y las que esten completadas se borrarán.  
        this.guardarLocalStorage(); //actualizo local Storage.
    }


    //Metodo que se usa para almacenar las tareas en el local storage:
    guardarLocalStorage(){

        localStorage.setItem('tarea', JSON.stringify(this.todos) ); //Debo pasar la lista de tareas a String ya que local storage solo almacena strings.
                                                                    //Para hacer esto, el contenido de la tarea lo grabare en json, ya que con json puedo
                                                                    //tener un objeto en string, lo cual lo hace compatible con el local storage.

    }


    //Metodo que se usa para cargar en nuestra aplicacion los datos almacenados previamente en el local storage cuando la abrimos:
    cargarLocalStorage(){

        if( localStorage.getItem('tarea') ){ //Si existen tareas en el local storage:
            this.todos = JSON.parse( localStorage.getItem('tarea') ); //Inicilizo el arreglo con el valor que tenga el local storage. Pero antes debo 
                                                                      //pasarlo a formato Object (lo inverso de arriba), porque estaba como String. 
                                                                      //Lo pasaremos a Object, para despues abajo hacer la conversion de Object a Todo.
                                                                      //Si o si hay que pasarlos a Object sino el arreglo se inicializaria
                                                                      //como string y no como array entonces no podria seguir metiendole tareas.
                                                                      //RECORDAR: Que es un problema dejar las tareas como Object porque perderiamos todos 
                                                                      //los metodos de la clase 'Todo' no podriamos hacer uso de ellos ya que son para tipo
                                                                      //Todo y no Object. 
                                                                      
        }else{ //En este punto todavia no teniamos nada grabado en local storage.
            this.todos = []; //Si no existe nada en local storage el arreglo de tareas estara vacio.
        }

        // Ahora que ya tenemos el arreglo de Object que parecen 'Todo', pasamos cada uno de los elementos del arreglo a tipo 'Todo' mediante la siguiente
        // instruccion :
        this.todos = this.todos.map( obj => Todo.fromJson(obj) ); //.map me permite barrer cada uno de los elementos de un arreglo y retornar un nuevo
                                                                  //arreglo con cada uno de esos objetos mutados... como vemos en esa funcion de flecha
                                                                  //llamamos al metodo fromJson que nos convierte los Object que estan dentro del Json
                                                                  //a tipo Todo. NOTA:El metodo se debe llamar con el nombre de la clase porque es un metodo
                                                                  //estatico (propio de la clase).
        
        /*Arriba, el .map recibe un argumento que es un Obj que seria cada uno de los Object del arreglo, los paso por una funcion de flecha y
        obtengo el nuevo elemento de tipo Todo que se crea en el metodo fromJson() y le paso el obj para que lo reciba como argumento. */
    }
}