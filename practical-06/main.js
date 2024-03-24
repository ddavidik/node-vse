import express from 'express';
import knex from 'knex';
import knexfile from './knexfile.js';

const PORT = 3000;
const app = express();
const db = knex(knexfile);

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const todos = await db().select('*').from('todos');

  res.render('index', { todos });
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId).first();

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

app.post('/update-priority/:id', async (req, res) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId).first();

  if (!todo) return next();

  await db('todos')
    .update({ priority: req.body.priority })
    .where('id', todo.id);

  res.redirect('back');
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

  const todo = await db('todos').select('*').where('id', reqId).first();

  if (!todo) return next();

  await db('todos').update({ title: req.body.title }).where('id', todo.id);

  res.redirect('back');
});

app.get('/toggle-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await db('todos').select('*').where('id', reqId).first();

  if (!todo) return next();

  await db('todos').update({ done: !todo.done }).where('id', todo.id);

  res.redirect('back');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
