const res = await fetch("http://localhost:3000/api/roll", { method: "POST" });
const data = await res.json();
console.log(JSON.stringify(data));
