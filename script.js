document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // geser-geser banner
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel-image');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateCarousel(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel(currentIndex);
    }

    setInterval(nextSlide, 5000);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // ganti tab
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    const tripTypeRadios = document.querySelectorAll('input[name="trip-type"]');
    const sekaliJalanContent = document.getElementById('sekali-jalan-content');
    const pulangPergiContent = document.getElementById('pulang-pergi-content');

    tripTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'sekali-jalan') {
                sekaliJalanContent.style.display = 'block';
                pulangPergiContent.style.display = 'none';
            } else if (radio.value === 'pulang-pergi') {
                sekaliJalanContent.style.display = 'none';
                pulangPergiContent.style.display = 'block';
            }
        });
    });

    // ngatur penumpang
    const passengerDropdowns = document.querySelectorAll('.passenger-dropdown');

    passengerDropdowns.forEach(dropdown => {
        const passengerTrigger = dropdown.querySelector('.passenger-trigger');
        const passengerMenu = dropdown.querySelector('.passenger-menu');
        const counts = {
            adult: 0,
            child: 0,
            infant: 0
        };

        passengerTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            passengerMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                passengerMenu.classList.remove('show');
            }
        });

        dropdown.querySelectorAll('.counter-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = button.dataset.type;
                const isPlus = button.classList.contains('plus');
                const countDisplay = button.parentElement.querySelector('.count');
                
                if (isPlus) {
                    if (type === 'infant' && counts.infant >= counts.adult) {
                        alert('Jumlah penumpang bayi tidak boleh melebihi jumlah penumpang dewasa');
                        return;
                    }
                    counts[type]++;
                } else {
                    if (counts[type] > 0) {
                        counts[type]--;
                        if (type === 'adult' && counts.infant > counts.adult - 1) {
                            counts.infant = counts.adult - 1;
                            dropdown.querySelector('#infantCount').textContent = counts.infant;
                        }
                    }
                }
                
                countDisplay.textContent = counts[type];
                
                updateTriggerText(passengerTrigger, counts);
            });
        });
    });

    function updateTriggerText(trigger, counts) {
        let text = [];
        if (counts.adult > 0) text.push(`${counts.adult} Dewasa`);
        if (counts.child > 0) text.push(`${counts.child} Anak`);
        if (counts.infant > 0) text.push(`${counts.infant} Bayi`);
        
        trigger.textContent = text.length > 0 ? text.join(', ') : 'Penumpang';
    }

    // status pesawat
    const radios = document.querySelectorAll('input[name="flight-status"]');
    const kotaContent = document.getElementById('kota-content');
    const nomorContent = document.getElementById('nomor-penerbangan-content');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'kota') {
                kotaContent.style.display = 'block';
                nomorContent.style.display = 'none';
            } else if (radio.value === 'nomor-penerbangan') {
                kotaContent.style.display = 'none';
                nomorContent.style.display = 'block';
            }
        });
    });

    // tombol swap
    const swapButtons = document.querySelectorAll('.swap-btn');
    swapButtons.forEach(swapBtn => {
        swapBtn.addEventListener('click', function() {
            const container = this.closest('.row');
            const fromSelect = container.querySelector('select[aria-label="From"]');
            const toSelect = container.querySelector('select[aria-label="To"]');

            if (fromSelect && toSelect) {
                const tempValue = fromSelect.value;
                const tempText = fromSelect.options[fromSelect.selectedIndex].text;

                fromSelect.value = toSelect.value;
                fromSelect.options[fromSelect.selectedIndex].text = toSelect.options[toSelect.selectedIndex].text;

                toSelect.value = tempValue;
                toSelect.options[toSelect.selectedIndex].text = tempText;
            }
        });
    });
});

