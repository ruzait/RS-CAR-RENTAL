(function () {
  const d = new Date();
  document.getElementById('formDate').setAttribute('min', d.toISOString().split('T')[0]);
})();

const WA_NUM = '94752985632';

const cars = [
  {
    name: 'Honda <span>Vezel</span>',
    type: 'SUV · Petrol Hybrid · Automatic',
    year: '2019',
    mileage: '65,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: '5',
    condition: 'Excellent',
    location: 'Eastern Province',
    price: '10,000',
    km: '150',
    img: 'img/Vezel (3).jpeg',
    tag: 'Popular Choice',
    desc: 'Luxury SUV with comfortable interior, excellent fuel economy, and smooth handling. Perfect for long trips and family outings.'
  },
  {
    name: 'Toyota <span>Prius</span>',
    type: 'Sedan · Petrol Hybrid · Automatic',
    year: '2018',
    mileage: '78,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: '5',
    condition: 'Excellent',
    location: 'Eastern Province',
    price: '10,000',
    km: '150',
    img: 'img/Prius (2).jpeg',
    tag: 'Best Seller',
    desc: 'Fuel-saving hybrid with an exceptionally smooth and quiet drive. Ideal for business travel and city commuting.'
  },
  {
    name: 'Suzuki <span>Stingray</span>',
    type: 'Hatchback · Petrol · Manual',
    year: '2020',
    mileage: '45,000 km',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: '4',
    condition: 'Good',
    location: 'Eastern Province',
    price: '5,000',
    km: '150',
    img: 'img/Stingray (2).jpeg',
    tag: 'Budget Pick',
    desc: 'Compact, stylish, and incredibly fuel-efficient. The perfect choice for daily commuting and city driving on a budget.'
  },
  {
    name: 'Toyota <span>Aqua</span>',
    type: 'Hatchback · Petrol Hybrid · Automatic',
    year: '2017',
    mileage: '82,000 km',
    fuel: 'Hybrid',
    transmission: 'Automatic',
    seats: '5',
    condition: 'Excellent',
    location: 'Eastern Province',
    price: '7,000',
    km: '150',
    img: 'img/Aqua.jpeg',
    tag: 'Economy',
    desc: 'Hybrid efficiency meets practicality. Best for office commutes, city errands, and comfortable family rides.'
  },
  {
    name: 'Nissan <span>Every</span>',
    type: 'Van · Petrol · Manual',
    year: '2019',
    mileage: '55,000 km',
    fuel: 'Petrol',
    transmission: 'Manual',
    seats: '4',
    condition: 'Good',
    location: 'Eastern Province',
    price: '7,000',
    km: '150',
    img: 'img/Every.jpeg',
    tag: 'Cargo',
    desc: 'Spacious and versatile van. Ideal for group travel, airport transfers, and carrying luggage or cargo.'
  }
];

const list = document.getElementById('cars-list');

cars.forEach((c, i) => {
  const div = document.createElement('div');
  div.className = 'car-container reveal' + (i % 2 === 1 ? ' reverse' : '');
  div.id = 'car-' + i;

  div.innerHTML = `
    <div class="car-image">
      <span class="tag">${c.tag}</span>
      <img src="${c.img}" alt="${c.name}" loading="lazy" />
    </div>
    <div class="car-info">
      <h3>${c.name}</h3>
      <div class="car-type">${c.type}</div>
      <div class="specs">
        <span><span class="icon">📅</span> ${c.year}</span>
        <span><span class="icon">⛽</span> ${c.fuel}</span>
        <span><span class="icon">⚙</span> ${c.transmission}</span>
        <span><span class="icon">👤</span> ${c.seats} Seats</span>
      </div>
      <p class="desc">${c.desc}</p>
      <div class="price-row">
        <div class="price">LKR ${c.price} <small>/ ${c.km} km</small></div>
      </div>
      <div class="car-actions">
        <button class="btn-rent">Rent This Car</button>
      </div>
    </div>
  `;

  list.appendChild(div);
});

document.querySelectorAll('.btn-rent').forEach((btn, i) => {
  btn.addEventListener('click', () => {
    const car = cars[i];
    const name = car.name.replace(/<[^>]*>/g, '').trim();
    const msg = encodeURIComponent(
      `Hi! I'm interested in renting the ${name} (${car.year}, ${car.mileage}, LKR ${car.price}/${car.km}km). Please share availability and details.`
    );
    window.open(`https://wa.me/${WA_NUM}?text=${msg}`, '_blank');
  });
});

