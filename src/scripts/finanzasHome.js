
let finanzasList = window.api.getFinanzas();
let finanzasRoot = document.getElementById('finanzasRoot');



document.addEventListener('click', (e) => {
    if (e.target.id === 'submitBtn') {
        
        searchByRange()
    }
})

init()



function init() {
    verifyNull()
    let todayDate = new Date().toLocaleDateString().split('/')
    todayDate = `${todayDate[0] < 10 ? todayDate[0] = '0' + todayDate[0] : todayDate[0]}/${todayDate[1] < 10 ? todayDate[1] = '0' + todayDate[1] : todayDate[1]}/${todayDate[2]}`
    let dateSplit = todayDate.split('/')
    let monthDate = returnMonth(dateSplit)
    finanzasRoot.innerHTML = '<div class="bg-body-tertiary rounded shadow p-3 m-2"> <!-- TODAY --> <div class="bg-body-finanzas"> <div class="row"> <div class="col"> <h6>' + todayDate + '</h6> </div> </div> <div class="row"> <p>Ventas: $' + finanzasList.finanzasDay[0].Total + '</p> </div> <div class="row"> <p>Ganancias: $' + finanzasList.finanzasDay[0].Total_Ganancias + '</p> </div> </div> <!-- MONTH --> <div class="bg-body-finanzas"> <div class="row"> <div class="col"> <h6>' + monthDate + '</h6> </div> </div> <div class="row"> <p>Ventas: $' + finanzasList.finanzasMonth[0].Total + '</p> </div> <div class="row"> <p>Ganancias: $' + finanzasList.finanzasMonth[0].Total_Ganancias + '</p> </div> </div> <!-- YEAR --> <div class="bg-body-finanzas"> <div class="row"> <div class="col"> <h6>' + dateSplit[2] + '</h6> </div> </div> <div class="row"> <p>Ventas: $' + finanzasList.finanzasYear[0].Total + '</p> </div> <div class="row"> <p>Ganancias: $' + finanzasList.finanzasYear[0].Total_Ganancias + '</p> </div> </div> </div>';

}

function verifyNull(){
    //Today
    finanzasList.finanzasDay[0].Total === null ? finanzasList.finanzasDay[0].Total = 0 : finanzasList.finanzasDay[0].Total
    finanzasList.finanzasDay[0].Total_Ganancias === null ? finanzasList.finanzasDay[0].Total_Ganancias = 0 : finanzasList.finanzasDay[0].Total_Ganancias

    //Month
    finanzasList.finanzasMonth[0].Total === null ? finanzasList.finanzasMonth[0].Total = 0 : finanzasList.finanzasMonth[0].Total
    finanzasList.finanzasMonth[0].Total_Ganancias === null ? finanzasList.finanzasMonth[0].Total_Ganancias = 0 : finanzasList.finanzasMonth[0].Total_Ganancias

    //Year
    finanzasList.finanzasYear[0].Total === null ? finanzasList.finanzasYear[0].Total = 0 : finanzasList.finanzasYear[0].Total
    finanzasList.finanzasYear[0].Total_Ganancias === null ? finanzasList.finanzasYear[0].Total_Ganancias = 0 : finanzasList.finanzasYear[0].Total_Ganancias

}

function searchByRange() {
    let dateFromPicker = returnDateFromPicker()
    if (dateFromPicker !== undefined) {
        //let isBoth = dateFromPicker.split('al').length > 1
        showFinanzasByRange(dateFromPicker)
    }
    else (alert('Seleccione una fecha correctamente'))
}

function showFinanzasByRange(dateFromPicker){
    let dateStart = document.getElementById('dateStart').value
    let dateEnd = document.getElementById('dateEnd').value

    let dateStartSplit = dateStart.split('-')
    let dateEndSplit = dateEnd.split('-')

    dateStart = `${dateStartSplit[0]}/${dateStartSplit[1]}/${dateStartSplit[2]}`
    dateEnd = `${dateEndSplit[0]}/${dateEndSplit[1]}/${dateEndSplit[2]}`
    
    let finanzasListByRange = window.api.getFinanzasByRange(dateStart, dateEnd)

    if( finanzasListByRange[0].Total == null){
        finanzasListByRange[0].Total = 0
        finanzasListByRange[0].Total_Ganancias = 0
    }
   
    finanzasRoot.innerHTML = '<div class="bg-body-tertiary rounded shadow p-3 m-2"> <div class="bg-body-finanzas"> <div class="row"> <div class="col"> <h6>' + dateFromPicker + '</h6> </div> </div> <div class="row"> <p>Ventas: $'+finanzasListByRange[0].Total+'</p> </div> <div class="row"> <p>Ganancias: $'+finanzasListByRange[0].Total_Ganancias+'</p> </div> </div> </div>'

}


function returnDateFromPicker() {
    let pickerStart = document.getElementById('dateStart').value
    let pickerEnd = document.getElementById('dateEnd').value
    

    if (pickerStart === '' && pickerEnd === '') { return }


    pickerStart = pickerStart.split('-')
    pickerEnd = pickerEnd.split('-')
    let selectStartPicker = pickerStart != ''
    let selectEndPicker = pickerEnd != ''

    if(selectStartPicker && selectEndPicker ){
        if(pickerStart > pickerEnd){return}
    }

    let fullDate = ''

    if (selectStartPicker && !selectEndPicker) {
        fullDate = `${pickerStart[2]}/${pickerStart[1]}/${pickerStart[0]}`
    }
    else if (!selectStartPicker && selectEndPicker) {
        fullDate = `${pickerEnd[2]}/${pickerEnd[1]}/${pickerEnd[0]}`
    }
    else {
        fullDate = `${pickerStart[2]}/${pickerStart[1]}/${pickerStart[0]} al ${pickerEnd[2]}/${pickerEnd[1]}/${pickerEnd[0]}`
    }

    

    return fullDate
}

function returnMonth(dateSplit) {
    let monthDate = new Date(`${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`)
    let options = { month: 'long', year: 'numeric' }

    monthDate = monthDate.toLocaleString('es-Es', options)
    monthDate = monthDate.charAt(0).toUpperCase() + monthDate.slice(1)
    monthDate = monthDate.split('de')
    return `${monthDate[0]}${monthDate[1]}`
}
