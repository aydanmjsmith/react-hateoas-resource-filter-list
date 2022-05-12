import React from 'react';
import './App.css';
import JobLookup from './components/JobLookup';
import JobSearch from './components/JobSearch';

const App = () => {
  return (
    <React.Fragment>
      <JobSearch />
      <JobLookup />
      {/* <hr />
      <JobSearch />
      <hr />
      <JobSearch /> */}
    </React.Fragment>
  );
}

export default App;