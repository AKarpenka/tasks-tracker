import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import TasksPage from '../pages/TasksPage/TasksPage';
import Page404 from '../pages/Page404/Page404';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src="logo.png" alt="logo" height={'50px'} />
          <h1>Tasks Tracker</h1>
        </header>
        <div className="content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/:projectId/:projectName/tasks/" element={<TasksPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
        <footer>Developed by Anastasiya Karpenka</footer>
      </div>
    </Router>
  );
}

export default App;
