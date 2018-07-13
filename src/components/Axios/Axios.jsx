import React from 'react';
import PropTypes from "prop-types";

import axios from 'axios';
import Table from "components/Table/Table.jsx";

import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import EditarModal from "components/Modals/EditarCentro.jsx";

import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import EditarCentro from '../Modals/EditarCentro';

class PersonList extends React.Component {
    state = {
    //   checked: this.props.checkedIndexes,
      persons: []
    };
 
//   handleToggle = persons => () => {
//     const { checked } = this.state;
//     const currentIndex = checked.indexOf(1);
//     const newChecked = [...checked];

//     if (currentIndex === -1) {
//       newChecked.push(persons.Codigo);
//     } else {
//       newChecked.splice(currentIndex, 1);
//     }

//     this.setState({
//       checked: newChecked
//     });
//   };

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

  handleClick = persons => () => {
    console.log('this is:', persons.id + ' ' + persons.id);
    
  }

  render() { 
    const { classes } = this.props;
    return (
      
        <Table
            tableHeaderColor="primary"
<<<<<<< HEAD
            tableHead={["Nombre Centro", "Codigo", "Fecha Registro"]}
=======
            tableHead={["Nombre Centro", "Codigo", "Fecha Registro", "Estado", "", ""]}
>>>>>>> 399c59fe3cd2760d539b925921155964cd757acb
            tableData={
            this.state.persons.map(persons =>[persons.id, persons.username, persons.username
            ,<Tooltip
                id="tooltip-top"
                title={"Estado" + persons.username}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
                <Checkbox
                checked={"0"}
                //tabIndex={-1}
                // onClick={this.handleToggle(1)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                    checked: classes.checked
                }}
                />
<<<<<<< HEAD
            </Tooltip>
            ,<EditarModal Idresultado={persons.id} />
            ,<Tooltip
=======
            </Tooltip>,
            <EditarModal Idresultado={persons.id} />,
            <Tooltip
>>>>>>> 399c59fe3cd2760d539b925921155964cd757acb
                id="tooltip-top-start"
                title="Eliminar"
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
                <IconButton
                aria-label="Close"
                className={classes.tableActionButton}
                >
                <Close
                    className={
                    classes.tableActionButtonIcon + " " + classes.close
                    }
                />
                </IconButton>
            </Tooltip>
            
            ])}
        />
    )
  }
}
PersonList.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  PersonList: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(PersonList);