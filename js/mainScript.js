const sw = document.getElementById('sw');
const about = document.getElementById('about');
const suffix = document.getElementById('suffix');
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');

let timer;

sw.addEventListener('change', () => {
    clearTimeout(timer);

    const on = sw.checked;

    about.classList.toggle('on', on);
    suffix.textContent = on ? 'N' : 'FF';

    if (on) {
        c1.classList.add('show');

        timer = setTimeout(() => {
            c2.classList.add('show');
        }, 1000);
    } else {
        c1.classList.remove('show');
        c2.classList.remove('show');
    }
});