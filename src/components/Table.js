import React from 'react';

// Component styling
import './styles/Table.scss';

// Table components
import Head from './Head';
import Body from './Body';

class Table extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sortingBy: 'rank', // Default sorting (rank/# header)
      ascending: true, // Default sort direction (ascending)
    };
  };

  /* When user clicks on a sortable column header, change the state accordingly
    (Implemented as an arrow function so we don't have to bind but keep context) */
  handleClick = (e) => {
    const headerClicked = e.currentTarget['id'];
    // Don't respond to user clicking the 'rank'(i.e. '#') header
    if(headerClicked === 'rank') return;
    // If clicked same header again, switch sort order
    if(this.state.sortingBy === headerClicked){
      this.setState(prevState => ({ascending: !prevState.ascending}));
    // If clicked new header, change to sort ascending by new header
    } else {
      this.setState(prevState => ({
        sortingBy: headerClicked,
        ascending: true
      }));
    };
  };
  
  // Create and return the table, with added classNames, etc.
  render(){
    return (
      <table role='grid' width='100%' id='box-office-table' className='table table-condensed table-striped'>
        <Head
          handleClick={this.handleClick}
          sortingBy={this.state.sortingBy}
          ascending={this.state.ascending}
        />
        <Body
          list={this.props.list}
          sortingBy={this.state.sortingBy}
          ascending={this.state.ascending}
        />
      </table>
    );
  };
};

export default Table;