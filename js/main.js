import { buttonData, menu } from "./db.js";
import { calculatePrice, elements } from "./helper.js";

//! Fonksiyonlar

const searchCategory = (e) => {
  //* Tıklanılan butonun data özelliklerine eriştik ve değişkene aktardık.
  const category = e.target.dataset.category;
  //* Dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile eşleşirse bu ürünleri getir.
  const filtredMenu = menu.filter((item) => item.category === category);

  //* Tıklanılan butonun kategorisi "all" ise renderMenuItems fonksiyonunu çalıştır ve paremetre olarak bütün menüyü gönder.
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    renderMenuItems(filtredMenu);
  }
  renderButtons(category);
};

const renderMenuItems = (menuItems) => {
  //* Gönderilen verileri dönüp her bir veri için bir a etiketi oluştur.
  let menuHTML = menuItems.map(
    (item) => `
    <a
        id="card"
        class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
        href="./productDetail.html?id=${item.id}&category=${
      item.category
    }&price=${calculatePrice(item.price)}"
    >
        <img src="${item.img}" alt="" class="rounded shadow" />
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)} ₺</p>
          </div>
          <p class="lead">
            ${item.desc}
          </p>
        </div>
    </a>

    `
  );

  menuHTML = menuHTML.join("");

  //* Oluşturulan menuHTML değişkenini ekrana aktardım.
  elements.menuArea.innerHTML = menuHTML;
};

const renderButtons = (active) => {
  elements.buttonsArea.innerHTML = "";
  buttonData.forEach((btn) => {
    //* Her bir veri için bir HTML "button etiketi oluşturur."
    const buttonElements = document.createElement("button");
    //* Butonlara class ekledim.
    buttonElements.className = "btn btn-outline-dark filter-btn";
    //* Butonun içerisine döndüğümüz verilerden text'i ekledim.
    buttonElements.textContent = btn.text;
    //* Butonun hangi kategoride olduğunu ekledim
    buttonElements.dataset.category = btn.value;

    if (btn.value === active) {
      buttonElements.classList.add("bg-dark", "text-light");
    }

    //* HTML'e gönderdim.
    elements.buttonsArea.appendChild(buttonElements);
  });
};

//! Olay izleyicileri

//* Sayfa yükelendiği anda renderMenuItems fonksiyonunu çalıştır ve menu parametresini gönder.
// document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
// document.addEventListener("DOMContentLoaded",renderButtons())

document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(menu);
  renderButtons("all");
});

elements.buttonsArea.addEventListener("click", searchCategory);
