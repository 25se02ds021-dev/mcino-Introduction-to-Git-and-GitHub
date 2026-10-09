/**
 * Personal Blogging Platform - Core Data Store & Helpers
 * Handles localStorage operations, initial sample dataset, and theme state.
 */

const STORAGE_KEY = 'personal_blogs_data';
const THEME_KEY = 'personal_blog_theme';

// Seed sample blog data
const INITIAL_BLOGS = [
  {
    id: 'sample-1',
    title: 'The Art of Writing Clean and Maintainable JavaScript',
    description: 'Writing code that works is only half the battle. Discover practical patterns for readable, resilient, and maintainable frontend code.',
    category: 'Programming',
    author: 'Alex River',
    date: '2026-09-28',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    content: `Writing clean code is like writing good prose. Anyone can write code that a computer understands, but good programmers write code that humans can understand.

## 1. Keep Functions Focused and Small
A function should do one thing, and do it well. When functions grow to hundreds of lines, they become hard to test, hard to reason about, and prone to hidden side effects.

> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra

## 2. Meaningful Variable & Function Names
Avoid cryptic abbreviations like \`chkVal()\` or \`tmp\`. Prefer expressive names like \`isUserSubscribed\` or \`calculateTotalPrice()\`. Good code reads like natural language.

## 3. Leverage Immutability and Pure Functions
Pure functions return predictable outputs given the same inputs without modifying external states. This dramatically reduces bugs in complex state-driven interfaces.

Take time to refactor continuously as requirements evolve!`
  },
  {
    id: 'sample-2',
    title: 'How Generative AI is Changing Daily Software Engineering',
    description: 'A deep dive into how AI pair-programming tools and autonomous agents are shifting developer workflows from syntax to architecture.',
    category: 'AI',
    author: 'Alex River',
    date: '2026-09-22',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
    content: `Artificial intelligence is no longer an experimental curiosity; it has become an indispensable daily collaborator for software builders worldwide.

## Moving from Writing Syntax to Designing Systems
With modern coding assistants capable of generating boilerplate, unit tests, and routine components in seconds, the primary value of a developer is shifting upwards toward:
- **System Architecture:** Choosing the right data boundaries and communication protocols.
- **Verification & Testing:** Auditing code logic, security implications, and edge cases.
- **User Experience:** Designing intuitive and accessible user interfaces.

## The Future of Collaborative Agents
We are moving beyond simple auto-complete into autonomous agents that understand entire project contexts. The key is embracing these tools as thought partners rather than replacements.`
  },
  {
    id: 'sample-3',
    title: 'Minimalism in Modern Web Design: Less is Truly More',
    description: 'Why uncluttered interfaces, thoughtful typography, and generous whitespace create more engaging reader experiences.',
    category: 'Technology',
    author: 'Alex River',
    date: '2026-09-15',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    content: `In an era of relentless notifications, popups, and cluttered layouts, websites that offer visual calm and clarity stand out immediately.

## The Pillars of Minimalist Design
1. **Generous Whitespace:** Space gives content room to breathe and guides the reader's eye naturally.
2. **Curated Typography:** Choosing one or two harmonious typefaces creates rhythm and hierarchy.
3. **Restrained Color Palettes:** A single strong accent color paired with neutral backgrounds draws deliberate focus to key actions.

When in doubt, subtract until only the essentials remain.`
  },
  {
    id: 'sample-4',
    title: 'Reflections on Building Daily Habits and Deep Work',
    description: 'Lessons learned from carving out uninterrupted blocks of focused time in a world of constant digital distractions.',
    category: 'Personal',
    author: 'Alex River',
    date: '2026-09-08',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    content: `Every productive creative day is built on intentional boundaries. Here is what has transformed my routine over the past year:

### Time Blocking Morning Hours
Protecting the first two hours of each morning for deep creative work—with notifications silenced—produces more progress than six hours of fragmented multitasking.

### The Power of Small Daily Cadence
Writing 250 words or writing one well-tested module every single day compounds into massive outcomes over a year. Momentum is easier to maintain than to ignite.`
  },
  {
    id: 'sample-5',
    title: 'CSS Grid & Flexbox: A Pragmatic Mental Model',
    description: 'Stop guessing layout properties. Master when to use Flexbox for one-dimensional layouts versus Grid for two-dimensional structures.',
    category: 'Programming',
    author: 'Alex River',
    date: '2026-09-01',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    content: `CSS layout was once notoriously frustrating. Today, Flexbox and CSS Grid provide intuitive tools for building responsive layouts.

## Flexbox: 1D Component Layouts
Flexbox is ideal when arranging items along a single axis (rows or columns), such as navbars, button groups, and media headers.

## CSS Grid: 2D Page Layouts
CSS Grid shines when aligning elements simultaneously across rows and columns. It handles complex card grids and dynamic layouts with minimal code.

Combining both allows you to build virtually any modern layout seamlessly.`
  },
  {
    id: 'sample-6',
    title: 'The Joy of Starting Small Side Projects',
    description: 'Why shipping tiny, focused tools without commercial pressure is the best way to rekindle your passion for building.',
    category: 'Other',
    author: 'Alex River',
    date: '2026-08-25',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    content: `Not every software project needs a business model, investors, or complex architectures.

Building a simple personal website, a custom habit tracker, or an offline reading tool reminds us why we fell in love with creating in the first place: the simple thrill of turning thoughts into working realities.`
  }
];

