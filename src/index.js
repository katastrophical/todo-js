import './styles.css';

/*import { Todo } from './classes/todo.class.js'; //importamos la clase todo para hacer uso de ella acá.
import { TodoList } from './classes/todo-list.class';*/
//Para no hacer tantas importaciones de clases, mejor importo una sola clase que contenga todas las importaciones:
import { Todo, TodoList } from './classes'; //cuando se deja asi, js por defecto va a buscar en el directorio el index.js que contiene todos los imports.
import { crearTodoHtml } from './js/componentes';




export const todoList = new TodoList(); //Creamos un arreglo que almancenara objetos que son todas las tareas. Y lo exporto porque en componentes.js se
                                        //va a hacer referencia a este, cuando se le ingresen las nuevas tareas que se vayan creando.
console.log(todoList.todos);

//Vamos a reconstruir en el html todas las tareas almacenadas en el local storage:
todoList.todos.forEach( tarea => crearTodoHtml(tarea) );/* Cuando inicia el programa, en el index.js se debe crear la instancia de TodoList que se llama 
                                                           todoList.
                                                           Cuando se crea todoList en el index.js se creara el arreglo 'todos' dentro de la clase TodoList,
                                                           la instancia todoList solo se usa para manejar el arreglo de tareas 'todos' desde afuera de su 
                                                           clase. El arreglo de tareas solo estará dentro de su clase, y para manejarlo desde afuera 
                                                           utilizaré la instancia todoList. 
                                                           Dentro de la instancia todoList se encuentra el arreglo de tareas 'todos'   
                                                           */

// todoList.todos[0].imprimirClase(); //Ahora puedo usar el metodo imprimirClase() porque se pasaron las tareas del local storage de tipo Object a Todo.