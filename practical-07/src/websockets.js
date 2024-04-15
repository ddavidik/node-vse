import { WebSocketServer } from 'ws';
import { getAllTodos } from './db.js';
import ejs from 'ejs';

const connections = new Set();

export const createWebSocketServer = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    connections.add(ws);

    ws.send('Hello, I am a web socket!');

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
