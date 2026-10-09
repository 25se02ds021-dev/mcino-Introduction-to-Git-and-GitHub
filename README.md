# ✍️ Minimalist Personal Blog Website

A clean, modern, lightweight personal blogging website built with vanilla **HTML**, **CSS**, and **JavaScript**. No heavy frameworks, no build tools, and no complicated backend setup.

---

## 🚀 How to Run the Website

### Option 1: Quick Launch (Recommended)
1. **Double-click `run.bat`** in the project folder.
2. The script will automatically start a local server on port 5500 and open `http://localhost:5500` in your default web browser.

> *Note: If Python is not installed, `run.bat` will notify you and open `index.html` directly in your browser, where all features will still work seamlessly.*

### Option 2: Manual Start with Python
Open your terminal inside the `blog-website` folder and run:
```bash
python -m http.server 5500
```
Then visit [http://localhost:5500](http://localhost:5500) in your web browser.

### Option 3: Direct File Opening
Double-click [index.html](file:///C:/Users/HomePC/.gemini/antigravity-ide/scratch/blog-website/index.html) to open it in any web browser.

---

## 📖 Features & Usage Guide

### 1. View & Explore Blogs
- **Home Page (`index.html`)**: Displays the hero welcome banner, a featured article highlight, and recent posts.
- **Blogs Directory (`blogs.html`)**: Browse all articles, search in real-time by title, description, or content, and filter by category (**Technology**, **Programming**, **AI**, **Personal**, **Other**).
- **Dark Mode**: Toggle between light and dark themes using the 🌙 / ☀️ icon in the navigation bar. Your preference is automatically saved.

### 2. Add a New Blog Post
1. Click **"+ Add Blog"** in the navigation bar.
2. Fill in the form:
   - **Title** (required)
   - **Short Summary** (optional, automatically summarized if left empty)
   - **Category**
   - **Cover Image URL** (or click any of the 1-click **Quick Image Presets**)
   - **Blog Content** (supports subheadings `##`, blockquotes `>`, bullet points `-`, bold `**text**`, and inline code `` `code` ``)
3. Click **"Publish Blog 🚀"**. The blog is instantly stored and you are taken to your new post.

### 3. Edit an Existing Blog
1. Navigate to the blog details page or click the ✏️ icon on any blog card in the **Blogs** page.
2. Click **"✏️ Edit Post"**.
3. Update any fields and click **"Save Changes"**.

### 4. Delete a Blog
1. Click the **"🗑️ Delete"** button on the blog details page or the trash icon on the blog list card.
2. Confirm the prompt: *"Are you sure you want to delete this blog?"*.
3. The blog is removed from your local storage.

---

## 💾 How Blogs are Stored

All blog articles and theme preferences are saved directly in your browser's **`localStorage`** under the keys:
- `personal_blogs_data`: Array of blog objects containing `{ id, title, description, category, author, image, content, date }`.
- `personal_blog_theme`: Saved theme mode (`light` or `dark`).

When you first launch the website, it automatically seeds 6 sample articles across various topics. Any edits, deletions, and new posts you create persist across browser refreshes and sessions.

---

## 📁 Project Structure

```text
blog-website/
│
├── index.html          # Homepage with Hero & Featured/Recent posts
├── blogs.html          # All blogs listing with search & category filters
├── blog.html           # Single blog post reader with full article view
├── add-blog.html       # Add / Edit blog post form
│
├── css/
│   └── style.css       # Clean, modern stylesheet with dark mode & responsiveness
│
├── js/
│   ├── data.js         # localStorage manager, seed dataset, & helpers
│   ├── main.js         # Home page logic
│   ├── blogs.js        # Blogs listing, search & filter logic
│   ├── blog.js         # Single blog reader & deletion logic
│   └── add-blog.js     # Post creation & editing logic
│
├── images/             # Optional folder for local custom images
├── README.md           # Documentation & instructions
└── run.bat             # Windows one-click launcher
```
