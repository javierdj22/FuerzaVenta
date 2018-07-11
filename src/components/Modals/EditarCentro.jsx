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
import ReactModal from 'react-modal';
import Edit from "@material-ui/icons/Edit";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class App extends React.Component{
    constructor(){
        super();

        this.state = { 
            modalIsOpen : false, 
            clasess : this.props
        };
      
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() 
    {
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
            <IconButton
              aria-label="Edit"                
              className={classes.tableActionButton}
              id={Idresultado}
              onClick={this.openModal}
            >
              <Edit                  
                className={
                    classes.tableActionButtonIcon + " " + classes.edit
                }
              />
            </IconButton>,
            <ReactModal>
                <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
                <button onClick={this.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </ReactModal>
        );
    }
}
App.propTypes = {
  classes: PropTypes.object.isRequired,
  Idresultado: PropTypes.number
};


export default withStyles(customStyles)(App);