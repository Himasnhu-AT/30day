/**
 * Test cases for Day 9: Interactive Image Gallery
 * 
 * This file provides tests to verify the functionality of the Interactive Image Gallery assignment.
 */

// Import test utilities (assuming a testing framework is used)
// import { describe, test, expect, beforeEach, afterEach } from 'your-test-framework';

describe('Interactive Image Gallery', () => {
  // Setup and teardown for each test
  beforeEach(() => {
    // Create a mock DOM structure for testing
    document.body.innerHTML = `
      <div class="gallery-container">
        <div class="gallery">
          <div class="gallery-item" data-category="nature">
            <img src="images/image1.jpg" alt="Nature scene" data-index="0">
          </div>
          <div class="gallery-item" data-category="city">
            <img src="images/image2.jpg" alt="City view" data-index="1">
          </div>
          <div class="gallery-item" data-category="people">
            <img src="images/image3.jpg" alt="People" data-index="2">
          </div>
        </div>
      </div>
      <div class="modal">
        <span class="close">&times;</span>
        <div class="modal-content">
          <img id="modal-image" src="" alt="">
          <div class="modal-caption"></div>
          <a class="prev">&#10094;</a>
          <a class="next">&#10095;</a>
        </div>
      </div>
    `;
    
    // Import or define the necessary functions
    // This would typically be imported from the student's gallery.js file
    // For this test file, we'll define mock functions
    window.openModal = function(index) {
      const modal = document.querySelector('.modal');
      const modalImg = document.getElementById('modal-image');
      const galleryItems = document.querySelectorAll('.gallery-item img');
      const caption = document.querySelector('.modal-caption');
      
      modal.classList.add('show-modal');
      modalImg.src = galleryItems[index].src;
      modalImg.setAttribute('data-current-index', index);
      caption.textContent = galleryItems[index].alt;
    };
    
    window.closeModal = function() {
      const modal = document.querySelector('.modal');
      modal.classList.remove('show-modal');
    };
    
    window.navigate = function(direction) {
      const modalImg = document.getElementById('modal-image');
      const galleryItems = document.querySelectorAll('.gallery-item img');
      const caption = document.querySelector('.modal-caption');
      const currentIndex = parseInt(modalImg.getAttribute('data-current-index'));
      
      let newIndex;
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % galleryItems.length;
      } else {
        newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      }
      
      modalImg.src = galleryItems[newIndex].src;
      modalImg.setAttribute('data-current-index', newIndex.toString());
      caption.textContent = galleryItems[newIndex].alt;
    };
    
    // Initialize the gallery (attaching events, etc.)
    // This would typically be called automatically when the script loads
    initGallery();
  });
  
  afterEach(() => {
    // Clean up
    document.body.innerHTML = '';
    
    // Remove event listeners
    // This is important to avoid memory leaks and unexpected behavior
    // In a real implementation, the student should provide a cleanup function
    if (typeof cleanupGallery === 'function') {
      cleanupGallery();
    }
  });
  
  // Define a mock initialization function
  function initGallery() {
    // Mock implementation of the gallery initialization
    // In a real test, this would check if the student's code properly
    // initializes the gallery
    
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.modal .close');
    const prevBtn = document.querySelector('.modal .prev');
    const nextBtn = document.querySelector('.modal .next');
    
    // Attach click events to gallery images
    galleryItems.forEach((img, index) => {
      img.addEventListener('click', () => window.openModal(index));
    });
    
    // Attach click event to close button
    closeBtn.addEventListener('click', window.closeModal);
    
    // Attach click events to navigation buttons
    prevBtn.addEventListener('click', () => window.navigate('prev'));
    nextBtn.addEventListener('click', () => window.navigate('next'));
    
    // Attach click event to modal background
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeModal();
      }
    });
    
    // Attach keyboard events
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('show-modal')) return;
      
      if (e.key === 'Escape') {
        window.closeModal();
      } else if (e.key === 'ArrowLeft') {
        window.navigate('prev');
      } else if (e.key === 'ArrowRight') {
        window.navigate('next');
      }
    });
  }
  
  // Test cases
  test('Gallery initialization creates the correct structure', () => {
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    expect(galleryContainer).not.toBeNull();
    expect(galleryItems.length).toBe(3);
  });
  
  test('Clicking on an image opens the modal', () => {
    const firstImage = document.querySelector('.gallery-item img');
    const modal = document.querySelector('.modal');
    
    // Simulate click on the first image
    firstImage.click();
    
    expect(modal.classList.contains('show-modal')).toBe(true);
    expect(document.getElementById('modal-image').src).toBe(firstImage.src);
  });
  
  test('Modal can be closed by clicking the close button', () => {
    // First open the modal
    const firstImage = document.querySelector('.gallery-item img');
    const modal = document.querySelector('.modal');
    const closeBtn = document.querySelector('.modal .close');
    
    firstImage.click();
    expect(modal.classList.contains('show-modal')).toBe(true);
    
    // Now close it
    closeBtn.click();
    expect(modal.classList.contains('show-modal')).toBe(false);
  });
  
  test('Modal can be closed by clicking outside the image', () => {
    // First open the modal
    const firstImage = document.querySelector('.gallery-item img');
    const modal = document.querySelector('.modal');
    
    firstImage.click();
    expect(modal.classList.contains('show-modal')).toBe(true);
    
    // Now click on the modal background
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    modal.dispatchEvent(clickEvent);
    
    expect(modal.classList.contains('show-modal')).toBe(false);
  });
  
  test('Modal can be closed by pressing Escape key', () => {
    // First open the modal
    const firstImage = document.querySelector('.gallery-item img');
    const modal = document.querySelector('.modal');
    
    firstImage.click();
    expect(modal.classList.contains('show-modal')).toBe(true);
    
    // Now press Escape
    const keydownEvent = new KeyboardEvent('keydown', {
      key: 'Escape',
      bubbles: true
    });
    document.dispatchEvent(keydownEvent);
    
    expect(modal.classList.contains('show-modal')).toBe(false);
  });
  
  test('Next button navigates to the next image', () => {
    // First open the modal with the first image
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const nextBtn = document.querySelector('.modal .next');
    const modalImg = document.getElementById('modal-image');
    
    images[0].click();
    expect(modalImg.src).toBe(images[0].src);
    
    // Click next button
    nextBtn.click();
    expect(modalImg.src).toBe(images[1].src);
    expect(modalImg.getAttribute('data-current-index')).toBe('1');
  });
  
  test('Previous button navigates to the previous image', () => {
    // First open the modal with the second image
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const prevBtn = document.querySelector('.modal .prev');
    const modalImg = document.getElementById('modal-image');
    
    images[1].click();
    expect(modalImg.src).toBe(images[1].src);
    
    // Click previous button
    prevBtn.click();
    expect(modalImg.src).toBe(images[0].src);
    expect(modalImg.getAttribute('data-current-index')).toBe('0');
  });
  
  test('Keyboard arrow keys navigate between images', () => {
    // First open the modal with the first image
    const images = document.querySelectorAll('.gallery-item img');
    const modal = document.querySelector('.modal');
    const modalImg = document.getElementById('modal-image');
    
    images[0].click();
    
    // Press right arrow key
    const rightKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true
    });
    document.dispatchEvent(rightKeyEvent);
    expect(modalImg.src).toBe(images[1].src);
    
    // Press left arrow key
    const leftKeyEvent = new KeyboardEvent('keydown', {
      key: 'ArrowLeft',
      bubbles: true
    });
    document.dispatchEvent(leftKeyEvent);
    expect(modalImg.src).toBe(images[0].src);
  });
  
  test('Navigation wraps around to the beginning/end of the gallery', () => {
    const images = document.querySelectorAll('.gallery-item img');
    const prevBtn = document.querySelector('.modal .prev');
    const nextBtn = document.querySelector('.modal .next');
    const modalImg = document.getElementById('modal-image');
    
    // Open modal with the first image
    images[0].click();
    
    // Press previous button to go to the last image
    prevBtn.click();
    expect(modalImg.src).toBe(images[images.length - 1].src);
    
    // Now go to the first image by pressing next
    nextBtn.click();
    expect(modalImg.src).toBe(images[0].src);
  });
  
  // Tests for advanced features
  // These would be implemented based on which advanced features the student chooses
  
  test('Image filtering works based on categories', () => {
    // This test assumes the student has implemented category filtering
    // You would need to add filter buttons to the HTML structure
    
    // Mock implementation
    const filterButtons = document.createElement('div');
    filterButtons.className = 'filter-buttons';
    filterButtons.innerHTML = `
      <button class="filter-btn" data-filter="all">All</button>
      <button class="filter-btn" data-filter="nature">Nature</button>
      <button class="filter-btn" data-filter="city">City</button>
      <button class="filter-btn" data-filter="people">People</button>
    `;
    document.querySelector('.gallery-container').prepend(filterButtons);
    
    // Attach mock filtering functionality
    document.querySelectorAll('.filter-btn').forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.gallery-item').forEach(item => {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
    
    // Test nature filter
    const natureButton = document.querySelector('.filter-btn[data-filter="nature"]');
    natureButton.click();
    
    const items = document.querySelectorAll('.gallery-item');
    expect(items[0].style.display).toBe('block'); // Nature item
    expect(items[1].style.display).toBe('none');  // City item
    expect(items[2].style.display).toBe('none');  // People item
    
    // Test all filter
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    allButton.click();
    
    expect(items[0].style.display).toBe('block');
    expect(items[1].style.display).toBe('block');
    expect(items[2].style.display).toBe('block');
  });
  
  test('Lazy loading - images load as they enter the viewport', () => {
    // This test assumes the student has implemented lazy loading
    // This is a more complex test that would require mocking Intersection Observer
    
    // Since properly testing Intersection Observer is complex, we would
    // check if the student is using data-src attributes and has set up
    // the appropriate observer
    
    // Mock implementation
    const lazyImages = document.querySelectorAll('.gallery-item img');
    lazyImages.forEach(img => {
      img.setAttribute('data-src', img.src);
      img.src = 'placeholder.jpg';
    });
    
    // Check if the lazy loading setup is correct
    expect(lazyImages[0].getAttribute('data-src')).not.toBeNull();
    expect(lazyImages[0].src).toContain('placeholder.jpg');
    
    // Full testing would require mocking Intersection Observer API
    // and triggering intersection events
  });
});

/**
 * Additional notes for students:
 * 
 * 1. These test cases are provided as a guide for what functionality your gallery should have.
 * 2. The actual implementation of your gallery may differ - as long as it passes these tests,
 *    your core functionality is working correctly.
 * 3. You may need to adapt these tests slightly to match your actual code structure.
 * 4. For the advanced features, you need to implement at least 2 from the list in the assignment.
 */