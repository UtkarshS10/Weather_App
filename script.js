const button=document.getElementById("search-button");
const input=document.getElementById("city-input");
input.addEventListener("keydown",(event)=>{
    if(event.key==="Enter") {
        button.click();
    }
}) 
const cityName=document.getElementById("city-name"); 
const cityTime=document.getElementById("city-time");                                    
const cityTemp=document.getElementById("city-temp");      
const cityHumidity=document.getElementById("city-humidity");                                                                                       
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
    cityName.innerText=result.location.name,result.location.region - result.location.country
    cityTime.innerText=result.location.localtime
    cityTemp.innerText=result.current.temp_c
    cityHumidity.innerText=result.current.humidity+"%"

const body = document.getElementById("app-body");
const message=document.getElementById("weather-message");
const temp=result.current.temp_c;
    if (temp >= 30) {
        body.className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-red-500";
        message.innerText="It's hot outside, stay hydrated!";
        message.className="mt-4 text-center font-semibold text-lg text-red-500";
}
else if (temp >= 15) {
    body.className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-400";
    message.innerText="Warm weather, enjoy your day!";
    message.className="mt-4 text-center font-semibold text-lg text-yellow-500";
}
else {
    body.className = "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700";
    message.innerText="It's cold, wear warm clothes!";
    message.className="mt-4 text-center font-semibold text-lg text-blue-300";
}
}) 


