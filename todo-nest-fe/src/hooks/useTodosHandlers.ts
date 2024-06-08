import { useState, useEffect } from 'react';
import { Todo } from '../../../todo-nest/dist/src/todo/entities/todo.entity';
import { CreateTodoData } from '../api/createTodo';
import { useCreateTodo } from './useCreateTodo';
import { useDeleteTodo } from './useDeleteTodo';
import { useEditTodo } from './useEditTodo';
import { useTodosQuery } from './useTodosQuery';

export const useTodosHandlers = () => {
  const { data: todoData = [] } = useTodosQuery();
  const { mutate: editTodo } = useEditTodo();
  const { mutate: createTodo } = useCreateTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

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

  const handleDeleteClick = (index: number) => {
    const todo = todos[index];

    if (!todo) return;

    deleteTodo(todo.id);
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

  return {
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
  };
};
