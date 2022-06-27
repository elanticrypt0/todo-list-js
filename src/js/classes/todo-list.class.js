


export class TodoList{

    constructor(){
        this.todos=this.loadFromLocalStorage();
    }

    insertTodo( todo ){
        this.todos.push(todo);
        this.saveOnLocalStorage();
    }

    deleteTodo(id){
        this.todos = this.todos.filter(todo => todo.id != id);
        this.saveOnLocalStorage();
    }

    deleteCompletedTodos(){
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveOnLocalStorage();
    }

    toggleState(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completed = !todo.completed;
                break;
            }
        }
    }

    findTodo(id){
        for(const todo of this.todos){
            if(todo.id == id){
                todo.completed = !todo.completed;
                break;
            }
        }

    }

    saveOnLocalStorage(){
        localStorage.setItem('todos',JSON.stringify(this.todos));
    }

    loadFromLocalStorage(){
        return localStorage.getItem('todos')
                                ? JSON.parse(localStorage.getItem('todos'))
                                : [];
    }

}