// Stats counter animation
const statsEl = document.querySelector('.hero-stats');
const nums = statsEl.querySelectorAll('.num');
const targets = [1000, 5, 4.9];
const suffixes = ['+', '+', ''];
let animated = false;
const duration = 2000;

function animateStats() {
  if (animated) return;
  animated = true;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    nums.forEach((el, i) => {
      const val = ease * targets[i];
      el.textContent = (targets[i] % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffixes[i];
    });

    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const obs = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateStats();
}, { threshold: 0.5 });
obs.observe(statsEl);

// Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Q&A accordion
document.querySelectorAll('.qa-item').forEach(item => {
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.qa-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

document.querySelector('.btn-book').addEventListener('click', () => {
  document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value.trim();
  const phone = document.getElementById('formPhone').value.trim();
  const car = document.getElementById('formCar').value;
  const date = document.getElementById('formDate').value;
  const message = document.getElementById('formMessage').value.trim();

  const msg = encodeURIComponent(
    `*New Booking Request*\n\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Car: ${car}\n` +
    `Pickup Date: ${date || 'Not specified'}\n` +
    `Message: ${message || '—'}`
  );
  window.open(`https://wa.me/${WA_NUM}?text=${msg}`, '_blank');
});

// Reviews carousel (Swiper)
new Swiper('.reviews-swiper', {
  loop: true,
  loopPreventsSlide: false,
  speed: 500,
  slidesPerView: 1.25,
  centeredSlides: true,
  spaceBetween: 12,
  grabCursor: true,
  breakpoints: {
    768: { slidesPerView: 1.25, spaceBetween: 12 },
    0: { slidesPerView: 1.08, spaceBetween: 8 },
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

// Quiz
const quizData = [
  {
    q: 'What is your main travel purpose?',
    opts: [
      { label: 'Family Trip', car: 'Honda Vezel', msg: 'The spacious Vezel is perfect for the whole family!' },
      { label: 'Business Travel', car: 'Toyota Prius', msg: 'The Prius is ideal — smooth, efficient, and professional.' },
      { label: 'Weekend Adventure', car: 'Suzuki Stingray', msg: 'The Stingray is perfect — reliable and easy to drive.' },
      { label: 'City Commute', car: 'Toyota Aqua', msg: 'The Aqua is nimble and fuel-friendly for city life.' },
      { label: 'Group Haul', car: 'Nissan Every', msg: 'The Every van has all the space you need.' }
    ]
  },
  {
    q: 'How many passengers?',
    opts: [
      { label: 'Just me', car: 'Suzuki Stingray', msg: 'Solo? The Stingray is nimble and efficient.' },
      { label: '2 people', car: 'Toyota Aqua', msg: 'The Aqua is perfect for two — compact and efficient.' },
      { label: '3-5 people', car: 'Honda Vezel', msg: 'The Vezel seats everyone comfortably.' },
      { label: '5+ people', car: 'Nissan Every', msg: 'Grab the Every van — plenty of room for all.' }
    ]
  },
  {
    q: 'What matters most to you?',
    opts: [
      { label: 'Fuel Efficiency', car: 'Toyota Prius', msg: 'The Prius is the king of fuel savings!' },
      { label: 'Style & Status', car: 'Suzuki Stingray', msg: 'The Stingray is stylish and budget-friendly.' },
      { label: 'Space & Comfort', car: 'Honda Vezel', msg: 'The Vezel offers premium space and comfort.' },
      { label: 'Affordability', car: 'Toyota Aqua', msg: 'The Aqua gives you the most bang for your buck.' }
    ]
  },
  {
    q: 'How far are you planning to drive?',
    opts: [
      { label: 'Short city trips', car: 'Toyota Aqua', msg: 'Aqua is quick, easy to park, and efficient.' },
      { label: 'Long highway drives', car: 'Honda Vezel', msg: 'The Vezel is built for long comfortable journeys.' },
      { label: 'Mixed daily use', car: 'Toyota Prius', msg: 'Prius handles it all — city and highway with ease.' },
      { label: 'Just for fun', car: 'Suzuki Stingray', msg: 'Stingray — the perfect city car for any trip.' }
    ]
  },
  {
    q: 'What is your budget range?',
    opts: [
      { label: 'Economy (under 10K)', car: 'Toyota Aqua', msg: 'The Aqua gives you the best value for your money.' },
      { label: 'Mid-range (10K-15K)', car: 'Honda Vezel', msg: 'The Vezel offers premium comfort at a fair price.' },
      { label: 'Premium (15K+)', car: 'Suzuki Stingray', msg: 'The Stingray is reliable and affordable.' },
      { label: 'Best value', car: 'Toyota Prius', msg: 'The Prius is the smartest investment for any trip.' }
    ]
  }
];

const tQ = quizData.length;
const qEl = document.getElementById('quizQuestion');
const oEl = document.getElementById('quizOptions');
const rEl = document.getElementById('quizResult');
const nBtn = document.getElementById('quizNext');
const pEl = document.getElementById('quizProgress');
let qIdx = 0;
let ans = [];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const msgs = [
  'The Vezel offers the best all-round space and comfort.',
  'The Prius is the smart choice for efficiency and style.',
  'The Stingray is the perfect city companion — compact and affordable.',
  'The Aqua is perfect for a balanced and efficient drive.',
  'The Every van gives you maximum space and versatility.'
];
const carsList = ['Honda Vezel', 'Toyota Prius', 'Suzuki Stingray', 'Toyota Aqua', 'Nissan Every'];
const votes = { 'Honda Vezel': 0, 'Toyota Prius': 0, 'Suzuki Stingray': 0, 'Toyota Aqua': 0, 'Nissan Every': 0 };

let shuffled = shuffle([...quizData]);
pEl.innerHTML = '<span></span>'.repeat(tQ);

function renderQ() {
  if (qIdx >= shuffled.length) {
    pEl.querySelectorAll('span').forEach(s => s.classList.add('done'));
    const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
    const top = sorted[0][0];
    const ci = carsList.indexOf(top);
    qEl.textContent = 'Your Perfect Match!';
    oEl.innerHTML = '';
    rEl.innerHTML = 'We recommend the <strong>' + top + '</strong> \u2014 ' + msgs[ci];
    const actions = document.createElement('div');
    actions.className = 'quiz-result-actions';
    const bookBtn = document.createElement('button');
    bookBtn.className = 'btn-book-now';
    bookBtn.textContent = 'Book Now';
    bookBtn.addEventListener('click', () => {
      document.getElementById('car-' + ci).scrollIntoView({ behavior: 'smooth' });
    });
    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn-retry';
    retryBtn.textContent = 'Retry';
    retryBtn.addEventListener('click', () => {
      nBtn.style.display = '';
      Object.keys(votes).forEach(k => votes[k] = 0);
      ans = [];
      qIdx = 0;
      shuffled = shuffle([...quizData]);
      pEl.innerHTML = '<span></span>'.repeat(tQ);
      renderQ();
    });
    actions.appendChild(bookBtn);
    actions.appendChild(retryBtn);
    rEl.appendChild(actions);
    nBtn.style.display = 'none';
    return;
  }

  pEl.querySelectorAll('span').forEach((s, i) => s.classList.toggle('done', i < qIdx));
  const item = shuffled[qIdx];
  qEl.textContent = item.q;
  oEl.innerHTML = '';
  rEl.textContent = '';
  nBtn.disabled = true;
  nBtn.onclick = () => { qIdx++; renderQ(); };

  const saved = ans[qIdx];
  const shuffledOpts = shuffle([...item.opts]);
  shuffledOpts.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt.label;
    if (saved && saved.label === opt.label) { btn.classList.add('selected'); nBtn.disabled = false; }
    btn.addEventListener('click', () => {
      oEl.querySelectorAll('button').forEach(b => {
        if (b.classList.contains('selected')) {
          const old = item.opts.find(o => o.label === b.textContent);
          if (old) votes[old.car]--;
        }
        b.classList.remove('selected');
      });
      btn.classList.add('selected');
      votes[opt.car]++;
      ans[qIdx] = opt;
      nBtn.disabled = false;
    });
    oEl.appendChild(btn);
  });
}

renderQ();
