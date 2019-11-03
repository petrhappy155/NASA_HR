let astronauts = getAstronauts()

let filters = {
    searchTerm: '',
    searchBy: 'name'
}

renderAstronauts(astronauts, filters)


document.querySelector('.search-input').addEventListener('input', e => {
    filters.searchTerm = e.target.value
    renderAstronauts(astronauts, filters)
})


document.querySelector('#searchBy').addEventListener('change', e => {
    filters.searchBy = e.target.value

})


document.querySelector('.btn-add').addEventListener('click', () => {
    let id = uuidv4();
    astronauts.push({
        id: id,
        avatar: getAvatar(),
        name: '',
        surname: '',
        birthday: '',
        age: '',
        superpower: ''
    })
    saveAstronauts(astronauts)
    location.assign(`edit.html#${id}`)
})

