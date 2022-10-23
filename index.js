// Your code here
function createEmployeeRecord( [firstName, familyName, title,  payPerHour]){
    let obj ={
        firstName:firstName,
        familyName:familyName,
        title:title,
        payPerHour:payPerHour,
        timeInEvents : [],
        timeOutEvents: [] 
    }

    return obj
}

function createEmployeeRecords(array){
    let newArray = array.map(record => createEmployeeRecord(record))
    return newArray
}

function createDSObj(getType, date) {
    return {type: getType, date: date.slice(0,10), hour: parseInt(date.slice(-4))}
}

function createTimeInEvent(obj,date){
    obj.timeInEvents.push(createDSObj("TimeIn", date))
    return obj
}

function createTimeOutEvent(obj, date){
    obj.timeOutEvents.push(createDSObj("TimeOut", date))
    return obj
}


function hoursWorkedOnDate(obj, dateYMD){
    const timeIn = obj.timeInEvents.find((e) => e.date === dateYMD).hour
    const timeOut = obj.timeOutEvents.find((e) => e.date === dateYMD).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(obj, dateYMD){

    const wage = obj.payPerHour
    const hoursWorked = hoursWorkedOnDate(obj, dateYMD)
    return wage * hoursWorked
}

function allWagesFor(obj){
    const allWages = obj.timeInEvents.map((day) => {return wagesEarnedOnDate(obj, day.date)})
    return allWages.reduce((acc, cv) => acc + cv)
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}

function findEmployeeByFirstName(srcArray, first_Name){
    return srcArray.find((record) => record.firstName === first_Name)
}

       