import { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css';
import { useTodoQuery } from '../../hooks/useTodoQuery';
import { LogoutButton } from '../../components';
import { useEditTodo } from '../../hooks/useEditTodo';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { Todo } from '../../../../todo-nest/dist/src/todo/entities/todo.entity';

export const TodoDetail: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: todo, isLoading, error } = useTodoQuery(id);
  const navigate = useNavigate();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const [editableTodo, setEditableTodo] = useState<Partial<Todo>>({});

  if (isLoading) return <div>Loading...</div>;
  if (error || !todo) return <div>Error loading todo</div>;

  const handleInputChange = (field: keyof Todo, value: string | boolean) => {
    setEditableTodo({
      ...editableTodo,
      [field]: value,
    });
  };

  const handleSaveClick = () => {
    const { id, name, isDone, priority } = todo;
    const updatedTodo = { ...{ id, name, isDone, priority }, ...editableTodo };

    editTodo(updatedTodo);
  };

  const handleDeleteClick = () => {
    deleteTodo(+id!, {
      onSuccess: () => {
        navigate('/todos');
      },
    });
  };

  return (
    <div className="TodoDetail">
      <button className="back-button" onClick={() => navigate('/todos')}>
        Back to List
      </button>
      <LogoutButton />
      <h1>Todo detail</h1>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={editableTodo.name ?? todo.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
      <div>
        <label>Priority:</label>
        <select
          value={editableTodo.priority ?? todo.priority}
          onChange={(e) => handleInputChange('priority', e.target.value)}
        >
          <option value="low">low</option>
          <option value="normal">normal</option>
          <option value="high">high</option>
        </select>
      </div>
      <div>
        <label>Status:</label>
        <select
          value={editableTodo.isDone ? 'Completed' : 'Incomplete'}
          onChange={(e) =>
            handleInputChange('isDone', e.target.value === 'Completed')
          }
        >
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      <button onClick={handleSaveClick}>Save</button>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};
