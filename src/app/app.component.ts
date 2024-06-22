import { Component } from '@angular/core';
import { todo } from './todo';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AppComponent {
  inputValue: string = '';
  todos: todo[] = [];

  

  ngOnInit() {
    // Fetch todos from localStorage on component initialization
    this.fetchTodosFromLocalStorage();
  }

  fetchTodosFromLocalStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      try {
        this.todos = JSON.parse(storedTodos);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
        // Handle parsing error gracefully if needed
        this.todos = [];
      }
    }
  }

  saveToLocal() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  PushtoArray() {
    if (this.inputValue.trim()) {
      const newtodo: todo = {
        id: Date.now(),
        name: this.inputValue,
        isdone: false
      };
      this.todos.push(newtodo);
      this.saveToLocal(); // Save todos to localStorage after pushing new todo
      this.inputValue = '';
    }
  }

  deleteItem(id: number) {
    this.todos = this.todos.filter(item => item.id !== id);
    this.saveToLocal(); // Save todos to localStorage after deleting todo
  }
}
