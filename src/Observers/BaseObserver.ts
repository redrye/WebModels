class BaseObserver {
    constructor() {

    }

    booting(model) {
        console.log('Booting observed model')
    }

    booted(model) {
        console.log('Booted observed model')

    }


}

export default BaseObserver