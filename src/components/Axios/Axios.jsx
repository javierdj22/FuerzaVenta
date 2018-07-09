import React from 'react';

import axios from 'axios';
import Table from "components/Table/Table.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };
export default class PersonList extends React.Component {
  state = {
    persons: []
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
    axios.get(`http://localhost:51238/api/Centro/Listar/3`, config)
    .then(res => { 
        const persons = res.data.Data;
        this.setState({ persons });
        console.log(res);  
    }) 
    .catch(function (error) {
        // handle error 
        console.log(error);    
    })
  } 

  render() { 
    const { classes, tasksIndexes, tasks } = this.props;
    return (
        <Table
            tableHeaderColor="primary"
            tableHead={["Nombre Centro", "Codigo", "Fecha Registro", "Estado", ""]}
            tableData={
            this.state.persons.map(persons =>[persons.Nombre, persons.Codigo, persons.FechaRegistro, 
            <Checkbox
                checked={persons.Activo}
                tabIndex={persons.Codigo}
                //onClick={this.handleToggle(persons.Activo)}
                checkedIcon={<Check className={[persons.Codigo]} />}
                icon={<Check className={[persons.Codigo]} />}
                //classes={{
                //    checked: classes.checked
                //}}
            /> 
            /*
            <Checkbox
              checked={this.state.checked.indexOf(value) !== -1}
              tabIndex={-1}
              onClick={this.handleToggle(value)}
              checkedIcon={<Check className={classes.checkedIcon} />}
              icon={<Check className={classes.uncheckedIcon} />}
              classes={{
                checked: classes.checked
              }}
            />*/
            ])}
        />
    )
  }
}