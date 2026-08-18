// ==========================================
// App
// ==========================================

window.addEventListener("DOMContentLoaded", init);


// ==========================================
// Initialize
// ==========================================

function init() {

    initTimeTable();

    bindMenu();

    renderDeck();

    // 프로그램 시작 시 덱 설정 표시
    openDeckModal();

}


// ==========================================
// Menu
// ==========================================

function bindMenu() {

    document
        .getElementById("deckBtn")
        .addEventListener("click", () => {

            activateMenu("deckBtn");

            openDeckModal();

        });


    document
        .getElementById("newGameBtn")
        .addEventListener("click", newGame);

}


// ==========================================
// Menu Active
// ==========================================

function activateMenu(id) {

    document
        .querySelectorAll(".menu-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });

    document
        .getElementById(id)
        .classList.add("active");

}


// ==========================================
// New Game
// ==========================================

function newGame() {

    if (!confirm("새 게임을 시작하시겠습니까?")) {

        return;

    }

    currentDeck.length = 0;

    selectedSupport = null;

    selectedSpecials = [];

    const deckCount = document.getElementById("deckCount");

    if (deckCount) {

        deckCount.textContent = "0 / 12";

    }

    currentTurn = 1;

    editMode = false;

    selectedRow = null;

    lastRecord = null;
    
    renderDeck();

    initTimeTable();

    activateMenu("deckBtn");

    // 새 게임이면 덱 다시 선택
    openDeckModal();

}