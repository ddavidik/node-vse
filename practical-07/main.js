import express from 'express';
import { db, getAllTodos, getTodoById } from './src/db.js';
import {
  createWebSocketServer,
  sendTodoListToAllConnections,
} from './src/websockets.js';

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const todos = await getAllTodos();

  res.render('index', { todos });
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await getTodoById(reqId);

  if (!todo) return next();

  res.render('todo', { todo });
});

app.post('/add-todo', async (req, res) => {
  const todo = {
    title: req.body.title,
    done: false,
  };

  await db('todos').insert(todo);

  sendTodoListToAllConnections().catch((err) => console.error(err));

  res.redirect('/');
});

app.post('/update-priority/:id', async (req, res) => {
  const reqId = Number(req.params.id);
  const todo = await getTodoById(reqId);

  if (!todo) return next();

  await db('todos')
    .update({ priority: req.body.priority })
    .where('id', todo.id);

  sendTodoListToAllConnections().catch((err) => console.error(err));

  res.redirect('back');
});

app.get('/remove-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await getTodoById(reqId);

  if (!todo) return next();

  await db('todos').delete().where('id', todo.id);

  sendTodoListToAllConnections().catch((err) => console.error(err));

  res.redirect('/');
});

app.post('/edit-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await getTodoById(reqId);

  if (!todo) return next();

  await db('todos').update({ title: req.body.title }).where('id', todo.id);

  sendTodoListToAllConnections().catch((err) => console.error(err));

  res.redirect('back');
});

app.post('/toggle-todo/:id', async (req, res, next) => {
  const reqId = Number(req.params.id);
  const todo = await getTodoById(reqId);

  if (!todo) return next();

  await db('todos').update({ done: !todo.done }).where('id', todo.id);

  sendTodoListToAllConnections().catch((err) => console.error(err));

  res.redirect('back');
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

createWebSocketServer(server);
