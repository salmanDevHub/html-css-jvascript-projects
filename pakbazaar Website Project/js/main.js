
'use strict';

window._uploadedPhotos = [];

window.handlePhotoSelect = function(input) {
  processPhotoFiles(Array.from(input.files));
};

window.handlePhotoDrop = function(event) {
  event.preventDefault();
  document.getElementById('photoUploadZone')?.classList.remove('drag-over');
  const files = Array.from(event.dataTransfer.files).filter(f => f.type.startsWith('image/'));
  processPhotoFiles(files);
};

function processPhotoFiles(files) {
  const remaining = 10 - window._uploadedPhotos.length;
  if (remaining <= 0) { toast('Maximum 10 photos allowed', 'err'); return; }
  const toAdd = files.slice(0, remaining);
  let done = 0;
  toAdd.forEach(file => {
    if (file.size > 5 * 1024 * 1024) { toast(file.name + ' exceeds 5MB limit', 'err'); done++; if (done === toAdd.length) renderPhotoGrid(); return; }
    const reader = new FileReader();
    reader.onload = e => {
      window._uploadedPhotos.push({ dataUrl: e.target.result, name: file.name });
      done++;
      if (done === toAdd.length) renderPhotoGrid();
    };
    reader.readAsDataURL(file);
  });
}

function renderPhotoGrid() {
  const grid    = document.getElementById('photoGrid');
  const wrap    = document.getElementById('photoPreviewGrid');
  const zone    = document.getElementById('photoUploadZone');
  const countEl = document.getElementById('photoCountLabel');
  if (!grid) return;
  const photos = window._uploadedPhotos;
  if (photos.length === 0) {
    if (wrap) wrap.style.display = 'none';
    if (zone) zone.style.display = 'block';
    return;
  }
  if (wrap) wrap.style.display = 'block';
  if (zone) zone.style.display = 'none';
  if (countEl) countEl.textContent = photos.length + ' photo' + (photos.length > 1 ? 's' : '') + ' selected';
  grid.innerHTML = photos.map((p, i) => `
    <div style="position:relative;border-radius:var(--r-sm);overflow:hidden;aspect-ratio:1;background:var(--off)">
      <img src="${p.dataUrl}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;display:block">
      ${i === 0 ? '<div style="position:absolute;bottom:0;left:0;right:0;background:rgba(168,201,2,0.9);color:#000;font-size:10px;font-weight:700;text-align:center;padding:3px">COVER</div>' : ''}
      <button onclick="removePhoto(${i})" style="position:absolute;top:4px;right:4px;width:22px;height:22px;background:rgba(0,0,0,0.7);border:none;border-radius:50%;color:#fff;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center">✕</button>
    </div>`).join('');
}

window.removePhoto = function(index) {
  window._uploadedPhotos.splice(index, 1);
  renderPhotoGrid();
  if (window._uploadedPhotos.length === 0) {
    const zone = document.getElementById('photoUploadZone');
    const wrap = document.getElementById('photoPreviewGrid');
    if (zone) zone.style.display = 'block';
    if (wrap) wrap.style.display = 'none';
  }
};

window.clearAllPhotos = function() {
  window._uploadedPhotos = [];
  renderPhotoGrid();
  const zone = document.getElementById('photoUploadZone');
  const wrap = document.getElementById('photoPreviewGrid');
  if (zone) zone.style.display = 'block';
  if (wrap) wrap.style.display = 'none';
};

