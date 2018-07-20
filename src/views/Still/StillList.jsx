import React, {Component} from 'react'
import PropTypes from "prop-types";

import axios from 'axios';
import Table from "components/Table/Table.jsx";

import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

// components

import ExcelModal    from "components/Excel/Tradicional/Excel";
import EditarModal   from "components/Modals/Tradicional/Editar";
import EliminarModal from "components/Modals/Tradicional/Eliminar";
import AgregarModal  from 'components/Modals/Tradicional/Agregar';


import GridItem from "components/Grid/GridItem.jsx";
import SelectClass from 'components/Select/Select'; 

// core 
import Button from "components/CustomButtons/Button.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import SearchInput, {createFilter} from 'react-search-input'
import update from 'immutability-helper';
import Excel from "assets/img/ExcelIcon.png";

const KEYS_TO_FILTERS = ['name', 'username', 'id']

class PersonList extends Component {
    constructor (props) {
      super(props)
      this.state = {
        searchTerm: '',
        persons: []
      }
      this.searchUpdated = this.searchUpdated.bind(this)
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

  handleClick = persons => () => {
    console.log('this is:', persons.id + ' ' + persons.id);
    
  }

  AddRegistro(ObjReturn){
      var name = ObjReturn.username;
      var username = ObjReturn.username;
      var email = ObjReturn.username;
      this.setState({
          persons: this.state.persons.concat({name, username, email})
      })
  }

  EditRegistro(ObjReturn){     

    const index = this.state.persons.findIndex((emp) => emp.id === ObjReturn.id);
    const person = update(this.state.persons, {$splice: [[index, 1, ObjReturn]]}); 
    this.setState({persons: person});

  }

  EliminarRegistro(ObjReturn){
    this.setState({persons: this.state.persons.filter(function(persons) { 
        return persons !== ObjReturn
    })});
  }
  
  render() { 
    const filteredEmails = this.state.persons.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
    const { classes } = this.props;
    return (
      
    <div>
        <Grid container> 
            <GridItem xs={7} sm={7} md={7}>
                <SearchInput 
                classes={{
                root: classes.marginTop,
                disabled: classes.disabled,
                underline: classes.underlineClasses
                }} onChange={this.searchUpdated} />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} >
                <div className={classes.SelectMenu}>
                    <SelectClass />
                </div>     
            </GridItem>
            <GridItem xs={0} sm={0} md={0}>
                <Tooltip
                    id="tooltip-top"
                    title="Plantilla Excel"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    >       
                        <Button color="white" aria-label="edit" justIcon round className={classes.agregar}>
                                <img src={Excel} alt="Plantilla Excel" height="18" className={classes.img} />
                        </Button>                        
                </Tooltip>
            </GridItem>
            <GridItem xs={0} sm={0} md={0}>
                <AgregarModal parentFlatList={this} />
            </GridItem>
        </Grid>   
        <Table
            tableHeaderColor="primary"
            tableHead={["Figura", "ID", "Archivo", "FechaReg.", "Activo", ""]}
            tableData={
            filteredEmails.map(persons =>[persons.name, persons.id, persons.username, persons.phone,
            <Tooltip
                id="tooltip-top"
                title={persons.username}
                placement="top"
                classes={{ tooltip: classes.tooltip }}
            >
                <Checkbox
                checked={false}
                //tabIndex={-1}
                // onClick={this.handleToggle(1)}
                checkedIcon={<Check className={classes.checkedIcon} />}
                icon={<Check className={classes.uncheckedIcon} />}
                classes={{
                    checked: classes.checked
                }}
                />
            </Tooltip> ,
            <ExcelModal objCentro={persons} parentFlatList={this} />,
            <EditarModal objCentro={persons} parentFlatList={this} />,
            <EliminarModal objCentro={persons} parentFlatList={this} 
            key={persons.id} />
            ])}
        />
    </div>
    )
  }
  searchUpdated (term) {
    this.setState({searchTerm: term})
  }
}
PersonList.propTypes = {
  classes: PropTypes.object.isRequired,
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  PersonList: PropTypes.arrayOf(PropTypes.node)
};

export default withStyles(tasksStyle)(PersonList);