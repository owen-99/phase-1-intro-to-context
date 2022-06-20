// Your code here
function createEmployeeRecord(employeeArr){
    const employeeObj ={
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }

    return employeeObj
}

function createEmployeeRecords(employees){
    const newArr = []
    employees.forEach(employee => {
        let newEmployee = createEmployeeRecord(employee)
        newArr.push(newEmployee)
    })
    return newArr
}

function createTimeInEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    employeeObj.timeInEvents.push({
        type: 'TimeIn',
        hour: hour,
        date: date 
    });
    return employeeObj;
   
}

function createTimeOutEvent(employeeObj, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    hour = parseInt(hour);
    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: hour,
        date: date 
    });
    return employeeObj;
}

function hoursWorkedOnDate(employeeObj, dateOfForm) {
    let clockIn = employeeObj.timeInEvents.find((e) => e.date == dateOfForm).hour
    let clockOut = employeeObj.timeOutEvents.find((e) => e.date == dateOfForm).hour
    return (clockOut - clockIn)/100
}

function wagesEarnedOnDate (employeeObj, dateOfForm) {
    const hourlyRate = parseInt(employeeObj.payPerHour)
    const hoursWorked = hoursWorkedOnDate(employeeObj, dateOfForm)
    return hourlyRate * hoursWorked
}

function allWagesFor(employeeObj) {
    let wagesArray = []
    const dates = employeeObj.timeInEvents.map((e) => e.date)
    for (let e of dates){
        wagesArray.push(wagesEarnedOnDate(employeeObj, e))
    }
    return wagesArray.reduce((prevVal, currentVal) => prevVal + currentVal)
}

function calculatePayroll(employeeArr) {
    return employeeArr.map(obj => allWagesFor(obj))
    .reduce((a, b) => (a = a + b), 0);
}