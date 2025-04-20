import {MODEL_EVENTS} from "../Config/Model";

class UserObserver {


    static booting =  (model) => {
        console.log('Booting observed model')
        console.log(model)
    }
    static booted = (model) => {
        console.log('Booted observed model')
        console.log(model)
    }
}

export default UserObserver