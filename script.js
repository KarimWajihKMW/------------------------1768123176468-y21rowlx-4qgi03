console.log('Akwadra Super Builder Initialized');

document.addEventListener('DOMContentLoaded', () => {
    // --- Existing Functionality Preservation ---
    const card = document.querySelector('.card');
    if(card) {
        card.addEventListener('click', () => {
            console.log('تم النقر على البطاقة!');
            // alert('أهلاً بك في عالم البناء بدون كود!'); // Commented out to improve flow, or keep if strictly needed. Let's redirect instead.
            openApp();
        });
    }

    // --- New Ride App Logic ---
    const landingPage = document.getElementById('landing-page');
    const appInterface = document.getElementById('app-interface');
    const launchBtn = document.getElementById('launch-app-btn');
    const backBtn = document.getElementById('back-to-home');
    const requestBtn = document.getElementById('request-btn');
    const vehicleOptions = document.querySelectorAll('.vehicle-option');
    const driverInfo = document.getElementById('driver-info');
    const bookingPanel = document.getElementById('booking-panel');
    const cancelRideBtn = document.getElementById('cancel-ride');

    // 1. Transitions
    function openApp() {
        landingPage.classList.add('hide-landing');
        setTimeout(() => {
            landingPage.classList.add('hidden');
            appInterface.classList.remove('hidden');
            // Small delay for fade in
            setTimeout(() => {
                appInterface.classList.add('show-app');
            }, 50);
        }, 500);
    }

    function closeApp() {
        appInterface.classList.remove('show-app');
        setTimeout(() => {
            appInterface.classList.add('hidden');
            landingPage.classList.remove('hidden');
            setTimeout(() => {
                landingPage.classList.remove('hide-landing');
            }, 50);
        }, 500);
    }

    if(launchBtn) launchBtn.addEventListener('click', openApp);
    if(backBtn) backBtn.addEventListener('click', closeApp);

    // 2. Vehicle Selection
    vehicleOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all
            vehicleOptions.forEach(v => {
                v.classList.remove('active');
                v.classList.remove('border-indigo-600');
                v.classList.remove('bg-indigo-50');
                v.classList.add('border-gray-100');
            });

            // Add active class to clicked
            option.classList.add('active');
            option.classList.remove('border-gray-100');
            option.classList.add('border-indigo-600');
            option.classList.add('bg-indigo-50');

            // Update button text with price
            const price = option.getAttribute('data-price');
            const btnText = requestBtn.querySelector('span');
            btnText.textContent = `طلب رحلة (${price} ر.س)`;
        });
    });

    // 3. Request Ride Simulation
    if(requestBtn) {
        requestBtn.addEventListener('click', () => {
            const btnText = requestBtn.querySelector('span');
            const originalText = btnText.textContent;
            
            // Loading state
            btnText.textContent = 'جاري البحث عن سائق...';
            requestBtn.disabled = true;
            requestBtn.classList.add('opacity-75', 'cursor-not-allowed');

            // Simulate API delay
            setTimeout(() => {
                // Hide booking panel, show driver info
                bookingPanel.style.transform = 'translateY(120%)';
                setTimeout(() => {
                    driverInfo.style.transform = 'translateY(0)';
                }, 300);

                // Reset button for next time
                btnText.textContent = originalText;
                requestBtn.disabled = false;
                requestBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            }, 2000);
        });
    }

    // 4. Cancel Ride
    if(cancelRideBtn) {
        cancelRideBtn.addEventListener('click', () => {
            // Hide driver, show booking
            driverInfo.style.transform = 'translateY(120%)';
            setTimeout(() => {
                bookingPanel.style.transform = 'translateY(0)';
            }, 300);
        });
    }
});
