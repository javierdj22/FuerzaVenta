import axios from 'axios'

export const SHOW_USERS = 'SHOW_USERS'

export function showUsers() {
  const Usert = [
   { id: 1 , name : "javier"},
   { id: 2 , name : "javier2"}
  ]
  return { type: SHOW_USERS, payload: Usert }
    //return (dispatch, getState) => {
    //    axios.get('http://jsonplaceholder.typicode.com/users')
    //        .then((response) => {
    //            dispatch( { type: SHOW_USERS, payload: response.data } ) 
    //        }) 
    //}
    
}