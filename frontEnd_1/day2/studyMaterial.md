# Day 2: HTML Elements & Semantic HTML

## Learning Objectives
By the end of this day, you should understand:
- What semantic HTML is and why it's important
- How to use semantic HTML elements appropriately
- The basics of web accessibility
- How to structure a document properly using semantic elements

## What is Semantic HTML?

Semantic HTML means using HTML elements that clearly describe their meaning to both the browser and the developer. Instead of just using `<div>` and `<span>` elements for everything, semantic HTML provides specific elements that indicate what role that content plays.

### Benefits of Semantic HTML:
1. **Accessibility**: Screen readers and assistive technologies can better interpret your content
2. **SEO**: Search engines better understand your content and its importance
3. **Maintainability**: Code is easier to read and maintain
4. **Styling**: Provides logical hooks for consistent CSS styling

## Key Semantic Elements

### Document Structure Elements

```html
<header>: Contains introductory content or navigation links
<nav>: Defines a section of navigation links
<main>: Specifies the main content of the document
<article>: Represents a self-contained composition (e.g., a blog post)
<section>: Defines a standalone section of content
<aside>: Content tangentially related to content around it (e.g., a sidebar)
<footer>: Contains footer information for its nearest sectioning content
```

### Example of Document Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Welcome Section</h2>
            <p>Welcome to my website about semantic HTML.</p>
        </section>
        
        <article>
            <h2>Why Semantic HTML Matters</h2>
            <p>Semantic HTML improves accessibility, SEO, and code readability.</p>
        </article>
        
        <aside>
            <h3>Related Information</h3>
            <p>Learn more about HTML5 features.</p>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2023 My Website</p>
    </footer>
</body>
</html>
```

## Text Content Elements

```html
<h1>, <h2>, ..., <h6>: Headings of different levels
<p>: Paragraph
<ul>: Unordered list
<ol>: Ordered list
<li>: List item
<dl>: Description list
<dt>: Description term
<dd>: Description details
<blockquote>: Block quotation
<figure>: Self-contained content (images, diagrams, etc.)
<figcaption>: Caption for a <figure> element
<hr>: Thematic break (horizontal rule)
```

## Inline Semantic Elements

```html
<em>: Emphasized text
<strong>: Important text
<abbr>: Abbreviation
<cite>: Title of a creative work
<code>: Computer code
<time>: Time and dates
<mark>: Marked/highlighted text
<q>: Short inline quotation
```

## HTML5 Specific Elements

```html
<details>: Collapsible disclosure widget
<summary>: Summary/heading for a <details> element
<dialog>: Dialog box or window
<progress>: Progress of a task
<meter>: Scalar measurement within a known range
```

## Web Accessibility Basics

### ARIA (Accessible Rich Internet Applications)

ARIA attributes provide additional information about elements when native HTML semantics are insufficient:

```html
<div role="button" aria-pressed="false" tabindex="0">Click Me</div>
```

### Key Accessibility Practices:

1. **Use alternative text for images**:
   ```html
   <img src="image.jpg" alt="Description of the image">
   ```

2. **Use proper headings hierarchy** (don't skip levels)

3. **Ensure keyboard navigation**:
   ```html
   <a href="#" tabindex="0">Focusable link</a>
   ```

4. **Label form elements**:
   ```html
   <label for="name">Name:</label>
   <input type="text" id="name">
   ```

## When to Use Semantic HTML vs. Generic Elements

### Use Semantic Elements When:
- The content has a specific meaning or purpose
- The element naturally represents your content
- Accessibility is important (always)

### Use Generic Elements (`<div>`, `<span>`) When:
- You need a container purely for styling purposes
- No semantic element exists for your specific need
- You need to group elements without adding semantic meaning

## Best Practices

1. **Always use the most appropriate semantic element**
2. **Use headings in the correct order** (h1, then h2, etc.)
3. **Keep your HTML structure clean and logical**
4. **Include proper language attributes**: `<html lang="en">`
5. **Use semantic elements before considering ARIA roles**

## Additional Resources

- [MDN Web Docs: HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)
- [HTML5 Doctor: HTML5 sectioning elements](http://html5doctor.com/downloads/h5d-sectioning-flowchart.pdf)
- [W3C: ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [WebAIM: Web Accessibility Principles](https://webaim.org/resources/quickref/)