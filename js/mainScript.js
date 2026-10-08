/* sec-about */
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

/* sec-priv */
// 클릭한 칸만 .active, 같은 칸을 다시 누르면 해제
const list = document.querySelector('.priv_list ul');
const items = list.querySelectorAll('.priv');

function toggle(item) {
    const wasActive = item.classList.contains('active');

    items.forEach(el => el.classList.remove('active'));

    if (!wasActive) {
        item.classList.add('active');
    }

    list.classList.toggle('has-active', !wasActive);
}

items.forEach(item => {
    item.addEventListener('click', () => toggle(item));

    item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle(item);
        }
    });
});