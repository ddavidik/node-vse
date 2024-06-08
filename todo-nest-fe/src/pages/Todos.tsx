import { FC, useEffect, useState } from 'react';
import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';
import { useTodosQuery } from '../hooks/useTodosQuery';
import { useEditTodo } from '../hooks/useEditTodo';
import './Todos.css';
import { useCreateTodo } from '../hooks/useCreateTodo';
import { CreateTodoData } from '../api/createTodo';

export const Todos: FC = () => {
  const { data: todoData = [] } = useTodosQuery();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: createTodo } = useCreateTodo();

  const [todos, setTodos] = useState<Todo[]>(todoData);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editableTodo, setEditableTodo] = useState<Partial<Todo>>({});
  const [newTodo, setNewTodo] = useState<CreateTodoData>({
    name: '',
    priority: 'normal',
    isDone: false,
  });

  useEffect(() => setTodos(todoData), [todoData]);

  const handleEditClick = (index: number) => {
    setEditIndex(index);
    setEditableTodo(todos[index]);
  };

  const handleSaveClick = (index: number) => {
    const { id, name, isDone, priority } = {
      ...todos[index],
      ...editableTodo,
    };

    editTodo(
      { id, name, isDone, priority },
      {
        onSuccess: () => {
          setEditIndex(null);
        },
      }
    );
  };

  const handleInputChange = (field: keyof Todo, value: string | boolean) => {
    setEditableTodo({
      ...editableTodo,
      [field]: value,
    });
  };

  const handleNewTodoChange = (field: keyof Todo, value: string | boolean) => {
    setNewTodo({
      ...newTodo,
      [field]: value,
    });
  };

  const handleCreateTodo = () => {
    createTodo(newTodo, {
      onSuccess: () => {
        setNewTodo({
          name: '',
          priority: 'normal',
          isDone: false,
        });
      },
    });
  };

  return (
    <div className="Todos">
      <h1>Todo List</h1>
      <table className="todo-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id} className="todo-item">
              {editIndex === index ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editableTodo.name ?? todo.name}
                      onChange={(e) =>
                        handleInputChange('name', e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <select
                      value={editableTodo.priority ?? todo.priority}
                      onChange={(e) =>
                        handleInputChange('priority', e.target.value)
                      }
                    >
                      <option value="low">low</option>
                      <option value="normal">normal</option>
                      <option value="high">high</option>
                    </select>
                  </td>
                  <td>
                    <select
                      value={editableTodo.isDone ? 'Completed' : 'Incomplete'}
                      onChange={(e) =>
                        handleInputChange(
                          'isDone',
                          e.target.value === 'Completed'
                        )
                      }
                    >
                      <option value="Completed">Completed</option>
                      <option value="Incomplete">Incomplete</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{todo.name}</td>
                  <td>{todo.priority}</td>
                  <td>{todo.isDone ? 'Completed' : 'Incomplete'}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Create New Todo</h2>
      <div className="new-todo-form">
        <input
          type="text"
          placeholder="Name"
          value={newTodo.name}
          onChange={(e) => handleNewTodoChange('name', e.target.value)}
        />
        <select
          value={newTodo.priority}
          onChange={(e) => handleNewTodoChange('priority', e.target.value)}
        >
          <option value="low">low</option>
          <option value="normal">normal</option>
          <option value="high">high</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={newTodo.isDone}
            onChange={(e) => handleNewTodoChange('isDone', e.target.checked)}
          />
          Completed
        </label>
        <button onClick={handleCreateTodo}>Create</button>
      </div>
    </div>
  );
};
