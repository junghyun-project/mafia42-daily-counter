// ==========================================
// Timer
// ==========================================

let currentTurn = 1;

let editMode = false;

let selectedRow = null;

let lastRecord = null;


// ==========================================
// Init
// ==========================================

function initTimeTable() {

    const list = document.getElementById("timeList");

    list.innerHTML = "";

    for (let i = 1; i <= 31; i++) {

        const row = document.createElement("li");

        row.className = "time-row";

        row.dataset.row = i;

        row.innerHTML = `

            <span class="turn">

                ${String(i).padStart(2, "0")}

            </span>

            <span
                class="time"
                id="time${i}">

                --

            </span>

            <span
                class="role"
                id="role${i}">

                -

            </span>

            <button
                class="edit-btn"
                data-row="${i}">

                ⋮

            </button>

        `;

        list.appendChild(row);

    }

    bindTimerEvents();

    updateTurnCount();

}


// ==========================================
// Record Time
// ==========================================

function addTime(role) {

    if (currentTurn > 31) {

        alert("모든 턴이 기록되었습니다.");

        return;

    }

    const now = new Date();

    const hh = String(now.getHours()).padStart(2, "0");

    const mm = String(now.getMinutes()).padStart(2, "0");

    const time = `${hh}:${mm}`;

    document.getElementById(
        "time" + currentTurn
    ).textContent = time;

    document.getElementById(
        "role" + currentTurn
    ).textContent = role;

    lastRecord = currentTurn;

    currentTurn++;

    updateTurnCount();

}

// ==========================================
// Event
// ==========================================

function bindTimerEvents() {

    document
        .querySelectorAll(".edit-btn")
        .forEach(button => {

            button.addEventListener("click", e => {

                e.stopPropagation();

                toggleMenu(

                    e.currentTarget,

                    Number(e.currentTarget.dataset.row)

                );

            });

        });


    document
        .getElementById("editRecord")
        .addEventListener("click", startEdit);


    document
        .getElementById("deleteRecord")
        .addEventListener("click", deleteLastRecord);


    document.addEventListener("click", () => {

        document.getElementById(
            "contextMenu"
        ).style.display = "none";

    });

}


// ==========================================
// Menu
// ==========================================

function toggleMenu(button, row) {

    selectedRow = row;

    const menu = document.getElementById("contextMenu");

    const rect = button.getBoundingClientRect();

    menu.style.left = rect.left + "px";

    menu.style.top = rect.bottom + 4 + "px";

    menu.style.display = "block";

}


// ==========================================
// Edit
// ==========================================

function startEdit() {

    document.getElementById(
        "contextMenu"
    ).style.display = "none";

    editMode = true;

    document
        .querySelectorAll(".time-row")
        .forEach(row => {

            row.classList.remove("editing");

        });

    const row = document.querySelector(

        `.time-row[data-row="${selectedRow}"]`

    );

    if (row) {

        row.classList.add("editing");

    }

    alert("변경할 카드를 선택하세요.");

}


// ==========================================
// Delete
// ==========================================

function deleteLastRecord() {

    document.getElementById(
        "contextMenu"
    ).style.display = "none";

    if (lastRecord == null) {

        return;

    }

    document.getElementById(
        "time" + lastRecord
    ).textContent = "--";

    document.getElementById(
        "role" + lastRecord
    ).textContent = "-";

    currentTurn = lastRecord;

    lastRecord--;

    if (lastRecord <= 0) {

        lastRecord = null;

    }

    updateTurnCount();

}


// ==========================================
// Turn Count
// ==========================================

function updateTurnCount() {

    const count = document.getElementById(
        "turnCount"
    );

    if (!count) return;

    count.textContent =
        `${currentTurn - 1} / 31`;

}