window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Табы
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.add('hide');
            tabContent[i].classList.remove('show');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    });

    // Таймер
    let deadline = Date.parse(new Date()) + 500*1000; // Можно задать конкретное время в формате 'YYYY-MM-DD'

    function getTimeRemaining(endtime) {
        let t = endtime - Date.parse(new Date()), // Date.parse(endtime) - если задано конкретное время в deadline
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                        if(num <= 9) {
                            return '0' + num;
                        } else return num;
                    };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let moreBtn = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        overlayPopup = document.querySelector('.popup'),
        closeBtn = document.querySelector('.popup-close');
    
    moreBtn.addEventListener('click', function(e) {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', function() {
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
    });

});