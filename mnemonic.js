const wordlist = [
  "apple", "banana", "cat", "dog", "earth", "forest", "gold", "horse",
  "island", "jungle", "kite", "lion", "moon", "night", "orange", "pearl",
  "queen", "rain", "sun", "tree", "umbrella", "violet", "wolf", "zebra"
];

function generateMnemonic() {
  let mnemonic = [];
  for (let i = 0; i < 12; i++) {
    const randomWord = wordlist[Math.floor(Math.random() * wordlist.length)];
    mnemonic.push(randomWord);
  }
  const result = mnemonic.join(" ");
  localStorage.setItem("mnemonic", result);
  return result;
}