// Initialize Storage
function initBlogStorage() {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing || existing.trim() === '' || existing === '[]') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    return INITIAL_BLOGS;
  }
  try {
    return JSON.parse(existing);
  } catch (e) {
    console.error('Failed to parse blog storage, resetting to default.', e);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_BLOGS));
    return INITIAL_BLOGS;
  }
}

// Get all blogs
function getBlogs() {
  return initBlogStorage();
}

// Get blog by ID
function getBlogById(id) {
  const blogs = getBlogs();
  return blogs.find(b => String(b.id) === String(id)) || null;
}

// Save a new blog
function saveBlog(blogData) {
  const blogs = getBlogs();
  const newBlog = {
    id: 'blog_' + Date.now(),
    title: blogData.title.trim(),
    description: blogData.description ? blogData.description.trim() : blogData.content.slice(0, 140).trim() + '...',
    category: blogData.category || 'Other',
    author: blogData.author || 'Alex River',
    image: blogData.image ? blogData.image.trim() : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    content: blogData.content.trim(),
    date: blogData.date || new Date().toISOString().split('T')[0]
  };

  blogs.unshift(newBlog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return newBlog;
}

// Update existing blog
function updateBlog(id, updatedData) {
  const blogs = getBlogs();
  const index = blogs.findIndex(b => String(b.id) === String(id));
  if (index === -1) return null;

  blogs[index] = {
    ...blogs[index],
    title: updatedData.title.trim(),
    description: updatedData.description ? updatedData.description.trim() : updatedData.content.slice(0, 140).trim() + '...',
    category: updatedData.category || blogs[index].category,
    image: updatedData.image ? updatedData.image.trim() : blogs[index].image,
    content: updatedData.content.trim()
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  return blogs[index];
}

// Delete blog
function deleteBlog(id) {
  const blogs = getBlogs();
  const filtered = blogs.filter(b => String(b.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered.length !== blogs.length;
}

// Format date string (e.g., "2026-09-28" -> "Sep 28, 2026")
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Get badge CSS class for category
function getCategoryBadgeClass(category) {
  const cat = (category || '').toLowerCase();
  if (cat.includes('tech')) return 'badge-tech';
  if (cat.includes('prog')) return 'badge-prog';
  if (cat.includes('ai')) return 'badge-ai';
  if (cat.includes('personal')) return 'badge-personal';
  return 'badge-other';
}

// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleButtons(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeToggleButtons(next);
}

function updateThemeToggleButtons(theme) {
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(btn => {
    btn.innerHTML = theme === 'dark' 
      ? '<span title="Switch to Light Mode">☀️</span>' 
      : '<span title="Switch to Dark Mode">🌙</span>';
  });
}

// Clean Toast Notification
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'danger' ? 'toast-danger' : ''}`;
  const icon = type === 'danger' ? '⚠️' : '✓';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// Initialize on script load
document.addEventListener('DOMContentLoaded', () => {
  initBlogStorage();
  initTheme();

  // Attach theme toggle listener if button exists
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
});
