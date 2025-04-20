import {BaseModel} from "../src";

var model = new BaseModel({
    name: 'test',
});

model.on('saving', () => {
    console.log('saving model via callback');
})

model.on('saved', (model) => {
    console.log('saved model via callback');
})

console.log(model)

console.log(model.name)
//console.log(model);