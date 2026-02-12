let yesScale = 1; 
let yesTexts = ["Có", "Đồng ý", ":))) Hong nhấn được đâu", "Nút này nò", "Đừng nhấn nút đó nò"]; 
let yesIndex = 0;
let customTextWhenCovered = "Oi thoi chếch lỡ che mất òi😗 ";

function loginAction() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageBox = document.getElementById("messageBox");

  if (username === "" || password === "") {
    messageBox.innerText = "Vui lòng nhập đầy đủ!";
    return;
  }

  messageBox.innerText = "";
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("letterBox").style.display = "block";
}

function exitAction() {
  document.getElementById("customDialog").style.display = "block";
}
function confirmExit(choice) {
  document.getElementById("customDialog").style.display = "none";
  if (choice) {
    document.getElementById("letterBox").style.display = "none";
    document.getElementById("loginBox").style.display = "block";
  }
}

function letterYes() {
  alert("Bạn đã chọn nút: " + document.getElementById("yesBtn").innerText);
}

function letterNo() {
  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  const rect = noBtn.getBoundingClientRect();
  const x = rect.left;
  const y = rect.top;

  // Khung Không chạy đi ngẫu nhiên
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
  noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";

  // Khung Có nhảy tới vị trí cũ của Khung Không
  yesBtn.style.position = "absolute";
  yesBtn.style.left = x + "px";
  yesBtn.style.top = y + "px";

  // 👉 Khung Có tăng thêm 0.5 lần mỗi lần nhấn, nhưng giới hạn kích thước
  yesScale += 0.5;
  const maxWidth = window.innerWidth - 100;   // chừa khoảng trống
  const maxHeight = window.innerHeight - 100; // chừa khoảng trống

  const newWidth = Math.min(yesScale * 100, maxWidth);
  const newHeight = Math.min(yesScale * 60, maxHeight);

  yesBtn.style.width = newWidth + "px";
  yesBtn.style.height = newHeight + "px";
  yesBtn.style.fontSize = Math.min(yesScale * 16, 48) + "px"; // giới hạn font-size

  // 👉 Nội dung thay đổi theo khung Có
  yesIndex = (yesIndex + 1) % yesTexts.length;
  yesBtn.innerText = yesTexts[yesIndex];

  // Kiểm tra nếu khung Có che hoàn toàn khung Không
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const fullyCovered = (
    yesRect.left <= noRect.left &&
    yesRect.top <= noRect.top &&
    yesRect.right >= noRect.right &&
    yesRect.bottom >= noRect.bottom
  );

  if (fullyCovered) {
    yesBtn.innerText = customTextWhenCovered;
    yesBtn.style.backgroundColor = "lightyellow";
    yesBtn.style.borderColor = "orange";
    yesBtn.style.color = "darkred";
    noBtn.disabled = true;
  } else {
    // 👉 Khi chưa che hoàn toàn
    noBtn.disabled = false;
    yesBtn.style.backgroundColor = "white";
    yesBtn.style.borderColor = "red";
    yesBtn.style.color = "black";
  }
}

/* --------------------------
   Hiệu ứng trái tim bay nền
--------------------------- */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const emojis = ["❤️","💕","💖","💜","💘","💞"];
  heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.bottom = "0px";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}

// 👉 tạo trái tim mới mỗi 500ms
setInterval(createHeart, 500);