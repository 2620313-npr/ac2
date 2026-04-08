// ===== 화면 DOM =====
const homeScreen = document.getElementById("home-screen");
const routineScreen = document.getElementById("routine-screen");
const addRoutineScreen = document.getElementById("add-routine-screen");
const routineDetailScreen = document.getElementById("routine-detail-screen");

// ===== 버튼 DOM =====
const routinePanel = document.getElementById("routine-panel");
const logPanel = document.getElementById("log-panel");
const backFromRoutine = document.getElementById("back-from-routine");
const goAddRoutine = document.getElementById("go-add-routine");
const backFromAdd = document.getElementById("back-from-add");
const backFromDetail = document.getElementById("back-from-detail");

// ===== 입력 DOM =====
const routineTitleInput = document.getElementById("routine-title-input");
const routineSaveBtn = document.getElementById("routine-save-btn");
const speedInput = document.getElementById("speed-input");
const timeInput = document.getElementById("time-input");

const speedTimeList = document.getElementById("speed-time-list");
const addSpeedTimeBtn = document.getElementById("add-speed-time-btn");

const exerciseSummaryValue = document.getElementById("exercise-summary-value");
const checkSummaryBtn = document.getElementById("check-summary-btn");

const routineList = document.getElementById("routine-list");
const detailTitle = document.getElementById("detail-title");

const resetRoutineBtn = document.getElementById("reset-routine-btn");

// ===== 안전 실행 =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== 화면 전환 =====
  routinePanel?.addEventListener("click", () => {
    homeScreen.classList.add("hidden");
    routineScreen.classList.remove("hidden");
  });

  backFromRoutine?.addEventListener("click", () => {
    routineScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");
  });

  goAddRoutine?.addEventListener("click", () => {
    routineScreen.classList.add("hidden");
    addRoutineScreen.classList.remove("hidden");
  });

  backFromAdd?.addEventListener("click", () => {
    addRoutineScreen.classList.add("hidden");
    routineScreen.classList.remove("hidden");
  });

  backFromDetail?.addEventListener("click", () => {
    routineDetailScreen.classList.add("hidden");
    routineScreen.classList.remove("hidden");
  });

  logPanel?.addEventListener("click", () => {
    alert("운동측정 기능은 나중에 추가 예정!");
  });

  // ===== 행 생성 =====
  function createRow() {
    const row = document.createElement("div");
    row.className = "speed-time-row";

    row.innerHTML = `
      <input type="number" class="panel-input center speed-input" placeholder="속도">
      <span class="divider">:</span>
      <input type="number" class="panel-input center time-input" placeholder="시간">
      <button type="button" class="circle-btn remove-segment-btn">×</button>
    `;

    row.querySelector("button").addEventListener("click", () => {
      row.remove();
    });

    return row;
  }

  addSpeedTimeBtn?.addEventListener("click", () => {
    speedTimeList.appendChild(createRow());
  });

  // ===== 운동량 계산 =====
  function calculate() {
    const rows = document.querySelectorAll(".speed-time-row");

    let totalMin = 0;
    let totalKm = 0;

    rows.forEach(row => {
      const s = parseFloat(row.querySelector(".speed-input")?.value);
      const t = parseFloat(row.querySelector(".time-input")?.value);

      if (!isNaN(s) && !isNaN(t) && s > 0 && t > 0) {
        totalMin += t;
        totalKm += s * (t / 60);
      }
    });

    if (totalMin === 0) {
      exerciseSummaryValue.textContent = "⚠ 입력 없음";
      return null;
    }

    totalKm = Math.round(totalKm * 100) / 100;

    const text = `총 ${totalMin}분 · ${totalKm}km`;
    exerciseSummaryValue.textContent = text;

    return text;
  }

  checkSummaryBtn?.addEventListener("click", calculate);

  // ===== 저장 =====
  routineSaveBtn?.addEventListener("click", () => {
    const title = routineTitleInput.value.trim();

    if (!title) {
      alert("제목 입력해");
      return;
    }

    const summary = calculate();
    if (!summary) {
      alert("속도/시간 입력해");
      return;
    }

    const item = document.createElement("div");
    item.className = "routine-item";

    item.innerHTML = `
      <div class="routine-item-title">${title}</div>
      <div class="routine-item-summary">${summary}</div>
    `;

    item.addEventListener("click", () => {
      detailTitle.textContent = title;
      routineScreen.classList.add("hidden");
      routineDetailScreen.classList.remove("hidden");
    });

    routineList.appendChild(item);

    resetAll();
    addRoutineScreen.classList.add("hidden");
    routineScreen.classList.remove("hidden");
  });

  // ===== 초기화 =====
  function resetAll() {
    routineTitleInput.value = "";

    const rows = document.querySelectorAll(".speed-time-row");
    rows.forEach((row, i) => {
      if (i === 0) {
        row.querySelector(".speed-input").value = "";
        row.querySelector(".time-input").value = "";
      } else {
        row.remove();
      }
    });

    exerciseSummaryValue.textContent = "운동량 계산되지 않음";
  }

  resetRoutineBtn?.addEventListener("click", resetAll);

});
