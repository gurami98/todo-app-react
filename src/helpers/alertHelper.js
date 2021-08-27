import store from '../store/store'
import {closeAlert, showAlert} from "../store/actionCreators";

const alertHandler = (alertText, alertType) => {
    store.dispatch(showAlert(alertText, alertType))
    setTimeout(() => {
        store.dispatch(closeAlert())
    }, 3000)
}

export default alertHandler