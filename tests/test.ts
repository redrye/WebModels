import {BaseModel} from "../src";

var model = new BaseModel({
    name: 'test',
});

model.on('saving', () => {
    console.log('saving model');
})

model.on('saved', (model) => {
    console.log(model)
    console.log('saved model');
})

model.save()

//console.log(model);