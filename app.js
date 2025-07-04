window.onload = function() {
  document.getElementById("walletAddress").value = localStorage.getItem("walletAddress") || generateAddress();
  document.getElementById("btc").textContent = localStorage.getItem("btc") || "2.1345";
  document.getElementById("eth").textContent = localStorage.getItem("eth") || "10.3200";
  loadHistory();
};

function generateAddress() {
  const chars = 'abcdef0123456789';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  localStorage.setItem("walletAddress", address);
  document.getElementById("walletAddress").value = address;
  return address;
}

function copyAddress() {
  const addressField = document.getElementById("walletAddress");
  addressField.select();
  document.execCommand("copy");
  alert("Address copied!");
}

function send() {
  const to = document.getElementById("sendTo").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const coin = document.getElementById("coinType").value;
  if (!to || isNaN(amount) || amount <= 0) {
    alert("Enter valid address and amount.");
    return;
  }

  const current = parseFloat(localStorage.getItem(coin.toLowerCase()) || "0");
  if (amount > current) {
    alert("Insufficient balance.");
    return;
  }

  const newBalance = current - amount;
  localStorage.setItem(coin.toLowerCase(), newBalance.toFixed(4));
  document.getElementById(coin.toLowerCase()).textContent = newBalance.toFixed(4);
  addHistory(`Sent ${amount} ${coin} to ${to}`);
}

function receive() {
  const coin = document.getElementById("coinType").value;
  const current = parseFloat(localStorage.getItem(coin.toLowerCase()) || "0");
  const received = Math.random() * 0.5;
  const newBalance = current + received;
  localStorage.setItem(coin.toLowerCase(), newBalance.toFixed(4));
  document.getElementById(coin.toLowerCase()).textContent = newBalance.toFixed(4);
  addHistory(`Received ${received.toFixed(4)} ${coin}`);
}

function addHistory(entry) {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  history.unshift(entry);
  localStorage.setItem("history", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  const history = JSON.parse(localStorage.getItem("history") || "[]");
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function showBackup() {
  let mnemonic = localStorage.getItem("mnemonic");
  if (!mnemonic) {
    mnemonic = generateMnemonic();
  }
  document.getElementById("mnemonicWords").textContent = mnemonic;
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}