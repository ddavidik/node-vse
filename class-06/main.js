import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';

const PORT = 3000;
const app = express();
const db = knex(knexfile);

let todos = [
  { id: 1, title: 'Zajit na pivo', done: false },
  { id: 2, title: 'Vratit se z piva', done: false },
];

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const todos = await db().select('*').from('todos');

  res.render('index', { todos });
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId);

  if (!todo) return next();

  res.render('todo', { todo });
});

app.post('/add-todo', async (req, res) => {
  const todo = {
    title: req.body.title,
    done: false,
  };

  await db('todos').insert(todo);

  res.redirect('/');
});

app.get('/remove-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId).first();

  if (!todo) return next();

  await db('todos').delete().where('id', todo.id);

  res.redirect('/');
});

app.post('/edit-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);

  const todo = (await db('todos').select('*').where('id', reqId)).first();

  if (!todo) return next();

  await db('todos').update({ title: req.body.title }).where('id', todo.id);

  res.redirect('back');
});

app.get('/toggle-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId).first();

  if (!todo) return next();

  await db('todos').update({ done: !todo.done }).where('id', todo.id);

  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
