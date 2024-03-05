const buttonAddCity = document.getElementById("add-city")
const divForm = document.querySelector(".module__form")
const citySearchForm = document.querySelector(".find-city")
const apiKey = "_your_Api_Key"


buttonAddCity.addEventListener("click", () => {
    divForm.removeAttribute("hidden")
})

citySearchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    divForm.setAttribute("hidden", "hidden")
    const citySearchName = encodeURIComponent(document.getElementById("search").value)
    const page = fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${citySearchName}&days=6&lang=pl`).then(res => res.json()).then( data => {
        let moduleWeather = document.querySelector(".module__weather")
        moduleWeather.removeAttribute("hidden")
        console.log(data)
        document.querySelector(".city__name").innerHTML = data.location.name
        document.querySelector(".weather__icon").innerHTML = `<img src="${data.current.condition.icon}"/>`
        document.querySelector(".temperature__value").innerHTML = data.current.temp_c
        document.querySelector(".pressure__value").innerHTML = data.current.pressure_mb + " hPa"
        document.querySelector(".humidity__value").innerHTML = data.current.humidity + "%"
        document.querySelector(".wind-speed__value").innerHTML = (parseFloat(data.current.wind_kph)*1000/3600).toFixed(2) + " m/s"
        const weatherForecast = document.querySelector(".weather__forecast")
        weatherForecast.innerHTML = ""
        for (let i=1; i < 6; i++) {
            let nameDay =new Date(data.forecast.forecastday[i].date)
            weatherForecast.innerHTML+= `<li>
                <span className="day">${nameDay.toLocaleString('pl-pl', {weekday: "long"})}</span> <img src="${data.forecast.forecastday[i].day.condition.icon}"/>
                <span className="temperature"><span className="temperature__value">${data.forecast.forecastday[i].day.maxtemp_c.toFixed(0)}</span>&deg;C</span>
            </li>`
        }
    })


})
