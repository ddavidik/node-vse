import { FC } from 'react';
import './styles.css';
import { useTodosHandlers } from '../../hooks/useTodosHandlers';
import { LogoutButton } from '../../components/LogoutButton';
import { Link } from 'react-router-dom';

export const Todos: FC = () => {
  const {
    todos,
    editIndex,
    editableTodo,
    newTodo,
    handleEditClick,
    handleDeleteClick,
    handleSaveClick,
    handleInputChange,
    handleNewTodoChange,
    handleCreateTodo,
  } = useTodosHandlers();

  return (
    <div className="Todos">
      <LogoutButton />
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
                  <td>
                    <Link to={`/todos/${todo.id}`}>{todo.name}</Link>
                  </td>
                  <td>{todo.priority}</td>
                  <td>{todo.isDone ? 'Completed' : 'Incomplete'}</td>
                  <td>
                    <button onClick={() => handleEditClick(index)}>Edit</button>
                    <button onClick={() => handleDeleteClick(index)}>
                      Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="new-todo-title">Create New Todo</h2>
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
