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

Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            objCentro : null,
            clasess : this.props
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal = recibe => () =>
    {
        console.log(recibe)
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#d9012e';
        
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){
        const { classes, objCentro } = this.props;
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
                                    <p className={classes.cardTitleWhite}>Modificar Centro : </p>
                                </CardHeader>
                                <CardBody> 
                                    <Grid container> 
                                        <GridItem xs={4} sm={4} md={4}>                                            
                                            <CustomInput
                                                labelText="Codigo"
                                                id="codigo"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={8} sm={8} md={8}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="nombre"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md={6}>
                                            <CustomInput
                                                labelText="Nombre"
                                                id="nombre"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                            />
                                        </GridItem>
                                    </Grid>            
                                </CardBody>
                                <CardFooter>
                                    <Button                                        
                                        color="danger"
                                        onClick={this.closeModal}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button                                        
                                        color="primary"
                                        onClick={this.closeModal}
                                    >
                                        Aceptar
                                    </Button>
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