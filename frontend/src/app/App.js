import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import TasksPage from '../pages/TasksPage/TasksPage';
import Page404 from '../pages/Page404/Page404';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tasks/:projectName" element={<TasksPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
