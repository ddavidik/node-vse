import { WebSocketServer } from 'ws';
import { getAllTodos, getTodoById } from './db.js';
import ejs from 'ejs';

const connections = new Set();

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    connections.add(ws);

    ws.send('{"Hello": "Hello, I am a web socket!"}');

    console.log('Number of new connections', connections.size);

    ws.on('close', () => {
      connections.delete(ws);
    });
  });
};

export const sendTodoListToAllConnections = async () => {
  const todoList = await ejs.renderFile('views/_todos.ejs', {
    todos: await getAllTodos(),
  });

  for (const connection of connections) {
    connection.send(JSON.stringify({ type: 'todoList', html: todoList }));
  }
};

export const sendTodoToAllConnections = async (id) => {
  const todo = await ejs.renderFile('views/_todo.ejs', {
    todo: await getTodoById(id),
  });

  for (const connection of connections) {
    connection.send(JSON.stringify({ id, type: 'todo', html: todo }));
  }
};

export const sendTodoDeletedToAllConnections = async (id) => {
  for (const connection of connections) {
    connection.send(JSON.stringify({ id, isDeleted: true, type: 'todo' }));
  }
};
