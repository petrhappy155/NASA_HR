let getId = location.hash.substring(1)

let astronauts = getAstronauts()

let thisAstronaut = astronauts.find(astronaut => {
    return getId === astronaut.id
})

document.querySelector('#name').value = thisAstronaut.name
document.querySelector('#surname').value = thisAstronaut.surname
document.querySelector('#superpower').value = thisAstronaut.superpower
document.querySelector('#date').value = thisAstronaut.birthday


document.querySelector('#name').addEventListener('input', e => {
    thisAstronaut.name = e.target.value
    saveAstronauts(astronauts)
})

document.querySelector('#surname').addEventListener('input', e => {
    thisAstronaut.surname = e.target.value
    saveAstronauts(astronauts)
})


document.querySelector('#superpower').addEventListener('input', e => {
    thisAstronaut.superpower = e.target.value
    saveAstronauts(astronauts)
})

document.querySelector('#date').addEventListener('change', e => {
    let datePicked = e.target.value
    let now = moment().valueOf()
    let warning = document.querySelector('.dateAlert')
    warning.textContent = ''
    if (now > moment(datePicked).valueOf() && datePicked != null) {
        thisAstronaut.birthday = datePicked
        thisAstronaut.age = moment(datePicked).toNow(true)

        saveAstronauts(astronauts)
    } else {
        warning.textContent = 'Please enter a valid date'
    }
})

document.querySelector('.btn-confirm').addEventListener('click', () => {
    location.assign('index.html')
})