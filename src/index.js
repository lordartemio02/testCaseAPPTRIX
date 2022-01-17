import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './component/user';
import Issues from './component/issues';
import configureStrore from './redux/store'
import { Provider } from 'react-redux';
import Registration from './pages/registration';
import Login from './pages/login';

const store = configureStrore()


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/:login" element={<User />} />
          <Route exact path="/issues" element={<Issues />} />
        </Routes>
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
