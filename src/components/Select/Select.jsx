import React from 'react';
import ReactDOM from 'react-dom';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';

import PRODUCTS from 'components/Axios/Axios1.jsx';


class SelectClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
 
    this.state = { 
      SelectObj : {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({value: selectedOption});
  }
  render() {
    const { SelectObj } = this.props;
  	const { selectedOption } = this.state;
  	const value = selectedOption && selectedOption.value;
 
    
    const SelectOption = () => (
      <Select 
        >
        {PRODUCTS.map((product) => {
          if (product.gender === "women") {
            return(
              <Option value={""+product.name+""}>{product.name}</Option>
            )
          }
        })}
      </Select>
    )
    return ( <div> <Select /> </div> );
  }
}
export default SelectClass