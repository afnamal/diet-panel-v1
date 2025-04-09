import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import routes from './routes/main';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              route.allowedRole ? (
                <ProtectedRoute allowedRole={route.allowedRole}>
                  <route.page />
                </ProtectedRoute>
              ) : (
                <route.page />
              )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
