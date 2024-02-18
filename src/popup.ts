import '../styles/popup.css';

addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('switch') as HTMLInputElement;

  const id = 'llfiddgnhcoieondlcacmjnndphkdkoc';

  toggleBtn.addEventListener('click', () => {
    chrome.management.setEnabled(id, false);
  });
});
