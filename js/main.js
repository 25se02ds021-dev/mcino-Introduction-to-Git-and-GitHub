/**
 * Home Page Script (main.js)
 * Populates the featured post and recent posts grid.
 */

document.addEventListener('DOMContentLoaded', () => {
  const blogs = getBlogs();
  renderFeaturedBlog(blogs);
  renderRecentBlogs(blogs);
});

function renderFeaturedBlog(blogs) {
  const featuredContainer = document.getElementById('featured-blog-container');
  if (!featuredContainer || blogs.length === 0) return;

  const featured = blogs[0];
  const badgeClass = getCategoryBadgeClass(featured.category);
  const formattedDate = formatDate(featured.date);

  featuredContainer.innerHTML = `
    <article class="featured-card">
      <div class="featured-img-wrap">
        <img 
          src="${featured.image}" 
          alt="${escapeHtml(featured.title)}"
          onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'"
        />
      </div>
      <div class="featured-content">
        <span class="badge ${badgeClass}">${escapeHtml(featured.category)}</span>
        <div class="meta-info">
          <span>${escapeHtml(featured.author || 'Author')}</span>
          <span>${formattedDate}</span>
        </div>
        <h3 class="card-title">
          <a href="blog.html?id=${featured.id}">${escapeHtml(featured.title)}</a>
        </h3>
        <p class="card-description">${escapeHtml(featured.description)}</p>
        <div>
          <a href="blog.html?id=${featured.id}" class="btn btn-primary btn-sm">
            Read Article →
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderRecentBlogs(blogs) {
  const recentGrid = document.getElementById('recent-blogs-grid');
  if (!recentGrid) return;

  // Show up to 3 recent blogs after the featured one
  const recentList = blogs.length > 1 ? blogs.slice(1, 4) : blogs;

  if (recentList.length === 0) {
    recentGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <h3 class="empty-title">No blogs found</h3>
        <p class="empty-desc">You haven't written any blogs yet. Create your first post!</p>
        <a href="add-blog.html" class="btn btn-primary btn-sm">Write a Blog</a>
      </div>
    `;
    return;
  }

  recentGrid.innerHTML = recentList.map(blog => {
    const badgeClass = getCategoryBadgeClass(blog.category);
    const formattedDate = formatDate(blog.date);

    return `
      <article class="blog-card">
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
            <a href="blog.html?id=${blog.id}" class="btn btn-outline btn-sm">Read More</a>
          </div>
        </div>
      </article>
    `;
  }).join('');
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
