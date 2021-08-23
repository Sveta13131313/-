window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //timer
    function countTimer(deadline) {
        let timerHour = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimerRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timerRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timerRemaining % 60),
                minutes = Math.floor((timerRemaining / 60) % 60),
                hours = Math.floor(timerRemaining / 60 / 60);
            return { timerRemaining, hours, minutes, seconds };
        }

        function upDateClock() {
            let timer = getTimerRemaining();
            if (timer.hours < 10) {
                timer.hours = '0' + timer.hours;
            }
            if (timer.minutes < 10) {
                timer.minutes = '0' + timer.minutes;
            }
            if (timer.seconds < 10) {
                timer.seconds = '0' + timer.seconds;
            }
            timerHour.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;

            if (timer.timerRemaining > 0) {
                setInterval(upDateClock, 1000);
            }
            if (timer.timerRemaining <= 0) {
                timerHour.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        upDateClock();
    }
    countTimer('24 august 2021');
    //toggle
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };
        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
    };
    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');


        let flyInterval;
        let count = 2;
        const clientWidth = document.documentElement.clientWidth;
        const flyAnimate = function() {
            flyInterval = requestAnimationFrame(flyAnimate);
            count++;
            if (count * 35 < clientWidth / 2 && clientWidth > 768) {
                popupContent.style.left = count * 35 + 'px';
            } else {
                cancelAnimationFrame(flyInterval);
                count = 2;
            }
        };
        let animate = false;
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (!animate) {
                    popup.style.display = 'block';
                    flyInterval = requestAnimationFrame(flyAnimate);
                    animate = true;

                }
            });
        });
        popUpClose.addEventListener('click', () => {
            if (animate) {
                popupContent.style.left = 0 + 'px';
                popup.style.display = 'none';
                animate = false;
            }

        });
    };
    togglePopUp();
});
