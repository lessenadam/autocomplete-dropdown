import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AutocompleteDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      isDropdownOpen: false,
      dropdownOptionsToShow: props.dropdownOptions,
      highlightedListItem: null,
    };

    this.textInput = React.createRef();
    // This binding is necessary to make `this` work in the callback
    this.updateSearchString = this.updateSearchString.bind(this);
    this.focusOut = this.focusOut.bind(this);
    this.focusIn = this.focusIn.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  keyUp(event) {
    let currentIndex = this.state.highlightedListItem;
    switch (event.keyCode) {
      // 38 is up
      case 38:
        if (this.state.isDropdownOpen === false) {
          this.focusIn();
        } else {
          if (currentIndex === null || currentIndex === 0) {
            currentIndex = this.state.dropdownOptionsToShow.length - 1;
          } else {
            currentIndex -= 1;
          }
          this.setState({ highlightedListItem: currentIndex });
        }
        break;
      // 40 is down
      case 40:
        if (this.state.isDropdownOpen === false) {
          this.focusIn();
        } else {
          if (
            currentIndex === null ||
            currentIndex === this.state.dropdownOptionsToShow.length - 1
          ) {
            currentIndex = 0;
          } else {
            currentIndex += 1;
          }
          this.setState({ highlightedListItem: currentIndex });
        }
        break;
      // 13 is enter
      case 13:
        if (currentIndex !== null) {
          // get the item and set it to the selection
          const option = this.state.dropdownOptionsToShow[currentIndex];
          this.selectOption(option);
        }
        break;
      // esc is 27
      case 27:
        this.setState({ isDropdownOpen: false, highlightedListItem: null });
        break;
      default:
        break;
    }
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
    this.setState({ searchString, highlightedListItem: null });
  }
  focusOut(event) {
    if (
      event.relatedTarget === null ||
      event.relatedTarget.classList.contains(
        'autocomplete-dropdown-list-item'
      ) === false
    ) {
      this.setState({ isDropdownOpen: false, highlightedListItem: null });
    }
  }
  focusIn() {
    this.setState({ isDropdownOpen: true });
  }

  listItemHover(index) {
    this.setState({ highlightedListItem: index });
  }

  selectOption(option) {
    this.setState({
      selection: option,
      searchString: option.name,
      isDropdownOpen: false,
      highlightedListItem: null,
    });
  }

  render() {
    return (
      <div className="autocomplete-dropdown">
        <div className="autocomplete-dropdown-inner-container">
          <input
            className="autocomplete-dropdown-input"
            onBlur={this.focusOut}
            onChange={this.updateSearchString}
            onKeyPress={this.keyPress}
            onKeyUp={this.keyUp}
            onFocus={this.focusIn}
            value={this.state.searchString}
            placeholder="select or enter text..."
            ref={this.textInput}
          />
          {this.state.isDropdownOpen ? (
            <ul className="autocomplete-dropdown-list">
              {this.state.dropdownOptionsToShow.length > 0 ? (
                this.state.dropdownOptionsToShow.map((option, i) => (
                  <li
                    tabIndex="0"
                    onMouseEnter={() => this.listItemHover(i)}
                    onClick={() => this.selectOption(option)}
                    title={option.name}
                    className={`autocomplete-dropdown-list-item ${
                      this.state.highlightedListItem === i
                        ? 'autocomplete-dropdown-list-item--highlighted'
                        : ''
                    }`}
                    key={i}
                  >
                    {option.name}
                  </li>
                ))
              ) : (
                <li className="autocomplete-dropdown-list-item">
                  No matching options
                </li>
              )}
            </ul>
          ) : null}
        </div>
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
