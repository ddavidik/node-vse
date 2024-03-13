import express from 'express';

const PORT = 3000;
const app = express();

let todos = [
  { id: 1, title: 'Zajit na pivo', done: false },
  { id: 2, title: 'Vratit se z piva', done: false },
];

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

app.get('/remove-todo/:id', (req, res) => {
  todos = todos.filter((todo) => todo.id !== Number(req.params.id));

  res.redirect('/');
});

app.get('/toggle-todo/:id', (req, res) => {
  todos = todos.map((todo) =>
    todo.id === Number(req.params.id) ? { ...todo, done: !todo.done } : todo
  );

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
