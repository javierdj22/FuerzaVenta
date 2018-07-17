import React, {Component} from 'react'
import PropTypes from "prop-types";

import axios from 'axios';
import Table from "components/Table/Table.jsx";

import Checkbox from "@material-ui/core/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import EditarModal from "components/Modals/EditarCentro.jsx";
import EliminarModal from "components/Modals/EliminarCentro.jsx";

import Input from "@material-ui/core/Input";
import Check from "@material-ui/icons/Check";

import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import SearchInput, {createFilter} from 'react-search-input'
import Button from "components/CustomButtons/Button.jsx";
import AgregarCentro  from '../Modals/AgregarCentro';
import SelectClass from '../Search/Search';

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

  AddCentros(ObjReturn){
      var name = ObjReturn.username;
      var username = ObjReturn.username;
      var email = ObjReturn.username;
      this.setState({
          persons: this.state.persons.concat({name, username, email})
      })
  }

  EditCentros(ObjReturn){
      var name = ObjReturn.username;
      var username = ObjReturn.username;
      var email = ObjReturn.username;
      this.setState({
          persons: this.state.persons.concat({name, username, email})
      })
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
                <SelectClass/> 
            </GridItem>
            <GridItem xs={1} sm={1} md={1}>
                <AgregarCentro parentFlatList={this} />
            </GridItem>
        </Grid>   
        <Table
            tableHeaderColor="primary"
            tableHead={["Nombre Centro", "Codigo", "Fecha Registro", "Estado", "", ""]}
            tableData={
            filteredEmails.map(persons =>[persons.name, persons.username, persons.email
            ,<Tooltip
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
            </Tooltip>,
            <EditarModal objCentro={persons} parentFlatList={this} />,
            <EliminarModal objCentro={persons} />
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