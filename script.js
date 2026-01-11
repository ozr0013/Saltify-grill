const SHEET_URL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vSoHvL7sZKTHmJdZv9fBYyYT7x57oPApX5S_fk95GjSV7VBOYtw_EffbWnfcMlaT_sIT9hqfIZgFonD/pub?gid=0&single=true&output=csv";

function loadMenu() {
  Papa.parse(SHEET_URL + "&cache=" + Date.now(), {
    download: true,
    header: true,
    complete: function (results) {
      const menu = {};
      const data = results.data;

      data.forEach(row => {
        if (row.Available !== "TRUE") return;

        if (!menu[row.Category]) menu[row.Category] = [];
        menu[row.Category].push({
          name: row["Item Name"],
          price: row.Price
        });
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
  });
}

loadMenu();
setInterval(loadMenu, 30000);
