import React from 'react';
import PropTypes from "prop-types";

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

class PersonList extends React.Component {
    state = {
      checked: this.props.checkedIndexes,
      persons: []
    };

  handleToggle = persons => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(1);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(persons.Codigo);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  componentDidMount() {
    var config = {
        headers: {  
            'Access-Control-Allow-Origin': '*'
        }, 
        withCredentials : false, 
        Credentials: true 
      };
    //axios.get(`http://red.lindley.pe/fvcdaapi/api/Centro/Listar/3`, config)
    axios.get(`http://192.168.80.254:8080/api/Centro/Listar/3`, config)
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
            <Tooltip
                id="tooltip-top"
                title={"Estado" + persons.Codigo}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
                <Checkbox
                checked={persons.Activo}
                tabIndex={-1}
                onClick={this.handleToggle(1)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                    checked: classes.checked
                }}
                />
            </Tooltip>,
            <Tooltip
              id="tooltip-top"
              title="Edit Task"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="Edit"
                className={classes.tableActionButton}
              >
                <Edit
                  className={
                    classes.tableActionButtonIcon + " " + classes.edit
                  }
                />
              </IconButton>
            </Tooltip>,
            <Tooltip
                id="tooltip-top-start"
                title="Remove"
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