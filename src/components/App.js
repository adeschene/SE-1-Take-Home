import React from 'react';

// Component styling
import './styles/App.scss';

// Table component
import Table from './Table';

const App = ({ list }) => {

  // Store list length for pagination-info
  const listLength = list.length;

  // Define the property to sort the list by initially
  const defaultSortKey = 'weekendRev';

  // Sort function made to work with numbers or strings
  const defaultSorter = (a,b) => {
    const valA = typeof(a[defaultSortKey]) === 'string' ?
      a[defaultSortKey].toUpperCase() : a[defaultSortKey];
    const valB = typeof(b[defaultSortKey]) === 'string' ?
      b[defaultSortKey].toUpperCase() : b[defaultSortKey];
    return valB > valA ? 1 : -1;
  };
  
  // Sort list by defaultSortKey and add rank ('#') data
  const defaultSortedList = 
    [...list]
      .sort(defaultSorter)
      .map((rowObj, index) => ({
        'rank': index + 1,
        ...rowObj
      }));

  /* Pass sorted list to <Table> component,
    create pagination info <p> below it */
  return (
    <div className='widget container'>
      <Table list={defaultSortedList} />
      <p id='paginationInfo'>
        Showing 1 to {listLength} of {listLength} entries
      </p>
    </div>
  );
};

export default App;