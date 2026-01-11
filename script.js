const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSoHvL7sZKTHmJdZv9fBYyYT7x57oPApX5S_fk95GjSV7VB0Ytw_EffbWnfcMlaT_sIT9hqfIZgFonD/pub?gid=0&single=true&output=csv";

async function loadMenu() {
  const res = await fetch(SHEET_URL + "&cache=" + Date.now());
  const text = await res.text();

  const rows = text.split("\n").slice(1);
  const menu = {};

  rows.forEach(row => {
    const [category, name, price, desc, available] = row.split(",");

    if (available?.trim() !== "TRUE") return;

    if (!menu[category]) menu[category] = [];
    menu[category].push({ name, price, desc });
  });

  const container = document.getElementById("menu");
  container.innerHTML = "";

  Object.keys(menu).forEach(cat => {
    const section = document.createElement("div");
    section.className = "category";
    section.innerHTML = `<h2>${cat}</h2>`;

    menu[cat].forEach(item => {
      section.innerHTML += `
        <div class="item">
          <span>${item.name}</span>
          <span class="price">$${item.price}</span>
        </div>
      `;
    });

    container.appendChild(section);
  });
}

loadMenu();
setInterval(loadMenu, 30000); // refresh every 30 seconds
