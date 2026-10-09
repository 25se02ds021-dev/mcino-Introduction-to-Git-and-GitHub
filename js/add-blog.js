/**
 * Add / Edit Blog Page Script (add-blog.js)
 * Manages the blog creation and editing lifecycle, form validation, image preview, and localStorage updates.
 */

let editBlogId = null;

const DEFAULT_IMAGES = [
  { name: 'Coding', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80' },
  { name: 'AI / Tech', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Minimal Desk', url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Design', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Books / Notes', url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80' }
];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  editBlogId = urlParams.get('edit');

  setupImagePresetChips();
  setupImagePreviewListener();
  setupFormSubmission();

  if (editBlogId) {
    setupEditMode(editBlogId);
  }
});

function setupImagePresetChips() {
  const container = document.getElementById('preset-chips-container');
  const imageInput = document.getElementById('blog-image');
  if (!container || !imageInput) return;

  container.innerHTML = DEFAULT_IMAGES.map(preset => `
    <button type="button" class="preset-chip" onclick="applyImagePreset('${preset.url}')">
      ${preset.name}
    </button>
  `).join('');
}

window.applyImagePreset = function(url) {
  const imageInput = document.getElementById('blog-image');
  if (imageInput) {
    imageInput.value = url;
    updateImagePreview(url);
  }
};

function setupImagePreviewListener() {
  const imageInput = document.getElementById('blog-image');
  if (!imageInput) return;

  imageInput.addEventListener('input', (e) => {
    updateImagePreview(e.target.value.trim());
  });
}

function updateImagePreview(url) {
  const previewBox = document.getElementById('image-preview');
  if (!previewBox) return;

  if (url) {
    previewBox.innerHTML = `
      <img src="${url}" alt="Preview" onerror="this.parentElement.innerHTML='<span style=\\'color:var(--danger-color);\\'>⚠️ Failed to load image URL. Check link.</span>'" />
    `;
  } else {
    previewBox.innerHTML = `<span>No image selected (Default placeholder will be used)</span>`;
  }
}

function setupEditMode(id) {
  const blog = getBlogById(id);
  if (!blog) {
    alert('Blog post not found for editing.');
    window.location.href = 'blogs.html';
    return;
  }

  // Update page headers & button text
  document.title = 'Edit Blog Post — Personal Blog';
  const pageHeading = document.getElementById('page-heading');
  const pageSubheading = document.getElementById('page-subheading');
  const submitBtn = document.getElementById('submit-btn');

  if (pageHeading) pageHeading.textContent = 'Edit Blog Post';
  if (pageSubheading) pageSubheading.textContent = 'Update your blog details and publish changes.';
  if (submitBtn) submitBtn.textContent = 'Save Changes';

  // Populate form fields
  document.getElementById('blog-title').value = blog.title || '';
  document.getElementById('blog-desc').value = blog.description || '';
  document.getElementById('blog-category').value = blog.category || 'Other';
  document.getElementById('blog-image').value = blog.image || '';
  document.getElementById('blog-content').value = blog.content || '';

  updateImagePreview(blog.image);
}

function setupFormSubmission() {
  const form = document.getElementById('blog-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('blog-title').value.trim();
    const description = document.getElementById('blog-desc').value.trim();
    const category = document.getElementById('blog-category').value;
    let image = document.getElementById('blog-image').value.trim();
    const content = document.getElementById('blog-content').value.trim();

    // Validation
    if (!title) {
      alert('Please enter a blog title.');
      document.getElementById('blog-title').focus();
      return;
    }

    if (!content) {
      alert('Please write some content for your blog.');
      document.getElementById('blog-content').focus();
      return;
    }

    if (!image) {
      // Pick random default image
      const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
      image = DEFAULT_IMAGES[randomIndex].url;
    }

    const blogData = {
      title,
      description: description || content.slice(0, 140).trim() + '...',
      category,
      image,
      content,
      author: 'Alex River'
    };

    if (editBlogId) {
      // Update existing
      const updated = updateBlog(editBlogId, blogData);
      if (updated) {
        showToast('Blog updated successfully!');
        setTimeout(() => {
          window.location.href = `blog.html?id=${editBlogId}`;
        }, 400);
      }
    } else {
      // Create new
      const created = saveBlog(blogData);
      if (created) {
        showToast('Blog published successfully!');
        setTimeout(() => {
          window.location.href = `blog.html?id=${created.id}`;
        }, 400);
      }
    }
  });
}
