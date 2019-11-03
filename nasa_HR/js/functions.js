
// Save astronauts function
let saveAstronauts = astronauts => {
    let astronautsString = JSON.stringify(astronauts)
    localStorage.setItem('astronauts', astronautsString)
}

// Get astronauts function
let getAstronauts = () => {
    let loadAstronauts = localStorage.getItem('astronauts')
    let parsedAstronauts = JSON.parse(loadAstronauts)
    if (parsedAstronauts) {
        return parsedAstronauts
    } else {
        return []
    }
}



//Get avatar function
let getAvatar = () => {
    let randNr = Math.ceil(Math.random() * 5)
    return `avatar${randNr}`
}


//Render astronauts function
let renderAstronauts = function (astronauts, filters) {

    astronauts.forEach(astronaut => {
        if (astronaut.name === '') {
            astronaut.name = 'Unknown'
            saveAstronauts(astronauts)
            renderAstronauts(astronauts, filters)
        } else if (astronaut.surname === '') {
            astronaut.surname = 'Unknown'
            saveAstronauts(astronauts)
            renderAstronauts(astronauts, filters)
        } else {
            return
        }
    })

    let filteredAstronauts = astronauts.filter(astronaut => {
        if (filters.searchBy === 'name') {
            return astronaut.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
        } else if (filters.searchBy === 'surname') {
            return astronaut.surname.toLowerCase().includes(filters.searchTerm.toLowerCase())
        } else {
            return astronaut.superpower.toLowerCase().includes(filters.searchTerm.toLowerCase())
        }
    })

    document.querySelector('.astronauts-list').innerHTML = ''

    filteredAstronauts.forEach(astronaut => {
        let list = document.querySelector('.astronauts-list')
        let astronautWrapper = document.createElement('div')
        astronautWrapper.setAttribute('class', 'astronaut')



        let avatar = document.createElement('div')
        avatar.setAttribute('class', `avatar ${astronaut.avatar}`)

        let textWrapper = document.createElement('div')
        textWrapper.setAttribute('class', 'text-wrapper')
        list.append(textWrapper)
        let name = document.createElement('a')
        name.textContent = `Name: ${astronaut.name}`
        name.setAttribute('href', `edit.html#${astronaut.id}`)

        let surname = document.createElement('a')
        surname.textContent = `Surname: ${astronaut.surname}`
        surname.setAttribute('href', `edit.html#${astronaut.id}`)

        let superpower = document.createElement('a')
        superpower.textContent = `SuperPower: ${astronaut.superpower}`
        superpower.setAttribute('href', `edit.html#${astronaut.id}`)

        let age = document.createElement('a')
        age.textContent = `Age: ${astronaut.age}`
        age.setAttribute('href', `edit.html#${astronaut.id}`)



        textWrapper.appendChild(name)
        textWrapper.appendChild(surname)
        textWrapper.appendChild(superpower)
        textWrapper.appendChild(age)


        let deleteWrapper = document.createElement('div')
        deleteWrapper.setAttribute('class', 'button-wrapper')

        let deleteBtn = document.createElement('a')
        deleteBtn.textContent = 'x'
        deleteBtn.setAttribute('class', 'btn-delete')
        deleteBtn.setAttribute('id', astronaut.id)

        deleteWrapper.appendChild(deleteBtn)

        astronautWrapper.appendChild(avatar)
        astronautWrapper.appendChild(textWrapper)
        astronautWrapper.appendChild(deleteWrapper)

        list.appendChild(astronautWrapper)

        deleteBtn.addEventListener('click', e => {
            let id = e.target.id
            let indexOfAstronaut = astronauts.findIndex(function (astronaut) {
                return astronaut.id === id
            })

            astronautWrapper.classList.add('fade-out-bck')
            astronauts.splice(indexOfAstronaut, 1)
            saveAstronauts(astronauts)


            setTimeout(() => {
                renderAstronauts(astronauts, filters)
            }, 1000)
        })
    })
}
