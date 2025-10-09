document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "https://jsonplaceholder.typicode.com/users";
  const container = document.getElementById("users-container");
  const searchInput = document.getElementById("search");
  const cityFilter = document.getElementById("city-filter");

  let users = [];

  async function fetchUsers() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      users = await response.json();
      renderUsers(users);
      populateCityFilter(users);
    } catch (error) {
      container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  function renderUsers(users) {
    container.innerHTML = "";

    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "card";

      // Crear una flecha
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.innerHTML = "&#9660;"; 

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Ciudad:</strong> ${user.address.city}</p>
        <p><strong>Teléfono:</strong> ${user.phone}</p>
        <p><strong>Compañía:</strong> ${user.company.name}</p>
        <div class="details">
          <p><strong>Dirección:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.zipcode}</p>
          <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        </div>
      `;

      card.appendChild(arrow); 

  
      arrow.addEventListener('click', () => {
        card.classList.toggle('open');
      });

      container.appendChild(card);
    });
  }

  function populateCityFilter(users) {
    const cities = [...new Set(users.map(user => user.address.city))];
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      cityFilter.appendChild(option);
    });
  }

  searchInput.addEventListener("input", filterUsers);
  cityFilter.addEventListener("change", filterUsers);

  function filterUsers() {
    let filteredUsers = users;

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm)
      );
    }

    const selectedCity = cityFilter.value;
    if (selectedCity) {
      filteredUsers = filteredUsers.filter(user => user.address.city === selectedCity);
    }

    renderUsers(filteredUsers);
  }

  fetchUsers();
});