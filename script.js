 const images = [
    { id: 10,  title: "Forest Path",       cat: "nature" },
    { id: 28,  title: "Misty Valley",      cat: "nature" },
    { id: 15,  title: "Alpine Lake",       cat: "nature" },
    { id: 37,  title: "Golden Field",      cat: "nature" },
    { id: 164, title: "Downtown Lines",    cat: "urban" },
    { id: 180, title: "Night Skyline",     cat: "urban" },
    { id: 190, title: "Concrete & Glass",  cat: "urban" },
    { id: 208, title: "Street Corner",     cat: "urban" },
    { id: 40,  title: "By the Shore",      cat: "wildlife" },
    { id: 58,  title: "Quiet Pond",        cat: "wildlife" },
    { id: 219, title: "Open Sky",          cat: "wildlife" },
    { id: 237, title: "Deep Woods",        cat: "wildlife" },
  ];

  const gallery = document.getElementById('gallery');
  const filters = document.getElementById('filters');
  let currentFilter = 'all';
  let currentIndex = 0;
  let visibleList = images;

  function imgUrl(item, w, h){
    return `https://picsum.photos/id/${item.id}/${w}/${h}`;
  }

  function renderGallery(){
    visibleList = currentFilter === 'all'
      ? images
      : images.filter(i => i.cat === currentFilter);

    gallery.innerHTML = '';
    visibleList.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.animationDelay = (idx * 0.05) + 's';
      card.innerHTML = `
        <img src="${imgUrl(item, 500, 380)}" alt="${item.title}" loading="lazy">
        <div class="card-overlay">
          <span class="cat">${item.cat}</span>
          <span class="title">${item.title}</span>
        </div>
        <div class="card-overlay zoom-hint" style="opacity:1;background:none;">
          <span style="position:absolute;top:0;right:0;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;">&#128269;</span>
        </div>
      `;
      card.addEventListener('click', () => openLightbox(idx));
      gallery.appendChild(card);
    });
  }

  filters.addEventListener('click', (e) => {
    if(!e.target.classList.contains('filter-btn')) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderGallery();
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImage = document.getElementById('lbImage');
  const lbTitle = document.getElementById('lbTitle');
  const lbCat = document.getElementById('lbCat');

  function openLightbox(idx){
    currentIndex = idx;
    updateLightbox();
    lightbox.classList.add('open');
  }

  function updateLightbox(){
    const item = visibleList[currentIndex];
    lbImage.style.opacity = 0;
    setTimeout(() => {
      lbImage.src = imgUrl(item, 1000, 700);
      lbImage.style.opacity = 1;
    }, 120);
    lbTitle.textContent = item.title;
    lbCat.textContent = item.cat;
  }

  function closeLightbox(){
    lightbox.classList.remove('open');
  }

  function nextImage(){
    currentIndex = (currentIndex + 1) % visibleList.length;
    updateLightbox();
  }

  function prevImage(){
    currentIndex = (currentIndex - 1 + visibleList.length) % visibleList.length;
    updateLightbox();
  }

  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  document.getElementById('lbNext').addEventListener('click', nextImage);
  document.getElementById('lbPrev').addEventListener('click', prevImage);

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if(!lightbox.classList.contains('open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') nextImage();
    if(e.key === 'ArrowLeft') prevImage();
  });

  renderGallery();