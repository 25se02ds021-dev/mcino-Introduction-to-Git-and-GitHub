/**
 * All Blogs Page Script (blogs.js)
 * Implements real-time search, category filtering, card rendering, and deletion.
 */

let allBlogs = [];
let activeCategory = 'All';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  allBlogs = getBlogs();

  // Check URL search params for initial filter
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  const paramSearch = urlParams.get('search');

  if (paramCategory) {
    activeCategory = paramCategory;
  }
  if (paramSearch) {
    searchQuery = paramSearch;
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = paramSearch;
  }

  setupEventListeners();
  updateCategoryPills();
  renderBlogs();
});

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderBlogs();
    });
  }

  const categoryBtns = document.querySelectorAll('.category-filters .filter-btn');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.getAttribute('data-category');
      updateCategoryPills();
      renderBlogs();
    });
  });
}

function updateCategoryPills() {
  const categoryBtns = document.querySelectorAll('.category-filters .filter-btn');
  categoryBtns.forEach(btn => {
    if (btn.getAttribute('data-category').toLowerCase() === activeCategory.toLowerCase()) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

function renderBlogs() {
  const grid = document.getElementById('blogs-grid');
  const countElement = document.getElementById('blogs-count');
  if (!grid) return;

  // Filter blogs
  const filtered = allBlogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || 
      (blog.category && blog.category.toLowerCase() === activeCategory.toLowerCase());

    const matchesSearch = !searchQuery || 
      blog.title.toLowerCase().includes(searchQuery) ||
      blog.description.toLowerCase().includes(searchQuery) ||
      (blog.content && blog.content.toLowerCase().includes(searchQuery)) ||
      (blog.category && blog.category.toLowerCase().includes(searchQuery));

    return matchesCategory && matchesSearch;
  });

  if (countElement) {
    countElement.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🔍</div>
        <h3 class="empty-title">No matching blogs found</h3>
        <p class="empty-desc">Try adjusting your search terms or selecting another category.</p>
        <button class="btn btn-secondary btn-sm" onclick="clearFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(blog => {
    const badgeClass = getCategoryBadgeClass(blog.category);
    const formattedDate = formatDate(blog.date);

    return `
      <article class="blog-card" id="blog-card-${blog.id}">
        <div class="card-img-wrap">
          <img 
            src="${blog.image}" 
            alt="${escapeHtml(blog.title)}"
            onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'"
          />
        </div>
        <div class="card-body">
          <span class="badge ${badgeClass}">${escapeHtml(blog.category)}</span>
          <h3 class="card-title">
            <a href="blog.html?id=${blog.id}">${escapeHtml(blog.title)}</a>
          </h3>
          <p class="card-description">${escapeHtml(blog.description)}</p>
          <div class="card-footer">
            <div class="meta-info">
              <span>${formattedDate}</span>
            </div>
            <div class="card-actions">
              <a href="add-blog.html?edit=${blog.id}" class="icon-btn" title="Edit Post">✏️</a>
              <button class="icon-btn danger" onclick="confirmDeleteBlog('${blog.id}', '${escapeQuotes(blog.title)}')" title="Delete Post">🗑️</button>
              <a href="blog.html?id=${blog.id}" class="btn btn-outline btn-sm">Read More</a>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function clearFilters() {
  activeCategory = 'All';
  searchQuery = '';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  updateCategoryPills();
  renderBlogs();
}

function confirmDeleteBlog(id, title) {
  const confirmed = window.confirm(`Are you sure you want to delete this blog?\n\n"${title}"`);
  if (confirmed) {
    const deleted = deleteBlog(id);
    if (deleted) {
      allBlogs = getBlogs();
      showToast('Blog deleted successfully');
      renderBlogs();
    }
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function escapeQuotes(text) {
  if (!text) return '';
  return text.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}
