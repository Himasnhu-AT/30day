# Day 7 Assignment: CSS Grid

## Task 1: Basic Grid Layout

Create a responsive photo gallery using CSS Grid with the following requirements:

- Include at least 12 images (you can use placeholder images)
- Layout should adapt to different screen sizes:
  - 1 column on small screens (under 576px)
  - 2 columns on medium screens (576px - 768px)
  - 3 columns on large screens (768px - 992px)
  - 4 columns on extra large screens (992px and up)
- All grid cells should have consistent height
- Add gap between grid items
- Make images fill their containers while maintaining aspect ratio

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Gallery</title>
    <link rel="stylesheet" href="gallery.css">
</head>
<body>
    <div class="container">
        <h1>Photo Gallery</h1>
        <div class="gallery">
            <!-- Add your gallery items here -->
            <div class="gallery-item">
                <img src="https://via.placeholder.com/800x600?text=Image+1" alt="Gallery Image 1">
            </div>
            <!-- Add more items to meet the requirements -->
        </div>
    </div>
</body>
</html>
```

## Task 2: Grid Template Areas

Create a website layout using CSS Grid template areas that includes the following sections:

- Header
- Navigation menu
- Main content area
- Sidebar
- Footer

The layout should adapt to different screen sizes:
- On larger screens (768px and up): Header, navigation, main content, sidebar, and footer should be laid out in a traditional website structure.
- On smaller screens: Items should stack vertically in the following order - header, navigation, main content, sidebar, footer.

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Grid Template Areas</title>
    <link rel="stylesheet" href="template-areas.css">
</head>
<body>
    <div class="grid-container">
        <header class="header">
            <h1>Website Title</h1>
        </header>
        
        <nav class="nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
        
        <main class="main">
            <h2>Main Content</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod nunc vel metus bibendum, vel ultricies nisi tincidunt. Nullam at commodo nunc. Quisque ac quam pharetra, pharetra turpis vel, tincidunt erat.</p>
            <p>Suspendisse in auctor justo. Cras posuere tortor sit amet tempus aliquet. Phasellus condimentum lobortis tellus, et feugiat velit vehicula quis.</p>
        </main>
        
        <aside class="sidebar">
            <h2>Sidebar</h2>
            <ul>
                <li>Recent Posts</li>
                <li>Categories</li>
                <li>Archives</li>
                <li>Tags</li>
            </ul>
            <div class="ad">Advertisement</div>
        </aside>
        
        <footer class="footer">
            <p>&copy; 2023. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>
```

## Task 3: Magazine Layout

Create a magazine-style layout using CSS Grid with the following requirements:

- The layout should have a featured article with an image that spans multiple grid cells
- Include at least 6 other article cards of varying sizes
- Add appropriate styling to make it look like a magazine/news website
- Make it fully responsive using media queries

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Magazine Layout</title>
    <link rel="stylesheet" href="magazine.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>Grid Times</h1>
            <p class="tagline">The latest news powered by CSS Grid</p>
        </header>

        <div class="magazine-layout">
            <article class="featured">
                <div class="article-image">
                    <img src="https://via.placeholder.com/1200x800?text=Featured+Article" alt="Featured Article">
                </div>
                <div class="article-content">
                    <h2>Featured: Lorem Ipsum Dolor Sit Amet</h2>
                    <p class="meta">By John Doe | June 7, 2023</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            </article>

            <!-- Add more articles of varying sizes here -->
            <article class="standard">
                <img src="https://via.placeholder.com/600x400?text=Article+1" alt="Article 1">
                <h3>Article Title</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </article>

            <!-- Add more articles here -->
        </div>
    </div>
</body>
</html>
```

## Task 4: Dashboard Layout

Create a responsive admin dashboard layout with CSS Grid that includes the following components:

- Top navigation bar
- Sidebar for navigation
- Main content area with a grid of at least 4 cards displaying different statistics
- Graph/chart section (can be represented with placeholder images)
- Recent activity section with a list of activities
- Footer

The layout should adapt to different screen sizes:
- On desktop: Full dashboard layout with sidebar
- On mobile: Stacked layout with hidden or toggle-able sidebar

Here's a starter template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="dashboard.css">
    <!-- You can use a font awesome CDN for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="dashboard">
        <header class="top-nav">
            <div class="logo">Dashboard</div>
            <div class="user-info">
                <span>Welcome, Admin</span>
                <img src="https://via.placeholder.com/40x40" alt="User" class="avatar">
            </div>
        </header>
        
        <nav class="sidebar">
            <ul>
                <li class="active"><a href="#"><i class="fas fa-home"></i> Dashboard</a></li>
                <li><a href="#"><i class="fas fa-chart-bar"></i> Analytics</a></li>
                <li><a href="#"><i class="fas fa-users"></i> Users</a></li>
                <li><a href="#"><i class="fas fa-cog"></i> Settings</a></li>
                <li><a href="#"><i class="fas fa-question-circle"></i> Help</a></li>
            </ul>
        </nav>
        
        <main class="main-content">
            <h2>Dashboard Overview</h2>
            
            <div class="stats-grid">
                <!-- Add at least 4 stat cards here -->
                <div class="stat-card">
                    <h3>Total Users</h3>
                    <p class="stat">1,254</p>
                    <p class="trend up">+12% <span>from last month</span></p>
                </div>
                <!-- Add more stat cards here -->
            </div>
            
            <div class="charts-section">
                <h3>Analytics</h3>
                <div class="charts-grid">
                    <!-- Placeholders for charts -->
                    <div class="chart">
                        <h4>User Growth</h4>
                        <img src="https://via.placeholder.com/600x300?text=Line+Chart" alt="Line Chart">
                    </div>
                    <div class="chart">
                        <h4>Traffic Sources</h4>
                        <img src="https://via.placeholder.com/600x300?text=Pie+Chart" alt="Pie Chart">
                    </div>
                </div>
            </div>
            
            <div class="recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                    <li>
                        <div class="activity-icon"><i class="fas fa-user-plus"></i></div>
                        <div class="activity-details">
                            <p>New user registered</p>
                            <span class="time">5 minutes ago</span>
                        </div>
                    </li>
                    <!-- Add more activity items here -->
                </ul>
            </div>
        </main>
        
        <footer class="footer">
            <p>&copy; 2023 Admin Dashboard. All Rights Reserved.</p>
        </footer>
    </div>
    
    <!-- You can add a simple script to toggle the sidebar on mobile -->
    <script>
        // Add JavaScript if needed
    </script>
</body>
</html>
```

## Submission

Implement each task in separate HTML and CSS files as specified. Run the test case provided to verify your solutions meet the requirements.

## Bonus Challenge (Optional)

Create a responsive portfolio website layout using CSS Grid with the following features:

- A grid-based gallery of portfolio items
- When clicked, portfolio items expand to show more details (hint: use CSS Grid's ability to span cells and the :target pseudo-class or JavaScript)
- The expanded view should include more images, description, and technologies used
- Make the entire layout responsive, adapting to different screen sizes
- Implement CSS animations/transitions for the expanding/collapsing effect

This challenge requires applying CSS Grid concepts creatively along with other CSS features to create an interactive portfolio gallery.