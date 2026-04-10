/* ================================================================
   PakBazaar — main.js
   Fixed: Login/Register with localStorage + Checkbox Filters
   ================================================================ */
'use strict';

/* ───────────────────────────────────────────
   USER AUTH  (localStorage)
─────────────────────────────────────────── */
function getUsers() {
  return JSON.parse(localStorage.getItem('pb_users') || '[]');
}
function saveUsers(arr) {
  localStorage.setItem('pb_users', JSON.stringify(arr));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('pb_current_user') || 'null');
}
function setCurrentUser(user) {
  localStorage.setItem('pb_current_user', JSON.stringify(user));
}
function clearCurrentUser() {
  localStorage.removeItem('pb_current_user');
}

/* ── update header UI based on login state ── */
function refreshAuthUI() {
  const user = getCurrentUser();
  const loginBtn  = document.getElementById('headerLoginBtn');
  const postBtn   = document.getElementById('headerPostBtn');
  const userChip  = document.getElementById('headerUserChip');
  const userName  = document.getElementById('headerUserName');

  if (user) {
    if (loginBtn)  loginBtn.style.display  = 'none';
    if (userChip)  userChip.style.display  = 'flex';
    if (userName)  userName.textContent    = user.fname || user.email;
  } else {
    if (loginBtn)  loginBtn.style.display  = 'flex';
    if (userChip)  userChip.style.display  = 'none';
  }
}

/* ── REGISTER ── */
function doRegister() {
  const fname = document.getElementById('regFname')?.value.trim();
  const lname = document.getElementById('regLname')?.value.trim();
  const email = document.getElementById('regEmail')?.value.trim();
  const phone = document.getElementById('regPhone')?.value.trim();
  const pass  = document.getElementById('regPass')?.value;
  const pass2 = document.getElementById('regPass2')?.value;

  if (!fname)         { showFormError('regFname', 'First name required'); return; }
  if (!email)         { showFormError('regEmail', 'Email required'); return; }
  if (!phone)         { showFormError('regPhone', 'Phone required'); return; }
  if (!pass)          { showFormError('regPass',  'Password required'); return; }
  if (pass.length < 6){ showFormError('regPass',  'Minimum 6 characters'); return; }
  if (pass !== pass2) { showFormError('regPass2', 'Passwords do not match'); return; }

  const users = getUsers();
  if (users.find(u => u.email === email)) {
    showFormError('regEmail', 'Email already registered'); return;
  }

  const newUser = {
    id: Date.now(),
    fname, lname, email, phone,
    password: pass,
    avatar: (fname[0] + (lname?.[0] || '')).toUpperCase(),
    createdAt: new Date().toISOString(),
    ads: [], wishlist: [], orders: []
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  refreshAuthUI();
  closeModal('loginModal');
  toast('🎉 Welcome to PakBazaar, ' + fname + '! Account created.');
  clearRegForm();
}

/* ── LOGIN ── */
function doLogin() {
  const identifier = document.getElementById('loginEmail')?.value.trim();
  const pass       = document.getElementById('loginPass')?.value;

  if (!identifier) { showFormError('loginEmail', 'Email or phone required'); return; }
  if (!pass)       { showFormError('loginPass',  'Password required'); return; }

  const users = getUsers();
  const user  = users.find(u => (u.email === identifier || u.phone === identifier) && u.password === pass);

  if (!user) {
    showFormError('loginPass', 'Incorrect email/phone or password');
    return;
  }

  setCurrentUser(user);
  refreshAuthUI();
  closeModal('loginModal');
  toast('Welcome back, ' + (user.fname || user.email) + '! ✓');
  clearLoginForm();
}

/* ── LOGOUT ── */
function doLogout() {
  clearCurrentUser();
  refreshAuthUI();
  showPage('home');
  navGo(document.querySelector('.nitem'), 'home');
  toast('Signed out successfully.');
}

/* ── helpers ── */
function showFormError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  let err = el.nextElementSibling;
  if (!err || !err.classList.contains('form-err')) {
    err = document.createElement('span');
    err.className = 'form-err';
    err.style.cssText = 'color:var(--red);font-size:12px;margin-top:3px;display:block';
    el.parentNode.appendChild(err);
  }
  err.textContent = msg;
  setTimeout(() => {
    el.style.borderColor = '';
    err.textContent = '';
  }, 3000);
}