/* ═══════════════════════════════════════════
   POST AD — STEP NAVIGATION
═══════════════════════════════════════════ */
window.sellGoStep = function(step) {
  for (let i = 1; i <= 4; i++) {
    const body = document.getElementById('sell-step-' + i);
    const ind  = document.getElementById('step-ind-' + i);
    if (body) body.style.display = i === step ? 'block' : 'none';
    if (ind) { ind.classList.toggle('active', i === step); ind.classList.toggle('done', i < step); }
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.sellNextStep = function(currentStep) {
  if (currentStep === 1) {
    const cat  = document.getElementById('adCategory')?.value;
    const cond = document.getElementById('adCondition')?.value;
    if (!cat)  { showFormError('adCategory',  'Please select a category'); return; }
    if (!cond) { showFormError('adCondition', 'Please select condition');  return; }
  }
  if (currentStep === 2) {
    const title = document.getElementById('adTitle')?.value.trim();
    const desc  = document.getElementById('adDesc')?.value.trim();
    const price = document.getElementById('adPrice')?.value;
    if (!title || title.length < 5) { showFormError('adTitle', 'Please enter a descriptive title (min 5 chars)'); return; }
    if (!desc)  { showFormError('adDesc',  'Description is required'); return; }
    if (!price || +price <= 0) { showFormError('adPrice', 'Please enter a valid price'); return; }
  }
  sellGoStep(currentStep + 1);
};

window.submitAd = function() {
  const user = getCurrentUser();
  if (!user) { openModal('loginModal'); toast('Please login to post an ad', 'err'); return; }

  const province = document.getElementById('adProvince')?.value;
  const city     = document.getElementById('adCity')?.value;
  const name     = document.getElementById('adSellerName')?.value.trim();
  const phone    = document.getElementById('adSellerPhone')?.value.trim();

  if (!province) { showFormError('adProvince',   'Province required'); return; }
  if (!city)     { showFormError('adCity',        'City required');     return; }
  if (!name)     { showFormError('adSellerName',  'Your name required'); return; }
  if (!phone)    { showFormError('adSellerPhone', 'Phone required');    return; }
  const cleanPhone = phone.replace(/[-\s]/g, '');
  if (!/^03\d{9}$/.test(cleanPhone)) { showFormError('adSellerPhone', 'Enter valid format: 03XXXXXXXXX'); return; }

  const ad = {
    id:        'AD-' + Date.now(),
    title:     document.getElementById('adTitle')?.value.trim(),
    desc:      document.getElementById('adDesc')?.value.trim(),
    price:     document.getElementById('adPrice')?.value,
    priceType: document.getElementById('adPriceType')?.value || 'Negotiable',
    category:  document.getElementById('adCategory')?.value,
    subCat:    document.getElementById('subCatSel')?.value,
    condition: document.getElementById('adCondition')?.value,
    province, city,
    area:      document.getElementById('adArea')?.value.trim(),
    seller: name, phone,
    email: document.getElementById('adSellerEmail')?.value.trim(),
    photos: window._uploadedPhotos.map(p => p.dataUrl),
    postedAt: new Date().toISOString(),
    views: 0
  };

  const ads = JSON.parse(localStorage.getItem('pb_ads_' + user.id) || '[]');
  ads.unshift(ad);
  localStorage.setItem('pb_ads_' + user.id, JSON.stringify(ads));

  /* Hide steps, show success */
  for (let i = 1; i <= 4; i++) {
    const s = document.getElementById('sell-step-' + i);
    if (s) s.style.display = 'none';
  }
  const suc = document.getElementById('sell-success');
  if (suc) suc.style.display = 'block';
  const titleEl = document.getElementById('successAdTitle');
  if (titleEl) titleEl.textContent = '"' + ad.title + '"';

  window._uploadedPhotos = [];
};

window.resetSellForm = function() {
  window._uploadedPhotos = [];
  ['adTitle','adDesc','adPrice','adArea','adSellerName','adSellerPhone','adSellerEmail']
    .forEach(id => { const e = document.getElementById(id); if (e) e.value = ''; });
  ['adCategory','adCondition','adProvince','adCity','adPriceType','subCatSel']
    .forEach(id => { const e = document.getElementById(id); if (e) e.selectedIndex = 0; });
  const suc = document.getElementById('sell-success');
  if (suc) suc.style.display = 'none';
  sellGoStep(1);

  const user = getCurrentUser();
  if (user) {
    const n = document.getElementById('adSellerName');
    const p = document.getElementById('adSellerPhone');
    const e = document.getElementById('adSellerEmail');
    if (n) n.value = (user.fname + ' ' + (user.lname || '')).trim();
    if (p) p.value = user.phone || '';
    if (e) e.value = user.email || '';
  }
};

window.viewMyAds = function() {
  navGo(document.querySelectorAll('.nitem')[11], 'profile');
  setTimeout(() => {
    if (typeof showProfileTab === 'function') showProfileTab('myads', document.querySelector('.prof-nav a'));
  }, 300);
};

/* ═══════════════════════════════════════════
   CART
═══════════════════════════════════════════ */
function getCart()   { return JSON.parse(localStorage.getItem('pb_cart') || '[]'); }
function saveCart(c) { localStorage.setItem('pb_cart', JSON.stringify(c)); }

window.addToCart = function(name, price, img) {
  const cart = getCart();
  const ex = cart.find(i => i.name === name);
  if (ex) { ex.qty++; } else {
    cart.push({ id: Date.now(), name, price, qty: 1,
      img: img || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' });
  }
  saveCart(cart);
  renderCart();
  toast(name + ' added to cart 🛒');
};

window.renderCart = function() {
  const cart  = getCart();
  const body  = document.getElementById('cartBody');
  const count = document.getElementById('cCount');
  const badge = document.getElementById('cBadge');
  const total = document.getElementById('cartTotal');
  const qty   = cart.reduce((s, i) => s + i.qty, 0);
  const price = cart.reduce((s, i) => s + i.qty * i.price, 0);

  if (count) count.textContent = qty;
  if (badge) badge.textContent = qty;
  if (total) total.textContent = 'Rs. ' + price.toLocaleString('en-PK');

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
          <button class="ci-del" onclick="removeFromCart(${item.id})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </div>
    </div>`).join('');
};

window.changeQty = function(id, d) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += d;
  if (item.qty <= 0) { removeFromCart(id); return; }
  saveCart(cart); renderCart();
};

window.removeFromCart = function(id) {
  saveCart(getCart().filter(i => i.id !== id));
  renderCart(); toast('Item removed');
};

window.toggleCart = function() {
  document.getElementById('cartPanel')?.classList.toggle('open');
  document.getElementById('cartBg')?.classList.toggle('open');
};

/* ═══════════════════════════════════════════
   CHECKOUT MODAL
═══════════════════════════════════════════ */
window.openCheckout = function() {
  const cart = getCart();
  if (cart.length === 0) { toast('Your cart is empty', 'err'); return; }
  const user  = getCurrentUser();
  const sub   = cart.reduce((s,i) => s + i.qty*i.price, 0);
  const del   = 150;
  const grand = sub + del;

  let ex = document.getElementById('checkoutModal');
  if (ex) ex.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'checkoutModal';
  overlay.innerHTML = `
  <div class="modal" style="max-width:540px;width:100%">
    <div class="modal-hd">
      <h3>🛒 Checkout</h3>
      <button class="modal-x" onclick="closeModal('checkoutModal')">✕</button>
    </div>

    <!-- ORDER SUMMARY -->
    <div style="background:var(--off);border-radius:var(--r-sm);padding:14px;margin-bottom:18px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:var(--text3);margin-bottom:10px">Order Summary</div>
      ${cart.map(item=>`
      <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
        <img src="${item.img}" style="width:42px;height:42px;object-fit:cover;border-radius:6px;flex-shrink:0">
        <div style="flex:1;font-size:13px;font-weight:600">${item.name}</div>
        <div style="font-size:12px;color:var(--text3)">×${item.qty}</div>
        <div style="font-size:13px;font-weight:700;white-space:nowrap">Rs.${(item.price*item.qty).toLocaleString('en-PK')}</div>
      </div>`).join('')}
      <div style="border-top:1px solid var(--border);margin-top:8px;padding-top:8px">
        <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text2);margin-bottom:3px"><span>Subtotal</span><span>Rs. ${sub.toLocaleString('en-PK')}</span></div>
        <div style="display:flex;justify-content:space-between;font-size:13px;color:var(--text2);margin-bottom:6px"><span>Delivery</span><span>Rs. ${del}</span></div>
        <div style="display:flex;justify-content:space-between;font-family:var(--font-head);font-size:18px;font-weight:700"><span>Total</span><span style="color:var(--lime-dark)">Rs. ${grand.toLocaleString('en-PK')}</span></div>
      </div>
    </div>

    <!-- DELIVERY -->
    <div style="margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:var(--text3);margin-bottom:10px">Delivery Details</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px">
        <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Full Name *</label><input type="text" class="finp" id="co-name" placeholder="Receiver's name" value="${user?(user.fname+' '+(user.lname||'')).trim():''}"></div>
        <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Phone *</label><input type="tel" class="finp" id="co-phone" placeholder="03XX-XXXXXXX" value="${user?(user.phone||''):''}"></div>
      </div>
      <div style="margin-bottom:8px"><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Delivery Address *</label><input type="text" class="finp" id="co-address" placeholder="House No, Street, Area, Locality"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">City *</label>
          <select class="finp" id="co-city">
            <option value="">Select City</option>
            <option>Lahore</option><option>Karachi</option><option>Islamabad</option>
            <option>Rawalpindi</option><option>Faisalabad</option><option>Multan</option>
            <option>Peshawar</option><option>Quetta</option><option>Sialkot</option>
          </select>
        </div>
        <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Postal Code</label><input type="text" class="finp" id="co-postal" placeholder="e.g. 54000" maxlength="5"></div>
      </div>
    </div>

    <!-- PAYMENT -->
    <div style="margin-bottom:18px">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;color:var(--text3);margin-bottom:10px">Payment Method</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <label class="payment-option selected"><input type="radio" name="pm" value="Cash on Delivery" checked onchange="onPaymentChange(this)"><div class="pm-icon">💵</div><div class="pm-info"><strong>Cash on Delivery</strong><span>Pay when your order arrives</span></div><div class="pm-check">✓</div></label>
        <label class="payment-option"><input type="radio" name="pm" value="Credit/Debit Card" onchange="onPaymentChange(this)"><div class="pm-icon">💳</div><div class="pm-info"><strong>Credit / Debit Card</strong><span>Visa, Mastercard, UnionPay</span></div><div class="pm-check">✓</div></label>
        <label class="payment-option"><input type="radio" name="pm" value="EasyPaisa" onchange="onPaymentChange(this)"><div class="pm-icon">📱</div><div class="pm-info"><strong>EasyPaisa</strong><span>Pay via EasyPaisa wallet</span></div><div class="pm-check">✓</div></label>
        <label class="payment-option"><input type="radio" name="pm" value="JazzCash" onchange="onPaymentChange(this)"><div class="pm-icon">🎵</div><div class="pm-info"><strong>JazzCash</strong><span>Pay via JazzCash wallet</span></div><div class="pm-check">✓</div></label>
      </div>

      <!-- CARD FIELDS -->
      <div id="cardFields" style="display:none;margin-top:10px;background:var(--off);padding:12px;border-radius:var(--r-sm)">
        <div style="margin-bottom:8px"><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Card Number *</label><input type="text" class="finp" id="co-cardnum" placeholder="1234 5678 9012 3456" maxlength="19" oninput="this.value=this.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()"></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Expiry *</label><input type="text" class="finp" id="co-expiry" placeholder="MM / YY" maxlength="7" oninput="let v=this.value.replace(/\D/g,'').slice(0,4);if(v.length>2)v=v.slice(0,2)+' / '+v.slice(2);this.value=v"></div>
          <div><label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">CVV *</label><input type="password" class="finp" id="co-cvv" placeholder="•••" maxlength="4"></div>
        </div>
      </div>

      <!-- WALLET FIELD -->
      <div id="walletField" style="display:none;margin-top:10px;background:var(--off);padding:12px;border-radius:var(--r-sm)">
        <label style="font-size:12px;font-weight:600;color:var(--text2);display:block;margin-bottom:4px">Wallet Number *</label>
        <input type="tel" class="finp" id="co-wallet" placeholder="03XX-XXXXXXX">
      </div>
    </div>

    <!-- PLACE ORDER -->
    <button id="placeOrderBtn" class="btn-checkout" onclick="placeOrder(${grand},${JSON.stringify(cart).replace(/"/g,'&quot;')})">
      <i class="fas fa-lock" style="margin-right:8px"></i>Place Order — Rs. ${grand.toLocaleString('en-PK')}
    </button>
    <p style="text-align:center;font-size:11px;color:var(--text3);margin-top:8px">
      <i class="fas fa-shield-alt" style="color:var(--lime-dark)"></i> 100% Secure Checkout
    </p>
  </div>`;

  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('open'), 10);
  toggleCart();
};

window.onPaymentChange = function(radio) {
  document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('selected'));
  radio.closest('.payment-option')?.classList.add('selected');
  document.getElementById('cardFields').style.display  = radio.value === 'Credit/Debit Card' ? 'block' : 'none';
  document.getElementById('walletField').style.display = (radio.value === 'EasyPaisa' || radio.value === 'JazzCash') ? 'block' : 'none';
};

window.placeOrder = function(grand, cartSnapshotEncoded) {
  /* Validation */
  const name    = document.getElementById('co-name')?.value.trim();
  const phone   = document.getElementById('co-phone')?.value.trim();
  const address = document.getElementById('co-address')?.value.trim();
  const city    = document.getElementById('co-city')?.value;

  if (!name)    { showCoError('co-name',    'Name required'); return; }
  if (!phone)   { showCoError('co-phone',   'Phone required'); return; }
  if (!address) { showCoError('co-address', 'Address required'); return; }
  if (!city)    { showCoError('co-city',    'Select a city'); return; }

  const payMethod = document.querySelector('input[name="pm"]:checked')?.value || 'Cash on Delivery';

  if (payMethod === 'Credit/Debit Card') {
    const cardNum = document.getElementById('co-cardnum')?.value.replace(/\s/g, '');
    const expiry  = document.getElementById('co-expiry')?.value.trim();
    const cvv     = document.getElementById('co-cvv')?.value.trim();
    if (!cardNum || cardNum.length < 16) { showCoError('co-cardnum', 'Enter valid 16-digit card number'); return; }
    if (!expiry  || expiry.length < 4)   { showCoError('co-expiry',  'Enter valid expiry MM/YY'); return; }
    if (!cvv     || cvv.length < 3)      { showCoError('co-cvv',     'Enter valid CVV (3-4 digits)'); return; }
  }

  if (payMethod === 'EasyPaisa' || payMethod === 'JazzCash') {
    const wallet = document.getElementById('co-wallet')?.value.trim();
    if (!wallet) { showCoError('co-wallet', 'Enter wallet number'); return; }
  }

  /* Animate */
  const btn = document.getElementById('placeOrderBtn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px"></i>Processing your order...'; }

  setTimeout(() => {
    const cart = getCart();
    const user = getCurrentUser();
    const order = {
      id:            'ORD-' + Date.now(),
      date:          new Date().toISOString(),
      items:         cart.map(i => ({ name:i.name, price:i.price, qty:i.qty, img:i.img })),
      total:         grand,
      paymentMethod: payMethod,
      delivery:      { name, phone, address, city, postal: document.getElementById('co-postal')?.value.trim() },
      status:        'Confirmed'
    };

    if (user) {
      const orders = JSON.parse(localStorage.getItem('pb_orders_' + user.id) || '[]');
      orders.unshift(order);
      localStorage.setItem('pb_orders_' + user.id, JSON.stringify(orders));
    }

    saveCart([]);
    renderCart();
    closeModal('checkoutModal');
    showOrderSuccess(order);
  }, 1800);
};

function showCoError(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  el.focus();
  let err = el.nextElementSibling;
  if (!err || !err.classList.contains('form-err')) {
    err = document.createElement('span');
    err.className = 'form-err';
    el.parentNode.appendChild(err);
  }
  err.textContent = msg;
  setTimeout(() => { el.style.borderColor = ''; if(err) err.textContent = ''; }, 3500);
}

function showOrderSuccess(order) {
  let ex = document.getElementById('orderSuccessModal');
  if (ex) ex.remove();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'orderSuccessModal';
  overlay.innerHTML = `
  <div class="modal" style="max-width:460px;width:100%;text-align:center">
    <div style="font-size:68px;margin-bottom:12px">🎉</div>
    <h2 style="font-family:var(--font-head);font-size:26px;font-weight:800;margin-bottom:8px;color:var(--lime-dark)">Order Placed Successfully!</h2>
    <p style="color:var(--text2);font-size:14px;margin-bottom:4px">Thank you for shopping at PakBazaar!</p>
    <p style="font-size:12px;color:var(--text3);margin-bottom:22px">Order ID: <strong>${order.id}</strong></p>
    <div style="background:var(--off);border-radius:var(--r);padding:16px;margin-bottom:20px;text-align:left">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:13px">
        <div><div style="color:var(--text3);font-size:11px;margin-bottom:2px">PAYMENT</div><strong>${order.paymentMethod}</strong></div>
        <div><div style="color:var(--text3);font-size:11px;margin-bottom:2px">TOTAL</div><strong style="color:var(--lime-dark)">Rs. ${order.total.toLocaleString('en-PK')}</strong></div>
        <div><div style="color:var(--text3);font-size:11px;margin-bottom:2px">DELIVER TO</div><strong>${order.delivery.city}</strong></div>
        <div><div style="color:var(--text3);font-size:11px;margin-bottom:2px">STATUS</div><span class="order-status-badge confirmed">✓ Confirmed</span></div>
      </div>
    </div>
    <div style="background:rgba(195,231,3,0.1);border:1px solid rgba(195,231,3,0.3);border-radius:var(--r-sm);padding:10px;margin-bottom:20px;font-size:13px;color:var(--text2)">
      <i class="fas fa-truck" style="color:var(--lime-dark);margin-right:6px"></i>
      Expected delivery: <strong>2–4 business days</strong>
    </div>
    <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap">
      <button class="btn-lime" style="padding:11px 22px;border-radius:50px;font-weight:700" onclick="closeModal('orderSuccessModal');navGo(null,'profile');setTimeout(()=>{if(typeof showProfileTab==='function')showProfileTab('orders',null)},350)">
        <i class="fas fa-list" style="margin-right:6px"></i>View My Orders
      </button>
      <button class="btn-outline" style="padding:10px 18px;border-radius:50px" onclick="closeModal('orderSuccessModal')">Continue Shopping</button>
    </div>
  </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => overlay.classList.add('open'), 10);
}

