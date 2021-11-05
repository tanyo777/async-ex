async function getInfo() {
  const busId = document.getElementById("stopId");
  const stopName = document.getElementById("stopName");
  const ul = document.getElementById("buses");
  try {
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busId.value}`;
    let response = await fetch(url);
    if (response.status !== 200 || busId.value.length === 0) {
      throw new Error("Error");
    } else {
      let json = await response.json();
      onSuccess(json);
    }
  } catch (err) {
    onError(err);
  }

  function onError(err) {
    stopName.textContent = err.message;
    ul.innerHTML = "";
    busId.value = "";
  }

  function onSuccess(json) {
    stopName.textContent = json.name;
    let buses = json.buses;
    let keys = Object.keys(buses);
    for (let key of keys) {
      let li = document.createElement("li");
      let context = `Bus ${key} arrives in ${buses[key]} minutes`;
      li.textContent = context;
      ul.appendChild(li);
    }
    busId.value = "";
  }
}

