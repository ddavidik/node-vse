import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Todo App!</h1>
      <nav>
        <Link to="/todos">View Todos</Link>
      </nav>
    </div>
  );
}

export default App;
