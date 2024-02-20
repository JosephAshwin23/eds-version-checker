import '../styles/popup.css';

addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('switch') as HTMLInputElement;

  const id =
    process.env.NODE_ENV === 'development'
      ? 'llfiddgnhcoieondlcacmjnndphkdkoc'
      : 'koggbkcbcigigcmjomnnhmjhgbaleool';

  toggleBtn.addEventListener('click', () => {
    chrome.management.setEnabled(id, false);
  });
});
