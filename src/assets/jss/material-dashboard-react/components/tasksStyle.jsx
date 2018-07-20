import {
  defaultFont,
  primaryColor,
  dangerColor
} from "assets/jss/material-dashboard-react.jsx";
import tooltipStyle from "assets/jss/material-dashboard-react/tooltipStyle.jsx";
import checkboxAdnRadioStyle from "assets/jss/material-dashboard-react/checkboxAdnRadioStyle.jsx";
const tasksStyle = {
  ...tooltipStyle,
  ...checkboxAdnRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    borderBottom: "1px solid #dddddd"
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle"
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    verticalAlign: "middle",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px"
  },
  tableActionButton: {
    width: "27px",
    height: "27px"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor,
    boxShadow: "none"
  },
  agregar: {
    borderRadius: "30px",
    backgroundColor: primaryColor,
    color: "#ffffff",
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor,
    boxShadow: "none"
  },
  overlay : {
    zIndex : 11,
    backgroundColor : 'rgba(000, 000, 000, 0.75)',
  },
  ModalGrid: { 
    textAlign: "right",
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    padding               : '0px',
    transform             : 'translate(-50%, -50%)',
  },
  CheckSpace:{ 
    padding               : '30px 0px 0px 0px',
  },
  SelectMenu:{
    padding               : '15px 0px 0px 0px',
  },
  SelectModal:{
    padding               : '25px 0px 0px 0px',
  },
};
export default tasksStyle;
