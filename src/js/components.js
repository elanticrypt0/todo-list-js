//import './css/component.css';
import { Todo } from "./classes";
import { todoList } from "..";

const body=document.body;
const todoListHtml=document.querySelector('.todo-list');
const txtInput=document.querySelector('.new-todo');
const btnDeleteAllCompletedTodos=document.querySelector('.clear-completed');
const ulFilters=document.querySelector('.filters');

export const createTodoHtml=(todo)=>{
    const htmlTodo=`
    <li class="${ (todo.completed)? 'completed' : '' }" data-id="${ todo.id }">
    <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completed)? 'checked' : '' }>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${todo.id}>
    </li>`;
    
    const div= document.createElement("div");
    div.innerHTML=htmlTodo;
    // en lugar de insertar el <div><li>... inserta sólo el <li>
    todoListHtml.append(div.firstElementChild);

    return div.firstElementChild;

}

// events

txtInput.addEventListener('keyup',(event)=>{

    if(event.keyCode===13 && txtInput.value.length > 0){
        const newTodo= new Todo(txtInput.value);
        todoList.insertTodo(newTodo);
        createTodoHtml(newTodo);
        txtInput.value='';
    }

});

todoListHtml.addEventListener('click',(event)=>{
    const clickedElement= event.target.localName;
    const liParent=event.target.parentElement.parentElement;
    const elementId=liParent.getAttribute('data-id');

    console.log(clickedElement);
    // marco la tarea como completada
    if(clickedElement.includes('input')){
        liParent.classList.toggle('completed');
        todoList.toggleState(elementId);
    }else if(clickedElement.includes('button')){
        todoList.deleteTodo(elementId);
        todoListHtml.removeChild(liParent);
    }

});

btnDeleteAllCompletedTodos.addEventListener('click',(event)=>{
    todoList.deleteCompletedTodos();
    
    for (let i = todoListHtml.children.length -1; i >= 0; i-- ){
        const elem=todoListHtml.children[i];
        if(elem.classList.contains('completed')){
            todoListHtml.removeChild(elem);
        }
    }

});

ulFilters.addEventListener('click',(event)=>{

    const filter=event.target.text;
    // si NO es undefined
    if(!!filter){

       
        for(const elem of todoListHtml.children){
            
            elem.classList.remove('hidden');
            const completedTodo=elem.classList.contains('completed');
            
            switch(filter){
                case 'Completados':
                        if(!completedTodo){
                            elem.classList.add('hidden');
                            console.log('completados');
                        }
                    break;
                case 'Pendientes':
                        if(completedTodo){
                            elem.classList.add('hidden');
                            console.log('pendientes');
                        }
                    break;
            }

        }
    }

});