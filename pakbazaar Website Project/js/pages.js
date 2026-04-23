
'use strict';

document.addEventListener('DOMContentLoaded', buildAllPages);

function buildAllPages() {
  buildCarsPage();
  buildBikesPage();
  buildElectronicsPage();
  buildFashionPage();
  buildBeautyPage();
  buildPropertyPage();
  buildFurniturePage();
  buildJobsPage();
  buildShopPage();
  buildSellPage();
  buildProfilePage();
}

function buildCarsPage() {
  const cars = [
    { make:'Toyota',   model:'Corolla 1.6 GLi Auto',  year:'2020', km:'45K km',  trans:'Automatic', fuel:'Petrol',  city:'Lahore',    price:'42 Lac',   badge:'badge-feat', badgeTxt:'FEATURED', img:'https://cache2.pakwheels.com/ad_pictures/7409/toyota-corolla-altis-1-6-automatic-2020-74094989.jpg' },
    { make:'Honda',    model:'Civic RS Turbo 1.5T',    year:'2023', km:'12K km',  trans:'Automatic', fuel:'Petrol',  city:'Karachi',   price:'74 Lac',   badge:'badge-new',  badgeTxt:'NEW',      img:'https://carsforsalepk.com/wp-content/uploads/2024/07/Honda-Civic-RS-Turbo.webp' },
    { make:'Kia',      model:'Sportage AWD Alpha',     year:'2022', km:'32K km',  trans:'Automatic', fuel:'Petrol',  city:'Islamabad', price:'78 Lac',   badge:'badge-hot',  badgeTxt:'HOT',      img:'https://static.wixstatic.com/media/298a38_80c72536e4b741b6943f39ed561b6866~mv2.jpg/v1/fill/w_1280,h_712,al_c/298a38_80c72536e4b741b6943f39ed561b6866~mv2.jpg' },
    { make:'Suzuki',   model:'Swift GL Automatic',     year:'2021', km:'28K km',  trans:'Automatic', fuel:'Petrol',  city:'Multan',    price:'28 Lac',   badge:'',           badgeTxt:'',         img:'https://cache4.pakwheels.com/ad_pictures/9852/suzuki-swift-glx-cvt-2022-98520111.webp' },
    { make:'Toyota',   model:'Land Cruiser GX 4x4',   year:'2019', km:'75K km',  trans:'Automatic', fuel:'Diesel',  city:'Karachi',   price:'2.6 Crore',badge:'',           badgeTxt:'',         img:'https://carsales.pxcrush.net/carsales/car/dealer/adjimm79gctuz0zb61i7wlur5.jpg' },
    { make:'BMW',      model:'3 Series 320i Sport',   year:'2021', km:'40K km',  trans:'Automatic', fuel:'Petrol',  city:'Lahore',    price:'1.4 Crore',badge:'',           badgeTxt:'',         img:'https://img-ik.cars.co.za/ik-seo/carsimages/10108976/2016-BMW-3-Series-320i-M-Sport.jpg?v=3493944452&tr=h-267,w-400,q-80' },
    { make:'Honda',    model:'City 1.2 Manual',        year:'2022', km:'18K km',  trans:'Manual',    fuel:'Petrol',  city:'Faisalabad',price:'22 Lac',   badge:'badge-new',  badgeTxt:'NEW',      img:'https://tse3.mm.bing.net/th/id/OIP.-QUYbM-i9fQkw6Me_v9hHgHaDm?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { make:'Suzuki',   model:'Alto VXL 2023',          year:'2023', km:'5K km',   trans:'Manual',    fuel:'Petrol',  city:'Lahore',    price:'14 Lac',   badge:'badge-new',  badgeTxt:'NEW',      img:'https://cache3.pakwheels.com/ad_pictures/1135/suzuki-alto-vxl-2-2023-113591769.webp' },
    { make:'Hyundai',  model:'Tucson AWD 2.0',         year:'2022', km:'24K km',  trans:'Automatic', fuel:'Petrol',  city:'Islamabad', price:'70 Lac',   badge:'badge-hot',  badgeTxt:'HOT',      img:'https://cache4.pakwheels.com/ad_pictures/1015/hyundai-tucson-awd-a-t-ultimate-2022-101549660.webp' },
    { make:'Toyota',   model:'Prius Hybrid 2020',      year:'2020', km:'55K km',  trans:'Automatic', fuel:'Hybrid',  city:'Karachi',   price:'38 Lac',   badge:'',           badgeTxt:'',         img:'https://cache4.pakwheels.com/ad_pictures/8221/toyota-vitz-jewela-smart-stop-package-2021-82218977.webp' },
    { make:'Kia',      model:'Picanto 1.0 Auto',       year:'2023', km:'8K km',   trans:'Automatic', fuel:'Petrol',  city:'Lahore',    price:'24 Lac',   badge:'badge-new',  badgeTxt:'NEW',      img:'https://tse4.mm.bing.net/th/id/OIP.0BgqwrkpV9RpcUfrKd-wVQHaEt?w=1000&h=637&rs=1&pid=ImgDetMain&o=7&rm=3' },
    { make:'Mercedes', model:'C200 AMG Package',       year:'2020', km:'60K km',  trans:'Automatic', fuel:'Petrol',  city:'Karachi',   price:'1.8 Crore',badge:'badge-feat', badgeTxt:'FEATURED', img:'https://tse2.mm.bing.net/th/id/OIP.5HCUkl7ojIiyphBsOkgMhwHaHa?pid=ImgDet&w=474&h=474&rs=1&o=7&rm=3' },
  ];

  const makes        = [...new Set(cars.map(c=>c.make))];
  const years        = [...new Set(cars.map(c=>c.year))].sort((a,b)=>b-a);
  const transmissions= [...new Set(cars.map(c=>c.trans))];
  const fuels        = [...new Set(cars.map(c=>c.fuel))];
  const cities       = [...new Set(cars.map(c=>c.city))];

  function sidebar() {
    return `
    <div class="sidebar">
      <div class="sb-title">Filters <button class="sb-clear" onclick="resetPageFilters('cars')">Clear All</button></div>
      <div class="fgroup">
        <h5>Make / Brand</h5>
        ${makes.map(m=>`<label class="fopt"><input type="checkbox" class="car-cb" data-filter="make" value="${m}" checked onchange="applyCarsFilter()"> ${m}</label>`).join('')}
      </div>
      <div class="fgroup">
        <h5>Year</h5>
        ${years.map(y=>`<label class="fopt"><input type="checkbox" class="car-cb" data-filter="year" value="${y}" checked onchange="applyCarsFilter()"> ${y}</label>`).join('')}
      </div>
      <div class="fgroup">
        <h5>Transmission</h5>
        ${transmissions.map(t=>`<label class="fopt"><input type="checkbox" class="car-cb" data-filter="trans" value="${t}" checked onchange="applyCarsFilter()"> ${t}</label>`).join('')}
      </div>
      <div class="fgroup">
        <h5>Fuel Type</h5>
        ${fuels.map(f=>`<label class="fopt"><input type="checkbox" class="car-cb" data-filter="fuel" value="${f}" checked onchange="applyCarsFilter()"> ${f}</label>`).join('')}
      </div>
      <div class="fgroup">
        <h5>City</h5>
        ${cities.map(c=>`<label class="fopt"><input type="checkbox" class="car-cb" data-filter="city" value="${c}" checked onchange="applyCarsFilter()"> ${c}</label>`).join('')}
      </div>
      <button class="btn-filter-apply" onclick="resetPageFilters('cars')">Show All</button>
    </div>`;
  }

  function carCards() {
    return cars.map(c => `
    <div class="pcard filter-card"
         data-make="${c.make}" data-year="${c.year}"
         data-trans="${c.trans}" data-fuel="${c.fuel}" data-city="${c.city}">
      <div class="pcard-img pcard-img-lg" style="position:relative">
        <img src="${c.img}" alt="${c.model}">
        ${c.badgeTxt?`<span class="badge ${c.badge}" style="position:absolute;top:10px;left:10px">${c.badgeTxt}</span>`:''}
        <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
      </div>
      <div class="pcard-body">
        <div class="pcard-cat">${c.make} · ${c.year}</div>
        <div class="pcard-name">${c.model}</div>
        <div class="car-specs" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
          <span class="car-spec"><i class="fas fa-tachometer-alt"></i> ${c.km}</span>
          <span class="car-spec"><i class="fas fa-cog"></i> ${c.trans}</span>
          <span class="car-spec"><i class="fas fa-gas-pump"></i> ${c.fuel}</span>
          <span class="car-spec"><i class="fas fa-map-marker-alt"></i> ${c.city}</span>
        </div>
        <div class="car-price" style="font-family:var(--font-head);font-size:20px;font-weight:700;margin-bottom:12px">Rs. ${c.price}</div>
        <div style="display:flex;gap:8px">
          <button class="btn-outline" onclick="toggleWish(this)" style="flex:1">♡ Save</button>
          <button class="btn-lime" onclick="toast('Opening contact...','inf')" style="flex:1">📞 Contact</button>
        </div>
      </div>
    </div>`).join('');
  }

  document.getElementById('page-cars').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      ${sidebar()}
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong><span id="count-cars">${cars.length}</span> Cars</strong> found</span>
          <div class="sort-right">
            <select class="sort-sel"><option>Newest First</option><option>Price: Low → High</option><option>Price: High → Low</option></select>
            <div class="view-tog">
              <button class="vtbtn on"><i class="fas fa-th"></i></button>
              <button class="vtbtn"><i class="fas fa-list"></i></button>
            </div>
          </div>
        </div>
        <div class="grid-3" id="cars-grid">${carCards()}</div>
        <p id="cars-empty" style="display:none;text-align:center;padding:48px;color:var(--text3);font-size:15px">No cars match selected filters. <button onclick="resetPageFilters('cars')" style="color:var(--lime-dark);background:none;border:none;cursor:pointer;font-weight:700">Reset Filters</button></p>
      </div>
    </div>
  </div>`;
}

window.applyCarsFilter = function() {
  const cbs = document.querySelectorAll('#page-cars .car-cb');
  const filters = {};
  cbs.forEach(cb => {
    if (!filters[cb.dataset.filter]) filters[cb.dataset.filter] = [];
    if (cb.checked) filters[cb.dataset.filter].push(cb.value.toLowerCase());
  });
  const cards = document.querySelectorAll('#page-cars .filter-card');
  let visible = 0;
  cards.forEach(card => {
    const match = Object.keys(filters).every(key => {
      const vals = filters[key];
      if (vals.length === 0) return false; // nothing checked = hide all in that group
      return vals.includes((card.dataset[key]||'').toLowerCase());
    });
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  const cnt = document.getElementById('count-cars');
  if (cnt) cnt.textContent = visible;
  const empty = document.getElementById('cars-empty');
  if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
};

window.resetPageFilters = function(page) {
  document.querySelectorAll(`#page-${page} input[type="checkbox"]`).forEach(cb => cb.checked = true);
  document.querySelectorAll(`#page-${page} .filter-card`).forEach(c => c.style.display = '');
  const sel = {cars:'count-cars',bikes:'count-bikes',electronics:'count-electronics',fashion:'count-fashion',beauty:'count-beauty'};
  const total = document.querySelectorAll(`#page-${page} .filter-card`).length;
  const el = document.getElementById(sel[page]);
  if (el) el.textContent = total;
  const empty = document.getElementById(page+'-empty');
  if (empty) empty.style.display = 'none';
  toast('All filters cleared ✓');
};

/* ================================================================
   BIKES PAGE
   ================================================================ */
function buildBikesPage() {
  const bikes = [
    { brand:'Honda',  model:'CB-150F Sports Edition', cc:'150', condition:'New',  city:'Lahore',    price:'3,25,000', badge:'badge-new', badgeTxt:'NEW', img:'https://cache2.pakwheels.com/ad_pictures/1246/honda-cb-150f-2021-124691292.webp' },
    { brand:'Yamaha', model:'YBR 125G Off-Road',       cc:'125', condition:'Used', city:'Karachi',   price:'2,85,000', badge:'',          badgeTxt:'',    img:'https://cache2.pakwheels.com/ad_pictures/1200/yamaha-ybr-125g-2020-120078514.webp' },
    { brand:'Honda',  model:'CD-70 Dream Classic',     cc:'70',  condition:'New',  city:'Faisalabad',price:'1,85,000', badge:'badge-hot', badgeTxt:'HOT', img:'https://cache3.pakwheels.com/ad_pictures/8373/honda-cd-70-3-2021-83730058.webp' },
    { brand:'Suzuki', model:'GD-110S City Rider',      cc:'110', condition:'Used', city:'Islamabad', price:'2,10,000', badge:'',          badgeTxt:'',    img:'https://static.toiimg.com/photo/imgsize-1505309,msid-88549097/88549097.jpg' },
    { brand:'Yamaha', model:'YZF-R15 V4 Sports',       cc:'150', condition:'New',  city:'Lahore',    price:'6,50,000', badge:'badge-new', badgeTxt:'NEW', img:'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&h=260&fit=crop' },
    { brand:'Honda',  model:'CG-125 Self Start',       cc:'125', condition:'New',  city:'Multan',    price:'2,20,000', badge:'badge-feat',badgeTxt:'FEAT',img:'https://cache2.pakwheels.com/ad_pictures/9364/honda-cg-125-2-2023-93647616.webp' },
    { brand:'United', model:'US-70 Economy',           cc:'70',  condition:'New',  city:'Lahore',    price:'1,60,000', badge:'',          badgeTxt:'',    img:'https://cache3.pakwheels.com/ad_pictures/5961/honda-cd-70-3-2017-59614147.jpg' },
    { brand:'Suzuki', model:'Gixxer SF 150',           cc:'150', condition:'New',  city:'Karachi',   price:'4,80,000', badge:'badge-hot', badgeTxt:'HOT', img:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&h=260&fit=crop' },
  ];

  const brands     = [...new Set(bikes.map(b=>b.brand))];
  const ccs        = [...new Set(bikes.map(b=>b.cc))].sort((a,b)=>+a-+b);
  const conditions = [...new Set(bikes.map(b=>b.condition))];

  document.getElementById('page-bikes').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      <div class="sidebar">
        <div class="sb-title">Bike Filters <button class="sb-clear" onclick="resetPageFilters('bikes')">Clear</button></div>
        <div class="fgroup">
          <h5>Brand</h5>
          ${brands.map(b=>`<label class="fopt"><input type="checkbox" class="bike-cb" data-filter="brand" value="${b}" checked onchange="applyBikesFilter()"> ${b}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Engine CC</h5>
          ${ccs.map(c=>`<label class="fopt"><input type="checkbox" class="bike-cb" data-filter="cc" value="${c}" checked onchange="applyBikesFilter()"> ${c}cc</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Condition</h5>
          ${conditions.map(c=>`<label class="fopt"><input type="checkbox" class="bike-cb" data-filter="condition" value="${c}" checked onchange="applyBikesFilter()"> ${c}</label>`).join('')}
        </div>
        <button class="btn-filter-apply" onclick="resetPageFilters('bikes')">Show All</button>
      </div>
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong><span id="count-bikes">${bikes.length}</span> Bikes</strong> found</span>
          <select class="sort-sel"><option>Newest First</option><option>Price: Low → High</option></select>
        </div>
        <div class="grid-3" id="bikes-grid">
          ${bikes.map(b=>`
          <div class="pcard filter-card" data-brand="${b.brand}" data-cc="${b.cc}" data-condition="${b.condition}">
            <div class="pcard-img pcard-img-lg" style="position:relative">
              <img src="${b.img}" alt="${b.model}">
              ${b.badgeTxt?`<span class="badge ${b.badge}" style="position:absolute;top:10px;left:10px">${b.badgeTxt}</span>`:''}
              <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
            </div>
            <div class="pcard-body">
              <div class="pcard-cat">${b.brand} · ${b.cc}cc · ${b.condition}</div>
              <div class="pcard-name">${b.model}</div>
              <div class="car-specs" style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px">
                <span class="car-spec">${b.cc}cc</span>
                <span class="car-spec">${b.condition}</span>
                <span class="car-spec"><i class="fas fa-map-marker-alt"></i> ${b.city}</span>
              </div>
              <div class="car-price" style="font-family:var(--font-head);font-size:20px;font-weight:700;margin-bottom:12px">Rs. ${b.price}</div>
              <div style="display:flex;gap:8px">
                <button class="btn-outline" onclick="toggleWish(this)" style="flex:1">♡ Save</button>
                <button class="btn-lime" onclick="toast('Opening contact...','inf')" style="flex:1">📞 Contact</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
        <p id="bikes-empty" style="display:none;text-align:center;padding:48px;color:var(--text3)">No bikes found. <button onclick="resetPageFilters('bikes')" style="color:var(--lime-dark);background:none;border:none;cursor:pointer;font-weight:700">Reset</button></p>
      </div>
    </div>
  </div>`;
}

window.applyBikesFilter = function() {
  applyGenericFilter('bikes', ['brand','cc','condition'], 'count-bikes', 'bikes-empty');
};

/* ================================================================
   GENERIC FILTER ENGINE
   ================================================================ */
function applyGenericFilter(page, filterKeys, countId, emptyId) {
  const filters = {};
  filterKeys.forEach(key => {
    const cbs = document.querySelectorAll(`#page-${page} input[data-filter="${key}"]`);
    filters[key] = [];
    cbs.forEach(cb => { if (cb.checked) filters[key].push(cb.value.toLowerCase()); });
  });

  const cards = document.querySelectorAll(`#page-${page} .filter-card`);
  let visible = 0;
  cards.forEach(card => {
    const match = filterKeys.every(key => {
      const vals = filters[key];
      if (vals.length === 0) return false;
      return vals.includes((card.dataset[key] || '').toLowerCase());
    });
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });

  const cnt = document.getElementById(countId);
  if (cnt) cnt.textContent = visible;
  const empty = document.getElementById(emptyId);
  if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
}

/* ================================================================
   ELECTRONICS PAGE
   ================================================================ */
function buildElectronicsPage() {
  const items = [
    { cat:'Mobile Phones', brand:'Apple',   name:'iPhone 15 Pro Max 256GB',    price:420000, priceDisp:'4,20,000', oldPrice:'',         disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★', rev:'(89)',   img:'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=380&h=260&fit=crop', condition:'New' },
    { cat:'Mobile Phones', brand:'Samsung', name:'Galaxy S24 Ultra 512GB',     price:320000, priceDisp:'3,20,000', oldPrice:'',         disc:'',    badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★☆', rev:'(154)',  img:'https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg', condition:'New' },
    { cat:'Mobile Phones', brand:'Xiaomi',  name:'Redmi Note 13 Pro 256GB',    price:65000,  priceDisp:'65,000',   oldPrice:'75,000',   disc:'-14%', badge:'badge-sale',badgeTxt:'-14%',stars:'★★★★★',rev:'(312)',  img:'https://tse3.mm.bing.net/th/id/OIP.bUS7wyGSFJXln8vfUCZcmAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', condition:'New' },
    { cat:'Laptops',       brand:'Apple',   name:'MacBook Pro M3 16" 2024',    price:540000, priceDisp:'5,40,000', oldPrice:'6,00,000', disc:'-10%', badge:'badge-sale',badgeTxt:'-10%',stars:'★★★★★',rev:'(41)',   img:'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=380&h=260&fit=crop', condition:'New' },
    { cat:'Laptops',       brand:'Dell',    name:'XPS 15 i9 RTX 4060',         price:480000, priceDisp:'4,80,000', oldPrice:'',         disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★', rev:'(33)',   img:'https://img.lazcdn.com/g/p/0f5bb0a157af8e0e400abeaaf7dc2d7e.jpg_720x720q80.jpg', condition:'New' },
    { cat:'Laptops',       brand:'Lenovo',  name:'ThinkPad X1 Carbon i7',      price:220000, priceDisp:'2,20,000', oldPrice:'',         disc:'',    badge:'',          badgeTxt:'',    stars:'★★★★☆', rev:'(67)',   img:'https://tse1.mm.bing.net/th/id/OIP.gDP8n4SL23kKQCvYHNGMdAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', condition:'Used' },
    { cat:'Audio',         brand:'Sony',    name:'WH-1000XM5 Headphones',      price:45000,  priceDisp:'45,000',   oldPrice:'60,000',   disc:'-25%', badge:'badge-sale',badgeTxt:'-25%',stars:'★★★★★',rev:'(220)',  img:'https://www.stuff.tv/wp-content/uploads/sites/2/2023/09/Bose-QC-Ultra-Headphones-vs-Sony-XM5-cases.jpg?resize=495', condition:'New' },
    { cat:'Audio',         brand:'Samsung', name:'Galaxy Buds2 Pro',           price:22000,  priceDisp:'22,000',   oldPrice:'28,000',   disc:'-21%', badge:'badge-sale',badgeTxt:'-21%',stars:'★★★★☆', rev:'(145)',  img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=380&h=260&fit=crop', condition:'New' },
    { cat:'TVs',           brand:'Samsung', name:'Samsung 55" 4K QLED Smart TV',price:160000,priceDisp:'1,60,000', oldPrice:'',         disc:'',    badge:'badge-feat', badgeTxt:'FEAT',stars:'★★★★★',rev:'(78)',   img:'https://content.abt.com/image.php/samsung-tv-QN43Q7FAAFXZA-front-left.jpg?image=/images/products/BDP_Images/samsung-tv-QN43Q7FAAFXZA-front-left.jpg&canvas=1&width=750&height=550', condition:'New' },
    { cat:'TVs',           brand:'Sony',    name:'Sony Bravia 65" OLED 4K',    price:320000, priceDisp:'3,20,000', oldPrice:'',         disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★', rev:'(34)',   img:'https://tse1.mm.bing.net/th/id/OIP.fkUpSErbXlveGbTu4dHW7gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', condition:'New' },
    { cat:'Cameras',       brand:'Canon',   name:'Canon EOS R50 Mirrorless',   price:175000, priceDisp:'1,75,000', oldPrice:'',         disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★', rev:'(56)',   img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=380&h=260&fit=crop', condition:'New' },
    { cat:'Cameras',       brand:'Sony',    name:'Sony A7 IV Full Frame',      price:420000, priceDisp:'4,20,000', oldPrice:'',         disc:'',    badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★★', rev:'(28)',   img:'https://tse1.mm.bing.net/th/id/OIP.6Gbm1ZaOhljtAqfYV8Vd9QHaE8?rs=1&pid=ImgDetMain&o=7&rm=3', condition:'New' },
    { cat:'Gaming',        brand:'Sony',    name:'PS5 Console + 2 Games',      price:120000, priceDisp:'1,20,000', oldPrice:'',         disc:'',    badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★★', rev:'(203)',  img:'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=380&h=260&fit=crop', condition:'New' },
    { cat:'Gaming',        brand:'Lenovo',  name:'Lenovo Legion 5 RTX 4070',   price:380000, priceDisp:'3,80,000', oldPrice:'',         disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★', rev:'(45)',   img:'https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=380&h=260&fit=crop', condition:'New' },
  ];

  const cats       = [...new Set(items.map(i=>i.cat))];
  const brands     = [...new Set(items.map(i=>i.brand))];
  const conditions = ['New','Used'];

  document.getElementById('page-electronics').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      <div class="sidebar">
        <div class="sb-title">Filters <button class="sb-clear" onclick="resetPageFilters('electronics')">Clear</button></div>
        <div class="fgroup">
          <h5>Category</h5>
          ${cats.map(c=>`<label class="fopt"><input type="checkbox" class="elec-cb" data-filter="cat" value="${c}" checked onchange="applyElecFilter()"> ${c}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Brand</h5>
          ${brands.map(b=>`<label class="fopt"><input type="checkbox" class="elec-cb" data-filter="brand" value="${b}" checked onchange="applyElecFilter()"> ${b}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Condition</h5>
          ${conditions.map(c=>`<label class="fopt"><input type="checkbox" class="elec-cb" data-filter="condition" value="${c}" checked onchange="applyElecFilter()"> ${c}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Price Range</h5>
          <div class="price-range">
            <input type="text" class="price-inp" placeholder="Min">
            <input type="text" class="price-inp" placeholder="Max">
          </div>
        </div>
        <button class="btn-filter-apply" onclick="resetPageFilters('electronics')">Show All</button>
      </div>
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong><span id="count-electronics">${items.length}</span> Products</strong> found</span>
          <div class="sort-right">
            <select class="sort-sel"><option>Newest</option><option>Price Low→High</option><option>Price High→Low</option></select>
          </div>
        </div>
        <div class="grid-3" id="elec-grid">
          ${items.map(item=>`
          <div class="pcard filter-card" data-cat="${item.cat}" data-brand="${item.brand}" data-condition="${item.condition}">
            <div class="pcard-img" style="height:220px">
              <img src="${item.img}" alt="${item.name}">
              ${item.badgeTxt?`<span class="badge ${item.badge}">${item.badgeTxt}</span>`:''}
              <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
            </div>
            <div class="pcard-body">
              <div class="pcard-cat">${item.cat} · ${item.brand}</div>
              <div class="pcard-name">${item.name}</div>
              <div class="pcard-price-wrap">
                <span class="pcard-price">Rs. ${item.priceDisp}</span>
                ${item.oldPrice?`<span class="pcard-old">Rs.${item.oldPrice}</span>`:''}
                ${item.disc?`<span class="pcard-disc">${item.disc}</span>`:''}
              </div>
              <div class="pcard-stars">${item.stars} <span>${item.rev}</span></div>
              <div style="display:flex;gap:8px;margin-top:10px">
                <button class="btn-lime" style="flex:1" onclick="addToCart('${item.name}',${item.price},'${item.img}')">Add to Cart</button>
                <button class="btn-dark" onclick="toast('Contacting seller...','inf')">Contact</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
        <p id="electronics-empty" style="display:none;text-align:center;padding:48px;color:var(--text3)">No products match filters. <button onclick="resetPageFilters('electronics')" style="color:var(--lime-dark);background:none;border:none;cursor:pointer;font-weight:700">Reset</button></p>
      </div>
    </div>
  </div>`;
}
window.applyElecFilter = function() { applyGenericFilter('electronics',['cat','brand','condition'],'count-electronics','electronics-empty'); };

/* ================================================================
   FASHION PAGE
   ================================================================ */
function buildFashionPage() {
  const items = [
    { cat:"Women's",   brand:'Khaadi',  name:'Embroidered Suit 3-Piece 2026',     price:4500,  priceDisp:'4,500',  oldPrice:'',      disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★',rev:'(312)', img:'https://wholesalemegamart.com/wp-content/uploads/2022/11/DEEPSY-SUITS-D-1050-PAKISTANI-SUITS-IN-INDIA.jpeg' },
    { cat:"Women's",   brand:'Zara',    name:'Summer Floral Maxi Dress',   price:6300,  priceDisp:'6,300',  oldPrice:'9,000', disc:'-30%',badge:'badge-sale',badgeTxt:'-30%',stars:'★★★★☆',rev:'(145)', img:'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=380&h=260&fit=crop' },
    { cat:"Women's",   brand:'Zara',    name:'Embroidered Evening Gown',   price:12000, priceDisp:'12,000', oldPrice:'15,000',disc:'-20%',badge:'badge-sale',badgeTxt:'-20%',stars:'★★★★★',rev:'(93)',  img:'https://shiffonz.com/wp-content/uploads/2025/11/n1661-mauve-2.webp' },
    { cat:"Women's",   brand:'Khaadi',  name:'Cotton Embroidered Kurta',   price:3200,  priceDisp:'3,200',  oldPrice:'',      disc:'',    badge:'',          badgeTxt:'',    stars:'★★★★★',rev:'(178)', img:'https://tse3.mm.bing.net/th/id/OIP.PaFYDoFZuA76xEEIYxo_KAHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { cat:"Men's",     brand:'Bonanza', name:'3-Piece Formal Suit Navy',   price:18000, priceDisp:'18,000', oldPrice:'',      disc:'',    badge:'',          badgeTxt:'',    stars:'★★★★★',rev:'(67)',  img:'https://www.bargello.com/images/thumbs/0014026_stylish-mens-shalwar-kameez_800.jpeg' },
    { cat:"Men's",     brand:'Bonanza', name:'Embroidered Shalwar Kameez', price:4800,  priceDisp:'4,800',  oldPrice:'6,000', disc:'-20%',badge:'badge-sale',badgeTxt:'-20%',stars:'★★★★☆',rev:'(210)', img:'https://i.pinimg.com/originals/5a/9f/ac/5a9fac4b055be4e3773a21a64427d10f.jpg' },
    { cat:'Shoes',     brand:'Nike',    name:'Air Force 1 White',          price:17000, priceDisp:'17,000', oldPrice:'',      disc:'',    badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★★',rev:'(445)', img:'https://tse3.mm.bing.net/th/id/OIP.1z1hu0gf8LIWmvzaTcgVogHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { cat:'Shoes',     brand:'Adidas',  name:'Stan Smith Sneakers White',  price:14500, priceDisp:'14,500', oldPrice:'',      disc:'',    badge:'',          badgeTxt:'',    stars:'★★★★☆',rev:'(189)', img:'https://tse4.mm.bing.net/th/id/OIP.iwvy4-j1tQRMqir-7jjazAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { cat:'Shoes',     brand:'Nike',    name:'Air Max 270 React',          price:19000, priceDisp:'19,000', oldPrice:'24,000',disc:'-21%',badge:'badge-sale',badgeTxt:'-21%',stars:'★★★★★',rev:'(267)', img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=380&h=260&fit=crop' },
    { cat:'Bags',      brand:'Gucci',   name:'Leather Tote Bag Brown',     price:5500,  priceDisp:'5,500',  oldPrice:'',      disc:'',    badge:'',          badgeTxt:'',    stars:'★★★★☆',rev:'(210)', img:'https://a.1stdibscdn.com/gucci-brown-leather-medium-bamboo-shopper-tote-for-sale-picture-2/v_13101/v_205991821696930271621/luxury_women_gucci_used_handbags_p849799_004_master.jpg' },
    { cat:'Bags',      brand:'Gucci',   name:'Camera Crossbody Bag Black', price:4200,  priceDisp:'4,200',  oldPrice:'5,500', disc:'-24%',badge:'badge-sale',badgeTxt:'-24%',stars:'★★★★★',rev:'(134)', img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=380&h=260&fit=crop' },
    { cat:'Kids',      brand:'Khaadi',  name:'Kids Festive Suit 2-8 yrs',  price:2800,  priceDisp:'2,800',  oldPrice:'',      disc:'',    badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★',rev:'(89)',  img:'https://th.bing.com/th/id/R.9d166ea6fe26133d6b85e90140f89329?rik=568aS8m5nYPHFw&riu=http%3a%2f%2fwww.mariab.ae%2fcdn%2fshop%2fproducts%2fmks-ef22-225a-off-white.jpg%3fv%3d1672146609&ehk=Zc%2fCpCDvAaxisD4RmCT7EffyE0YFo6nX%2fLvBTw6E0AA%3d&risl=&pid=ImgRaw&r=0' },
  ];

  const cats   = [...new Set(items.map(i=>i.cat))];
  const brands = [...new Set(items.map(i=>i.brand))];

  document.getElementById('page-fashion').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      <div class="sidebar">
        <div class="sb-title">Filters <button class="sb-clear" onclick="resetPageFilters('fashion')">Clear</button></div>
        <div class="fgroup">
          <h5>Category</h5>
          ${cats.map(c=>`<label class="fopt"><input type="checkbox" class="fashion-cb" data-filter="cat" value="${c}" checked onchange="applyFashionFilter()"> ${c}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Brand</h5>
          ${brands.map(b=>`<label class="fopt"><input type="checkbox" class="fashion-cb" data-filter="brand" value="${b}" checked onchange="applyFashionFilter()"> ${b}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Price Range</h5>
          <div class="price-range">
            <input type="text" class="price-inp" placeholder="Min">
            <input type="text" class="price-inp" placeholder="Max">
          </div>
          <input type="range" min="0" max="25000" value="25000">
        </div>
        <button class="btn-filter-apply" onclick="resetPageFilters('fashion')">Show All</button>
      </div>
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong><span id="count-fashion">${items.length}</span> Items</strong> found</span>
          <select class="sort-sel"><option>Newest</option><option>Price Low→High</option><option>Price High→Low</option></select>
        </div>
        <div class="grid-4" id="fashion-grid">
          ${items.map(item=>`
          <div class="pcard filter-card" data-cat="${item.cat}" data-brand="${item.brand}">
            <div class="pcard-img" style="height:220px">
              <img src="${item.img}" alt="${item.name}">
              ${item.badgeTxt?`<span class="badge ${item.badge}">${item.badgeTxt}</span>`:''}
              <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
            </div>
            <div class="pcard-body">
              <div class="pcard-cat">${item.cat} · ${item.brand}</div>
              <div class="pcard-name">${item.name}</div>
              <div class="pcard-price-wrap">
                <span class="pcard-price">Rs. ${item.priceDisp}</span>
                ${item.oldPrice?`<span class="pcard-old">Rs.${item.oldPrice}</span>`:''}
                ${item.disc?`<span class="pcard-disc">${item.disc}</span>`:''}
              </div>
              <div class="pcard-stars">${item.stars} <span>${item.rev}</span></div>
              <button class="btn-lime" style="width:100%;margin-top:8px" onclick="addToCart('${item.name}',${item.price},'${item.img}')">Add to Cart</button>
            </div>
          </div>`).join('')}
        </div>
        <p id="fashion-empty" style="display:none;text-align:center;padding:48px;color:var(--text3)">No items found. <button onclick="resetPageFilters('fashion')" style="color:var(--lime-dark);background:none;border:none;cursor:pointer;font-weight:700">Reset</button></p>
      </div>
    </div>
  </div>`;
}
window.applyFashionFilter = function() { applyGenericFilter('fashion',['cat','brand'],'count-fashion','fashion-empty'); };

/* ================================================================
   BEAUTY PAGE
   ================================================================ */
function buildBeautyPage() {
  const items = [
    { cat:'Makeup',    brand:'MAC',       name:'MAC Foundation Studio Fix',   price:4800,  priceDisp:'4,800',  oldPrice:'',      badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★',rev:'(445)', img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=380&h=260&fit=crop' },
    { cat:'Makeup',    brand:'Charlotte', name:'Pillow Talk Lipstick',         price:5500,  priceDisp:'5,500',  oldPrice:'',      badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★★',rev:'(321)', img:'https://images.ctfassets.net/wlke2cbybljx/10WqVcR65d45SRP4NBJhnQ/0265e7c34cbfc21be0ae2f1cab128025/pillow-talk-packshot-model.jpg?q=80&fm=jpg' },
    { cat:'Makeup',    brand:'Maybelline',name:'Fit Me Foundation 30ml',       price:1800,  priceDisp:'1,800',  oldPrice:'2,200', badge:'badge-sale',badgeTxt:'-18%',stars:'★★★★☆',rev:'(678)', img:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=380&h=260&fit=crop' },
    { cat:'Skincare',  brand:'CeraVe',    name:'Daily Moisturizer SPF 50',     price:2800,  priceDisp:'2,800',  oldPrice:'3,300', badge:'badge-sale',badgeTxt:'-15%',stars:'★★★★★',rev:'(667)', img:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=380&h=260&fit=crop' },
    { cat:'Skincare',  brand:'The Ordinary',name:'Vitamin C 20% Serum 30ml',  price:2200,  priceDisp:'2,200',  oldPrice:'2,750', badge:'badge-sale',badgeTxt:'-20%',stars:'★★★★★',rev:'(789)', img:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=380&h=260&fit=crop' },
    { cat:'Skincare',  brand:'Neutrogena', name:'Hydro Boost Water Gel',       price:3200,  priceDisp:'3,200',  oldPrice:'',      badge:'badge-new', badgeTxt:'NEW', stars:'★★★★☆',rev:'(234)', img:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=380&h=260&fit=crop' },
    { cat:'Haircare',  brand:'Olaplex',   name:'Hair Repair Kit No.3 + No.6', price:6500,  priceDisp:'6,500',  oldPrice:'',      badge:'badge-new', badgeTxt:'NEW', stars:'★★★★☆',rev:'(234)', img:'https://utiee.com/739-home_default/hair-repair-kit-3-4-5-6-olpalex.webp' },
    { cat:'Haircare',  brand:'Pantene',   name:'Pantene Pro-V Shampoo 600ml', price:850,   priceDisp:'850',    oldPrice:'1,000', badge:'badge-sale',badgeTxt:'-15%',stars:'★★★★☆',rev:'(445)', img:'https://bf1af2.akinoncloudcdn.com/products/2024/09/10/88584/789609a0-c7e3-4937-8ca9-aea5d639d3f3_size3840_cropCenter.jpg' },
    { cat:'Fragrance', brand:'Dior',      name:'Miss Dior EDP 100ml',         price:28000, priceDisp:'28,000', oldPrice:'',      badge:'badge-feat',badgeTxt:'FEAT',stars:'★★★★★',rev:'(156)', img:'https://images.unsplash.com/photo-1617897903246-719242758050?w=380&h=260&fit=crop' },
    { cat:'Fragrance', brand:'Chanel',    name:'Chanel No.5 EDP 50ml',        price:32000, priceDisp:'32,000', oldPrice:'',      badge:'badge-hot', badgeTxt:'HOT', stars:'★★★★★',rev:'(89)',  img:'https://tse1.mm.bing.net/th/id/OIP.4go4j7c7cLGMuoz-I_DimAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
    { cat:'Nails',     brand:'OPI',       name:'OPI Gel Nail Polish Kit 6pc', price:5200,  priceDisp:'5,200',  oldPrice:'',      badge:'',          badgeTxt:'',    stars:'★★★★☆',rev:'(112)', img:'https://i.pinimg.com/originals/26/63/fe/2663feb098fe576e6d6c7a7117a10120.jpg' },
    { cat:'Grooming',  brand:'Braun',     name:'Braun Series 9 Shaver',       price:18000, priceDisp:'18,000', oldPrice:'',      badge:'badge-new', badgeTxt:'NEW', stars:'★★★★★',rev:'(88)',  img:'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=380&h=260&fit=crop' },
  ];
  const cats   = [...new Set(items.map(i=>i.cat))];
  const brands = [...new Set(items.map(i=>i.brand))];

  document.getElementById('page-beauty').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      <div class="sidebar">
        <div class="sb-title">Filters <button class="sb-clear" onclick="resetPageFilters('beauty')">Clear</button></div>
        <div class="fgroup">
          <h5>Category</h5>
          ${cats.map(c=>`<label class="fopt"><input type="checkbox" class="beauty-cb" data-filter="cat" value="${c}" checked onchange="applyBeautyFilter()"> ${c}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Brand</h5>
          ${brands.map(b=>`<label class="fopt"><input type="checkbox" class="beauty-cb" data-filter="brand" value="${b}" checked onchange="applyBeautyFilter()"> ${b}</label>`).join('')}
        </div>
        <div class="fgroup">
          <h5>Price Range</h5>
          <div class="price-range">
            <input type="text" class="price-inp" placeholder="Min">
            <input type="text" class="price-inp" placeholder="Max">
          </div>
        </div>
        <button class="btn-filter-apply" onclick="resetPageFilters('beauty')">Show All</button>
      </div>
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong><span id="count-beauty">${items.length}</span> Products</strong> found</span>
          <select class="sort-sel"><option>Newest</option><option>Price Low→High</option></select>
        </div>
        <div class="grid-4" id="beauty-grid">
          ${items.map(item=>`
          <div class="pcard filter-card" data-cat="${item.cat}" data-brand="${item.brand}">
            <div class="pcard-img" style="height:210px">
              <img src="${item.img}" alt="${item.name}">
              ${item.badgeTxt?`<span class="badge ${item.badge}">${item.badgeTxt}</span>`:''}
              <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
            </div>
            <div class="pcard-body">
              <div class="pcard-cat">${item.cat} · ${item.brand}</div>
              <div class="pcard-name">${item.name}</div>
              <div class="pcard-price-wrap">
                <span class="pcard-price">Rs. ${item.priceDisp}</span>
                ${item.oldPrice?`<span class="pcard-old">Rs.${item.oldPrice}</span>`:''}
              </div>
              <div class="pcard-stars">${item.stars} <span>${item.rev}</span></div>
              <button class="btn-lime" style="width:100%;margin-top:8px" onclick="addToCart('${item.name}',${item.price},'${item.img}')">Add to Cart</button>
            </div>
          </div>`).join('')}
        </div>
        <p id="beauty-empty" style="display:none;text-align:center;padding:48px;color:var(--text3)">No products found. <button onclick="resetPageFilters('beauty')" style="color:var(--lime-dark);background:none;border:none;cursor:pointer;font-weight:700">Reset</button></p>
      </div>
    </div>
  </div>`;
}
window.applyBeautyFilter = function() { applyGenericFilter('beauty',['cat','brand'],'count-beauty','beauty-empty'); };

/* ================================================================
   PROPERTY
   ================================================================ */
function buildPropertyPage() {
  document.getElementById('page-property').innerHTML = `
  <div class="wrap">
    <div class="with-sidebar">
      <div class="sidebar">
        <div class="sb-title">Property Filters</div>
        <div class="fgroup"><h5>Type</h5>
          <label class="fopt"><input type="checkbox" checked> House</label>
          <label class="fopt"><input type="checkbox" checked> Apartment</label>
          <label class="fopt"><input type="checkbox"> Plot</label>
          <label class="fopt"><input type="checkbox"> Commercial</label>
        </div>
        <div class="fgroup"><h5>Purpose</h5>
          <label class="fopt"><input type="checkbox" checked> For Sale</label>
          <label class="fopt"><input type="checkbox"> For Rent</label>
        </div>
        <div class="fgroup"><h5>Size</h5>
          <label class="fopt"><input type="checkbox"> 3 Marla</label>
          <label class="fopt"><input type="checkbox" checked> 5 Marla</label>
          <label class="fopt"><input type="checkbox"> 10 Marla</label>
          <label class="fopt"><input type="checkbox"> 1 Kanal</label>
        </div>
        <button class="btn-filter-apply" onclick="toast('456 properties found ✓')">Apply Filters</button>
      </div>
      <div>
        <div class="sort-bar"><span class="sort-count"><strong>456 Properties</strong> found</span></div>
        <div class="grid-3">
          <div class="pcard"><div class="pcard-img" style="height:220px"><img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=450&h=280&fit=crop" alt="h1"><span class="badge badge-feat">FEATURED</span><button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button></div><div class="pcard-body"><div class="pcard-cat">House · For Sale · DHA Lahore</div><div class="pcard-name">5 Marla Modern House DHA Ph5</div><div class="pcard-price-wrap"><span class="pcard-price">Rs. 1.8 Crore</span></div><div class="pcard-tags"><span class="tag">3 Beds</span><span class="tag">2 Baths</span><span class="tag">5 Marla</span></div><button class="btn-dark" style="width:100%;margin-top:10px" onclick="toast('Contact opened','inf')">Contact Seller</button></div></div>
          <div class="pcard"><div class="pcard-img" style="height:220px"><img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=450&h=280&fit=crop" alt="apt"><span class="badge badge-new">RENT</span><button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button></div><div class="pcard-body"><div class="pcard-cat">Apartment · For Rent · Bahria</div><div class="pcard-name">2 Bed Luxury Apartment Bahria</div><div class="pcard-price-wrap"><span class="pcard-price">Rs. 65,000/mo</span></div><div class="pcard-tags"><span class="tag">2 Beds</span><span class="tag">1200 sqft</span></div><button class="btn-dark" style="width:100%;margin-top:10px" onclick="toast('Contact opened','inf')">Contact</button></div></div>
          <div class="pcard"><div class="pcard-img" style="height:220px"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=450&h=280&fit=crop" alt="h3"><button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button></div><div class="pcard-body"><div class="pcard-cat">House · For Sale · Model Town</div><div class="pcard-name">10 Marla Double Storey</div><div class="pcard-price-wrap"><span class="pcard-price">Rs. 3.2 Crore</span></div><div class="pcard-tags"><span class="tag">5 Beds</span><span class="tag">10 Marla</span></div><button class="btn-dark" style="width:100%;margin-top:10px" onclick="toast('Contact opened','inf')">Contact</button></div></div>
        </div>
      </div>
    </div>
  </div>`;
}

/* ================================================================
   FURNITURE
   ================================================================ */
function buildFurniturePage() {
  const items = [
    { name:'7-Seater Sofa Teak Wood',      price:95000,  img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=260&fit=crop',badge:'badge-new',bt:'NEW',stars:'★★★★☆',r:'(45)' },
    { name:'King Size Bed + Foam Mattress', price:65000,  img:'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=260&fit=crop',badge:'',bt:'',stars:'★★★★★',r:'(78)' },
    { name:'Ergonomic Mesh Office Chair',   price:18700,  img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=260&fit=crop',badge:'badge-sale',bt:'-15%',stars:'★★★★★',r:'(112)' },
    { name:'6-Seater Dining Table Teak',    price:45000,  img:'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=260&fit=crop',badge:'',bt:'',stars:'★★★★☆',r:'(56)' },
  ];
  document.getElementById('page-furniture').innerHTML = `
  <div class="wrap" style="padding:32px 0">
    <div class="sec-head"><h2 class="sec-title">🛋️ Furniture &amp; <span>Home Decor</span></h2></div>
    <div class="grid-4">
      ${items.map(i=>`<div class="pcard"><div class="pcard-img" style="height:220px"><img src="${i.img}" alt="${i.name}">${i.bt?`<span class="badge ${i.badge}">${i.bt}</span>`:''}<button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button></div><div class="pcard-body"><div class="pcard-name">${i.name}</div><div class="pcard-price-wrap"><span class="pcard-price">Rs. ${i.price.toLocaleString()}</span></div><div class="pcard-stars">${i.stars}<span>${i.r}</span></div><button class="btn-lime" style="width:100%;margin-top:8px" onclick="addToCart('${i.name}',${i.price},'${i.img}')">Add to Cart</button></div></div>`).join('')}
    </div>
  </div>`;
}

/* ================================================================
   JOBS
   ================================================================ */
function buildJobsPage() {
  const jobs = [
    { title:'Senior Software Engineer',     company:'Systems Limited',   city:'Lahore',    type:'Full Time',  salary:'Rs. 1.5L – 2.5L/mo', tags:['React.js','Node.js','3+ Yrs'],    badge:'badge-feat',bt:'FEATURED' },
    { title:'Digital Marketing Manager',    company:'Daraz Pakistan',    city:'Karachi',   type:'Full Time',  salary:'Rs. 80K – 1.2L/mo',  tags:['SEO/SEM','Meta Ads','2+ Yrs'],    badge:'badge-new', bt:'NEW' },
    { title:'Graphic Designer (Remote)',    company:'Creative Studio PK',city:'Remote',    type:'Freelance',  salary:'Rs. 50K – 80K/mo',   tags:['Figma','Adobe Suite','Portfolio'],badge:'badge-hot', bt:'HOT' },
    { title:'Data Scientist',               company:'Jazz Pakistan',      city:'Islamabad', type:'Full Time',  salary:'Rs. 1.8L – 3L/mo',   tags:['Python','ML','3+ Yrs'],           badge:'',bt:'' },
    { title:'Flutter Mobile Developer',     company:'Arbisoft',           city:'Lahore',    type:'Full Time',  salary:'Rs. 1.2L – 2L/mo',   tags:['Flutter','Dart','2+ Yrs'],        badge:'',bt:'' },
  ];
  document.getElementById('page-jobs').innerHTML = `
  <div class="wrap" style="padding:32px 0">
    <div class="sec-head"><h2 class="sec-title">💼 Jobs &amp; <span>Careers</span></h2></div>
    <div style="display:flex;flex-direction:column;gap:12px">
      ${jobs.map(j=>`
      <div style="background:var(--white);border:1.5px solid var(--border);border-radius:var(--r);padding:20px;cursor:pointer;transition:border-color 0.2s" onmouseenter="this.style.borderColor='var(--lime-dark)'" onmouseleave="this.style.borderColor='var(--border)'">
        <div style="display:flex;justify-content:space-between;margin-bottom:10px">
          <div><div style="font-family:var(--font-head);font-size:17px;font-weight:700">${j.title}</div><div style="font-size:13px;color:var(--text3);margin-top:3px">${j.company} · ${j.city}</div></div>
          ${j.bt?`<span class="badge ${j.badge}" style="position:static;margin:0">${j.bt}</span>`:''}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px">
          <span class="tag">${j.type}</span>${j.tags.map(t=>`<span class="tag">${t}</span>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-family:var(--font-head);font-weight:700;font-size:15px">${j.salary}</span>
          <button class="btn-lime" onclick="toast('Application submitted! ✓')">Apply Now</button>
        </div>
      </div>`).join('')}
    </div>
  </div>`;
}

/* ================================================================
   SHOP — GROCERY, FOOD, DRINKS  (checkbox filter)
   ================================================================ */
function buildShopPage() {
  const catInfo = {
    vegetables:{ icon:'🥦', label:'Fresh Vegetables', color:'#e8f5e9' },
    fruits:    { icon:'🍎', label:'Fresh Fruits',      color:'#fff3e0' },
    dairy:     { icon:'🥛', label:'Dairy Products',    color:'#e3f2fd' },
    food:      { icon:'🍛', label:'Ready Food & Meals',color:'#fce4ec' },
    drinks:    { icon:'🥤', label:'Drinks & Beverages',color:'#e0f7fa' },
    snacks:    { icon:'🍫', label:'Snacks & Sweets',   color:'#fff8e1' },
    bakery:    { icon:'🍞', label:'Bakery & Bread',    color:'#f3e5f5' },
    meat:      { icon:'🥩', label:'Meat & Seafood',    color:'#fbe9e7' },
  };

  const groceries = [
    { name:'Fresh Red Tomatoes 1kg',      cat:'vegetables',price:120,  img:'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=350&h=220&fit=crop',badge:'badge-org',bt:'ORGANIC',stars:'★★★★★',rev:'(234)'},
    { name:'Baby Spinach 500g',           cat:'vegetables',price:85,   img:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=350&h=220&fit=crop',badge:'badge-new',bt:'FRESH',  stars:'★★★★☆',rev:'(89)'},
    { name:'Mixed Bell Peppers 500g',     cat:'vegetables',price:180,  img:'https://tse3.mm.bing.net/th/id/OIP.7VvWsZ77i5U1NSB9sYjt9wHaFj?rs=1&pid=ImgDetMain&o=7&rm=3',badge:'',bt:'',stars:'★★★★★',rev:'(67)'},
    { name:'Broccoli 500g',               cat:'vegetables',price:150,  img:'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=350&h=220&fit=crop',badge:'badge-org',bt:'ORGANIC',stars:'★★★★★',rev:'(112)'},
    { name:'Alphonso Mangoes 1kg',        cat:'fruits',    price:350,  img:'https://images.unsplash.com/photo-1553279768-865429fa0078?w=350&h=220&fit=crop',badge:'badge-hot',bt:'HOT',    stars:'★★★★★',rev:'(445)'},
    { name:'Strawberries 250g Punnet',    cat:'fruits',    price:280,  img:'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=350&h=220&fit=crop',badge:'badge-new',bt:'FRESH',  stars:'★★★★★',rev:'(312)'},
    { name:'Bananas 1 Dozen',             cat:'fruits',    price:120,  img:'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(178)'},
    { name:'Watermelon 2-3kg',            cat:'fruits',    price:200,  img:'https://tse1.mm.bing.net/th/id/OIP.LYpBEhkWUDZKCMVHFKKstAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3',badge:'badge-new',bt:'FRESH',  stars:'★★★★★',rev:'(234)'},
    { name:'Full Cream Milk 1 Litre',     cat:'dairy',     price:175,  img:'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=350&h=220&fit=crop',badge:'badge-org',bt:'PURE',    stars:'★★★★★',rev:'(567)'},
    { name:'Greek Yogurt 400g',           cat:'dairy',     price:220,  img:'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(234)'},
    { name:'Cheddar Cheese Block 200g',   cat:'dairy',     price:380,  img:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=350&h=220&fit=crop',badge:'badge-imp',bt:'IMPORT', stars:'★★★★★',rev:'(89)'},
    { name:'Butter 200g Pack',            cat:'dairy',     price:160,  img:'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(145)'},
    { name:'Chicken Biryani (2 Persons)', cat:'food',      price:380,  img:'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=350&h=220&fit=crop',badge:'badge-hot',bt:'HOT',    stars:'★★★★★',rev:'(892)'},
    { name:'BBQ Burger Combo Meal',       cat:'food',      price:550,  img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=350&h=220&fit=crop',badge:'badge-sale',bt:'-15%',  stars:'★★★★☆',rev:'(445)'},
    { name:'Masala Chai 2 Cups',          cat:'food',      price:120,  img:'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★★',rev:'(1.2K)'},
    { name:'Pakora Platter 500g',         cat:'food',      price:280,  img:'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=350&h=220&fit=crop',badge:'badge-hot',bt:'HOT',    stars:'★★★★★',rev:'(678)'},
    { name:'Coca-Cola Cans 330ml x12',    cat:'drinks',    price:780,  img:'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=350&h=220&fit=crop',badge:'badge-sale',bt:'-10%',  stars:'★★★★★',rev:'(1.5K)'},
    { name:'Tropicana Orange Juice 1L',   cat:'drinks',    price:320,  img:'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(345)'},
    { name:'Mineral Water 1.5L x6',       cat:'drinks',    price:240,  img:'https://images.unsplash.com/photo-1543253687-c931c8e01820?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★★',rev:'(890)'},
    { name:'Green Tea Detox 500ml',       cat:'drinks',    price:180,  img:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=350&h=220&fit=crop',badge:'badge-org',bt:'HEALTHY',  stars:'★★★★★',rev:'(567)'},
    { name:'Lays Classic Chips 130g',     cat:'snacks',    price:90,   img:'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(678)'},
    { name:'Chocolate Brownie 4pc Pack',  cat:'snacks',    price:350,  img:'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=350&h=220&fit=crop',badge:'badge-hot',bt:'HOT',    stars:'★★★★★',rev:'(234)'},
    { name:'Mixed Dry Fruits 250g',       cat:'snacks',    price:680,  img:'https://images.unsplash.com/photo-1607301406259-dfb186e15de8?w=350&h=220&fit=crop',badge:'badge-org',bt:'ORGANIC', stars:'★★★★★',rev:'(145)'},
    { name:'Sourdough Bread Loaf',        cat:'bakery',    price:280,  img:'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=350&h=220&fit=crop',badge:'badge-new',bt:'FRESH',  stars:'★★★★★',rev:'(312)'},
    { name:'Chocolate Croissant x4',      cat:'bakery',    price:320,  img:'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=350&h=220&fit=crop',badge:'',bt:'',stars:'★★★★☆',rev:'(189)'},
    { name:'Birthday Cake 1kg Custom',    cat:'bakery',    price:1800, img:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=350&h=220&fit=crop',badge:'badge-hot',bt:'HOT',    stars:'★★★★★',rev:'(445)'},
    { name:'Chicken Breast Boneless 500g',cat:'meat',      price:420,  img:'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=350&h=220&fit=crop',badge:'badge-new',bt:'FRESH',  stars:'★★★★☆',rev:'(678)'},
    { name:'Mutton Leg 1kg',              cat:'meat',      price:1200, img:'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=350&h=220&fit=crop',badge:'badge-org',bt:'HALAL',   stars:'★★★★★',rev:'(234)'},
    { name:'Salmon Fillet 300g',          cat:'meat',      price:950,  img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=350&h=220&fit=crop',badge:'badge-imp',bt:'IMPORT',  stars:'★★★★★',rev:'(145)'},
  ];

  const allCats = Object.keys(catInfo);
  const total = groceries.length;

  // Sidebar checkboxes
  const sidebarHtml = `
  <div class="sidebar">
    <div class="sb-title" style="flex-direction:column;align-items:flex-start;gap:8px">
      <span>Shop Filters</span>
      <div style="display:flex;gap:6px;width:100%">
        <button class="btn-filter-apply" style="flex:1;padding:7px" onclick="shopSelectAll()">All</button>
        <button class="btn-filter-reset" style="flex:1;padding:6px;margin:0" onclick="shopClearAll()">Clear</button>
      </div>
    </div>
    <div class="fgroup" style="margin-top:12px">
      <h5>Category</h5>
      ${allCats.map(cat=>`
        <label class="fopt">
          <input type="checkbox" class="shop-cb" data-cat="${cat}" checked onchange="filterShopCategory()">
          ${catInfo[cat].icon} ${catInfo[cat].label}
        </label>`).join('')}
    </div>
    <div class="fgroup">
      <h5>Sort By</h5>
      <select class="sort-sel" style="width:100%" onchange="toast('Sorting updated')">
        <option>Newest First</option>
        <option>Price: Low → High</option>
        <option>Price: High → Low</option>
        <option>Most Popular</option>
      </select>
    </div>
  </div>`;

  // Group products by category
  const blocksHtml = allCats.map(cat => {
    const catItems = groceries.filter(g => g.cat === cat);
    const info = catInfo[cat];
    return `
    <div class="cat-block" data-cat="${cat}" style="margin-bottom:12px">
      <div class="cat-sec-head" style="background:${info.color}">
        <span style="font-size:22px">${info.icon}</span>
        <h3>${info.label}</h3>
        <span>${catItems.length} items</span>
      </div>
      <div class="grid-4" style="margin-bottom:8px">
        ${catItems.map(item=>`
        <div class="pcard">
          <div class="pcard-img" style="height:190px;background:#fafff0">
            <img src="${item.img}" alt="${item.name}" loading="lazy">
            ${item.bt?`<span class="badge ${item.badge}">${item.bt}</span>`:''}
            <button class="pcard-wish" onclick="toggleWish(this)"><i class="far fa-heart"></i></button>
          </div>
          <div class="pcard-body">
            <div class="pcard-cat">${info.label}</div>
            <div class="pcard-name">${item.name}</div>
            <div class="pcard-price-wrap"><span class="pcard-price">Rs. ${item.price}</span></div>
            <div class="pcard-stars">${item.stars} <span>${item.rev}</span></div>
            <button class="btn-lime" style="width:100%;margin-top:8px"
              onclick="addToCart('${item.name}',${item.price},'${item.img}')">
              <i class="fas fa-cart-plus" style="margin-right:5px"></i>Add to Cart
            </button>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');

  document.getElementById('page-shop').innerHTML = `
  <div class="wrap" style="padding:32px 0">
    <div class="shop-hero">
      <h2>🛒 Grocery &amp; Online Shop</h2>
      <p>Fresh Vegetables · Fruits · Dairy · Ready Food · Drinks · Snacks · Bakery · Meat</p>
      <div class="shop-cat-tabs">
        <button class="scat-btn active" onclick="shopTabFilter('all',this)">All (${total})</button>
        ${allCats.map(c=>`<button class="scat-btn" onclick="shopTabFilter('${c}',this)">${catInfo[c].icon} ${catInfo[c].label}</button>`).join('')}
      </div>
    </div>
    <div class="with-sidebar" style="padding:0;margin-top:24px">
      ${sidebarHtml}
      <div>
        <div class="sort-bar">
          <span class="sort-count"><strong id="shopResultCount">${total} products found</strong></span>
        </div>
        ${blocksHtml}
      </div>
    </div>
  </div>`;
}

/* ================================================================
   POST AD
   ================================================================ */
function buildSellPage() {
  document.getElementById('page-sell').innerHTML = `
  <div class="post-section">
    <div class="wrap">
      <div class="post-card">
        <div class="post-title">📢 Post a Free Ad</div>
        <div class="post-sub">Reach millions of buyers across Pakistan — 100% Free!</div>

        <div class="sell-steps">
          <div class="sell-step active" id="step-ind-1"><span>1</span> Category</div>
          <div class="sell-step-line"></div>
          <div class="sell-step" id="step-ind-2"><span>2</span> Details</div>
          <div class="sell-step-line"></div>
          <div class="sell-step" id="step-ind-3"><span>3</span> Photos</div>
          <div class="sell-step-line"></div>
          <div class="sell-step" id="step-ind-4"><span>4</span> Contact</div>
        </div>

        <!-- STEP 1 -->
        <div id="sell-step-1" class="sell-step-body">
          <div class="fsec-label" style="margin-top:0">Ad Category</div>
          <div class="form-r3">
            <div class="fgrp"><label>Category *</label><select class="finp" id="adCategory" onchange="updateSubcategory(this)"><option value="">Select Category</option><option>Cars</option><option>Bikes</option><option>Electronics</option><option>Fashion</option><option>Property</option><option>Furniture</option><option>Jobs</option><option>Beauty</option><option>Grocery</option></select></div>
            <div class="fgrp"><label>Sub-Category</label><select class="finp" id="subCatSel"><option value="">Select Sub-Category</option></select></div>
            <div class="fgrp"><label>Condition *</label><select class="finp" id="adCondition"><option value="">Select Condition</option><option>New</option><option>Used — Like New</option><option>Used — Good</option><option>Used — Fair</option></select></div>
          </div>
          <div style="margin-top:20px;text-align:right">
            <button class="btn-lime" style="padding:11px 28px;border-radius:50px;font-weight:700;font-size:14px" onclick="sellNextStep(1)">Continue <i class="fas fa-arrow-right" style="margin-left:6px"></i></button>
          </div>
        </div>

        <!-- STEP 2 -->
        <div id="sell-step-2" class="sell-step-body" style="display:none">
          <div class="fsec-label" style="margin-top:0">Ad Details</div>
          <div class="fgrp" style="margin-bottom:14px"><label>Ad Title *</label><input type="text" id="adTitle" class="finp" placeholder="e.g. Toyota Corolla 2020 Automatic White"></div>
          <div class="fgrp" style="margin-bottom:14px"><label>Description *</label><textarea id="adDesc" class="finp" rows="5" placeholder="Condition, features, reason for selling..."></textarea><span style="font-size:11px;color:var(--text3)" id="descCount">0 / 1000 characters</span></div>
          <div class="form-r2" style="margin-bottom:14px">
            <div class="fgrp"><label>Price (Rs.) *</label><input type="number" id="adPrice" class="finp" placeholder="e.g. 4200000" min="0"></div>
            <div class="fgrp"><label>Price Type</label><select class="finp" id="adPriceType"><option>Negotiable</option><option>Fixed Price</option><option>Exchange Possible</option><option>Free / Gift</option></select></div>
          </div>
          <div style="display:flex;gap:10px;margin-top:20px">
            <button class="btn-outline" style="padding:10px 22px;border-radius:50px" onclick="sellGoStep(1)"><i class="fas fa-arrow-left" style="margin-right:6px"></i> Back</button>
            <button class="btn-lime" style="padding:11px 28px;border-radius:50px;font-weight:700;font-size:14px" onclick="sellNextStep(2)">Continue <i class="fas fa-arrow-right" style="margin-left:6px"></i></button>
          </div>
        </div>

        <!-- STEP 3 -->
        <div id="sell-step-3" class="sell-step-body" style="display:none">
          <div class="fsec-label" style="margin-top:0">Upload Photos</div>
          <p style="font-size:13px;color:var(--text2);margin-bottom:16px"><i class="fas fa-info-circle" style="color:var(--lime-dark)"></i> Ads with photos get <strong>5x more views</strong>. Add up to 10 photos.</p>
          <div class="photo-upload-zone" id="photoUploadZone" onclick="document.getElementById('photoFileInput').click()" ondragover="event.preventDefault();this.classList.add('drag-over')" ondragleave="this.classList.remove('drag-over')" ondrop="handlePhotoDrop(event)">
            <input type="file" id="photoFileInput" accept="image/*" multiple style="display:none" onchange="handlePhotoSelect(this)">
            <div class="upload-zone-inner">
              <i class="fas fa-cloud-upload-alt" style="font-size:36px;color:var(--lime-dark);display:block;margin-bottom:10px"></i>
              <p style="font-size:15px;font-weight:600;margin-bottom:4px">Click or drag photos here</p>
              <p style="font-size:13px;color:var(--text3)">JPG, PNG, WEBP · Max 5MB each · Up to 10 photos</p>
            </div>
          </div>
          <div id="photoPreviewGrid" style="display:none;margin-top:16px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:13px;font-weight:600" id="photoCountLabel">0 photos selected</span>
              <button onclick="clearAllPhotos()" style="background:none;border:none;color:var(--red);font-size:12px;cursor:pointer;font-weight:600"><i class="fas fa-trash"></i> Remove All</button>
            </div>
            <div id="photoGrid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px"></div>
            <button onclick="document.getElementById('photoFileInput').click()" style="margin-top:12px;background:var(--off);border:1.5px dashed var(--border);color:var(--text2);padding:10px 18px;border-radius:var(--r-sm);font-size:13px;font-weight:600;cursor:pointer;width:100%"><i class="fas fa-plus" style="margin-right:6px"></i>Add More Photos</button>
          </div>
          <div style="display:flex;gap:10px;margin-top:20px">
            <button class="btn-outline" style="padding:10px 22px;border-radius:50px" onclick="sellGoStep(2)"><i class="fas fa-arrow-left" style="margin-right:6px"></i> Back</button>
            <button class="btn-lime" style="padding:11px 28px;border-radius:50px;font-weight:700;font-size:14px" onclick="sellGoStep(4)">Continue <i class="fas fa-arrow-right" style="margin-left:6px"></i></button>
            <button onclick="sellGoStep(4)" style="background:none;border:none;color:var(--text3);font-size:13px;cursor:pointer;padding:10px">Skip for now</button>
          </div>
        </div>

        <!-- STEP 4 -->
        <div id="sell-step-4" class="sell-step-body" style="display:none">
          <div class="fsec-label" style="margin-top:0">Location &amp; Contact</div>
          <div class="form-r3" style="margin-bottom:14px">
            <div class="fgrp"><label>Province *</label><select class="finp" id="adProvince"><option value="">Select Province</option><option>Punjab</option><option>Sindh</option><option>KPK</option><option>Balochistan</option><option>AJK</option></select></div>
            <div class="fgrp"><label>City *</label><select class="finp" id="adCity"><option value="">Select City</option><option>Lahore</option><option>Karachi</option><option>Islamabad</option><option>Rawalpindi</option><option>Faisalabad</option><option>Multan</option><option>Peshawar</option><option>Quetta</option><option>Sialkot</option></select></div>
            <div class="fgrp"><label>Area</label><input type="text" class="finp" id="adArea" placeholder="e.g. DHA Phase 5"></div>
          </div>
          <div class="form-r2" style="margin-bottom:14px">
            <div class="fgrp"><label>Your Name *</label><input type="text" class="finp" id="adSellerName" placeholder="Full name"></div>
            <div class="fgrp"><label>Phone *</label><input type="tel" class="finp" id="adSellerPhone" placeholder="03XX-XXXXXXX"></div>
          </div>
          <div class="fgrp" style="margin-bottom:14px"><label>Email (optional)</label><input type="email" class="finp" id="adSellerEmail" placeholder="your@email.com"></div>
          <div style="background:rgba(195,231,3,0.08);border:1px solid rgba(195,231,3,0.25);border-radius:var(--r-sm);padding:12px;margin-bottom:18px;font-size:13px;color:var(--text2)"><i class="fas fa-shield-alt" style="color:var(--lime-dark);margin-right:6px"></i>Your contact info is only shown to serious buyers.</div>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            <button class="btn-outline" style="padding:10px 22px;border-radius:50px" onclick="sellGoStep(3)"><i class="fas fa-arrow-left" style="margin-right:6px"></i> Back</button>
            <button class="btn-submit-ad" onclick="submitAd()"><i class="fas fa-paper-plane" style="margin-right:8px"></i>Post Ad Now — Free!</button>
          </div>
        </div>

        <!-- SUCCESS -->
        <div id="sell-success" style="display:none;text-align:center;padding:40px 20px">
          <div style="font-size:64px;margin-bottom:16px">🎉</div>
          <h2 style="font-family:var(--font-head);font-size:26px;font-weight:700;margin-bottom:8px;color:var(--lime-dark)">Ad Posted Successfully!</h2>
          <p style="color:var(--text2);margin-bottom:8px;font-size:15px" id="successAdTitle"></p>
          <p style="color:var(--text3);font-size:13px;margin-bottom:28px">Your ad is now live and visible to millions of buyers across Pakistan.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <button class="btn-lime" style="padding:12px 24px;border-radius:50px;font-weight:700" onclick="viewMyAds()"><i class="fas fa-list-alt" style="margin-right:6px"></i>View My Ads</button>
            <button class="btn-outline" style="padding:11px 24px;border-radius:50px" onclick="resetSellForm()"><i class="fas fa-plus" style="margin-right:6px"></i>Post Another Ad</button>
          </div>
        </div>

      </div>
    </div>
  </div>`;

  /* description character counter */
  const desc = document.getElementById('adDesc');
  if (desc) desc.addEventListener('input', () => {
    const cnt = document.getElementById('descCount');
    if (cnt) cnt.textContent = desc.value.length + ' / 1000 characters';
  });

  /* pre-fill from logged-in user */
  const user = getCurrentUser();
  if (user) {
    const n = document.getElementById('adSellerName');
    const p = document.getElementById('adSellerPhone');
    const e = document.getElementById('adSellerEmail');
    if (n) n.value = (user.fname + ' ' + (user.lname || '')).trim();
    if (p) p.value = user.phone || '';
    if (e) e.value = user.email || '';
  }
}
 
 
/* ================================================================
   PROFILE — shows real user data from localStorage
   ================================================================ */
function buildProfilePage() {
  const el = document.getElementById('page-profile');
  el.innerHTML = '<div class="wrap" style="padding:48px 0;text-align:center"><div id="profileContent"></div></div>';
  renderProfileContent();
}
 
function renderProfileContent() {
  const user = getCurrentUser();
  const el = document.getElementById('profileContent');
  if (!el) return;
 
  if (!user) {
    el.innerHTML = `
    <div style="max-width:420px;margin:0 auto;text-align:center">
      <div style="font-size:64px;margin-bottom:16px">🔐</div>
      <h2 style="font-family:var(--font-head);font-size:24px;margin-bottom:8px">Sign In to Your Account</h2>
      <p style="color:var(--text3);margin-bottom:24px">Login or create an account to access your profile, ads and orders.</p>
      <button class="btn-lime" style="padding:13px 36px;font-size:15px;font-weight:700;border-radius:50px" onclick="openModal('loginModal')">Login / Register</button>
    </div>`;
    return;
  }
 
  const myAds    = getMyAds();
  const myOrders = getMyOrders();
 
  el.innerHTML = `
  <div class="profile-layout">
    <div class="prof-sidebar">
      <div class="prof-top">
        <div class="prof-av">${user.avatar}</div>
        <div class="prof-name">${user.fname} ${user.lname || ''}</div>
        <div class="prof-email">${user.email}</div>
        <div class="prof-badge">✓ Verified Member</div>
      </div>
      <div class="prof-nav">
        <a href="#" class="on" onclick="showProfileTab('myads',this)"><i class="fas fa-list-alt"></i> My Ads (${myAds.length})</a>
        <a href="#" onclick="showProfileTab('orders',this)"><i class="fas fa-shopping-bag"></i> My Orders (${myOrders.length})</a>
        <a href="#" onclick="showProfileTab('details',this)"><i class="fas fa-user-edit"></i> Account Details</a>
        <a href="#" onclick="openModal('settingsModal')"><i class="fas fa-cog"></i> Settings</a>
        <a href="#" onclick="doLogout()"><i class="fas fa-sign-out-alt"></i> Sign Out</a>
      </div>
    </div>
    <div>
      <!-- STATS -->
      <div class="prof-card" style="margin-bottom:16px">
        <div class="stat-cards">
          <div class="stat-card" style="background:rgba(195,231,3,0.1);border-color:rgba(195,231,3,0.3)">
            <div class="stat-num">${myAds.length}</div><div class="stat-lbl">Active Ads</div>
          </div>
          <div class="stat-card" style="background:rgba(150,209,199,0.12);border-color:rgba(150,209,199,0.35)">
            <div class="stat-num">${myOrders.length}</div><div class="stat-lbl">Orders</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${myAds.reduce((s,a)=>s+(a.views||0),0)}</div>
            <div class="stat-lbl">Total Views</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">${myOrders.filter(o=>o.status==='Delivered').length}</div>
            <div class="stat-lbl">Delivered</div>
          </div>
        </div>
      </div>
 
      <!-- TAB: MY ADS -->
      <div id="tab-myads" class="prof-tab-panel prof-card">
        <h3>My Posted Ads</h3>
        ${myAds.length === 0 ? `
        <div style="text-align:center;padding:40px 0;color:var(--text3)">
          <div style="font-size:48px;margin-bottom:12px">📋</div>
          <p style="margin-bottom:16px">You haven't posted any ads yet.</p>
          <button class="btn-lime" style="padding:10px 24px;border-radius:50px;font-weight:700" onclick="navGo(null,'sell')">Post Your First Ad →</button>
        </div>` : myAds.map(ad => `
        <div class="ad-row">
          <div class="ad-thumb">
            ${ad.photos && ad.photos[0]
              ? `<img src="${ad.photos[0]}" alt="${ad.title}" style="width:100%;height:100%;object-fit:cover">`
              : `<div style="width:100%;height:100%;background:var(--off);display:flex;align-items:center;justify-content:center;font-size:22px">📦</div>`}
          </div>
          <div style="flex:1">
            <div style="font-weight:700;font-size:14px">${ad.title}</div>
            <div style="font-size:12px;color:var(--text3);margin-top:2px">${ad.category} · ${ad.city} · Posted ${formatDate(ad.postedAt)}</div>
            <div style="font-weight:700;margin-top:4px;color:var(--lime-dark)">Rs. ${Number(ad.price).toLocaleString('en-PK')}</div>
          </div>
          <div style="text-align:center;padding:0 14px">
            <div style="font-family:var(--font-head);font-size:20px;font-weight:800;color:var(--lime-dark)">${ad.views||0}</div>
            <div style="font-size:11px;color:var(--text3)">Views</div>
          </div>
          <div style="display:flex;gap:7px">
            <button style="padding:7px 14px;border-radius:50px;border:1.5px solid var(--border);background:transparent;cursor:pointer;font-size:12px;font-weight:600" onclick="toast('Edit ad feature coming soon!','inf')">Edit</button>
            <button style="padding:7px 14px;border-radius:50px;border:1.5px solid #ffcdd2;background:transparent;cursor:pointer;font-size:12px;font-weight:600;color:#c00" onclick="deleteMyAd('${ad.id}')">Delete</button>
          </div>
        </div>`).join('')}
      </div>
 
      <!-- TAB: ORDERS -->
      <div id="tab-orders" class="prof-tab-panel prof-card" style="display:none">
        <h3>My Orders</h3>
        ${myOrders.length === 0 ? `
        <div style="text-align:center;padding:40px 0;color:var(--text3)">
          <div style="font-size:48px;margin-bottom:12px">🛍️</div>
          <p style="margin-bottom:16px">No orders yet. Start shopping!</p>
          <button class="btn-lime" style="padding:10px 24px;border-radius:50px;font-weight:700" onclick="navGo(null,'shop')">Browse Shop →</button>
        </div>` : myOrders.map(order => `
        <div style="border:1.5px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <div>
              <div style="font-family:var(--font-head);font-weight:700;font-size:15px">Order #${order.id}</div>
              <div style="font-size:12px;color:var(--text3);margin-top:2px">${formatDate(order.date)} · ${order.items.length} item${order.items.length>1?'s':''}</div>
            </div>
            <span class="order-status-badge ${order.status.toLowerCase().replace(' ','-')}">${order.status}</span>
          </div>
          <div style="border-top:1px solid var(--border);padding-top:12px;margin-bottom:12px">
            ${order.items.map(item=>`
            <div style="display:flex;gap:10px;align-items:center;margin-bottom:8px">
              <img src="${item.img}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;flex-shrink:0">
              <div style="flex:1;font-size:13px;font-weight:600">${item.name}</div>
              <div style="font-size:12px;color:var(--text3)">x${item.qty}</div>
              <div style="font-size:13px;font-weight:700">Rs. ${(item.price*item.qty).toLocaleString('en-PK')}</div>
            </div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border);padding-top:10px">
            <div style="font-size:13px;color:var(--text2)">Payment: <strong>${order.paymentMethod}</strong></div>
            <div style="font-family:var(--font-head);font-size:16px;font-weight:700">Total: Rs. ${order.total.toLocaleString('en-PK')}</div>
          </div>
        </div>`).join('')}
      </div>
 
      <!-- TAB: ACCOUNT DETAILS -->
      <div id="tab-details" class="prof-tab-panel prof-card" style="display:none">
        <h3>Account Details</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">
          <div style="padding:14px;background:var(--off);border-radius:var(--r-sm)"><div style="color:var(--text3);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Full Name</div><div style="font-weight:600">${user.fname} ${user.lname||''}</div></div>
          <div style="padding:14px;background:var(--off);border-radius:var(--r-sm)"><div style="color:var(--text3);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Email</div><div style="font-weight:600">${user.email}</div></div>
          <div style="padding:14px;background:var(--off);border-radius:var(--r-sm)"><div style="color:var(--text3);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Phone</div><div style="font-weight:600">${user.phone}</div></div>
          <div style="padding:14px;background:var(--off);border-radius:var(--r-sm)"><div style="color:var(--text3);font-size:11px;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px">Joined</div><div style="font-weight:600">${new Date(user.createdAt).toLocaleDateString('en-PK',{year:'numeric',month:'long',day:'numeric'})}</div></div>
        </div>
        <button class="btn-lime" style="padding:10px 24px;border-radius:50px;font-weight:700" onclick="toast('Edit profile feature coming soon!','inf')">
          <i class="fas fa-user-edit" style="margin-right:6px"></i>Edit Profile
        </button>
      </div>
    </div>
  </div>`;
}
 
function showProfileTab(tab, el) {
  document.querySelectorAll('.prof-tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.prof-nav a').forEach(a => a.classList.remove('on'));
  const panel = document.getElementById('tab-' + tab);
  if (panel) panel.style.display = 'block';
  if (el) el.classList.add('on');
}
 
function deleteMyAd(id) {
  const user = getCurrentUser();
  if (!user) return;
  const ads = getMyAds().filter(a => a.id !== id);
  localStorage.setItem('pb_ads_' + user.id, JSON.stringify(ads));
  toast('Ad deleted successfully');
  renderProfileContent();
}
 
function getMyAds() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem('pb_ads_' + user.id) || '[]');
}
 
function getMyOrders() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem('pb_orders_' + user.id) || '[]');
}
 
function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-PK', { day:'numeric', month:'short', year:'numeric' });
}
 
function viewMyAds() {
  navGo(document.querySelectorAll('.nitem')[11], 'profile');
  setTimeout(() => showProfileTab('myads', document.querySelector('.prof-nav a')), 200);
}
