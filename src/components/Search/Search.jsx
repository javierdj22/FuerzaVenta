import React from 'react';
import ReactDOM from 'react-dom';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

class SelectClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(selectedOption) {
    this.setState({value: selectedOption});
  }
  render() {
  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
 
    return (
      <Select 
      value={this.state.value}
          onChange={this.handleChange}
          onSelect={this.onSelect}
          onInputKeyDown={this.onKeyDown}
          notFoundContent=""
          allowClear
          placeholder="please select"
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