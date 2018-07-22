import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutocompleteDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isDropdownOpen: false,
      dropdownOptionsToShow: props.dropdownOptions,
    };

    // This binding is necessary to make `this` work in the callback
    this.updateSearchString = this.updateSearchString.bind(this);
    this.focusOut = this.focusOut.bind(this);
    this.focusIn = this.focusIn.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.dropdownOptions !== prevProps.dropdownOptions) {
      this.updateDropdownOptions(this.state.searchString);
    }
  }

  updateDropdownOptions(filterString) {
    let dropdownOptionsToShow;
    if (filterString.length > 0) {
      dropdownOptionsToShow = this.props.dropdownOptions.filter((option) =>
        option.name.toLowerCase().includes(filterString.toLowerCase())
      );
    } else {
      dropdownOptionsToShow = this.props.dropdownOptions;
    }
    this.setState({ dropdownOptionsToShow });
  }

  updateSearchString(event) {
    const searchString = event.target.value;
    this.updateDropdownOptions(searchString);
    this.setState({ searchString });
  }
  focusOut() {
    this.setState({ isDropdownOpen: false });
  }
  focusIn() {
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
        {true ? (
          <ul>
            {this.state.dropdownOptionsToShow.map((option, i) => (
              <li key={i}>{option.name}</li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default AutocompleteDropdown;

AutocompleteDropdown.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  dropdownOptions: PropTypes.array,
};
