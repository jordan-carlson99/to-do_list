const url = "http://127.0.0.1:3000";

async function onLoad() {
  let list = await getList();
  list.forEach((element) => {
    generatelist(element);
  });
}

async function getList() {
  return (await fetch(`${url}/api/list`)).json();
}

function generatelist(item) {
  let task = "";
  if (item.complete) {
    task += "completed";
  } else {
    task += "not complete";
  }
  let container = document.createElement("div");
  container.id = item.id;
  container.innerHTML = `
    <h1>${item.task}</h1>
    <h2>${task}</h2>`;
  let complete = document.createElement("button");
  complete.type = "button";
  complete.innerText = "complete";
  complete.addEventListener("click", (e) => {
    completer(e);
  });
  container.appendChild(complete);
  let removal = document.createElement("button");
  removal.innerText = "remove";
  removal.addEventListener("click", (e) => {
    remover(e);
  });
  container.appendChild(removal);
  document.body.appendChild(container);
  return container;
}

function completer(event) {
  fetch(`${url}/api/update/${event.target.parentElement.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      complete: true,
    }),
  });
}

function remover(event) {
  fetch(`${url}/api/remove/${event.target.parentElement.id}`, {
    method: "DELETE",
  });
}
