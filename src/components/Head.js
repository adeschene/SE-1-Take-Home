import React from 'react';

// Component styling
import './styles/Head.scss';

const Head = ({ handleClick, sortingBy, ascending }) => {

  // Info for header cells in table; id for internal referencing and title for UI
  const headerInfo = [
    {id: 'rank',            title: '#'},
    {id: 'titleName',       title: 'Title'},
    {id: 'distributorName', title: 'Distributor Name'},
    {id: 'weekendRev',      title: 'Weekend Total'},
    {id: 'locs',            title: '# of Locs'},
    {id: 'locAvg',          title: 'Loc Avg'},
    {id: 'cumeRev',         title: 'Cume Total'}
  ];

  // Assign and update header classes based on sorting, sort direction, alignment, etc
  const determineHeaderClasses = (headerID) => {
    let headerClasses = 'header'; // All headers get header class
    // Dealing with a header that needs to right-aligned; add that class and continue
    if(headerID === 'weekendRev' || headerID === 'locs' || headerID === 'locAvg' || headerID === 'cumeRev')
      headerClasses += ' text-right';
    // Dealing with '#' header and a different sorting column has been used at least once, so disable 
    if(headerID === 'rank' && sortingBy !== 'rank') 
      headerClasses += ' sortingDisabled';
    /* Not '#' header (or it is and user hasn't interacted with sorting yet) and we are
      currently sorting by it, so add either ascending or descending sorting class */
    else if(headerID === sortingBy)
      headerClasses += ascending ? ' sortingByAsc' : ' sortingByDesc';
    else // Not '#' header and not sorting by it currently, so add sortableBy class
      headerClasses += ' sortableBy';
    return headerClasses; // Return the fully-built class list
  };
  
  // Create and return the header for the table
  return (
    <thead>
      <tr role='row' className='headerRow'>
        {headerInfo.map(header => 
          <th
            className={determineHeaderClasses(header.id)}
            id={header.id}
            key={header.id}
            onClick={handleClick}
          >{header.title}</th>
        )}
      </tr>
    </thead>
  );
};

export default Head;