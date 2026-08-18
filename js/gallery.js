// ==========================================
// Gallery
// ==========================================

let selectedCard = null;


// ==========================================
// Render Deck
// ==========================================

function renderDeck() {

    const grid = document.getElementById("imageGrid");

    grid.innerHTML = "";

    if (currentDeck.length === 0) {

        grid.innerHTML = `

            <div class="image-empty">

                덱을 생성해주세요.

            </div>

        `;

        return;

    }

    currentDeck.forEach((role, index) => {

        const card = document.createElement("div");

        card.className = "image-box";

        card.dataset.index = index;

        card.innerHTML = `

            <img
                src="${getCharacterImage(role)}"
                alt="${role}"
                onerror="this.src='img/default.png'">

            <div class="image-name">

                ${role}

            </div>

        `;

        card.addEventListener("click", () => {

            selectCard(card);

        });

        grid.appendChild(card);

    });

}


// ==========================================
// Select Card
// ==========================================

function selectCard(card) {

    document
        .querySelectorAll(".image-box")
        .forEach(item => {

            item.classList.remove("selected");

        });

    card.classList.add("selected");

    selectedCard = card;

    const index = Number(card.dataset.index);

    const role = currentDeck[index];

    // 수정 모드

    if (editMode) {

        const roleBox =
            document.getElementById(
                "role" + selectedRow
            );

        if (roleBox) {

            roleBox.textContent = role;

        }

        const row = document.querySelector(
            `.time-row[data-row="${selectedRow}"]`
        );

        if (row) {

            row.classList.remove("editing");

        }

        editMode = false;

        selectedRow = null;

        return;

    }

    // 일반 기록

    addTime(role);

}


// ==========================================
// Clear Deck
// ==========================================

function clearDeck() {

    const grid =
        document.getElementById("imageGrid");

    grid.innerHTML = `

        <div class="image-empty">

            덱을 생성해주세요.

        </div>

    `;

    selectedCard = null;

    const count =
        document.getElementById("deckCount");

    if (count) {

        count.textContent = "0 / 12";

    }

}