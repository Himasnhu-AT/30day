# Day 2 Assignment: HTML Elements & Semantic HTML

## Task 1: Refactor a Non-Semantic HTML Document
Take the following non-semantic HTML and refactor it using appropriate semantic HTML elements:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
</head>
<body>
    <div class="header">
        <h1>My Personal Blog</h1>
        <div class="nav">
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </div>
    </div>
    
    <div class="main-content">
        <div class="blog-post">
            <h2>My First Blog Post</h2>
            <div class="date">January 1, 2023</div>
            <p>This is the introduction to my first blog post. I'm excited to share my thoughts with you.</p>
            <p>Here's more content for my blog post. I hope you find it interesting!</p>
            <div class="tags">
                <span>HTML</span>
                <span>Semantic</span>
                <span>Web Development</span>
            </div>
        </div>
        
        <div class="blog-post">
            <h2>My Second Blog Post</h2>
            <div class="date">January 15, 2023</div>
            <p>Welcome to my second post. I'm going to share some tips about coding.</p>
            <p>Coding is fascinating and challenging at the same time. Let's explore it together!</p>
            <div class="tags">
                <span>Coding</span>
                <span>Tips</span>
            </div>
        </div>
    </div>
    
    <div class="sidebar">
        <div class="about-me">
            <h3>About Me</h3>
            <p>I'm a web developer learning about semantic HTML.</p>
        </div>
        <div class="categories">
            <h3>Categories</h3>
            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>&copy; 2023 My Blog. All rights reserved.</p>
        <div class="social-links">
            <a href="#">Twitter</a>
            <a href="#">GitHub</a>
            <a href="#">LinkedIn</a>
        </div>
    </div>
</body>
</html>
```

## Task 2: Create a Semantic News Article Page
Create a semantically structured HTML page for a news article with:

1. Proper document structure using semantic elements
2. A main article with a heading, publication date, author info, and content
3. Related articles section with at least 2 related articles
4. Navigation menu
5. Proper accessibility attributes where needed
6. Comments section with at least 2 user comments

## Task 3: Implement Advanced Semantic Elements
Create a small HTML document that demonstrates the use of at least 5 of these elements:
- `<details>` and `<summary>`
- `<figure>` and `<figcaption>`
- `<mark>`
- `<time>`
- `<progress>`
- `<meter>`
- `<abbr>`
- `<dl>`, `<dt>`, and `<dd>`

Make sure to use them in appropriate contexts to demonstrate your understanding of their purpose.

## Task 4: Accessibility Enhancement
Take this small form and enhance it with proper semantic structure and accessibility attributes:

```html
<div>
    <div>Contact Form</div>
    <div>
        <div>
            Name:
            <input type="text">
        </div>
        <div>
            Email:
            <input type="text">
        </div>
        <div>
            Message:
            <textarea></textarea>
        </div>
        <div>
            <div onclick="submitForm()">Send Message</div>
        </div>
    </div>
</div>
```

## Submission
Save your HTML files with appropriate names for each task and run the test case to check your solutions.

## Bonus Challenge
Create an accordion-style FAQ page using only HTML (no JavaScript or CSS) that has at least 3 questions and answers. Use semantic HTML elements and accessibility best practices.