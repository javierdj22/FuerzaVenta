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

import axios from 'axios';
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
import PersonAdd from "@material-ui/icons/PersonAdd";
import SelectClass from "../../Select/Select";
import ReactFileReader from 'react-file-reader';

import readXlsxFile from 'read-excel-file'
Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            modalIsOpen2 : false,
            Modelo : {
                username : "",
                name : ""},
            clasess : this.props,
            ObjImpExcel : [],
            NombreExcel : "Selectionar Archivo Excel"
        };
      
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.Agregar = this.Agregar.bind(this);
        this.FileUploadChange = this.FileUploadChange.bind(this);  
        this.closeModal2 = this.closeModal2.bind(this);        
    }

    openModal(){
        this.state.NombreExcel = "Selectionar Archivo Excel";
        this.setState({modalIsOpen: true});
    }

    handleChange(event) {
        var obj = {...this.state.Modelo}; // recuperar el Modelo del estado
        
        Object.keys(obj).map((key, index) =>{
            if (event.target.id == key) // 'id' == nombres de las propiedades del Modelo recibido
                obj[key] = event.target.value; 
        });
        this.setState({Modelo: obj});
    }

    FileUploadChange = (files) => {
        const NomExcel = files[0].name;
        this.setState({modalIsOpen2: true});
        readXlsxFile(files[0]).then((rows) => {
            const ImpExcel = rows.filter(p => p["0"] != "% Cumpl.")
            this.setState({
                ObjImpExcel : ImpExcel
                , NombreExcel : NomExcel
            })
        })
    }
    closeModal() {        
        this.setState({modalIsOpen: false});
    }
    closeModal2() {        
        this.setState({modalIsOpen2: false});
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
        const { Modelo, NombreExcel, ObjImpExcel } = this.state;
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
                    onRequestClose={this.closeModal}
                    style={tasksStyle}
                    contentLabel={"Modal de edicion "}
                    >   
                    <Grid container> 
                        <GridItem xs={12} sm={12} md={12}>
                            <Card plain>
                                <CardHeader plain color="primary">
                                    <div className={classes.cardTitleWhite}>Agregar Still : </div>
                                </CardHeader>
                                <CardBody>   
                                    <Grid container>       
                                        <GridItem xs={12} sm={12} md={12}>         
                                            <div className={classes.SelectModal}>
                                                <SelectClass
                                                    labelText="Tipo Documento"
                                                />
                                            </div>  
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}> 
                                            <div className={classes.SelectModal}>
                                                <ReactFileReader fileTypes={[".xls",".xlsx"]} base64={false} multipleFiles={false} handleFiles={this.FileUploadChange}>
                                                    <Button className={classes.uploadbuton}>Cargar Excel</Button>
                                                </ReactFileReader> 
                                            </div>     
                                        </GridItem>           
                                        <GridItem xs={8} sm={8} md={8}> 
                                            <div className={classes.TextExcel}>    
                                                <h4 className={classes.cardTitle}>{NombreExcel}</h4> 
                                            </div>     
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12}> 
                                            <Modal
                                                isOpen={this.state.modalIsOpen2}
                                                onRequestClose={this.closeModal2}
                                                style={tasksStyle}
                                                contentLabel={"Modal de edicion "}
                                                >   
                                                <Card>
                                                    <CardHeader plain color="primary">
                                                        <div className={classes.cardTitleWhite}>Validar Data de Excel : {NombreExcel} </div>
                                                    </CardHeader>
                                                    <CardBody>   
                                                        <Table
                                                            tableHeaderColor="primary"
                                                            tableHead={["% Cumpl.", "% Variab. Vol", "% Variab. RED"]}
                                                            tableData={
                                                            this.state.ObjImpExcel.map(p =>[p[0], p[1], p[2]])}
                                                        />
                                                    </CardBody>
                                                    <CardFooter>
                                                        <GridItem xs={3} sm={3} md={3}> 
                                                            <Button                                        
                                                                color="danger"
                                                                onClick={this.closeModal2}
                                                            >
                                                                Data Ok
                                                            </Button>                                        
                                                        </GridItem>
                                                    </CardFooter>
                                                </Card>
                                            </Modal> 
                                        </GridItem> 
                                    </Grid>     
                                    <Table
                                        tableHeaderColor="primary"
                                        tableHead={["Red", "Fijo", "Ejecución", "Aguas", "Still s/aguas", "Imperdonables"]}
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
                                                labelText="Aguas"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Still s/aguas"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Imperdonables"
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
                                                labelText="Aguas"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Still s/aguas"
                                                inputProps={{
                                                    // value : "" + Modelo.latitud,
                                                    onChange : this.handleChange
                                                }}
                                                formControlProps={{
                                                    className: classes.formControlInp
                                                }}
                                            />,
                                            <CustomInput
                                                labelText="Imperdonables"
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