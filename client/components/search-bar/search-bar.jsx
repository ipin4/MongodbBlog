import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import styles from './search-bar.styles';

export default class SearchBar extends Component {
  state = {value: ''};

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      const {filterBy} = this.props.location.state;
      this.setState({value: filterBy});
    }
  }

  changeValue = (ev) => {
    this.setState({
      value: ev.target.value,
    });
  }

  render() {
    return <div className={styles.searchContainer}>
      <input onKeyDown={this.onKeyPressed} onChange={this.changeValue} value={this.state.value} type="text"/>
      <Link to={{
        pathname: '/notes/search',
        search: `sort=${this.state.value}`,
        state: {filterBy: this.state.value},
      }}>
        <button className={styles.inverseButton}>Find</button>
      </Link>
      <Link to={'/notes'}>
        <button onClick={() => this.setState({value: ''})}>Clear Filter</button>
      </Link>
    </div>;
  }
}