/* ═══════════════════════════════════════════
   USER AUTH
═══════════════════════════════════════════ */
function getUsers()     { return JSON.parse(localStorage.getItem('pb_users') || '[]'); }
function saveUsers(arr) { localStorage.setItem('pb_users', JSON.stringify(arr)); }
window.getCurrentUser  = function() { return JSON.parse(localStorage.getItem('pb_current_user') || 'null'); };
function setCurrentUser(u) { localStorage.setItem('pb_current_user', JSON.stringify(u)); }
function clearCurrentUser(){ localStorage.removeItem('pb_current_user'); }

window.refreshAuthUI = function() {
  const user     = getCurrentUser();
  const loginBtn = document.getElementById('headerLoginBtn');
  const chip     = document.getElementById('headerUserChip');
  const name     = document.getElementById('headerUserName');
  const av       = document.getElementById('headerUserAv');
  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (chip)     chip.style.display     = 'flex';
    if (name)     name.textContent = user.fname || user.email;
    if (av)       av.textContent   = user.avatar || '?';
  } else {
    if (loginBtn) loginBtn.style.display = 'flex';
    if (chip)     chip.style.display     = 'none';
  }
  if (document.getElementById('profileContent') && typeof renderProfileContent === 'function') {
    renderProfileContent();
  }
};

