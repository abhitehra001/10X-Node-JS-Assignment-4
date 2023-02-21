const express = require("express");
const app = express();
const port = 3000
app.get("/", (request, response)=>{
    response.json("Hello World!");
})

function checkError(num){
    if(!/^[0-9.-]+$/.test(num)){
        return "Invalid data types";
    }else if(num>1000000){
        return "Overflow";
    }else if(num<-1000000){
        return "Underflow";
    }
    return "";
}
app.post("/add", (req, resp, next) => {
    let data = '';
    console.log("HEY");
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        req.body = JSON.parse(data);
        next();
    })
} , (req, resp) => {
    const results = ["success", "failure", "error"];
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let sum = 0;
    const userData = {};
    let error = checkError(num1);
    if(!error){
        error = checkError(num2);
    }
    if(!error){
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        sum = (num1+num2).toFixed(4);
        error = checkError(sum);
    }
    if(error){
        userData.status = results[2];
        userData.message = error;
    }else{
        userData.status = results[0];
        userData.message = "The sum of given two numbers"
        userData.sum = sum;
    }
    resp.json(userData);
})

app.post("/sub", (req, resp, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        req.body = JSON.parse(data);
        next();
    })
} , (req, resp) => {
    const results = ["success", "failure", "error"];
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let difference = 0;
    const userData = {};
    let error = checkError(num1);
    if(!error){
        error = checkError(num2);
    }
    if(!error){
        num1 = parseFloat(num1).toFixed(4);
        num2 = parseFloat(num2).toFixed(4);
        difference = num1-num2;
        error = checkError(difference);
    }
    if(error){
        userData.status = results[2];
        userData.message = error;
    }else{
        userData.status = results[0];
        userData.message = "The difference of given two numbers"
        userData.difference = difference;
    }
    resp.json(userData);
})

app.post("/multiply", (req, resp, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        req.body = JSON.parse(data);
        next();
    })
} , (req, resp) => {
    const results = ["success", "failure", "error"];
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let product = 0;
    const userData = {};
    let error = checkError(num1);
    if(!error){
        error = checkError(num2);
    }
    if(!error){
        num1 = parseFloat(num1).toFixed(4);
        num2 = parseFloat(num2).toFixed(4);
        product = (num1*num2).toFixed(4);
        error = checkError(product);
    }
    if(error){
        userData.status = results[2];
        userData.message = error;
    }else{
        userData.status = results[0];
        userData.message = "The product of given two numbers"
        userData.product = product;
    }
    resp.json(userData);
})

app.post("/divide", (req, resp, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })
    req.on('end', () => {
        req.body = JSON.parse(data);
        next();
    })
} , (req, resp) => {
    const results = ["success", "failure", "error"];
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let result = 0;
    const userData = {};
    let error = checkError(num1);
    if(!error){
        error = checkError(num2);
    }
    if(!error){
        num1 = parseFloat(num1).toFixed(4);
        num2 = parseFloat(num2).toFixed(4);
        if(/^[0.-]+$/.test(num2)){error="Cannot divide by zero"}
    }
    if(!error){
        result = (num1/num2).toFixed(4);
        error = checkError(result);
    }
    if(error){
        userData.status = results[2];
        userData.message = error;
    }else{
        userData.status = results[0];
        userData.message = "The division of given two numbers"
        userData.result = result;
    }
    resp.json(userData);
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;