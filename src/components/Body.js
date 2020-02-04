import React from 'react';

// Component styling
import './styles/Body.scss';

const Body = ({ list, sortingBy, ascending }) => {
  
  // Sort the array of row data based on the column selected in state
  const sortRows = () =>
    [...list].sort(
      (a,b) => {
        // Avoid case issues when sorting strings
        const compVarA = typeof(a[sortingBy]) === 'string' ?
          a[sortingBy].toUpperCase() : a[sortingBy];
        const compVarB = typeof(b[sortingBy]) === 'string' ?
          b[sortingBy].toUpperCase() : b[sortingBy];
        // Sort the column data in ascending order
        let compVal = compVarA > compVarB ? 1 : -1;
        // Invert sorting if ascending is false in state
        return ascending ? compVal : compVal * -1;
      }
    );

  /* Take an integer representing an amount of USD dollars and return a formatted string
    Example: 1234567 -> $1,234,567 */
  const formatUSD = (moneyVal) =>
    '$' + (
      moneyVal
      .toString()
      .split('') // Split into an array of digits
      .reduceRight((currencyStr, currDigit, index, arr) =>
        // Insert commas after every 3 digits unless we're at the last digit
        ((arr.length - index) % 3 === 0 && index !== 0 ? ',' : '') + currDigit + currencyStr 
      )
    );
  
  // Determine whether data cell represents a monetary value (depends on column)
  const isCurrency = (key) =>
    key === 'weekendRev' || key === 'locAvg' || key === 'cumeRev';

  /* If monetary or locs col, right-align/monospace;
    if # col, just monospace, otherwise no classes */
  const determineCellClasses = (key) =>
    isCurrency(key) || key === 'locs' ?
      'numFontMono text-right' :
      key === 'rank' ? 'numFontMono' : '';

  // Sort the rows array based on current sorting col, then use them to make table rows
  const rows = sortRows().map((rowData, index) => {
    const rowCells = []; // Holds data cells for current row
    // Use the table data to create and add the cells for this row to rowCells array
    for(let key in rowData)
      rowCells.push(
        <td key={key} className={determineCellClasses(key)}>
          { // If the data for this cell represents a USD value, format it correctly
            isCurrency(key) ? formatUSD(rowData[key]) : rowData[key]
          }
        </td>
      );
    return <tr key={index}>{rowCells}</tr>; // Return the cells built for this row wrapped in a row element
  });
  
  // Wrap created table rows in <tbody> tags and return
  return <tbody>{rows}</tbody>;
};

export default Body;