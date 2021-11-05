function solve() {
  let info = document.querySelector(".info");
  let departInfo = document.getElementById("depart");
  let arriveInfo = document.getElementById("arrive");

  let next = "depot";
  let stopName = "";
  async function depart() {
    try {
      let url = `http://localhost:3030/jsonstore/bus/schedule/${next}`;
      let response = await fetch(url);
      if (response.status !== 200 || next.length === 0) {
        throw new Error("Error");
      }
      let reponseJson = await response.json();
      stopName = reponseJson.name;
      info.textContent = `Next stop ${stopName}`;
      next = reponseJson.next;
      departInfo.disabled = true;
      arriveInfo.disabled = false;
    } catch (err) {
      info.textContent = err.message;
      departInfo.disabled = true;
      arriveInfo.disabled = true;
    }
  }

  function arrive() {
    info.textContent = `Arriving at ${stopName}`;
    departInfo.disabled = false;
    arriveInfo.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
