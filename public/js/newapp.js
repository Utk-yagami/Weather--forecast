

console.log("Client side javascript file is loading")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()// prevent from auto refresing
    const location = search.value
    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else console.log(data)
        })
    })
    console.log(location)
})
