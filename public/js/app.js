const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    let url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = ''
                messageOne.textContent = data.error
            } else {
                console.log(data.forecast)
                messageOne.textContent = ''
                messageTwo.textContent = data.forecast
            }
        })
    })
})
