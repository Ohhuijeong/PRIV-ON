const iphoneTab = document.querySelector(".device-tabs .iphone");
const galaxyTab = document.querySelector(".device-tabs .galaxy");

const iphoneContent = document.querySelector(".iphone-inner");
const galaxyContent = document.querySelector(".galaxy-inner");

iphoneTab.addEventListener("click", function () {
    iphoneTab.classList.add("active");
    iphoneContent.classList.add("active");

    galaxyTab.classList.remove("active");
    galaxyContent.classList.remove("active");
});

galaxyTab.addEventListener("click", function () {
    galaxyTab.classList.add("active");
    galaxyContent.classList.add("active");

    iphoneTab.classList.remove("active");
    iphoneContent.classList.remove("active");
});

// 권한 카드 3개를 모두 선택
const permissionItems = document.querySelectorAll(
    ".permission-check .list > li"
);

permissionItems.forEach(function (item) {
    item.addEventListener("click", function () {
        // 클릭한 카드가 원래 열려 있었는지 확인
        const isActive = item.classList.contains("active");

        // 모든 카드 닫기
        permissionItems.forEach(function (permissionItem) {
            permissionItem.classList.remove("active");
        });

        // 원래 닫혀 있던 카드라면 열기
        if (!isActive) {
            item.classList.add("active");
        }
    });
});

// 체크박스 전체 선택
const checkInputs = document.querySelectorAll(".check-input");

// 진행률 숫자
const current = document.querySelector(".current");

// 진행 바
const progressBar = document.querySelector(".progress-bar");

// 완료 버튼
const checkButton = document.querySelector(".check-button button");

// 대기·완료 카드 부모
const checkCheckbox = document.querySelector(".check-checkbox");

// 전체 체크박스 개수
const total = checkInputs.length;

// 체크 상태가 바뀔 때마다 실행
checkInputs.forEach(function (input) {
    input.addEventListener("change", function () {
        // 체크된 체크박스만 다시 선택
        const checkedInputs = document.querySelectorAll(
            ".check-input:checked"
        );

        // 체크된 개수
        const checkedCount = checkedInputs.length;

        // 완료 개수 출력
        current.textContent = checkedCount;

        // 진행률 계산
        const progressPercent = (checkedCount / total) * 100;

        // 진행 바 너비 변경
        progressBar.style.width = progressPercent + "%";
    });
});

// 완료 버튼 클릭
checkButton.addEventListener("click", function () {
    const checkedInputs = document.querySelectorAll(
        ".check-input:checked"
    );

    const checkedCount = checkedInputs.length;

    // 체크 항목이 모두 완료됐는지 확인
    if (checkedCount === total) {
        checkCheckbox.classList.add("active");
        checkButton.textContent = "점검 완료!";
    } else {
        alert("체크리스트를 모두 확인해주세요.");
    }
});