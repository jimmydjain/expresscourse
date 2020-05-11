console.log('Client side javascript file is loaded!!')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{

// response.json().then((data)=>{
//     console.log(data)

// })
// })

const weatherform = document.querySelector('form')
const address = document.querySelector('input')

const messageone = document.querySelector('#message1')
const messagetwo = document.querySelector('#message2')




weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log('********************submit event')
    console.log('Address Entered is ' +address.value)

    
// fetch('http://localhost:3000/weatherInfo?address='+address.value).then((response)=>{
    fetch('/weatherInfo?address='+address.value).then((response)=>{
response.json().then((data)=>{
    if(data.error)
        {
            console.log(data.error)
            messageone.textContent = data.error 

        }
        else
        {
            messageone.textContent = 'Lattitude = ' +data.lattitude +  '  Longitude' +data.longitude 
            messagetwo.textContent = ' Place Name = ' +  data.place_name + '  Temperature is ' +   data.precip.temperature + ' Precip' + data.precip.precip +  '  Humidity is ' + data.precip.humidity
            console.log('Troubleshooting' +data)
        } 

})
})


})

// fetch('http://localhost:3000/weatherInfo?address=Nashville').then((response)=>{

// response.json().then((data)=>{
//     if(data.error)
//     {
//         console.log(data.error)
//     }
//     else
//     {
//         console.log('Lattitude' + data.lattitude)
//         console.log('Longitude' + data.longitude)
//         console.log('place_name' + data.place_name)
//         console.log('temperature' + data.precip.temperature)
//         console.log('precip' + data.precip.precip)
//     }
    

// })
// })

