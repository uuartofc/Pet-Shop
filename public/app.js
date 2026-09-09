const products = [
    { id: 1, category: 'alimentacao', type: 'Alimentação', name: 'Biscoito de banana & aveia', price: 29.9, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=85', tag: 'queridinho' },
    { id: 2, category: 'casa', type: 'Casa', name: 'Cama ninho terracota', price: 189.0, image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=700&q=85', tag: 'novo' },
    { id: 3, category: 'passeio', type: 'Passeio', name: 'Guia algodão cru', price: 79.9, image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=85', tag: '' },
    { id: 4, category: 'alimentacao', type: 'Alimentação', name: 'Cookie natural de cenoura', price: 64.9, image: 'https://images.unsplash.com/photo-1601758003122-53c40e686a19?auto=format&fit=crop&w=700&q=85', tag: '' },
    { id: 5, category: 'brinquedos', type: 'Brinquedos', name: 'Varinha com pena', price: 42.9, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=700&q=85', tag: 'gatos' },
    { id: 6, category: 'higiene', type: 'Higiene', name: 'Kit banho sensível', price: 89.9, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=700&q=85', tag: '' },
    { id: 7, category: 'casa', type: 'Casa', name: 'Manta dupla face', price: 119.9, image: 'https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=700&q=85', tag: '' },
    { id: 8, category: 'brinquedos', type: 'Brinquedos', name: 'Bola de enriquecimento', price: 54.9, image: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?auto=format&fit=crop&w=700&q=85', tag: 'cães' }
];
let cart = JSON.parse(localStorage.getItem('ninho-cart') || '[]');
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const $ = selector => document.querySelector(selector);

function renderProducts(filter = 'all') {
    const list = filter === 'all' ? products : products.filter(product => product.category === filter);
    $('#product-grid').innerHTML = list.map(product => `<article class="product-card"><div class="product-image"><img src="${product.image}" alt="${product.name}" loading="lazy">${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}</div><div class="product-info"><p>${product.type}</p><h3>${product.name}</h3><div class="product-meta"><span class="product-price">${money(product.price)}</span><button class="add-button" data-add="${product.id}" aria-label="Adicionar ${product.name} ao carrinho">+</button></div></div></article>`).join('');
}
function renderCart() {
    const items = $('#cart-items');
    $('#cart-count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
    if (!cart.length) items.innerHTML = '<p class="empty-cart">Sua sacola está esperando<br>por um achado especial.</p>';
    else items.innerHTML = cart.map(item => `<div class="cart-item"><img src="${item.image}" alt=""><div><h3>${item.name}</h3><p>${item.quantity} × ${money(item.price)}</p></div><button class="remove-item" data-remove="${item.id}">remover</button></div>`).join('');
    $('#cart-total').textContent = money(cart.reduce((total, item) => total + item.price * item.quantity, 0));
    localStorage.setItem('ninho-cart', JSON.stringify(cart));
}
function showToast(message) { const toast = $('#toast'); toast.textContent = message; toast.classList.add('is-visible'); setTimeout(() => toast.classList.remove('is-visible'), 2600); }
function toggleModal(id, open) { const modal = $(`#${id}`); modal.classList.toggle('is-open', open); modal.setAttribute('aria-hidden', String(!open)); }
function setTab(tabName) { document.querySelectorAll('.tab-link, .tab-panel').forEach(element => element.classList.toggle('is-active', element.dataset.tab === tabName || element.dataset.panel === tabName)); window.scrollTo({ top: document.querySelector('.tab-panels').offsetTop - 76, behavior: 'smooth' }); }
const bookingDate = new Date(); bookingDate.setHours(0, 0, 0, 0);
let calendarMonth = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), 1);
function dateKey(year, month, day) { return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
function renderCalendar() {
    const calendar = $('#calendar-grid'); if (!calendar) return;
    const year = calendarMonth.getFullYear(); const month = calendarMonth.getMonth();
    $('#calendar-label').textContent = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(calendarMonth).replace(/^./, letter => letter.toUpperCase());
    const firstDay = new Date(year, month, 1).getDay(); const daysInMonth = new Date(year, month + 1, 0).getDate(); const previousDays = new Date(year, month, 0).getDate();
    const selected = dateInput.value; let markup = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(day => `<span class="calendar-weekday">${day}</span>`).join('');
    for (let index = 0; index < 42; index += 1) {
        const dayNumber = index - firstDay + 1; const isPrevious = dayNumber < 1; const isNext = dayNumber > daysInMonth; const visibleDay = isPrevious ? previousDays + dayNumber : isNext ? dayNumber - daysInMonth : dayNumber; const cellMonth = isPrevious ? month - 1 : isNext ? month + 1 : month; const cellYear = new Date(year, cellMonth, 1).getFullYear(); const key = dateKey(cellYear, cellMonth, visibleDay); const date = new Date(cellYear, cellMonth, visibleDay); const disabled = date < bookingDate || date.getDay() === 0 || isPrevious || isNext;
        markup += `<button type="button" class="calendar-day${isPrevious || isNext ? ' is-adjacent' : ''}${key === selected ? ' is-selected' : ''}" data-date="${key}" ${disabled ? 'disabled' : ''}>${visibleDay}</button>`;
    }
    calendar.innerHTML = markup; $('#calendar-selected').textContent = selected ? new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date(`${selected}T12:00:00`)) : 'Escolha um dia disponível';
}
function setupCalendar() {
    const form = $('#booking-form'); if (!form) return;
    form.insertAdjacentHTML('afterbegin', '<div class="calendar-layout"><div class="calendar-box"><div class="calendar-heading"><button type="button" class="calendar-nav" id="calendar-prev" aria-label="Mês anterior">‹</button><strong id="calendar-label"></strong><button type="button" class="calendar-nav" id="calendar-next" aria-label="Próximo mês">›</button></div><div class="calendar-grid" id="calendar-grid"></div><p class="calendar-caption"><span class="calendar-dot"></span><span id="calendar-selected">Escolha um dia disponível</span></p></div><div class="time-box"><p class="time-title">Horários disponíveis</p><p class="time-caption">Escolha o melhor momento para vocês.</p><div class="time-options" id="time-options"></div></div></div>');
    const timeSelect = $('#time'); const timeStep = timeSelect.closest('.form-step'); timeStep.classList.add('time-source');
    setupCalendarTimes();
    renderCalendar();
}
function setupCalendarTimes() {
    const timeSelect = $('#time'); const booked = JSON.parse(localStorage.getItem('ninho-booking') || 'null');
    $('#time-options').innerHTML = Array.from(timeSelect.options).slice(1).map(option => { const isBooked = booked && booked.date === dateInput.value && booked.time === option.value; return `<button type="button" class="time-option${isBooked ? ' is-booked' : ''}" data-time-value="${option.value}" ${isBooked ? 'disabled' : ''}>${option.value}${isBooked ? '<small>agendado</small>' : ''}</button>`; }).join('');
    document.querySelectorAll('.time-option').forEach(option => option.classList.toggle('is-selected', option.dataset.timeValue === timeSelect.value && !option.disabled));
}
function renderBookingConfirmation(booking) {
    let confirmation = $('#booking-confirmation');
    if (!confirmation) { $('#booking-form').insertAdjacentHTML('afterend', '<div class="booking-confirmation" id="booking-confirmation" aria-live="polite"></div>'); confirmation = $('#booking-confirmation'); }
    const formattedDate = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date(`${booking.date}T12:00:00`));
    confirmation.innerHTML = `<span class="confirmation-check">✓</span><div><p class="eyebrow">PRÉ-AGENDAMENTO CONFIRMADO</p><h3>Até já, ${booking.pet}.</h3><p>${booking.service} · ${formattedDate} · ${booking.time}</p><small>Guardamos este pedido neste navegador para sua demonstração.</small></div>`;
    confirmation.classList.add('is-visible');
}

document.addEventListener('click', event => {
    const targetTab = event.target.dataset.goTab || event.target.dataset.tab;
    if (targetTab) { setTab(targetTab); return; }
    const addId = event.target.dataset.add;
    if (addId) { const product = products.find(item => item.id === Number(addId)); const existing = cart.find(item => item.id === product.id); if (existing) existing.quantity += 1; else cart.push({ ...product, quantity: 1 }); renderCart(); showToast(`${product.name} foi para sua sacola.`); }
    const removeId = event.target.dataset.remove;
    if (removeId) { cart = cart.filter(item => item.id !== Number(removeId)); renderCart(); }
    if (event.target.dataset.close) toggleModal(event.target.dataset.close, false);
    if (event.target.matches('#calendar-prev')) { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1); if (calendarMonth < new Date(bookingDate.getFullYear(), bookingDate.getMonth(), 1)) calendarMonth = new Date(bookingDate.getFullYear(), bookingDate.getMonth(), 1); renderCalendar(); }
    if (event.target.matches('#calendar-next')) { calendarMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1); renderCalendar(); }
    if (event.target.matches('.calendar-day:not(:disabled)')) { dateInput.value = event.target.dataset.date; renderCalendar(); setupCalendarTimes(); }
    if (event.target.matches('.time-option:not(:disabled)')) { $('#time').value = event.target.dataset.timeValue; document.querySelectorAll('.time-option').forEach(option => option.classList.toggle('is-selected', option === event.target)); }
});
document.querySelectorAll('.tab-link').forEach(button => button.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setTab(button.dataset.tab); } }));
document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.filter-button').forEach(item => item.classList.remove('active')); button.classList.add('active'); renderProducts(button.dataset.filter); }));
$('#account-button').addEventListener('click', () => toggleModal('account-modal', true));
$('#cart-button').addEventListener('click', () => $('#cart-drawer').classList.add('is-open'));
$('#close-cart').addEventListener('click', () => $('#cart-drawer').classList.remove('is-open'));
$('#account-form').addEventListener('submit', event => { event.preventDefault(); const name = $('#account-name').value.trim(); const user = { name, email: $('#account-email').value }; localStorage.setItem('ninho-user', JSON.stringify(user)); $('.account-label').textContent = `Oi, ${name.split(' ')[0]}`; toggleModal('account-modal', false); showToast(`Que bom ter você aqui, ${name.split(' ')[0]}!`); const pending = JSON.parse(localStorage.getItem('ninho-pending-booking') || 'null'); if (pending) { localStorage.setItem('ninho-booking', JSON.stringify(pending)); localStorage.removeItem('ninho-pending-booking'); renderBookingConfirmation(pending); setupCalendarTimes(); showToast('Agendamento confirmado com seu login.'); } });
$('#booking-form').addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(event.target)); if (!localStorage.getItem('ninho-user')) { localStorage.setItem('ninho-pending-booking', JSON.stringify(data)); $('#account-modal .modal-description').textContent = 'Entre ou cadastre-se para confirmar este horário para o seu pet.'; toggleModal('account-modal', true); showToast('Faça login para concluir o agendamento.'); return; } localStorage.setItem('ninho-booking', JSON.stringify(data)); renderBookingConfirmation(data); setupCalendarTimes(); showToast('Pré-agendamento recebido. Até já!'); });
$('#checkout-button').addEventListener('click', () => { if (!cart.length) showToast('Adicione um produto antes de continuar.'); else showToast('Checkout de teste pronto para a próxima etapa.'); });
const savedUser = JSON.parse(localStorage.getItem('ninho-user') || 'null'); if (savedUser) $('.account-label').textContent = `Oi, ${savedUser.name.split(' ')[0]}`;
const dateInput = $('#date'); dateInput.min = new Date().toISOString().split('T')[0]; setupCalendar();
const savedBooking = JSON.parse(localStorage.getItem('ninho-booking') || 'null'); if (savedBooking) { $('#service').value = savedBooking.service; $('#date').value = savedBooking.date; $('#time').value = savedBooking.time; $('#pet-name').value = savedBooking.pet; renderCalendar(); renderBookingConfirmation(savedBooking); document.querySelectorAll('.time-option').forEach(option => option.classList.toggle('is-selected', option.dataset.timeValue === savedBooking.time)); }
renderProducts(); renderCart();
