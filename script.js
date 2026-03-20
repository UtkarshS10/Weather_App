const button=document.getElementById("search-button")
const input=document.getElementById("city-input")

const cityName=document.getElementById("city-name");                                     const cityTime=document.getElementById("city-time") ;                                    const cityTemp=document.getElementById("city-temp")      
const cityHumidity=document.getElementById("city-humidity")                                                                                       
async function getData(cityName) { 
    const data=await fetch (`https://api.weatherapi.com/v1/current.json?key=61d39bdfda7e4721a4c63619262003&q=${cityName}&aqi=yes`) 
    if(!data.ok) {
        throw new error("Failed to fetch data, try again") 
    }
     return await data.json() 
}
button.addEventListener("click", async ()=> {
    const value=input.value
    const result=await getData(value) 
    cityName.innerText=`${result.location.name},${result.location.region} - ${result.location.country}`
    cityTime.innerText=result.location.localtime
    cityTemp.innerText=result.current.temp_c
    cityHumidity.innerText=result.current.humidity
}) 


