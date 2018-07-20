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
import Close from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";
import tasksStyle from "assets/jss/material-dashboard-react/components/ConfirnsStyle.jsx";

import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Button from "components/CustomButtons/Button.jsx";
import logo from "assets/img/warning-icon.png";

Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            objCentro : {},
            Modelo : {},
            clasess : this.props
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Eliminar = this.Eliminar.bind(this);
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
    
    Eliminar(event){
        event.preventDefault(); 
        this.props.parentFlatList.EliminarRegistro(this.state.Modelo);

        this.setState({modalIsOpen: false});
    }
    render(){
        const { classes, objCentro } = this.props;
        const { Modelo } = this.state;
        return (
            <div>
                <Tooltip
                    id="tooltip-top"
                    title="Eliminar"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    >             
                        <IconButton
                            aria-label="Close"                
                            className={classes.tableActionButton}
                            id={objCentro}
                            onClick={this.openModal(objCentro)}
                            >
                            <Close                  
                                className={
                                    classes.tableActionButtonIcon + " " + classes.close
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
                                    <div className={classes.cardTitleWhite}>Confirmar Eliminar Tradicional : </div>
                                </CardHeader>
                                <CardBody> 
                                    <Grid container> 
                                        <GridItem xs={4} sm={4} md={4}>        
                                            <img src={logo} alt="logo" className={classes.img} />
                                        </GridItem>
                                        <GridItem xs={8} sm={8} md={8}>       
                                            <div>Favor confirmar si decea Eliminar el siguiente Registro <strong> {objCentro.name} </strong> del Maestro de Centros</div>                                    
                                        </GridItem>
                                    </Grid>            
                                </CardBody>
                                <CardFooter>
                                        <GridItem xs={3} sm={3} md={3}>                                  
                                        </GridItem> 
                                        <GridItem xs={9} sm={9} md={9}>   
                                        <Button                                        
                                            color="primary"
                                            onClick={this.Eliminar}
                                            key={objCentro.id}
                                        >
                                            Confirmar
                                        </Button>  
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