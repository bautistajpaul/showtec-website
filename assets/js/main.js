console.log('Showtec site loaded');

//-------------------------PAGE TRANSITION-------------------------
// Fade IN when page loads
window.addEventListener("load", () => {
document.body.classList.add("loaded");
});

// Fade OUT when clicking links
document.querySelectorAll("a").forEach(link => {
  const href = link.getAttribute("href");

  // Skip empty, anchors, or JS-trigger links
  if (!href || href.startsWith("#") || link.hasAttribute("data-bs-toggle")) {
    return;
  }

  // Only internal links
  if (link.hostname === window.location.hostname) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      document.body.classList.remove("loaded");

      setTimeout(() => {
        window.location.href = this.href;
      }, 300);
    });
  }
});

//-------------------------NAV BAR-------------------------
// adding active class
  const links = document.querySelectorAll(".nav-link");
  const currentPage = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });


//-------------------------TOP PRODUCTS-------------------------
// Populating of cards using Gsheets

// Conversion of GDrive links
function convertDriveLink(url) {
  if (!url) return "";

  try {
    let fileId = "";

    if (url.includes("/file/d/")) {
      fileId = url.split("/file/d/")[1].split("/")[0];
    } else if (url.includes("id=")) {
      fileId = url.split("id=")[1].split("&")[0];
    }

    if (fileId) {
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }

    return url;
  } catch (e) {
    return url;
  }
}

// Google sheets URL
// Replace it if new sheets are available
const sheetURL = "https://opensheet.elk.sh/148K--UV1_TTK-2h19iAWavnvIXypVv_Vhz1MdKp6mrg/top-products";

fetch(sheetURL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    data.forEach(product => {

      const imgSrc = convertDriveLink(product.image);

      console.log("ORIGINAL:", product.image);
      console.log("CONVERTED:", imgSrc);

      const card = `
        <div class="col-lg-3 col-md-6">
          <div class="product-card">

            <div class="product-image">
              <img src="${imgSrc}" 
                onerror="this.onerror=null; this.src='https://via.placeholder.com/300x300?text=No+Image';" 
                alt="">
            </div>

            <div class="product-info">
              <p class="product-title">${product.title}</p>
            </div>

            <div class="product-actions">

              <a href="${product.lazada}" target="_blank" class="btn-custom btn-secondary-custom btn-shop">
                <img src="assets/icons/lazada-white.svg" class="btn-icon-img" alt="">
                <span>ORDER AT LAZADA</span>
              </a>

              <a href="${product.shopee}" target="_blank" class="btn-custom btn-secondary-custom btn-shop">
                <img src="assets/icons/shopee-white.svg" class="btn-icon-img" alt="">
                <span>ORDER AT SHOPEE</span>
              </a>

            </div>

          </div>
        </div>
      `;

      container.innerHTML += card;
    });
  })
  .catch(err => console.error(err));

//--------------------------------------------------------------
//-------------------------MA LIGHTNING-------------------------

//-------------------------Card Section-------------------------
function setupCardBehavior() {

  const isMobile = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  document.querySelectorAll('.custom-card').forEach(card => {

    // 🔥 remove old listeners by cloning
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);

    if (!isMobile) {
      // DESKTOP → HOVER
      newCard.addEventListener('mouseenter', () => {
        newCard.classList.add('active');
      });

      newCard.addEventListener('mouseleave', () => {
        newCard.classList.remove('active');
      });

    } else {
      // MOBILE → CLICK
      newCard.addEventListener('click', (e) => {

        document.querySelectorAll('.custom-card').forEach(c => {
          if (c !== newCard) c.classList.remove('active');
        });

        newCard.classList.toggle('active');

        e.stopPropagation();
      });
    }
  });

  // OUTSIDE CLICK (mobile only)
  if (isMobile) {
    document.addEventListener('click', () => {
      document.querySelectorAll('.custom-card').forEach(card => {
        card.classList.remove('active');
      });
    });
  }
}

//run on load
setupCardBehavior();

//run on resize (NO REFRESH NEEDED)
window.addEventListener('resize', () => {
  setupCardBehavior();
});