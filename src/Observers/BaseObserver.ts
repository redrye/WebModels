

interface IObserver {
    booting?(model: any): void;
    booted?(model: any): void;
    creating?(model: any): void;
    created?(model: any): void;
    updating?(model: any): void;
    updated?(model: any): void;
    saving?(model: any): void;
    saved?(model: any): void;
    deleting?(model: any): void;
    deleted?(model: any): void;
    restoring?(model: any): void;
    restored?(model: any): void;
}


class BaseObserver {


    static booting =  (model) => {
        console.log('Booting observed model')
    }
    static booted = (model) => {
        console.log('Booted observed model')
    }

}

export default BaseObserver