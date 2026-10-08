        // 도넛 차트: 화면에 보일 때마다 0부터 차오르기
        const donuts = document.querySelectorAll('.donut');

        // '동작 줄이기' 설정한 사용자는 애니메이션 없이 바로 표시 (접근성)
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (!reduceMotion && 'IntersectionObserver' in window) {
            // 1) 처음엔 전부 0으로 대기
            donuts.forEach(function (donut) {
                reset(donut);
            });

            // 2) 보이는 비율이 0%, 50%를 지날 때마다 확인
            const observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    const donut = entry.target;

                    // 50% 이상 보이고, 아직 재생 전이면 → 재생
                    if (entry.intersectionRatio >= 0.5 && !donut.classList.contains('is-play')) {
                        play(donut);
                    }

                    // 화면 밖으로 완전히 나가면 → 0으로 되돌리기
                    if (!entry.isIntersecting) {
                        reset(donut);
                    }
                });
            }, { threshold: [0, 0.5] });

            donuts.forEach(function (donut) {
                observer.observe(donut);
            });
        }

        // 재생: 게이지 차오르기 + 숫자 올라가기
        function play(donut) {
            donut.classList.add('is-play');
            donut.classList.remove('is-wait');
            countUp(donut);
        }

        // 초기화: 게이지 0, 숫자 0%
        function reset(donut) {
            donut.classList.add('is-wait');
            donut.classList.remove('is-play');            // transition 없어서 0으로 즉시 돌아감
            cancelAnimationFrame(donut.rafId);            // 숫자 올라가던 중이면 멈춤
            donut.querySelector('.num').textContent = '0%';
        }

        // 가운데 숫자 0% → 54.7% (게이지와 같은 1.6초)
        function countUp(donut) {
            const target = parseFloat(getComputedStyle(donut).getPropertyValue('--target'));
            const numEl = donut.querySelector('.num');
            const duration = 1600;
            const start = performance.now();

            function tick(now) {
                const progress = Math.min((now - start) / duration, 1); // 0 ~ 1 진행률
                const eased = 1 - Math.pow(1 - progress, 3);            // 끝으로 갈수록 느려지게
                numEl.textContent = (target * eased).toFixed(1) + '%';
                if (progress < 1) {
                    donut.rafId = requestAnimationFrame(tick);          // 멈출 수 있게 번호 저장
                }
            }
            donut.rafId = requestAnimationFrame(tick);
        }


/* 3번째 섹션 sec-rick-data */

// 3번 섹션 숫자 카드: 화면에 들어올 때마다 순서대로 나타나기
const statList = document.querySelector('.stat-list');

if (statList) {
    // JS가 실행될 때만 숨김 → JS 오류가 나도 카드가 사라지지 않음
    statList.classList.add('ani');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.3) {
                // 30% 이상 보이면 → 나타나기
                statList.classList.add('show');
            } else if (!entry.isIntersecting) {
                // 화면 밖으로 완전히 나가면 → 초기화 (다음에 또 실행)
                statList.classList.remove('show');
            }
        });
    }, { threshold: [0, 0.3] }); // 0%(완전히 나감), 30%(들어옴) 두 지점 감시

    observer.observe(statList);
}
