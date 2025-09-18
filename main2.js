// Elementos HTML
const $list = document.getElementById('list');
const $error = document.getElementById('error');
const $spinner = document.getElementById('spinner');
const $toggleBnt = document.getElementById('toggleBnt')

const API = 'https://dummyjson.com/products'; // API pública de testes

function showSpinner(show) {
    $spinner.style.display = show ? 'block' : 'none';
    // $spinner.textContent = "Salvo"
}

function showError(msg) {
    $error.textContent = msg || '';
}

function renderPost(posts) {
    $list.innerHTML = posts.products.map(p => `
        <div class="card" >
            <img src="${p.thumbnail}" alt="${p.title}" >
            <h5 class="card-title">${p.title}</h5>
            <p>Categoria - ${p.category}</p>
            <p>Preço - R$ ${p.price.toFixed(2)}</p>
            <p>Avaliação - ${p.rating} | Stock - ${p.stock}</p>
        </div>
    `).join('');
}

async function getProducts() {
    showError('');
    showSpinner(true);
    $list.innerHTML = '';
    try {
        const res = await fetch(`${API}`);
        if (!res.ok) {
            throw new Error(`Erro HTTP ${res.status}`);
        }
        const data = await res.json();
        renderPost(data);
    } catch (err) {
        showError(err.message ?? 'Falha ao buscar dados');
    } finally {
        showSpinner(false);
    }
}
