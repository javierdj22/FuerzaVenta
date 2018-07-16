import React from 'react';
import ReactDOM from 'react-dom';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

class SelectClass extends React.Component {
  state = {
    _selectedOption: 'Seleccionar Centro.',
    get selectedOption() {
      return this._selectedOption;
    },
    set selectedOption(value) {
      this._selectedOption = value;
    },
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    selectedOption.value = selectedOption;
    console.log(`Selected: ${selectedOption.label}`);
  }
  render() {
  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
 
    return (
      <Select 
          onChange={this.onChange}
          onSelect={this.onSelect}
          onInputKeyDown={this.onKeyDown}
          notFoundContent=""
          allowClear
          placeholder="please select"
          value={value}
          combobox
          backfill
        >
          <Option value="jack">
            <b style={{ color: 'red' }}>jack</b>
          </Option>
          <Option value="lucy">lucy</Option>
          <Option value="disabled" disabled>disabled</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
    );
  }
}
export default SelectClass