function clearLoginForm() {
  ['loginEmail','loginPass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function clearRegForm() {
  ['regFname','regLname','regEmail','regPhone','regPass','regPass2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function switchLoginTab(tab, el) {
  document.querySelectorAll('.ltab').forEach(t => t.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('loginFormBody').style.display  = tab === 'login'    ? 'block' : 'none';
  document.getElementById('registerFormBody').style.display = tab === 'register' ? 'block' : 'none';
}

/* ================================================================
   PAGE ROUTER
   ================================================================ */
function showPage(id) {
  document.querySelectorAll('.page-sec').forEach(s => s.classList.remove('active'));
  const t = document.getElementById('page-' + id);
  if (t) { t.classList.add('active'); t.classList.remove('fade-up'); void t.offsetWidth; t.classList.add('fade-up'); }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navGo(el, page) {
  document.querySelectorAll('.nitem').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  showPage(page);
  lbar();
}

function lbar() {
  const b = document.getElementById('lbar');
  if (!b) return;
  b.style.width = '70%';
  setTimeout(() => { b.style.width = '100%'; setTimeout(() => { b.style.width = '0'; }, 300); }, 200);
}

/* ================================================================
   MODALS
   ================================================================ */
function openModal(id) { document.getElementById(id)?.classList.add('open'); }
function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

/* ================================================================
   CART  (localStorage)
   ================================================================ */
function getCart() { return JSON.parse(localStorage.getItem('pb_cart') || '[]'); }
function saveCart(c) { localStorage.setItem('pb_cart', JSON.stringify(c)); }

function addToCart(name, price, img) {
  const cart = getCart();
  const ex = cart.find(i => i.name === name);
  if (ex) { ex.qty++; } else { cart.push({ id: Date.now(), name, price, qty: 1, img: img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' }); }
  saveCart(cart);
  renderCart();
  toast(name + ' added to cart 🛒');
}

function renderCart() {
  const cart  = getCart();
  const body  = document.getElementById('cartBody');
  const count = document.getElementById('cCount');
  const badge = document.getElementById('cBadge');
  const total = document.getElementById('cartTotal');

  const totalQty   = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.qty * i.price, 0);

  if (count) count.textContent = totalQty;
  if (badge) badge.textContent = totalQty;
  if (total) total.textContent = 'Rs. ' + totalPrice.toLocaleString('en-PK');

  if (!body) return;
  if (cart.length === 0) {
    body.innerHTML = '<div style="text-align:center;padding:48px 0;color:var(--text3)"><div style="font-size:52px;margin-bottom:12px">🛒</div><p style="font-weight:600">Your cart is empty</p></div>';
    return;
  }
  body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="ci-img"><img src="${item.img}" alt="${item.name}"></div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">Rs. ${item.price.toLocaleString('en-PK')}</div>
        <div class="ci-qty">
          <button class="qty-b" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-n">${item.qty}</span>
          <button class="qty-b" onclick="changeQty(${item.id},1)">+</button>
          <button class="ci-del" onclick="removeFromCart(${item.id})" title="Remove"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>`).join('');
}

function changeQty(id, d) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(cart); renderCart();
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart();
  toast('Item removed');
}

function toggleCart() {
  document.getElementById('cartPanel')?.classList.toggle('open');
  document.getElementById('cartBg')?.classList.toggle('open');
}

/* ================================================================
   WISHLIST
   ================================================================ */
function toggleWish(btn) {
  btn.classList.toggle('on');
  btn.innerHTML = btn.classList.contains('on') ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  toast(btn.classList.contains('on') ? 'Added to Wishlist ❤️' : 'Removed from Wishlist');
}

/* ================================================================
   SEARCH
   ================================================================ */
function doSearch() {
  const q = document.getElementById('mainSearch')?.value.trim();
  if (!q) { toast('Please enter a search term', 'err'); return; }
  toast('Searching for: "' + q + '"...', 'inf');
}
function updateSearchPlaceholder(sel) {
  const map = { Cars:'Search cars...', Bikes:'Search bikes...', Electronics:'Search phones, laptops...', Fashion:'Search clothes...', Property:'Search houses, plots...', Grocery:'Search groceries...' };
  const inp = document.getElementById('mainSearch');
  if (inp) inp.placeholder = map[sel.value] || 'Search everything...';
}

/* ================================================================
   CHECKBOX FILTERS  — universal, works on ALL pages
   ================================================================ */

/**
 * filterByCheckbox(pageId, dataAttr)
 *
 * pageId   = e.g. 'cars', 'bikes', 'electronics', 'fashion', 'beauty'
 * dataAttr = dataset attribute on each card, e.g. 'brand', 'cc', 'category'
 *
 * How it works:
 *  1. Read all checked checkboxes in that page's sidebar
 *  2. Show only cards whose data-[attr] is in the checked list
 *  3. If nothing checked → show all
 */
function filterByCheckbox(pageId, dataAttr) {
  const sidebar = document.querySelector('#page-' + pageId + ' .sidebar');
  if (!sidebar) return;

  // Collect all unique checkbox groups (by name/groupName)
  // We use a generic approach: each checkbox has data-filter-val
  const allCBs    = sidebar.querySelectorAll('input[type="checkbox"][data-filter-val]');
  const checkedVals = [];
  allCBs.forEach(cb => { if (cb.checked) checkedVals.push(cb.dataset.filterVal.toLowerCase()); });

  const cards = document.querySelectorAll('#page-' + pageId + ' .filter-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardVals = (card.dataset[dataAttr] || '').toLowerCase().split(',').map(s => s.trim());
    // Show card if no filter active OR any card value matches any checked value
    const match = checkedVals.length === 0 || cardVals.some(v => checkedVals.includes(v));
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });

  // Update count label
  const countEl = document.getElementById('count-' + pageId);
  if (countEl) countEl.textContent = visibleCount.toLocaleString();
}

/**
 * filterShopCategory — shop page has data-category on each card
 * Called when any shop checkbox changes
 */
function filterShopCategory() {
  const checks = document.querySelectorAll('#page-shop .shop-cb');
  const checked = [];
  checks.forEach(cb => { if (cb.checked) checked.push(cb.dataset.cat); });

  const blocks = document.querySelectorAll('#page-shop .cat-block');
  let total = 0;
  blocks.forEach(block => {
    const cat = block.dataset.cat;
    const show = checked.length === 0 || checked.includes(cat);
    block.style.display = show ? 'block' : 'none';
    if (show) total += block.querySelectorAll('.pcard').length;
  });
  const el = document.getElementById('shopResultCount');
  if (el) el.textContent = total + ' products found';
}

function shopSelectAll()  { document.querySelectorAll('#page-shop .shop-cb').forEach(c => c.checked = true);  filterShopCategory(); }
function shopClearAll()   { document.querySelectorAll('#page-shop .shop-cb').forEach(c => c.checked = false); filterShopCategory(); }

function shopTabFilter(cat, btn) {
  document.querySelectorAll('.scat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (cat === 'all') { shopSelectAll(); return; }
  document.querySelectorAll('#page-shop .shop-cb').forEach(c => { c.checked = c.dataset.cat === cat; });
  filterShopCategory();
}

/* ── generic reset ── */
function resetFilters(pageId) {
  const sidebar = document.querySelector('#page-' + pageId + ' .sidebar');
  if (!sidebar) return;
  sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => { cb.checked = true; });
  sidebar.querySelectorAll('input[type="range"]').forEach(r => { r.value = r.max; });
  filterByCheckbox(pageId, 'filter');
  toast('Filters reset');
}

/* ================================================================
   SETTINGS / THEME
   ================================================================ */
const THEMES = {
  light: {},
  dark:  { '--white':'#111','--off':'#1a1a1a','--off2':'#222','--border':'#333','--border2':'#3a3a3a','--text':'#f0f0f0','--text2':'#aaa','--text3':'#666' },
  teal:  { '--white':'#0d1a18','--off':'#122420','--off2':'#1a302c','--border':'#2a4440','--border2':'#3a5a54','--text':'#e0f5f2','--text2':'#9acccc','--text3':'#567874','--lime':'#96d1c7','--lime-dark':'#6bb8ac' },
  warm:  { '--white':'#1a0d00','--off':'#2a1a00','--off2':'#351f00','--border':'#4a2e00','--border2':'#5a3800','--text':'#fef3e2','--text2':'#d4a96a','--text3':'#8a6030','--lime':'#f59e0b','--lime-dark':'#d97706' }
};
function setTheme(t, el) {
  document.querySelectorAll('.tpick').forEach(p => p.classList.remove('on'));
  if (el) el.classList.add('on');
  const root = document.documentElement;
  ['--white','--off','--off2','--border','--border2','--text','--text2','--text3','--lime','--lime-dark'].forEach(k => root.style.removeProperty(k));
  Object.entries(THEMES[t] || {}).forEach(([k, v]) => root.style.setProperty(k, v));
  localStorage.setItem('pb_theme', t);
}
function saveSettings() { toast('Settings saved ✓'); closeModal('settingsModal'); }

/* ================================================================
   FLASH SALE COUNTDOWN
   ================================================================ */
(function() {
  let h = 8, m = 47, s = 23;
  setInterval(() => {
    s--; if (s<0){s=59;m--;} if(m<0){m=59;h--;} if(h<0){h=23;m=59;s=59;}
    const H=document.getElementById('cdH'), M=document.getElementById('cdM'), S=document.getElementById('cdS');
    if(H) H.textContent=String(h).padStart(2,'0');
    if(M) M.textContent=String(m).padStart(2,'0');
    if(S) S.textContent=String(s).padStart(2,'0');
  }, 1000);
})();

/* ================================================================
   POST AD
   ================================================================ */
function updateSubcategory(sel) {
  const subs = {
    Cars:['Sedan','SUV/4x4','Hatchback','Pickup','Van'],
    Bikes:['Street Bike','Off-Road','Scooter','Sports Bike'],
    Electronics:['Mobile Phones','Laptops','Tablets','TVs','Audio','Gaming'],
    Fashion:["Women's Clothing","Men's Clothing",'Kids','Shoes','Bags'],
    Property:['House','Apartment','Plot','Commercial'],
    Furniture:['Bedroom','Living Room','Office','Kitchen'],
    Jobs:['IT & Tech','Finance','Healthcare','Education'],
    Beauty:['Makeup','Skincare','Haircare','Fragrances'],
    Grocery:['Vegetables','Fruits','Dairy','Drinks','Snacks','Bakery','Meat']
  };
  const el = document.getElementById('subCatSel');
  if (!el) return;
  el.innerHTML = '<option value="">Select Sub-Category</option>';
  (subs[sel.value] || []).forEach(s => { const o = document.createElement('option'); o.textContent = s; el.appendChild(o); });
}

function submitAd() {
  const user = getCurrentUser();
  if (!user) { openModal('loginModal'); toast('Please login to post an ad', 'err'); return; }
  const title = document.getElementById('adTitle')?.value.trim();
  const desc  = document.getElementById('adDesc')?.value.trim();
  const price = document.getElementById('adPrice')?.value.trim();
  if (!title) { showFormError('adTitle','Title required'); return; }
  if (!desc)  { showFormError('adDesc','Description required'); return; }
  if (!price) { showFormError('adPrice','Price required'); return; }
  toast('🎉 Your ad is live! Visible to millions of buyers now');
  ['adTitle','adDesc','adPrice'].forEach(id => { const e=document.getElementById(id); if(e) e.value=''; });
}

/* ================================================================
   TOAST
   ================================================================ */
function toast(msg, type) {
  const w = document.getElementById('toast-wrap');
  if (!w) return;
  const el = document.createElement('div');
  el.className = 'toast' + (type ? ' ' + type : '');
  el.innerHTML = `<span>${{err:'❌',inf:'ℹ️'}[type]||'✅'}</span><span>${msg}</span>`;
  w.appendChild(el);
  setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(110px)'; el.style.transition='all 0.3s'; setTimeout(()=>el.remove(),300); }, 3200);
}

/* ================================================================
   INIT
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const savedTheme = localStorage.getItem('pb_theme');
  if (savedTheme) {
    const tpick = document.querySelector(`.tpick[data-theme="${savedTheme}"]`);
    setTheme(savedTheme, tpick);
  }

  // Render cart
  renderCart();

  // Auth UI
  refreshAuthUI();

  // Cart bg click to close
  document.getElementById('cartBg')?.addEventListener('click', toggleCart);

  // Nav loading bar
  document.querySelectorAll('.nitem').forEach(n => n.addEventListener('click', lbar));

  console.log('PakBazaar v3 ✓');
});
