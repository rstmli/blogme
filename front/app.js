const API_BASE_URL = 'http://localhost:8080/api/v1';

// Səhifə tam formalaşdıqdan sonra hadisələri dinləyirik
document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();
    
    const blogForm = document.getElementById('blog-form');
    if (blogForm) {
        blogForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await createPost();
        });
    }
});

// 🧭 Səhifələmə Sistemi (Tab Manager)
function switchTab(pageId) {
    document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active-tab'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    document.getElementById(pageId).classList.add('active-tab');
    document.getElementById(`tab-${pageId}`).classList.add('active');

    if (pageId === 'feed-page') fetchBlogs();
}

// 📥 Blogları Backend-dən Oxumaq (GET)
async function fetchBlogs() {
    const container = document.getElementById('blog-list');
    if (!container) return;
    
    container.innerHTML = '<p class="text-center">Yazılar yüklənir...</p>';
    try {
        const response = await fetch(`${API_BASE_URL}/blog/shows-blog`);
        if (!response.ok) throw new Error();
        const blogs = await response.json();
        renderBlogs(blogs);
    } catch (e) {
        showAlert('Backend ilə əlaqə qurulmadı. Portu və CORS-u yoxlayın.', 'error');
        container.innerHTML = '<p class="text-center" style="color:red;">Bağlantı xətası.</p>';
    }
}

// 📊 Məlumatları Instagram Post Stilində Ekrana Çıxarmaq
function renderBlogs(blogs) {
    const container = document.getElementById('blog-list');
    if (!container) return;
    container.innerHTML = '';

    if (!blogs || blogs.length === 0) {
        container.innerHTML = '<div class="glass-card text-center"><p>Hələ heç bir post yoxdur.</p></div>';
        return;
    }

    // Ən yeni paylaşımların yuxarıda qalması üçün ID sıralaması
    const sorted = [...blogs].sort((a, b) => b.id - a.id);

    sorted.forEach(blog => {
        const blogId = blog.id;

        // Şərhlərin ulduz göstəricisinə görə rəng analizi (Yaşıl, Sarı, Qırmızı)
        const commentsHtml = (blog.comments && blog.comments.length > 0)
            ? blog.comments.map(c => {
                const rate = c.rate || 0;
                let rateClass = 'rate-mid';
                if (rate <= 2.5) rateClass = 'rate-low';
                else if (rate >= 4.0) rateClass = 'rate-high';

                return `
                    <div class="comment-item ${rateClass}">
                        <div class="comment-meta">
                            <span>Oxucu</span>
                            <span class="comment-stars">★ ${rate.toFixed(1)}</span>
                        </div>
                        <div style="color: #374151;">${escapeHtml(c.comment)}</div>
                    </div>
                `;
            }).join('')
            : '<p style="font-size:12px; color:var(--text-muted); font-style: italic">Heç bir şərh yazılmayıb.</p>';

        const postCard = `
            <article class="glass-card post-card">
                <div class="post-header">
                    <div class="post-avatar">${escapeHtml(blog.author.substring(0,2).toUpperCase())}</div>
                    <div class="post-user-info">
                        <span class="post-author">${escapeHtml(blog.author)}</span>
                        <span class="post-subject">${escapeHtml(blog.subject)}</span>
                    </div>
                </div>

                <div class="post-body">${escapeHtml(blog.content)}</div>

                <div class="post-actions">
                    <button onclick="toggleComments(${blogId})" class="btn-toggle-comments">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        <span id="btn-text-${blogId}">Şərhləri Göstər (${blog.comments ? blog.comments.length : 0})</span>
                    </button>
                </div>

                <div id="tray-${blogId}" class="comments-tray">
                    <div class="comment-list">${commentsHtml}</div>
                    
                    <div class="comment-input-bar">
                        <input type="text" id="input-${blogId}" placeholder="Şərh yazın..." required>
                        <select id="rate-${blogId}">
                            <option value="5">5 ★</option>
                            <option value="4">4 ★</option>
                            <option value="3">3 ★</option>
                            <option value="2">2 ★</option>
                            <option value="1">1 ★</option>
                        </select>
                        <button onclick="sendComment(${blogId})" class="btn-send-comment">Paylaş</button>
                    </div>
                </div>
            </article>
        `;
        container.insertAdjacentHTML('beforeend', postCard);
    });
}

// 🔓 Şərhləri gizlət/göstər triggeri (Instagram Stilində)
function toggleComments(blogId) {
    const tray = document.getElementById(`tray-${blogId}`);
    const btnText = document.getElementById(`btn-text-${blogId}`);
    if (!tray || !btnText) return;
    
    if (tray.classList.contains('open')) {
        tray.classList.remove('open');
        if(btnText.innerText.includes('Gizlə')) {
            btnText.innerText = btnText.innerText.replace('Gizlə', 'Göstər');
        }
    } else {
        tray.classList.add('open');
        if(btnText.innerText.includes('Göstər')) {
            btnText.innerText = btnText.innerText.replace('Göstər', 'Gizlə');
        }
    }
}

// 📤 Yeni Post Əlavə Etmək (POST)
async function createPost() {
    const payload = {
        author: document.getElementById('author').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        content: document.getElementById('content').value.trim()
    };

    try {
        const res = await fetch(`${API_BASE_URL}/blog/add-blog`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();

        showAlert('Postunuz uğurla dərc edildi.', 'success');
        document.getElementById('blog-form').reset();
        switchTab('feed-page');
    } catch (e) {
        showAlert('Post göndərilmədi. Qaydaları yoxlayın.', 'error');
    }
}

// 📤 Yeni Şərh Göndərmək (POST)
async function sendComment(blogId) {
    const input = document.getElementById(`input-${blogId}`);
    const select = document.getElementById(`rate-${blogId}`);
    if (!input || !input.value.trim()) return;

    const payload = {
        blogId: parseInt(blogId, 10),
        comment: input.value.trim(),
        rate: parseFloat(select.value)
    };

    try {
        const res = await fetch(`${API_BASE_URL}/comment/write`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error();

        showAlert('Şərhiniz əlavə olundu.', 'success');
        input.value = '';
        
        // Yeniləndikdən sonra şərhlərin açıq qalması mexanizmi
        await fetchBlogs();
        const tray = document.getElementById(`tray-${blogId}`);
        const btnText = document.getElementById(`btn-text-${blogId}`);
        
        if (tray) tray.classList.add('open');
        if (btnText && btnText.innerText.includes('Göstər')) {
            btnText.innerText = btnText.innerText.replace('Göstər', 'Gizlə');
        }
    } catch (e) {
        showAlert('Şərh qəbul edilmədi.', 'error');
    }
}

/* --- Təhlükəsizlik alətləri --- */
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function showAlert(msg, type) {
    const box = document.getElementById('alert-box');
    if (!box) return;
    box.innerText = msg;
    box.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
    box.classList.remove('hidden');
    setTimeout(() => box.classList.add('hidden'), 3500);
}
