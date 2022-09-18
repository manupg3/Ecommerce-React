import {BrowserRouter as Router} from 'react-router-dom';
import RoutesApp from './routes/routes';
import AppContext from './context/AppContext';
import useInitialState from '../src/hooks/useInitialState';
import { AuthProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const initialState = useInitialState()
  
  const asd = "";
  return (
    <Router>
    <AppContext.Provider value={initialState}  >
    <AuthProvider>  
       <RoutesApp />
       </AuthProvider>
    </AppContext.Provider>
    </Router>
  );
}

export default App;
