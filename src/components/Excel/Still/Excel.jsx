import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Excel from "assets/img/ExcelIcon.png";
import axios from 'axios';
import Workbook from 'react-excel-workbook'

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            objCentro : {},
            clasess : this.props
        };
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
    render(){
        const { classes, objCentro, Add } = this.props;
        const { Modelo, persons } = this.state;
        var ClassExcel = null;
        var ListExcel = [];
        if (Add == true){
            ClassExcel  =   <Tooltip
                            id="tooltip-top"
                            title={"Plantilla Excel"}
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            >   
                                <Button color="white" aria-label="Agregar" justIcon round className={classes.agregar}>
                                    <img src={Excel} alt="Plantilla Excel" height="18" className={classes.img} />
                                </Button>
                            </Tooltip>
        }else{
            ListExcel   =   persons
            ClassExcel  =   <Tooltip
                            id="tooltip-top"
                            title={"Descargar Excel - "+ objCentro.name}
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                            >                 
                                <IconButton aria-label="Edit" className={classes.tableActionButton}>
                                    <img src={Excel} alt={"Descargar Excel - "+ objCentro.name} height="18" className={classes.img} />
                                </IconButton>
                            </Tooltip>
        }         
        return (       
            <Workbook filename="PlantillaTradicional.xlsx" element={ClassExcel}>
                <Workbook.Sheet data={ListExcel} name="Hoja1">
                    <Workbook.Column label="% Cumpl."      value="name"  />
                    <Workbook.Column label="% Variab. Vol" value="name"  />
                    <Workbook.Column label="% Variab. RED" value="name"  />
                </Workbook.Sheet>
            </Workbook>                           
        );
    }
}
export default withStyles(tasksStyle)(App);