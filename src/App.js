import React, { Component } from 'react';
import './App.css';
import DropdownIntroHeader from './DropdownIntroHeader';
import AutocompleteDropdown from './AutocompleteDropdown';

const mockData = {
  products: [
    {
      name: 'American Express Cards (US)',
      url: 'https://www.americanexpress.com',
      type: 'CREDIT_CARD',
    },
    {
      name: 'ADP Retirement Services - 401k (US)',
      url:
        'http://www.adp.com/solutions/employer-services/retirement-services.aspx',
      type: 'INVESTMENT',
    },
    {
      name: 'American Express Bank (Personal Savings) (US) - Bank',
      url: 'https://www.americanexpress.com/?inav=NavLogo',
      type: 'BANK',
    },
  ],
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOptions: [],
    };
  }

  componentDidMount() {
    const dropdownOptions = this.getOptionsForDropdown();
    this.setState({ dropdownOptions });
  }

  getOptionsForDropdown() {
    return mockData.products;
  }

  render() {
    return (
      <div className="App">
        <DropdownIntroHeader />
        <AutocompleteDropdown dropdownOptions={this.state.dropdownOptions} />
      </div>
    );
  }
}

export default App;
