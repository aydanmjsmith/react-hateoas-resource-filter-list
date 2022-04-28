import React from 'react';
import './App.css';
import JobSearch from './components/JobSearch';

const App = () => {
  return (
    <React.Fragment>
      <JobSearch />
      <hr />
      <JobSearch />
      <hr />
      <JobSearch />
    </React.Fragment>
  );
}

export default App;