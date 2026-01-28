const res = await fetch("http://localhost:3000/api/state");
const data = await res.json();
console.log(JSON.stringify(data));
