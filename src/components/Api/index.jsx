const URL = 'http://red.lindley.pe/FuerzaVentaAPI/api/Centro/Combobox'
export default () => {
    return fetch(URL)
        .then(Response => Promise.all([Response, Response.json()]))
}