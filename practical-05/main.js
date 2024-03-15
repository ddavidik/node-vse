import express from 'express';

const PORT = 3000;
const app = express();

let todos = [
  { id: 1, title: 'Zajit na pivo', done: false },
  { id: 2, title: 'Vratit se z piva', done: false },
];

const getTodo = (reqId) => {
  const todo = todos.find(({ id }) => id === reqId);

  if (!todo) throw new Error(`Todo with that ID not found: ${reqId}`);

  return todo;
};

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { todos });
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/add-todo', (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    done: false,
  };

  todos.push(todo);

  res.redirect('/');
});

app.get('/todo/:id', (req, res) => {
  const todo = todos.find(({ id }) => id === Number(req.params.id));

  res.render('todo', { todo });
});

app.post('/edit-todo/:id', (req, res) => {
  const reqId = Number(req.params.id);
  const todo = getTodo(Number(req.params.id));

  const changedTodo = { ...todo, title: req.body.title };

  todos = todos.map((todo) => (todo.id === reqId ? changedTodo : todo));

  res.render('todo', { todo: changedTodo });
});

app.get('/remove-todo/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id !== Number(req.params.id));

  res.redirect('/');
});

app.get('/toggle-todo/:id', (req, res) => {
  const reqId = Number(req.params.id);
  const todo = getTodo(Number(req.params.id));

  const changedTodo = { ...todo, done: !todo.done };

  todos = todos.map((todo) => (todo.id === reqId ? changedTodo : todo));

  res.render('todo', { todo: changedTodo });
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
