import React, {Component} from 'react'
import PropTypes from "prop-types";

import axios from 'axios';
import Table from "components/Table/Table.jsx";

import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

// components
import EditarModal   from "components/Modals/Centro/Editar";
import EliminarModal from "components/Modals/Centro/Eliminar";
import AgregarCentro from 'components/Modals/Centro/Agregar';

import GridItem from "components/Grid/GridItem.jsx";
import SelectClass from 'components/Select/Select';
import PRODUCTS from 'components/Axios/Axios1.jsx';


// core 
import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Check from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";
import SearchInput, {createFilter} from 'react-search-input'
import update from 'immutability-helper';
const KEYS_TO_FILTERS = ['Nombre', 'Codigo', 'FechaRegistro']
class PersonList extends Component {
    constructor (props) {
      super(props)
      this.state = {
        searchTerm: '',
        persons: []
      }
      this.searchUpdated = this.searchUpdated.bind(this);
    } 

  componentDidMount() {
    var config = {
        headers: {  
            'Access-Control-Allow-Origin': '*'
        }, 
        withCredentials : false, 
        Credentials: true 
      };
    axios.get(`http://red.lindley.pe/FuerzaVentaAPI/api/Centro/Listar/3`, config)
    //axios.get(`http://192.168.80.254:8080/api/Centro/Listar/3`, config)
    //axios.get('https://jsonplaceholder.typicode.com/users', config)
    .then(res => { 
        const persons = res.data.Data;
        this.setState({ persons });
    })  
    .catch(function (error) {
        // handle error 
        console.log(error);    
    })
  } 

  handleClick = persons => () => {
    console.log('this is:', persons.IdCentro + ' ' + persons.IdCentro);
    
  }

  AddRegistro(ObjReturn){
      var Nombre = ObjReturn.Nombre;
      var username = ObjReturn.username;
      var email = ObjReturn.username;
      this.setState({
          persons: this.state.persons.concat({Nombre, username, email})
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
            <GridItem xs={8} sm={8} md={8}>
                <SearchInput 
                classes={{
                root: classes.marginTop,
                disabled: classes.disabled,
                underline: classes.underlineClasses
                }} onChange={this.searchUpdated} />
            </GridItem>
            <GridItem xs={3} sm={3} md={3} >
                {/* <div className={classes.SelectMenu}>
                    <SelectClass />
                </div>      */}
            </GridItem>
            <GridItem xs={1} sm={1} md={1}>
                <AgregarCentro parentFlatList={this} />
            </GridItem>
        </Grid>   
        <Table
            tableHeaderColor="primary"
            tableHead={["Nombre Centro", "Codigo", "Fecha Registro", "Activo", ""]}
            tableData={
            filteredEmails.map(persons =>[persons.Nombre, persons.Codigo, persons.FechaRegistro,
                <Tooltip
                    id="tooltip-top"
                    title={"Estado " + persons.Nombre}
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                >
                    <Checkbox
                    checked={persons.Activo}
                    //tabIndex={-1}
                    // onClick={this.handleToggle(1)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                        checked: classes.checked
                    }}
                    />
                </Tooltip> ,
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