import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Chat from './components/Chat';
import ChatWarm from './components/ChatWarm';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Chat />,
  },
  {
    path: '/ec2-warm',
    element: <ChatWarm />,
  },
]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
