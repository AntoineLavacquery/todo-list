export function createButton(label, containerQuery, displayFunction) {
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("nav-link", "link-body-emphasis", "btn", "btn-link");
    button.textContent = label;
    button.addEventListener("click", function () {
        desactivateAllButtons();
        button.classList.add("active");
        displayFunction(label);
        if (containerQuery === "ul#project") appendAddTodoButton();
    });
    const li = document.createElement("li");
    li.appendChild(button);
    document.querySelector(containerQuery).appendChild(li);
}

export function createAddTodoButton() {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-center";

    const button = document.createElement("button");
    button.className = "btn btn-primary rounded-circle p-3 lh-1";
    button.type = "button";

    const icon = document.createElement("i");
    icon.className = "bi bi-plus";
    icon.style.fontSize = "24px";

    const span = document.createElement("span");
    span.className = "visually-hidden";
    span.textContent = "Dismiss";

    button.appendChild(icon);
    button.appendChild(span);

    div.appendChild(button);

    return div;
}

export function createTodoElement(todo) {
    const todoElement = document.createElement("div");
    todoElement.classList =
        "alert alert-secondary alert-dismissible fade show d-flex justify-content-between";

    const leftPart = document.createElement("div");
    leftPart.classList = "d-flex gap-2";

    const checkbox = document.createElement("input");
    checkbox.id = "checkbox";
    checkbox.classList = "form-check-input";
    checkbox.type = "checkbox";

    const title = document.createElement("span");
    title.id = title;
    title.innerText = todo.title;

    leftPart.appendChild(checkbox);
    leftPart.appendChild(title);

    const timeRemaining = document.createElement("div");
    timeRemaining.id = "remaining";
    timeRemaining.innerHTML = todo.dueDate;

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("data-bs-dismiss", "alert");
    closeButton.setAttribute("aria-label", "Close");

    todoElement.appendChild(leftPart);
    todoElement.appendChild(timeRemaining);
    todoElement.appendChild(closeButton);

    return todoElement;
}

function desactivateAllButtons() {
    const homeButtons = document.querySelectorAll("ul#home button");
    const projectButtons = document.querySelectorAll("ul#project button");
    const buttons = [...homeButtons, ...projectButtons];
    buttons.forEach((button) => button.classList.remove("active"));
}
