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

Modal.setAppElement("#root");

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = { 
            modalIsOpen : false,
            Idresultado : "",
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
        this.subtitle.style.color = '#d9012e';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render(){
        const { classes, Idresultado } = this.props;
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
                            id={Idresultado}
                            onClick={this.openModal(Idresultado)}
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
                    contentLabel={"Modal de edicion " + Idresultado}
                    >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Hello {Idresultado} </h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>hOLA Mundo</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal> 
            </div>                                     
        );
    }
}



export default withStyles(tasksStyle)(App);