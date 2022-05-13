import React from 'react';
import './App.css';
import JobCustomList from './components/JobCustomList';
import JobLookup from './components/JobLookup';
import JobList from './components/JobList';

const App = () => {
  return (
    <React.Fragment>
      <JobList />
      <JobLookup />
      <JobCustomList />
      {/* <hr />
      <JobSearch />
      <hr />
      <JobSearch /> */}
    </React.Fragment>
  );
}

export default App;