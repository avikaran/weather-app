console.log('This is a sample java script file')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

message1.textContent = ''
message2.textContent = ''

weatherForm.addEventListener('submit', (ev)=>{
    ev.preventDefault()
    console.log("Testing")
    const location = search.value
    const url = 'http://localhost:3010/weather?address='+location

    message1.textContent = 'Loading...'
    message2.textContent = ''

    fetch(url).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                console.log(data.error)
                message1.textContent = data.error
                message2.textContent = ''
            }else{
                console.log(data)
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })

})