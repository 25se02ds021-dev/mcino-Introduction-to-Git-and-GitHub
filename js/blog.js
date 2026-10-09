/**
 * Blog Details Page Script (blog.js)
 * Loads and displays an individual blog post with formatted content and action triggers.
 */

let currentBlogId = null;

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentBlogId = urlParams.get('id');

  if (!currentBlogId) {
    showNotFound();
    return;
  }

  const blog = getBlogById(currentBlogId);
  if (!blog) {
    showNotFound();
    return;
  }

  renderBlogDetails(blog);
});

function renderBlogDetails(blog) {
  const container = document.getElementById('blog-detail-container');
  if (!container) return;

  // Update page document title
  document.title = `${blog.title} — Personal Blog`;

  const badgeClass = getCategoryBadgeClass(blog.category);
  const formattedDate = formatDate(blog.date);
  const authorName = blog.author || 'Alex River';
  const authorInitial = authorName.charAt(0).toUpperCase();

  // Estimate read time
  const wordCount = (blog.content || '').trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const parsedContent = formatBlogContent(blog.content);

  container.innerHTML = `
    <article>
      <header class="article-header">
        <a href="blogs.html" class="back-link">← Back to all blogs</a>
        <div>
          <span class="badge ${badgeClass}">${escapeHtml(blog.category)}</span>
        </div>
        <h1 class="article-title">${escapeHtml(blog.title)}</h1>
        
        <div class="article-meta-row">
          <div class="article-author-meta">
            <div class="author-avatar">${authorInitial}</div>
            <div>
              <div class="author-name">${escapeHtml(authorName)}</div>
              <div class="author-date">${formattedDate} • ${readTime} min read</div>
            </div>
          </div>

          <div class="article-actions">
            <a href="add-blog.html?edit=${blog.id}" class="btn btn-secondary btn-sm" id="edit-blog-btn">
              ✏️ Edit Post
            </a>
            <button class="btn btn-danger btn-sm" id="delete-blog-btn" onclick="handleDeleteCurrentBlog()">
              🗑️ Delete
            </button>
          </div>
        </div>
      </header>

      <img 
        class="article-featured-image" 
        src="${blog.image}" 
        alt="${escapeHtml(blog.title)}"
        onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'"
      />

      <div class="article-content">
        ${parsedContent}
      </div>

      <footer class="article-footer">
        <a href="blogs.html" class="btn btn-secondary btn-sm">← Back to Blogs</a>
        <a href="add-blog.html" class="btn btn-primary btn-sm">+ Write a Blog</a>
      </footer>
    </article>
  `;
}

function formatBlogContent(rawText) {
  if (!rawText) return '<p>No content provided.</p>';

  // Split by double newline or line chunks
  const blocks = rawText.split(/\n\s*\n/);
  
  return blocks.map(block => {
    block = block.trim();
    if (!block) return '';

    // Heading 3
    if (block.startsWith('### ')) {
      return `<h3>${escapeHtml(block.replace('### ', ''))}</h3>`;
    }
    // Heading 2
    if (block.startsWith('## ')) {
      return `<h2>${escapeHtml(block.replace('## ', ''))}</h2>`;
    }
    // Heading 1
    if (block.startsWith('# ')) {
      return `<h2>${escapeHtml(block.replace('# ', ''))}</h2>`;
    }
    // Blockquote
    if (block.startsWith('> ')) {
      return `<blockquote>${escapeHtml(block.replace(/^>\s*/gm, ''))}</blockquote>`;
    }
    // Bullet list
    if (block.startsWith('- ') || block.startsWith('* ')) {
      const items = block.split(/\n/).map(line => {
        const cleaned = line.replace(/^[-*]\s*/, '').trim();
        return `<li>${formatInlineStyles(escapeHtml(cleaned))}</li>`;
      }).join('');
      return `<ul>${items}</ul>`;
    }

    // Standard Paragraph with inline backtick code and bold/italic support
    return `<p>${formatInlineStyles(escapeHtml(block))}</p>`;
  }).join('');
}

function formatInlineStyles(text) {
  return text
    .replace(/`([^`]+)`/g, '<code style="background:var(--bg-hover);padding:0.1rem 0.35rem;border-radius:4px;font-size:0.9em;">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function handleDeleteCurrentBlog() {
  const blog = getBlogById(currentBlogId);
  const title = blog ? blog.title : 'this blog';
  const confirmed = window.confirm(`Are you sure you want to delete this blog?\n\n"${title}"`);
  
  if (confirmed) {
    const deleted = deleteBlog(currentBlogId);
    if (deleted) {
      alert('Blog deleted successfully.');
      window.location.href = 'blogs.html';
    } else {
      alert('Failed to delete blog.');
    }
  }
}

function showNotFound() {
  const container = document.getElementById('blog-detail-container');
  if (!container) return;

  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-icon">📂</div>
      <h2 class="empty-title">Blog Post Not Found</h2>
      <p class="empty-desc">The blog you are looking for might have been deleted or the link is invalid.</p>
      <a href="blogs.html" class="btn btn-primary">Return to All Blogs</a>
    </div>
  `;
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
