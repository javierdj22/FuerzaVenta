import React from "react";
import ReactDOM from 'react-dom';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import IconButton from "@material-ui/core/IconButton";
import Modal from 'react-modal';
import Edit from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx"; 
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import SelectClass from "../../Select/Select";

Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            objCentro : {},
            Modelo : {},
            isChecked: true,
            clasess : this.props
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Editar = this.Editar.bind(this);
    }

    openModal = recibe => () =>
    {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#d9012e';
        const {objCentro} = this.props;
        
        this.setState({Modelo : objCentro})
    }

    
    handleChange(event) {

        var obj = {...this.state.Modelo}; // recuperar el Modelo del estado
        
        Object.keys(obj).map((key, index) =>{
            if (event.target.id == key) // 'id' == nombres de las propiedades del Modelo recibido
                obj[key] = event.target.value; 
        });

        this.setState({Modelo: obj});
      }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    Editar(event){
        event.preventDefault();
        var id = this.state.Modelo.id;
        var name = this.state.Modelo.name;
        var username = this.state.Modelo.username;
        //var username = this.state.Modelo.username;
        //var username = this.state.Modelo.username;
        //var username = this.state.Modelo.username;
        //this.ObjReturn ={ username, name, id };

        this.props.parentFlatList.EditRegistro(this.state.Modelo);

        this.setState({modalIsOpen: false});
    }
    toggleChange = () => {
      this.setState({
        isChecked: !this.state.isChecked,
      });
    }

    render(){
        const { classes, objCentro } = this.props;
        const { Modelo } = this.state;
        return (
            <div>
                <Tooltip
                    id="tooltip-top"
                    title="Editar"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    >             
                        <IconButton
                            aria-label="Edit"                
                            className={classes.tableActionButton}
                            id={objCentro}
                            key={objCentro.id}
                            onClick={this.openModal(objCentro)}
                            >
                            <Edit                  
                                className={
                                    classes.tableActionButtonIcon + " " + classes.edit
                                }
                            />
                        </IconButton>                    
                </Tooltip>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={tasksStyle}
                    contentLabel={"Modal de edicion " + objCentro}
                    >
                    <Grid container> 
                        <GridItem xs={12} sm={12} md={12}>
                            <Card plain>
                                <CardHeader plain color="primary">
                                    <div className={classes.cardTitleWhite}>Modificar Centro : </div>
                                </CardHeader>
                                <CardBody> 
                                    <Grid container> 
                                        <GridItem xs={6} sm={6} md={6}>                                            
                                            <CustomInput
                                                labelText="Nombre 1"
                                                id="username"
                                                inputProps={{
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    value : "" + Modelo.username,
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Nombre 2"
                                                id="name"
                                                inputProps={{
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>                                            
                                            <CustomInput
                                                labelText="Apellido Paterno"
                                                id="username"
                                                inputProps={{
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    value : "" + Modelo.username,
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Apellido Materno"
                                                id="name"
                                                inputProps={{
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div className={classes.SelectModal}>
                                                <SelectClass
                                                    labelText="Tipo Documento"
                                                />
                                            </div>            
                                        </GridItem>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div className={classes.SelectModal}>
                                                <SelectClass />
                                            </div>            
                                        </GridItem>
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div className={classes.SelectModal}>
                                                <SelectClass
                                                    labelText="Tipo Documento"
                                                />
                                            </div>            
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Numero Documento"
                                                inputProps={{
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={2} sm={2} md={2} />
                                        <GridItem xs={4} sm={4} md={4}>
                                            <div className={classes.CheckSpace}>
                                                <label>
                                                    Activo :
                                                    <Checkbox                                                    
                                                        checkedIcon={<Check className={classes.checkedIcon} />}
                                                        icon={<Check className={classes.uncheckedIcon} />}
                                                        classes={{checked: classes.checked}}
                                                    />
                                                </label>    
                                            </div>                                        
                                        </GridItem>
                                    </Grid>            
                                </CardBody>
                                <CardFooter>
                                    <GridItem xs={6} sm={6} md={6} />        
                                    <GridItem xs={3} sm={3} md={3}> 
                                        <Button                                   
                                            color="primary"
                                            onClick={this.Editar}
                                        >
                                            Aceptar
                                        </Button>                                           
                                    </GridItem>
                                    <GridItem xs={3} sm={3} md={3}> 
                                        <Button                                        
                                            color="danger"
                                            onClick={this.closeModal}
                                        >
                                            Cancelar
                                        </Button>                                        
                                    </GridItem>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    </Grid>                    
                </Modal> 
            </div>                                     
        );
    }
}



export default withStyles(tasksStyle)(App);