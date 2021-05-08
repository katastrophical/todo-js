/* Esta clase se uara para crear las tareas. Las tareas son un objeto de la clase Todo. */

// Como esta clase se va a manejar fuera de este archivo debe llevar el export :
export class Todo{

    /*
    Un inconveniente de local storage es que cuando leemos las tareas desde ahi, cuando se pasan de vuelta de string a tareas, es que las devuelve en tipo 
    object y no como tipo 'Todo', entonces si quisieramos trabajar con la instancia del objeto (tipo Todo), p.e: No podriamos usar un metodo de la clase 
    Todo como el imprimirClase() porque la tarea estaria en tipo object, por lo cual no seria compatible para usar ese metodo que es para tipo 'Todo', osea 
    perderiamos todos los metodos de la clase 'Todo'. Entonces deberiamos reconstruir las intancias de 'Todo' para que queden como tipo 'Todo' nuevamente.
    
    Entonces a continuacion, crearemos un metodo estatico que me permite crear una nueva instancia en base a valores que vienen desde el local storage, de 
    objetos que "parecen" Todo pero no son 'Todo':
    */
    static fromJson({ id, tarea, completado, creado }){ // usamos como argumentos la desestructuracion de objetos, donde recibira al objeto tipo Object
                                                        // que tiene la tarea.
        const auxTarea = new Todo(tarea);

        auxTarea.id = id;
        auxTarea.completado = completado;
        auxTarea.creado = creado;

        //Ahora ya tenemos un objeto tipo Todo en el auxiliar, entonces lo regresamos:
        return auxTarea; 
    }




    constructor(tarea){
        this.tarea = tarea;

        this.id = new Date().getTime(); //Una manera sencilla de crear un id es haciendo esto, y sera un numero algo asi: 1687465414789
        this.completado = false;
        this.creado = new Date(); //fecha en que se creo la tarea
    }




    imprimirClase(){
        console.log(`${this.tarea} - ${this.id}`);
    }


}