window.doRegister = function() {
  const fname = document.getElementById('regFname')?.value.trim();
  const lname = document.getElementById('regLname')?.value.trim();
  const email = document.getElementById('regEmail')?.value.trim();
  const phone = document.getElementById('regPhone')?.value.trim();
  const pass  = document.getElementById('regPass')?.value;
  const pass2 = document.getElementById('regPass2')?.value;

  if (!fname)               { showFormError('regFname', 'First name required'); return; }
  if (!email||!email.includes('@')){ showFormError('regEmail','Valid email required'); return; }
  if (!phone)               { showFormError('regPhone','Phone required'); return; }
  if (!pass)                { showFormError('regPass', 'Password required'); return; }
  if (pass.length < 6)      { showFormError('regPass', 'Minimum 6 characters'); return; }
  if (pass !== pass2)       { showFormError('regPass2','Passwords do not match'); return; }
  if (getUsers().find(u => u.email === email)) { showFormError('regEmail','Email already registered'); return; }

  const newUser = {
    id: Date.now(), fname, lname, email, phone, password: pass,
    avatar: (fname[0] + (lname?.[0]||'')).toUpperCase(),
    createdAt: new Date().toISOString()
  };
  const users = getUsers();
  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  refreshAuthUI();
  closeModal('loginModal');
  toast('🎉 Welcome to PakBazaar, ' + fname + '!');
  ['regFname','regLname','regEmail','regPhone','regPass','regPass2'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
};

window.doLogin = function() {
  const id   = document.getElementById('loginEmail')?.value.trim();
  const pass = document.getElementById('loginPass')?.value;
  if (!id)   { showFormError('loginEmail','Email or phone required'); return; }
  if (!pass) { showFormError('loginPass', 'Password required'); return; }
  const user = getUsers().find(u => (u.email===id||u.phone===id) && u.password===pass);
  if (!user) { showFormError('loginPass','Incorrect email/phone or password'); return; }
  setCurrentUser(user);
  refreshAuthUI();
  closeModal('loginModal');
  toast('Welcome back, ' + (user.fname||user.email) + '! ✓');
  ['loginEmail','loginPass'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
};

window.doLogout = function() {
  clearCurrentUser(); refreshAuthUI();
  showPage('home'); navGo(document.querySelectorAll('.nitem')[0],'home');
  toast('Signed out successfully.');
};

window.switchLoginTab = function(tab, el) {
  document.querySelectorAll('.ltab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('loginFormBody').style.display    = tab==='login'    ?'block':'none';
  document.getElementById('registerFormBody').style.display = tab==='register' ?'block':'none';
};

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
window.showFormError = function(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.borderColor = 'var(--red)';
  let err = el.nextElementSibling;
  if (!err || !err.classList.contains('form-err')) {
    err = document.createElement('span');
    err.className = 'form-err';
    el.parentNode.appendChild(err);
  }
  err.textContent = msg;
  setTimeout(() => { el.style.borderColor=''; err.textContent=''; }, 3500);
};

window.toggleWish = function(btn) {
  btn.classList.toggle('on');
  btn.innerHTML = btn.classList.contains('on') ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  toast(btn.classList.contains('on') ? 'Added to Wishlist ❤️' : 'Removed from Wishlist');
};

window.openModal  = function(id) { document.getElementById(id)?.classList.add('open'); };
window.closeModal = function(id) { document.getElementById(id)?.classList.remove('open'); };

window.showPage = function(id) {
  document.querySelectorAll('.page-sec').forEach(s=>s.classList.remove('active'));
  const t = document.getElementById('page-'+id);
  if (t) { t.classList.add('active'); t.classList.remove('fade-up'); void t.offsetWidth; t.classList.add('fade-up'); }
  window.scrollTo({top:0,behavior:'smooth'});
};

window.navGo = function(el, page) {
  document.querySelectorAll('.nitem').forEach(n=>n.classList.remove('active'));
  if (el) el.classList.add('active');
  showPage(page); lbar();
};

function lbar() {
  const b=document.getElementById('lbar'); if(!b) return;
  b.style.width='70%';
  setTimeout(()=>{b.style.width='100%';setTimeout(()=>{b.style.width='0';},300);},200);
}

window.doSearch = function() {
  const q=document.getElementById('mainSearch')?.value.trim();
  if(!q){toast('Please enter a search term','err');return;}
  toast('Searching for: "'+q+'"...','inf');
};

window.updateSearchPlaceholder = function(sel) {
  const map={Cars:'Search cars...',Bikes:'Search bikes...',Electronics:'Search phones...',Fashion:'Search clothes...',Property:'Search houses...',Grocery:'Search groceries...'};
  const inp=document.getElementById('mainSearch');
  if(inp) inp.placeholder=map[sel.value]||'Search everything...';
};

window.updateSubcategory = function(sel) {
  const subs={Cars:['Sedan','SUV/4x4','Hatchback','Pickup','Van'],Bikes:['Street Bike','Off-Road','Scooter','Sports Bike'],Electronics:['Mobile Phones','Laptops','Tablets','TVs','Audio','Gaming'],Fashion:["Women's","Men's",'Kids','Shoes','Bags'],Property:['House','Apartment','Plot','Commercial'],Furniture:['Bedroom','Living Room','Office','Kitchen'],Jobs:['IT & Tech','Finance','Healthcare','Education'],Beauty:['Makeup','Skincare','Haircare','Fragrances'],Grocery:['Vegetables','Fruits','Dairy','Drinks','Snacks','Bakery','Meat']};
  const el=document.getElementById('subCatSel'); if(!el) return;
  el.innerHTML='<option value="">Select Sub-Category</option>';
  (subs[sel.value]||[]).forEach(s=>{const o=document.createElement('option');o.textContent=s;el.appendChild(o);});
};

/* Shop category filters */
window.filterShopCategory = function() {
  const checks=document.querySelectorAll('#page-shop .shop-cb');
  const checked=[]; checks.forEach(cb=>{if(cb.checked)checked.push(cb.dataset.cat);});
  let total=0;
  document.querySelectorAll('#page-shop .cat-block').forEach(block=>{
    const show=checked.length===0||checked.includes(block.dataset.cat);
    block.style.display=show?'block':'none';
    if(show) total+=block.querySelectorAll('.pcard').length;
  });
  const el=document.getElementById('shopResultCount'); if(el) el.textContent=total+' products found';
};
window.shopSelectAll = function(){document.querySelectorAll('#page-shop .shop-cb').forEach(c=>c.checked=true);filterShopCategory();};
window.shopClearAll  = function(){document.querySelectorAll('#page-shop .shop-cb').forEach(c=>c.checked=false);filterShopCategory();};
window.shopTabFilter = function(cat,btn){
  document.querySelectorAll('.scat-btn').forEach(b=>b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  if(cat==='all'){shopSelectAll();return;}
  document.querySelectorAll('#page-shop .shop-cb').forEach(c=>{c.checked=c.dataset.cat===cat;});
  filterShopCategory();
};

/* Generic filter */
window.applyGenericFilter = function(page,keys,countId,emptyId){
  const filters={};
  keys.forEach(key=>{const cbs=document.querySelectorAll(`#page-${page} input[data-filter="${key}"]`);filters[key]=[];cbs.forEach(cb=>{if(cb.checked)filters[key].push(cb.value.toLowerCase());});});
  const cards=document.querySelectorAll(`#page-${page} .filter-card`);
  let visible=0;
  cards.forEach(card=>{
    const match=keys.every(key=>{const vals=filters[key];if(vals.length===0) return false;return vals.includes((card.dataset[key]||'').toLowerCase());});
    card.style.display=match?'':'none'; if(match) visible++;
  });
  const cnt=document.getElementById(countId); if(cnt) cnt.textContent=visible;
  const empty=document.getElementById(emptyId); if(empty) empty.style.display=visible===0?'block':'none';
};
window.applyCarsFilter    = ()=>applyGenericFilter('cars',['make','year','trans','fuel','city'],'count-cars','cars-empty');
window.applyBikesFilter   = ()=>applyGenericFilter('bikes',['brand','cc','condition'],'count-bikes','bikes-empty');
window.applyElecFilter    = ()=>applyGenericFilter('electronics',['cat','brand','condition'],'count-electronics','electronics-empty');
window.applyFashionFilter = ()=>applyGenericFilter('fashion',['cat','brand'],'count-fashion','fashion-empty');
window.applyBeautyFilter  = ()=>applyGenericFilter('beauty',['cat','brand'],'count-beauty','beauty-empty');
window.resetPageFilters   = function(page){
  document.querySelectorAll(`#page-${page} input[type="checkbox"]`).forEach(cb=>cb.checked=true);
  document.querySelectorAll(`#page-${page} .filter-card`).forEach(c=>c.style.display='');
  const map={cars:'count-cars',bikes:'count-bikes',electronics:'count-electronics',fashion:'count-fashion',beauty:'count-beauty'};
  const total=document.querySelectorAll(`#page-${page} .filter-card`).length;
  const el=document.getElementById(map[page]); if(el) el.textContent=total;
  const empty=document.getElementById(page+'-empty'); if(empty) empty.style.display='none';
  toast('All filters cleared ✓');
};

/* Themes */
const THEMES={light:{},dark:{'--white':'#111','--off':'#1a1a1a','--off2':'#222','--border':'#333','--border2':'#3a3a3a','--text':'#f0f0f0','--text2':'#aaa','--text3':'#666'},teal:{'--white':'#0d1a18','--off':'#122420','--off2':'#1a302c','--border':'#2a4440','--border2':'#3a5a54','--text':'#e0f5f2','--text2':'#9acccc','--text3':'#567874','--lime':'#96d1c7','--lime-dark':'#6bb8ac'},warm:{'--white':'#1a0d00','--off':'#2a1a00','--off2':'#351f00','--border':'#4a2e00','--border2':'#5a3800','--text':'#fef3e2','--text2':'#d4a96a','--text3':'#8a6030','--lime':'#f59e0b','--lime-dark':'#d97706'}};
window.setTheme = function(t,el){document.querySelectorAll('.tpick').forEach(p=>p.classList.remove('on'));if(el)el.classList.add('on');const root=document.documentElement;['--white','--off','--off2','--border','--border2','--text','--text2','--text3','--lime','--lime-dark'].forEach(k=>root.style.removeProperty(k));Object.entries(THEMES[t]||{}).forEach(([k,v])=>root.style.setProperty(k,v));localStorage.setItem('pb_theme',t);};
window.saveSettings = function(){toast('Settings saved ✓');closeModal('settingsModal');};

/* Countdown */
(function(){let h=8,m=47,s=23;setInterval(()=>{s--;if(s<0){s=59;m--;}if(m<0){m=59;h--;}if(h<0){h=23;m=59;s=59;}const H=document.getElementById('cdH'),M=document.getElementById('cdM'),S=document.getElementById('cdS');if(H)H.textContent=String(h).padStart(2,'0');if(M)M.textContent=String(m).padStart(2,'0');if(S)S.textContent=String(s).padStart(2,'0');},1000);})();

/* Toast */
window.toast = function(msg,type){const w=document.getElementById('toast-wrap');if(!w)return;const el=document.createElement('div');el.className='toast'+(type?' '+type:'');el.innerHTML=`<span>${{err:'❌',inf:'ℹ️'}[type]||'✅'}</span><span>${msg}</span>`;w.appendChild(el);setTimeout(()=>{el.style.opacity='0';el.style.transform='translateX(110px)';el.style.transition='all 0.3s';setTimeout(()=>el.remove(),300);},3200);};

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  const saved=localStorage.getItem('pb_theme');
  if(saved){const tp=document.querySelector(`.tpick[data-theme="${saved}"]`);setTheme(saved,tp);}
  renderCart();
  refreshAuthUI();
  document.getElementById('cartBg')?.addEventListener('click',toggleCart);
  document.querySelectorAll('.nitem').forEach(n=>n.addEventListener('click',lbar));
  document.addEventListener('click',e=>{if(e.target.classList.contains('modal-overlay'))e.target.classList.remove('open');});
  document.getElementById('mainSearch')?.addEventListener('keypress',e=>{if(e.key==='Enter')doSearch();});
  console.log('PakBazaar v4 ✓');
});
