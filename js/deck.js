// ==========================================
// Deck Selection State
// ==========================================

let selectedSupport = null;

let selectedSpecials = [];

// ==========================================
// Deck Page
// ==========================================

function showDeckPage() {

    const page = document.getElementById("deckPage");

    page.innerHTML = `

    <div class="deck-page">

        <div class="deck-card">

            <div class="deck-header" id="deckHeader">

                <div>

                    <h2>덱 설정</h2>

                    <p>
                        보조직업 1개 / 특수직업 5개를 선택하세요.
                    </p>

                </div>

                <div class="count-badge">

                    <span id="specialCount">

                        0 / 5

                    </span>

                </div>

            </div>

            <div class="deck-section">

                <h3>기본 직업</h3>

                <div
                    class="default-list"
                    id="defaultList">

                </div>

            </div>

            <div class="deck-section">

                <h3>보조 직업</h3>

                <div
                    class="option-grid"
                    id="supportGrid">

                </div>

            </div>

            <div class="deck-section">

                <h3>특수 직업</h3>

                <div
                    class="special-grid"
                    id="specialGrid">

                </div>

            </div>

            <div class="deck-footer">

                <button id="createDeck">

                    덱 생성

                </button>

            </div>

        </div>

    </div>

    `;

    createDefaultRoles();

    createSupportRoles();

    createSpecialRoles();

    restoreDeckSelection();

    bindDeckEvents();

}


// ==========================================
// Default Roles
// ==========================================

function createDefaultRoles() {

    const box = document.getElementById("defaultList");

    box.innerHTML = "";

    defaultDeck.forEach(role => {

        box.insertAdjacentHTML(

            "beforeend",

            `

            <div class="default-role">

                ${role}

            </div>

            `

        );

    });

}


// ==========================================
// Support Roles
// ==========================================

function createSupportRoles() {

    const grid = document.getElementById("supportGrid");

    grid.innerHTML = "";

    supportRoles.forEach((role, index) => {

        grid.insertAdjacentHTML(

            "beforeend",

            `

            <div class="option-card">

                <input
                    type="radio"
                    id="support${index}"
                    name="support"
                    value="${role}">

                <label for="support${index}">

                    ${role}

                </label>

            </div>

            `

        );

    });

}

// ==========================================
// Special Roles
// ==========================================

function createSpecialRoles() {

    const grid = document.getElementById("specialGrid");

    grid.innerHTML = "";

    specialRoles.forEach((role, index) => {

        grid.insertAdjacentHTML(

            "beforeend",

            `

            <div class="option-card">

                <input
                    type="checkbox"
                    class="special"
                    id="special${index}"
                    value="${role}">

                <label for="special${index}">

                    ${role}

                </label>

            </div>

            `

        );

    });

}


// ==========================================
// Event
// ==========================================

function bindDeckEvents() {

    const specialChecks =
        document.querySelectorAll(".special");

    const count =
        document.getElementById("specialCount");


    // 특수직업 최대 5개

    specialChecks.forEach(check => {

        check.addEventListener("change", () => {

            let checked = document.querySelectorAll(
                ".special:checked"
            ).length;

            if (checked > 5) {

                check.checked = false;

                checked--;

                alert("특수직업은 5개만 선택할 수 있습니다.");

            }

            count.textContent = `${checked} / 5`;

        });

    });

    // 덱 생성 버튼

    document
        .getElementById("createDeck")
        .addEventListener(
            "click",
            createDeck
        );

}

// ==========================================
// Create Deck
// ==========================================

function createDeck() {

    // 보조직업

    const support = document.querySelector(
        "input[name='support']:checked"
    );

    if (!support) {

        alert("보조직업을 선택하세요.");

        return;

    }

    // 특수직업

    const specials = document.querySelectorAll(
        ".special:checked"
    );

    if (specials.length !== 5) {

        alert("특수직업은 5개를 선택해야 합니다.");

        return;

    }

    // 덱 초기화

    currentDeck.length = 0;

    // 기본 직업

    currentDeck.push("마피아");
    currentDeck.push("마피아");
    currentDeck.push("마피아");

    // 보조직업

    currentDeck.push(support.value);

    // 기본 직업

    currentDeck.push("자경단원");
    currentDeck.push("의사");

    // 선택 저장

    selectedSupport = support.value;

    selectedSpecials = [];

    specials.forEach(item => {

        selectedSpecials.push(item.value);

    });

    // 특수직업 5명

    specials.forEach(item => {

        currentDeck.push(item.value);

    });

    // 시민

    currentDeck.push("시민");

    // 우측 카드 출력

    renderDeck();

    const deckCount=document.getElementById("deckCount");

    if(deckCount){

        deckCount.textContent=`${currentDeck.length} / 12`;

    }

    // 모달 닫기

    closeDeckModal(true);

}

// ==========================================
// Deck Modal
// ==========================================

function openDeckModal() {

    showDeckPage();

    const modal = document.getElementById("deckModal");

    modal.classList.remove("hidden");

    bindModalEvents();

}

function closeDeckModal(force = false) {

    // 덱이 없으면 강제로 닫을 수 없음
    if(!force && currentDeck.length === 0){

        alert("먼저 덱을 생성해주세요.");

        return;

    }

    const modal = document.getElementById("deckModal");

    modal.classList.add("hidden");

    document.removeEventListener("keydown", escCloseHandler);

}

// ==========================================
// Restore Selection
// ==========================================

function restoreDeckSelection(){

    if(selectedSupport){

        const radio = document.querySelector(

            `input[name="support"][value="${selectedSupport}"]`

        );

        if(radio){

            radio.checked = true;

        }

    }

    selectedSpecials.forEach(role=>{

        const check = document.querySelector(

            `.special[value="${role}"]`

        );

        if(check){

            check.checked = true;

        }

    });

    const count = document.getElementById("specialCount");

    if(count){

        count.textContent = `${selectedSpecials.length} / 5`;

    }

}

// ==========================================
// Modal Events
// ==========================================

function bindModalEvents(){

    const modal = document.getElementById("deckModal");

    modal.onclick = function(e){

        if(e.target === modal){

            closeDeckModal();

        }

    };

    document.addEventListener("keydown", escCloseHandler);

}

function escCloseHandler(e){

    if(e.key !== "Escape"){

        return;

    }

    if(currentDeck.length === 0){

        return;

    }

    closeDeckModal();

}