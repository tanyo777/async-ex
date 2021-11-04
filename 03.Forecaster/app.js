async function attachEvents() {
    const locationsUrl = "http://localhost:3030/jsonstore/forecaster/locations";
    const inputLocation = document.getElementById('location');
    const current = document.getElementById('current');
    const upcoming = document.getElementById('upcoming');
    const global = document.getElementById('forecast');
    const err = document.getElementById('error');
    let forecastUpcomingJson = null;
    let forecastTodayJson = null;
    try {
      const locations = await fetch(locationsUrl);
      if(!locations.ok || !inputLocation.value.length) {
          throw new Error("Error")
      }
      const locationsJson = await locations.json();
      if(typeof locationsJson !== 'object') {
          throw new Error("Error")
      }

      const location = locationsJson.filter((location) => location.name === inputLocation.value);

      if(!location.length) {
          throw new Error("Error")
      }

      const code = location[0].code;
      const forecastTodayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`
      const forecastToday = await fetch(forecastTodayUrl);
      if(!forecastToday.ok) {
        throw Error("Error")
      }
      forecastTodayJson = await forecastToday.json();

      if(typeof forecastTodayJson !== 'object') {
          throw Error('Error')
      }

      const forecastUpcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
      const forecastUpcoming = await fetch(forecastUpcomingUrl);
      forecastUpcomingJson = await forecastUpcoming.json();

      if(typeof forecastUpcomingJson !== 'object') {
        throw Error('Error')
      }

      onSuccess(forecastTodayJson, forecastUpcomingJson);
   }catch(err) {
       onError(err.message);
   }

   
   function onSuccess(forecastToday, forecastUpcoming) {
       const upcomingInfo = document.createElement('div');
       upcomingInfo.classList.add('forecast-info');
       forecastUpcoming.forecast.forEach(forecast => {
           const span = document.createElement('span');
           span.classList.add('upcoming');

           // symbol
           const symbol = document.createElement('span');
           symbol.classList.add('symbol');
           const symbolCondition = checkCondition(forecast.condition);
           symbol.innerHTML = symbolCondition;

           // temperature
           const temp = document.createElement('span');
           temp.classList.add('forecast-data');
           temp.innerHTML = `${forecast.low}&#176;/${forecast.high}&#176;`;

           // condition
           const condition = document.createElement('span');
           condition.classList.add('forecast-data');
           condition.textContent = forecast.condition;
           span.appendChild(symbol);
           span.appendChild(temp);
           span.appendChild(condition);
           upcomingInfo.appendChild(span);
       })


       global.style = 'display: block';
       const div = document.createElement('div');
       const forecast = forecastToday.forecast;

       let weatherSymbol = checkCondition(forecast.condition);
       // span symbol (today's forecast)
       const spanSymbol = document.createElement('span');
       // add span symbol
       spanSymbol.classList.add('condition', 'symbol');
       spanSymbol.innerHTML = weatherSymbol
       // conditions
       const spanConditions = document.createElement('span');
       spanConditions.classList.add('condition');

       // location name
       const spanLocationName = document.createElement('span');
       spanLocationName.classList.add('forecast-data');
       spanLocationName.textContent = forecastToday.name;


       // temperature
       const spanHighLow = document.createElement('span');
       spanHighLow.classList.add('forecast-data');
       spanHighLow.innerHTML = `${forecast.low}&#176;/${forecast.high}&#176;`;

       // location condition
       const spanCondition = document.createElement('span');
       spanCondition.classList.add('forecast-data');
       spanCondition.textContent = forecast.condition;


       spanConditions.appendChild(spanLocationName);
       spanConditions.appendChild(spanHighLow);
       spanConditions.appendChild(spanCondition);

       div.classList.add('forecasts');
       div.appendChild(spanSymbol);
       div.appendChild(spanConditions);
       

       current.removeChild(current.childNodes[2]);
       upcoming.removeChild(upcoming.childNodes[2]);
       current.appendChild(div);
       upcoming.appendChild(upcomingInfo);
       err.style = "display: none";
       current.style = "display: block";
       upcoming.style = "display: block";
       inputLocation.value = "";
   }

   function onError(errorMessage) {
       global.style = "display: block";
       err.textContent = errorMessage;
       err.style = "display: block";
       current.style = "display: none";
       upcoming.style = "display: none";
       console.log(errorMessage);
       inputLocation.value = "";
   }

   function checkCondition(condition) {
    if(condition === "Sunny") {
        return '&#x2600;';
    } else if(condition === "Partly sunny") {
        return '&#x26C5;';
    } else if(condition === "Overcast") {
        return '&#x2601;';
    } else {
        return '&#x2614;';
    }
   }
}
