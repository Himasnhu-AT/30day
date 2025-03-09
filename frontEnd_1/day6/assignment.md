# Day 6 Assignment: CSS Flexbox

## Task 1: Flexbox Navigation Bar

Create a responsive navigation bar using Flexbox with the following requirements:

- The navigation bar should have a logo on the left and navigation links on the right
- On mobile devices (screen width less than 768px), the navigation links should stack vertically
- Include at least 5 navigation links
- Add appropriate styling (colors, padding, hover effects)
- Use Flexbox properties to align and space the elements

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Navigation</title>
    <link rel="stylesheet" href="navigation.css">
</head>
<body>
    <header>
        <nav class="navbar">
            <div class="logo">
                <img src="https://via.placeholder.com/150x50?text=Logo" alt="Logo">
            </div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Portfolio</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <h1>Flexbox Navigation Example</h1>
    </main>
</body>
</html>
```

## Task 2: Flexbox Card Layout

Create a responsive card layout using Flexbox with the following requirements:

- Include at least 6 cards that display product or team member information
- Each card should contain an image, title, text description, and a button
- On desktop, the cards should display in 3 columns
- On tablets, the cards should display in 2 columns
- On mobile devices, the cards should stack vertically
- Use Flexbox properties to create even spacing and alignment

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Card Layout</title>
    <link rel="stylesheet" href="cards.css">
</head>
<body>
    <header>
        <h1>Our Team</h1>
    </header>
    <main>
        <div class="card-container">
            <!-- Create at least 6 of these cards -->
            <div class="card">
                <img src="https://via.placeholder.com/300x200?text=Team+Member" alt="Team Member">
                <h2>John Doe</h2>
                <p class="title">CEO & Founder</p>
                <p>Some text about the person that describes their role or achievements.</p>
                <button>Contact</button>
            </div>
            <!-- More cards here -->
        </div>
    </main>
</body>
</html>
```

## Task 3: Holy Grail Layout with Flexbox

Implement the "Holy Grail" layout using Flexbox. This classic web layout pattern has a header, footer, and three columns (a main content area with sidebars on either side).

Requirements:
- The layout should use the full viewport height
- The header and footer should have fixed heights
- The main content area should expand to fill available space
- The sidebars should have fixed widths
- On mobile devices (screen width less than 768px), the layout should stack vertically (header, left sidebar, main content, right sidebar, footer)
- Use appropriate colors to distinguish the different sections

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Holy Grail Layout</title>
    <link rel="stylesheet" href="holy-grail.css">
</head>
<body>
    <div class="holy-grail">
        <header class="header">
            <h1>Header</h1>
        </header>
        
        <div class="content-wrapper">
            <aside class="sidebar-left">
                <h2>Left Sidebar</h2>
                <ul>
                    <li><a href="#">Link 1</a></li>
                    <li><a href="#">Link 2</a></li>
                    <li><a href="#">Link 3</a></li>
                    <li><a href="#">Link 4</a></li>
                </ul>
            </aside>
            
            <main class="main-content">
                <h2>Main Content</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros in erat dignissim hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras tempor lacus a odio volutpat, non malesuada est pharetra.</p>
                <p>Fusce ultrices sapien eget sem ultrices, at efficitur erat tincidunt. Cras id metus eu est facilisis faucibus. Integer a nunc ut enim porttitor iaculis. Praesent luctus id diam vitae suscipit.</p>
            </main>
            
            <aside class="sidebar-right">
                <h2>Right Sidebar</h2>
                <div class="info-box">
                    <h3>Info</h3>
                    <p>Some additional information or widgets can go here.</p>
                </div>
                <div class="ad-space">
                    <p>Advertising space</p>
                </div>
            </aside>
        </div>
        
        <footer class="footer">
            <p>&copy; 2023 Holy Grail Layout. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
```

## Task 4: Flexible Form Layout

Create a responsive form using Flexbox with the following requirements:

- The form should have two main sections side by side on desktop
- On mobile devices, the sections should stack vertically
- Include at least 3 different types of form elements (text inputs, select dropdown, checkboxes, radio buttons, etc.)
- Use Flexbox to align labels and inputs
- Style the form with appropriate colors, padding, and margins
- Include a submit button that's aligned to the right on desktop and full-width on mobile

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flexbox Form Layout</title>
    <link rel="stylesheet" href="form.css">
</head>
<body>
    <div class="container">
        <h1>Contact Information</h1>
        
        <form class="flex-form">
            <div class="form-section personal-info">
                <h2>Personal Information</h2>
                
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                
                <!-- Add more form elements as needed -->
            </div>
            
            <div class="form-section additional-info">
                <h2>Additional Information</h2>
                
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <select id="subject" name="subject">
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5"></textarea>
                </div>
                
                <div class="form-group checkbox-group">
                    <input type="checkbox" id="subscribe" name="subscribe">
                    <label for="subscribe">Subscribe to newsletter</label>
                </div>
                
                <!-- Add more form elements as needed -->
            </div>
            
            <div class="button-container">
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
</body>
</html>
```

## Submission

Implement each task in separate HTML and CSS files as specified. Run the test case provided to verify your solutions meet the requirements.

## Bonus Challenge

Create a full-page portfolio layout using only Flexbox with the following sections:
- Hero section with your name and a brief introduction
- Skills section with progress bars or skill levels
- Projects section with filterable categories (hint: use flex-grow, order, and data attributes)
- Contact section with social media icons aligned using Flexbox

Make sure the layout is fully responsive and visually appealing. Use CSS transitions or animations to enhance the user experience.