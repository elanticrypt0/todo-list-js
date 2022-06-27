import './css/styles.css';
import { Todo,TodoList } from './js/classes/';
import { createTodoHtml } from './js/components';




export const todoList= new TodoList();

console.log(todoList);
todoList.todos.forEach( createTodoHtml );