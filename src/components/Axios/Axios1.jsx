import React, {Component} from 'react'
import PropTypes from "prop-types";
import axios from 'axios';

class ExportData extends React.Component{  
    constructor (props) {
      super(props)
      this.state = {
        persons: []
      }
    } 
    componentDidMount() {
      var config = {
          headers: {  
              'Access-Control-Allow-Origin': '*'
          }, 
          withCredentials : false, 
          Credentials: true 
        };
      //axios.get(`http://red.lindley.pe/fvcdaapi/api/Centro/Listar/3`, config)
      //axios.get(`http://192.168.80.254:8080/api/Centro/Listar/3`, config)
      axios.get('https://jsonplaceholder.typicode.com/users', config)
      .then(res => { 
          const persons = res.data;//.Data;
          this.setState({ persons });
      })  
      .catch(function (error) {
          // handle error 
          console.log(error);    
      })
    } 
    render(){
        return this.state.persons
    }
}

ExportData.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  ExportData: PropTypes.arrayOf(PropTypes.node)
};

export default (ExportData);