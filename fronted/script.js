const URL_API = 'http://localhost:3005/opinionManager/v1';

function changeTab(tab) {
    document.querySelectorAll('section').forEach(s => s.style.display = 'none');
    document.getElementById(`view-${tab}`).style.display = 'block';

    if (tab === 'users') loadUsers();
    if (tab === 'posts') loadPosts();
    if (tab === 'comments') loadComments();
}

const userForm = document.getElementById('form-user');
userForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('u-id').value;
    const data = {
        name: document.getElementById('u-name').value,
        surname: document.getElementById('u-surname').value,
        username: document.getElementById('u-username').value,
        email: document.getElementById('u-email').value,
        password: document.getElementById('u-password').value,
        dateOfBirth: "2000-01-01"
    };
    try {
        const method = id ? 'PUT' : 'POST';
        const path = id ? `/users/${id}` : '/users';
        const response = await fetch(URL_API + path, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            userForm.reset();
            document.getElementById('u-id').value = "";
            document.getElementById('u-btn').innerText = "Registrar Usuario";
            loadUsers();
        }
    } catch (error) { console.error("Error en operación de usuario:", error); }
};

async function loadUsers() {
    try {
        const res = await fetch(`${URL_API}/users`);
        const data = await res.json();
        const users = data.users || [];
        const div = document.getElementById('list-users');
        div.innerHTML = users.map(u => `
            <div class="card">
                <h4>${u.name} ${u.surname}</h4>
                <p><strong>@${u.username}</strong></p>
                <p><small>ID: <code>${u._id}</code></small></p>
                <button onclick="editUser('${u._id}', '${u.name}', '${u.surname}', '${u.username}', '${u.email}')">Editar</button>
                <button class="btn-del" onclick="deleteUser('${u._id}')">Borrar</button>
            </div>
        `).join('');
    } catch (error) { console.error("Error cargando usuarios:", error); }
}

function editUser(id, name, surname, user, email) {
    document.getElementById('u-id').value = id;
    document.getElementById('u-name').value = name;
    document.getElementById('u-surname').value = surname;
    document.getElementById('u-username').value = user;
    document.getElementById('u-email').value = email;
    document.getElementById('u-btn').innerText = "Actualizar Datos";
    window.scrollTo(0, 0);
}

async function deleteUser(id) {
    if (confirm('¿Eliminar usuario?')) {
        await fetch(`${URL_API}/users/${id}`, { method: 'DELETE' });
        loadUsers();
    }
}

const postForm = document.getElementById('form-post');

postForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('p-id').value;
    const data = {
        title: document.getElementById('p-title').value,
        content: document.getElementById('p-content').value,
        author: document.getElementById('p-author').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const path = id ? `/posts/${id}` : '/posts';

        const response = await fetch(URL_API + path, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            postForm.reset();
            document.getElementById('p-id').value = "";
            document.getElementById('p-btn').innerText = "Publicar";
            loadPosts();
        } else {
            const err = await response.json();
            alert("Error: " + (err.message || "No se pudo procesar la publicación"));
        }
    } catch (error) {
        console.error("Error en post:", error);
    }
};

async function loadPosts() {
    try {
        const res = await fetch(`${URL_API}/posts`);
        const data = await res.json();
        const posts = data.posts || data || [];

        const div = document.getElementById('list-posts');
        div.innerHTML = posts.map(p => `
            <div class="card" style="border-left: 5px solid #007bff;">
                <h3>${p.title}</h3>
                <p>${p.content}</p>
                <p><small>ID POST: <code>${p._id}</code></small></p>
                <p><small>Autor ID: <code>${p.author?._id || p.author}</code></small></p>
                <button onclick="editPost('${p._id}', '${p.title}', '${p.content}', '${p.author?._id || p.author}')">Editar</button>
                <button class="btn-del" onclick="deletePost('${p._id}')">Borrar</button>
            </div>
        `).join('');
    } catch (error) { console.error("Error cargando posts:", error); }
}
function editPost(id, title, content, authorId) {
    document.getElementById('p-id').value = id;
    document.getElementById('p-title').value = title;
    document.getElementById('p-content').value = content;
    document.getElementById('p-author').value = authorId;
    document.getElementById('p-btn').innerText = "Actualizar Publicación";
    window.scrollTo(0, 0);
}

async function deletePost(id) {
    if (confirm('¿Eliminar publicación?')) {
        await fetch(`${URL_API}/posts/${id}`, { method: 'DELETE' });
        loadPosts();
    }
}

const commentForm = document.getElementById('form-comment');
commentForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = document.getElementById('c-id').value;
    const data = {
        text: document.getElementById('c-text').value,
        userId: document.getElementById('c-user').value,
        postId: document.getElementById('c-post').value
    };

    try {
        const method = id ? 'PUT' : 'POST';
        const path = id ? `/feedback/${id}` : '/feedback';

        const response = await fetch(URL_API + path, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            commentForm.reset();
            document.getElementById('c-id').value = "";
            document.getElementById('c-btn').innerText = "Comentar";
            loadComments();
        }
    } catch (error) { console.error("Error en comentario:", error); }
};

async function loadComments() {
    try {
        const res = await fetch(`${URL_API}/feedback`);
        const data = await res.json();
        const comments = data.comments || data || [];
        const div = document.getElementById('list-comments');
        div.innerHTML = comments.map(c => `
            <div class="card" style="border-left: 5px solid #ffc107;">
                <p>"${c.text}"</p>
                <small>User ID: ${c.userId?._id || c.userId}</small><br>
                <small>Post ID: ${c.postId?._id || c.postId}</small><br>
                <button onclick="editComment('${c._id}', '${c.text}', '${c.userId?._id || c.userId}', '${c.postId?._id || c.postId}')">Editar</button>
                <button onclick="deleteComment('${c._id}')" class="btn-del">Eliminar</button>
            </div>
        `).join('');
    } catch (error) { console.error("Error cargando comentarios:", error); }
}

function editComment(id, text, uId, pId) {
    document.getElementById('c-id').value = id;
    document.getElementById('c-text').value = text;
    document.getElementById('c-user').value = uId;
    document.getElementById('c-post').value = pId;
    document.getElementById('c-btn').innerText = "Actualizar Comentario";
    window.scrollTo(0, 0);
}

async function deleteComment(id) {
    if (confirm('¿Eliminar comentario?')) {
        await fetch(`${URL_API}/feedback/${id}`, { method: 'DELETE' });
        loadComments();
    }
}

window.onload = loadUsers;