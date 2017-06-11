var operation = {
    num1: "",
    num2: "",
    math_operation: "",
    result: ""
};

var clear = document.querySelector('#clear_all');
var digits = document.querySelectorAll('#number_panel .button');
var operators = document.querySelectorAll('#operation_panel .button:not(#clear_all');
var execute = document.querySelector('#execute');

function eventGiver(clock, event, func) {
    for (var i = 0, iCnt = clock.length; i < iCnt; i += 1) {
        clock[i].addEventListener(event, func);
    }
}

function numberClick(e) {
    if (!operation.math_operation) {
        if (e.target.dataset.number == '.' && operation.num1 == '.') {
            operation.num1 = '0.';
        }
        if (e.target.dataset.number == '.' && operation.num1[operation.num1.length - 1] == '.') {
            operation.num1 = '0.';
        } else {
            operation.num1 += e.target.dataset.number;
        }
        Output(operation.num1);
    } else {
        operation.num2 += e.target.dataset.number;
        Output(operation.num2);
    }
}

function operationClick(e) {
    operation.math_operation = e.target.dataset.number;
    Output(operation.math_operation);
    console.log(operation);
}

function toNumber(string) {
    var num;
    num = Number(string);
    return num;
}

function executeClick(e) {

    operation.num1 = toNumber(operation.num1);
    operation.num2 = toNumber(operation.num2);

    if (operation.num2 && operation.result) {
        switch (operation.math_operation) {
            case '+':
                operation.result = operation.result + operation.num2;
                break;
            case '-':
                operation.result = operation.result - operation.num2;
                break;
            case '*':
                operation.result = operation.result * operation.num2;
                break;
            case '/':
                operation.result = operation.result / operation.num2;
                break;
        }
        sendData();
        Output(operation.result);
        operation.num2 = '';

    } else if (operation.result) {
        sendData();
        Output(operation.result);
    } else {
        switch (operation.math_operation) {
            case '+':
                operation.result = operation.num1 + operation.num2;
                break;
            case '-':
                operation.result = operation.num1 - operation.num2;
                break;
            case '*':
                operation.result = operation.num1 * operation.num2;
                break;
            case '/':
                operation.result = operation.num1 / operation.num2;
                break;
            case '':
                operation.result = operation.num1;
                break;
        }

        sendData();
        operation.num1 = '';
        operation.num2 = '';
        Output(operation.result);
    }
}

function sendData() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr);
            console.log(xhr.responseText);
        }
    };
    xhr.open('POST', 'php/server.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(buildQueryString());
}

function buildQueryString() {
    var queryString = '';
    var keyValuePairs = [];
    var keys = Object.keys(operation);
    for (var i = 0; i < keys.length; i += 1) {
        keyValuePairs.push(keys[i] + '=' + encodeURIComponent(operation[keys[i]]));
    }
    queryString = keyValuePairs.join('&');
    console.log(queryString);
    return queryString;
}

function Output(data) {
    console.log(operation);
    if (typeof (data) == 'number') {
        console.log(Number(data).toFixed(2));
        document.querySelector('#number_output').textContent = Number(data).toFixed(2);

    } else {
        document.querySelector('#number_output').textContent = data;

    }
}

function resetOperationObj() {
    Object.keys(operation).forEach(key => {
        operation[key] = '';
    });
    document.querySelector('#number_output').textContent = 0;
}

eventGiver(digits, 'click', numberClick);
eventGiver(operators, 'click', operationClick);
execute.addEventListener('click', executeClick);
clear.addEventListener('click', resetOperationObj);