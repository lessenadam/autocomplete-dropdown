import React, { Component } from 'react';

class AutocompleteDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isDropdownOpen: false,
    };

    // This binding is necessary to make `this` work in the callback
    this.updateSearchString = this.updateSearchString.bind(this);
    this.focusOut = this.focusOut.bind(this);
    this.focusIn = this.focusIn.bind(this);
  }

  updateSearchString(event) {
    this.setState({ searchString: event.target.value });
    console.warn('update - this is:', this);
  }
  focusOut(event) {
    console.warn('focusOut - this is:', this);
    this.setState({ isDropdownOpen: false });
  }
  focusIn(event) {
    console.warn('focusIn - this is:', this);
    this.setState({ isDropdownOpen: true });
  }

  render() {
    return (
      <div className="auotcomplete-dropdown-input-container">
        <input
          onBlur={this.focusOut}
          onChange={this.updateSearchString}
          onFocus={this.focusIn}
          value={this.state.searchString}
          placeholder="select..."
        />
        {this.state.isDropdownOpen ? (
          <ul>
            {this.props.dropdownOptions.map((option, i) => (
              <li key={i}>{option.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default AutocompleteDropdown;
