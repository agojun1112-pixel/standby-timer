/* ===== 時計の数字配置 ===== */
const numbersContainer = document.getElementById("numbers");
const radius = 115; // 数字の円半径（時計サイズに合わせて調整）

for (let i = 1; i <= 12; i++) {
  const num = document.createElement("div");
  num.className = "number";
  num.textContent = i;

  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
  const x = 130 + radius * Math.cos(angle);
  const y = 130 + radius * Math.sin(angle);

  num.style.left = `${x}px`;
  num.style.top = `${y}px`;

  numbersContainer.appendChild(num);
}

function flashButton(btn, keep=false){
  btn.classList.add("active");
  if(!keep){
    setTimeout(()=>btn.classList.remove("active"),300);
  }
}
function startTimer(btn){
  if(timerId) return;

  flashButton(btn, true);     // 赤く保持
  document.getElementById("btnStop").classList.remove("active");

  timerId = setInterval(()=>{
    seconds += countdown ? -1 : 1;
    render();
    if (countdown && seconds <= 0) {
      stopTimer(document.getElementById("btnStop"));
      seconds = 0;
      render();
    }
  },1000);
}
function stopTimer(btn){
  clearInterval(timerId);
  timerId = null;

  flashButton(btn);
  document.getElementById("btnStart").classList.remove("active");
}
function resetTimer(btn){
  stopTimer(document.getElementById("btnStop"));
  seconds = 0;
  countdown = false;
  render();

  flashButton(btn);
}

let isRunning = false;

// タイマー開始
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  lockSettings(true);
  // タイマー処理開始
}

// タイマー停止
function stopTimer() {
  isRunning = false;
  lockSettings(false);
  // タイマー停止処理
}

// 設定ロック制御
function lockSettings(lock) {
  const settingButtons = document.querySelectorAll(".lockable");

  settingButtons.forEach(btn => {
    btn.disabled = lock;
    btn.classList.toggle("locked", lock);
  });
}
