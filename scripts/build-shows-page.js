const tabData = [
  {
    date: "Mon Sept 2021",
    venue: "Ronald Lane",
    location: "San Francisco, CA",
  },
  {
    date: "Tue Sept 21 2021",
    venue: "Pier 3 East",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Oct 15 2021",
    venue: "View Lounge",
    location: "San Francisco, CA",
  },
  {
    date: "Sat Nov 06 2021",
    venue: "Hyatt Agency",
    location: "San Francisco, CA",
  },
  {
    date: "Fri Nov 26 2021",
    venue: "Moscow Center",
    location: "San Francisco, CA",
  },
  {
    date: "Wed Dec 15 2021",
    venue: "Press Club",
    location: "San Francisco, CA",
  },
];

function createButton() {
  const button = document.createElement("button");
  button.classList.add("shows__button");
  button.textContent = "BUY TICKETS";
  return button;
}

function renderTables() {
  const container = document.querySelector("#booking");
  container.innerHTML = "";

  tabData.forEach((item, index) => {
    const outerArticle = document.createElement("article");
    outerArticle.classList.add("shows__booking");

    const innerArticle = document.createElement("article");
    innerArticle.classList.add("shows__table");

    const list = document.createElement("ul");
    list.classList.add("shows__table-container");

    Object.keys(item).forEach((key, keyIndex) => {
      const listItem = document.createElement("li");
      listItem.classList.add("shows__table-row");

      const header = document.createElement("h3");
      header.textContent = key;
      listItem.appendChild(header);
      header.classList.add("shows__date");

      const value = document.createElement("p");
      value.textContent = item[key];
      listItem.appendChild(value);
      value.classList.add("shows__details");

      list.appendChild(listItem);
    });

    innerArticle.appendChild(list);

    const button = createButton();
    innerArticle.appendChild(button);

    outerArticle.appendChild(innerArticle);
    container.appendChild(outerArticle);
  });

  function handleResize() {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const tables = container.querySelectorAll(".shows__table");

    if (mediaQuery.matches) {
      for (let i = 1; i < tables.length; i++) {
        const headers = tables[i].querySelectorAll("h3");
        headers.forEach((header) => {
          header.style.display = "none";
        });
      }
    } else {
      const headers = container.querySelectorAll(".shows__table h3");
      headers.forEach((header) => {
        header.style.display = "";
      });
    }
  }

  window.addEventListener("resize", handleResize);

  handleResize();
}

renderTables();
