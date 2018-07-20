import React from "react";
import ReactDOM from 'react-dom';
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Modal from 'react-modal';
import Tooltip from "@material-ui/core/Tooltip";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import Table from "components/Table/Table.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import PersonAdd from "@material-ui/icons/PersonAdd";
import SelectClass from "../../Select/Select";

Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            Modelo : {
                username : "",
                name : ""},
            clasess : this.props
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Agregar = this.Agregar.bind(this);
        this.ObjReturn = {};
        
    }

    openModal(){
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#d9012e';
        
        
        //this.setState({Modelo : Obj})
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

    Agregar(event){
        event.preventDefault();
        var username = this.state.Modelo.username;
        this.ObjReturn ={ username };

        this.props.parentFlatList.AddRegistro(this.ObjReturn);

        this.setState({modalIsOpen: false});
    }

    render(){
        const { classes } = this.props;
        const { Modelo } = this.state;
        const { ObjReturn } = this.ObjReturn;
        return (
            <div>
                <Tooltip
                    id="tooltip-top"
                    title="Agregar"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                    >       
                        <Button color="white" aria-label="edit" justIcon round className={classes.agregar}
                                onClick={this.openModal}>
                                <PersonAdd />
                        </Button>                        
                </Tooltip>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={tasksStyle}
                    >   
                    <Grid container> 
                        <GridItem xs={12} sm={12} md={12}>
                            <Card plain>
                                <CardHeader plain color="primary">
                                    <div className={classes.cardTitleWhite}>Agregar Tradicional : </div>
                                </CardHeader>
                                <CardBody>   
                                    <Grid> 
                                        <GridItem xs={12} sm={12} md={12}>         
                                            <div className={classes.SelectModal}>
                                                <SelectClass
                                                    labelText="Tipo Documento"
                                                />
                                            </div>  
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}> 
                                            <div className={classes.SelectModal}>
                                                <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
                                            </div>  
                                        </GridItem>
                                    </Grid>  
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["Red", "Fijo", "Vol Imp", "Vol Tot", "Cob Imp", "Ejecución", "Altas / Foco"]}
                                        tableData={[
                                            ["Si",
                                            <CustomInput
                                                labelText="Fijo"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange,
                                                }} 
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Vol Imp"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Vol Tot"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Cob Imp"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Ejecución"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Altas / Foco"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />],
                                            ["No",
                                            <CustomInput
                                                labelText="Fijo"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange,
                                                }} 
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Vol Imp"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Vol Tot"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Cob Imp"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Ejecución"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Altas / Foco"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />]
                                        ]}
                                    />          
                                </CardBody>
                                <CardFooter>
                                    <GridItem xs={6} sm={6} md={6} />        
                                    <GridItem xs={3} sm={3} md={3}> 
                                        <Button                                   
                                            color="primary"
                                            onClick={this.Agregar}
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



export default withStyles(tasksStyle)(App, this.ObjReturn);