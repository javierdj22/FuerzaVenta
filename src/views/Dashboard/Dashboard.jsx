import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import ContentCopy from "@material-ui/icons/ContentCopy";
import Store from "@material-ui/icons/Store";
import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general";

/* Modal Componentes*/ 
import Modal from 'react-modal';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import tasksStyle from "assets/jss/material-dashboard-react/components/tasksStyle.jsx";

// core 
import Button from "components/CustomButtons/Button.jsx";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import SelectClass from 'components/Select/Select';
import AppRes from "components/app";


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsOpen : true,
      Modelo : {
          username : "",
          name : ""},
      ObjSelect : {
          Nombre : "Centros",
          Id : 1},
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 

  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChange(event) {

    var obj = {...this.state.Modelo}; // recuperar el Modelo del estado
    
    Object.keys(obj).map((key, index) =>{
        if (event.target.id == key) // 'id' == nombres de las propiedades del Modelo recibido
            obj[key] = event.target.value; 
    });

    this.setState({Modelo: obj});
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  openModal(){
      this.setState({modalIsOpen: true});
  }

  closeModal() {
      this.setState({modalIsOpen: false});
  }
  render() {
    const { ObjSelect } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={tasksStyle}
            contentLabel={"Modal de edicion "}
            >   
            <Grid container> 
                <GridItem xs={12} sm={12} md={12}>
                    <Card plain>
                        <CardHeader plain color="primary">
                            <div className={classes.cardTitleWhite}>Ingresar Aplicativo Fuerza de Venta</div>
                        </CardHeader>
                        <CardBody> 
                            <Grid container> 
                                <GridItem xs={12} sm={12} md={12}>                                            
                                  <div className={classes.SelectMenu}>
                                      <SelectClass SelectObj={ObjSelect}/>
                                  </div>
                                </GridItem>
                                <GridItem xs={8} sm={8} md={8}>
                                  <AppRes/>
                                </GridItem>
                                <GridItem xs={6} sm={6} md={6}>
                                    <CustomInput
                                        labelText="Logitud"
                                        id="logitud"
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
                                        labelText="Latitud"
                                        id="latitud"
                                        inputProps={{
                                            onChange : this.handleChange
                                        }}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={4} sm={4} md={4}>
                                    <label>
                                        Activo :
                                        <Checkbox                                                    
                                            checkedIcon={<Check className={classes.checkedIcon} />}
                                            icon={<Check className={classes.uncheckedIcon} />}
                                            classes={{checked: classes.checked}}
                                        />
                                    </label>                                            
                                </GridItem>
                            </Grid>            
                        </CardBody>
                        <CardFooter>
                            <GridItem xs={8} sm={8} md={8}>                                           
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}> 
                                <Button              
                                    Types="Submit"                          
                                    color="primary"
                                    onClick={this.Agregar}
                                >
                                    Aceptar
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
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <ContentCopy />
                </CardIcon>
                <p className={classes.cardCategory}>Used Space</p>
                <h3 className={classes.cardTitle}>
                  49/50 <small>GB</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    Get more space
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Store />
                </CardIcon>
                <p className={classes.cardCategory}>Revenue</p>
                <h3 className={classes.cardTitle}>$34,245</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 24 Hours
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <InfoOutline />
                </CardIcon>
                <p className={classes.cardCategory}>Fixed Issues</p>
                <h3 className={classes.cardTitle}>75</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Tracked from Github
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Followers</p>
                <h3 className={classes.cardTitle}>+215</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                <p className={classes.cardCategoryWhite}>
                  New employees on 15th September, 2016
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor="warning"
                  tableHead={["ID", "Name", "Salary", "Country"]}
                  tableData={[
                    ["1", "Dakota Rice", "$36,738", "Niger"],
                    ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                    ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                    ["4", "Philip Chaney", "$38,735", "Korea, South"]
                  ]}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
