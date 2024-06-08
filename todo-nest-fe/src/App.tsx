import { useEffect, useState } from 'react';
import './App.css';
import { useTodosQuery } from './hooks/useTodosQuery';
import { Todo } from '../../todo-nest/dist/src/todo/entities/todo.entity';

function App() {
  const { data: todoData = [] } = useTodosQuery();

  const [todos, setTodos] = useState<Todo[]>(todoData);

  useEffect(() => setTodos(todoData), [todoData]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <h2>{todo.name}</h2>
            <p>Priority: {todo.priority}</p>
            <p>Status: {todo.isDone ? 'Completed' : 'Incomplete'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
