// Swipe functionality optimized for tablets
const swipeContainer = document.getElementById('swipeContainer');
const indicators = document.querySelectorAll('.indicator');
let currentView = 0;
const totalViews = 2;

// Touch/Mouse events
let startX = 0;
let currentX = 0;
let isDragging = false;
let startTime = 0;
let touchId = null;

// Swipe threshold optimized for tablets (minimum distance to trigger swipe)
const SWIPE_THRESHOLD = 80; // Increased for better tablet experience
// Minimum velocity for fast swipe (px/ms)
const VELOCITY_THRESHOLD = 0.2; // Lower threshold for easier swiping
// Minimum swipe percentage to trigger change
const SWIPE_PERCENTAGE = 0.15; // 15% of screen width

// Initialize
function init() {
    updateIndicators();
    addEventListeners();
}

// Add event listeners
function addEventListeners() {
    // Touch events - optimized for tablets
    swipeContainer.addEventListener('touchstart', handleStart, { passive: false });
    swipeContainer.addEventListener('touchmove', handleMove, { passive: false });
    swipeContainer.addEventListener('touchend', handleEnd, { passive: true });
    swipeContainer.addEventListener('touchcancel', handleEnd, { passive: true });

    // Mouse events (for desktop testing)
    swipeContainer.addEventListener('mousedown', handleStart);
    swipeContainer.addEventListener('mousemove', handleMove);
    swipeContainer.addEventListener('mouseup', handleEnd);
    swipeContainer.addEventListener('mouseleave', handleEnd);

    // Prevent default touch behavior on container
    swipeContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            // Allow single touch for swiping
        }
    }, { passive: true });

    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToView(index));
        indicator.addEventListener('touchend', (e) => {
            e.preventDefault();
            goToView(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToView(currentView - 1);
        } else if (e.key === 'ArrowRight') {
            goToView(currentView + 1);
        }
    });
}

// Handle start of drag
function handleStart(e) {
    // Only handle single touch
    if (e.touches && e.touches.length > 1) return;
    
    const touch = e.touches ? e.touches[0] : null;
    const clientX = touch ? touch.clientX : e.clientX;
    
    startX = clientX;
    currentX = clientX;
    isDragging = true;
    startTime = Date.now();
    touchId = touch ? touch.identifier : null;
    
    swipeContainer.style.transition = 'none';
    swipeContainer.style.cursor = 'grabbing';
}

// Handle drag movement
function handleMove(e) {
    if (!isDragging) return;
    
    // Get the correct touch if multiple touches
    let touch = null;
    if (e.touches) {
        if (touchId !== null) {
            // Find the touch with matching identifier
            for (let i = 0; i < e.touches.length; i++) {
                if (e.touches[i].identifier === touchId) {
                    touch = e.touches[i];
                    break;
                }
            }
        } else if (e.touches.length === 1) {
            touch = e.touches[0];
        } else {
            return; // Multiple touches, ignore
        }
    }
    
    const clientX = touch ? touch.clientX : e.clientX;
    currentX = clientX;
    
    const deltaX = currentX - startX;
    const screenWidth = window.innerWidth;
    const translateX = -(currentView * 50) + (deltaX / screenWidth) * 50;
    
    // Prevent default scrolling while swiping
    if (Math.abs(deltaX) > 10) {
        e.preventDefault();
    }
    
    // Limit translation with elastic effect
    if (translateX > 0) {
        // Elastic effect when trying to swipe past first view
        const resistance = Math.min(translateX * 0.3, 5);
        swipeContainer.style.transform = `translateX(${resistance}%)`;
    } else if (translateX < -50) {
        // Elastic effect when trying to swipe past last view
        const overSwipe = translateX + 50;
        const resistance = -50 + (overSwipe * 0.3);
        swipeContainer.style.transform = `translateX(${resistance}%)`;
    } else {
        swipeContainer.style.transform = `translateX(${translateX}%)`;
    }
}

// Handle end of drag
function handleEnd(e) {
    if (!isDragging) return;
    
    isDragging = false;
    touchId = null;
    swipeContainer.style.cursor = '';
    swipeContainer.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    const deltaX = currentX - startX;
    const deltaTime = Date.now() - startTime;
    const screenWidth = window.innerWidth;
    const velocity = Math.abs(deltaX / deltaTime);
    const swipePercentage = Math.abs(deltaX / screenWidth);
    
    // Determine if we should change view
    // Check both distance and velocity, or percentage of screen
    const shouldSwipe = Math.abs(deltaX) > SWIPE_THRESHOLD || 
                       velocity > VELOCITY_THRESHOLD || 
                       swipePercentage > SWIPE_PERCENTAGE;
    
    if (shouldSwipe) {
        if (deltaX > 0 && currentView > 0) {
            // Swipe right - go to previous view
            goToView(currentView - 1);
        } else if (deltaX < 0 && currentView < totalViews - 1) {
            // Swipe left - go to next view
            goToView(currentView + 1);
        } else {
            // Return to current view
            goToView(currentView);
        }
    } else {
        // Return to current view
        goToView(currentView);
    }
}

// Go to specific view
function goToView(viewIndex) {
    if (viewIndex < 0 || viewIndex >= totalViews) return;
    
    currentView = viewIndex;
    const translateX = -(currentView * 50);
    swipeContainer.style.transform = `translateX(${translateX}%)`;
    updateIndicators();
}

// Update indicators
function updateIndicators() {
    indicators.forEach((indicator, index) => {
        if (index === currentView) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);
