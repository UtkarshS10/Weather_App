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
const cityHumidity=document.getElementById("city-humidity");                                 const cityCondition=document.getElementById("city-condition"); 
const getlocation=document.getElementById("get-location");
const button1=document.getElementById("location");
const message=document.getElementById("weather-message"); 
const sunny = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
const cloudy = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
const rain = "url('https://images.unsplash.com/photo-1501691223387-dd0500403074')";
const snow = "url('https://images.unsplash.com/photo-1608889175123-8ee362201f81')";                                                                                       
async function getData1(cityName) { 
    const data=await fetch (`https://api.weatherapi.com/v1/current.json?key=61d39bdfda7e4721a4c63619262003&q=${cityName}&aqi=yes`) 
    if(!data.ok) {
        // throw new error("Failed to fetch data, try again") 
        message.innerText="Error! Enter Correct Place.";
        message.className="mt-4 text-center font-semibold text-lg text-red-500";
        return null;
    }
     return await data.json() 
} 

async function getData(lat, long) { 
    const data=await fetch (`https://api.weatherapi.com/v1/current.json?key=61d39bdfda7e4721a4c63619262003&q=${lat},${long}&aqi=yes`) 
    if(!data.ok) {
    message.innerText="Error! Try Again.";
    message.className="mt-4 text-center font-semibold text-lg text-red-500";
    return null;
    }
    return await data.json() 
} 
async function gotLocation(position) {
    const result=await getData(position.coords.latitude, position.coords.longitude);
    console.log(result);
    updateUI(result);
} 

function failedToGet() {
    console.log("There was some issue") 
     
} 

async function handleClick(e) {
    
    if (e.target.id === "location") {
        navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
        
    } 

    else {
        const value = input.value;
        const result = await getData1(value);
        if(!result) return;
        updateUI(result);
    }} 

function updateUI(result) {
        cityName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
        cityTime.innerText = result.location.localtime;
        cityTemp.innerText = result.current.temp_c;
        cityHumidity.innerText = result.current.humidity + "%";
        cityCondition.innerText = result.current.condition.text;

    const body = document.getElementById("app-body");
    const message=document.getElementById("weather-message");
    const condition = result.current.condition.text.toLowerCase();
    const temp=result.current.temp_c;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundRepeat = "no-repeat";
    if (condition.includes("sunny")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501973801540-537f08ccae7b')";
        if(temp>=25) {
        message.innerText="It's hot outside, stay hydrated!";
        message.className="mt-4 text-center font-semibold text-lg text-red-500";
    }
}
    else if (condition.includes("cloud")||condition.includes("overcast")) {
    body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31')";
        if(temp>=15) {
        message.innerText="Cloudy weather, enjoy your day!";
        message.className="mt-4 text-center font-semibold text-lg text-indigo-500";
    } 
}
  else if (condition.includes("rain") || condition.includes("drizzle")) {
  body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501691223387-dd0500403074')";
  message.innerText="Alert ! It's raining outside."
  message.className="mt-4 text-center font-semibold text-lg text-blue-400";
}
    else if (condition.includes("snow")) {
    body.style.backgroundImage = "url('https://images.pexels.com/photos/36438414/pexels-photo-36438414.jpeg')";
    message.innerText="It's cold, wear warm clothes!";
    message.className="mt-4 text-center font-semibold text-lg text-blue-300";
}
else {
  body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')";
  message.innerText="Enjoy your day!";
  message.className="mt-4 text-center font-semibold text-lg text-indigo-400";
}
} 
    
button1.addEventListener("click", handleClick);
button.addEventListener("click", handleClick); 


