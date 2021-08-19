import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {BrowserRouter} from 'react-router-dom'
import Routes_ from './routes/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes_ />
    </BrowserRouter>
  );
}

export default App;
