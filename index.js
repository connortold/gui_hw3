// Author: Connor Tolderlund
// Email: connor_tolderlund@student.uml.edu

// nice constant to have for z-index stuff
const max_32_int = 2_147_483_647;

recalculate = () => {
  // fetch bounds
  let min_x = Number(document.getElementById("min-x").value);
  let min_y = Number(document.getElementById("min-y").value);
  let max_x = Number(document.getElementById("max-x").value);
  let max_y = Number(document.getElementById("max-y").value);

  // make sure x range is in the correct order
  // swap if out of order
  let x_err = document.getElementById("x-range-error");
  x_err.innerHTML = "";

  if (min_x > max_x) {
    let span = document.createElement("span");
    span.innerText = `X range bounds out of order: (${min_x}, ${max_x}). Bounds swapped to (${max_x}, ${min_x})`;

    // swap bounds
    let temp = min_x;
    min_x = max_x;
    max_x = temp;

    // show error message below inputs
    x_err.classList.remove("hidden");
    x_err.classList.add("visible");
    span.classList.add("text-danger", "mx-auto");
    x_err.appendChild(span);
  } else {
    // hide error div if shown
    x_err.classList.remove("visible");
    x_err.classList.add("hidden");
    x_err.innerText = "";
  }

  // make sure y range is in the correct order
  // swap if out of order
  let y_err = document.getElementById("y-range-error");
  y_err.innerHTML = "";

  if (min_y > max_y) {
    let span = document.createElement("span");
    span.innerText = `Y range bounds out of order: (${min_y}, ${max_y}). Swapping bounds to (${max_y}, ${min_y})`;
    span.classList.add("mx-auto", "text-danger");

    // swap the bounds
    let temp = min_y;
    min_y = max_y;
    max_y = temp;

    // show the message
    y_err.classList.remove("hidden");
    y_err.classList.add("visible");

    // add it to the error div
    y_err.appendChild(span);
  } else {
    // hide error div if shown
    y_err.classList.remove("visible");
    y_err.classList.add("hidden");
    y_err.innerText = "";
  }

  // fetch container for the table
  let container = document.getElementById("table-container");
  container.classList.remove("hidden");
  container.classList.add("visible");

  // get the ranges we want in arrays
  let x_data = Array.from({ length: max_x - min_x + 1 }, (x, i) => i + min_x);
  let y_data = Array.from({ length: max_y - min_y + 1 }, (x, i) => i + min_y);

  // beign table creation
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  table.appendChild(thead);

  let tr = document.createElement("tr");
  thead.appendChild(tr);

  // first element will be static in the upper left
  // corner of the table and will have the highest
  // z-index
  let th = document.createElement("th");
  th.setAttribute("scope", "col");
  th.classList.add("text-center", "p-2");
  tr.appendChild(th);
  th.style.zIndex = max_32_int;
  th.style.position = "sticky";
  th.style.top = 0;
  th.style.left = 0;

  let tbody = document.createElement("tbody");
  table.appendChild(tbody);

  // create a header element for each x value in the range
  x_data.forEach((x) => {
    let th = document.createElement("th");
    th.innerText = String(x);
    th.classList.add("text-center", "p-2");
    th.setAttribute("scope", "col");
    th.style.zIndex = max_32_int - 1;
    tr.appendChild(th);
  });

  // row iterations
  for (i = 0; i < y_data.length; i++) {
    // add a row header
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    th.setAttribute("scope", "row");
    th.innerText = String(y_data[i]);
    th.classList.add("text-center", "p-2");
    tr.appendChild(th);

    // column iterations
    for (j = 0; j < x_data.length; j++) {
      // add the data for each cell
      let td = document.createElement("td");
      td.classList.add("text-center", "p-2");
      td.innerText = String(x_data[j] * y_data[i]);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  // clear the container if a table is already rendered
  container.innerHTML = "";

  // add the newly created table
  container.appendChild(table);
};

// prevent form from forcing a page refresh, if not,
// any form submission nukes the data
document.getElementById("table-range-form").addEventListener("submit", (e) => {
  e.preventDefault();
});
