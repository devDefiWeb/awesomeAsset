import React from 'react';
import './App.css';
import Layout from './components/Layout';

interface IAppProps {
}

const App: React.FC<IAppProps> = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  );
}

export default App;
