import { menu } from "./db.js";
import { calculatePrice, elements } from "./helper.js";

// * URL'deki parametreleri yönetebilmek için URLSearchParams class'ından örnek oluşturduk.
//* Örneği oluştururken kendi URL'mizdeki parametreleri gönderdik.

const search = window.location.search;
const searchParams = new URLSearchParams(search);
//* get metoduna gönderdiğimiz değişkene göre değere ulaştık.
const paramId = searchParams.get("id");
//* URL'den alınan paramId değişkenini number a çevirdik ve sonrasında bu id'li elemanı dizi içerisinde bulup değişkene aktardık.
const product = menu.find((item) => item.id === Number(paramId));

elements.outlet.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <a href="./index.html">
            <i class="bi bi-house"></i>
        </a>
        <div>anasayfa / ${
          product.category
        } / ${product.title.toLowerCase()}</div>
    </div>
    <h1 class="text-center shadow p-2 rounded">${product.title}</h1>
    <div class="d-flex justify-content-center align-items-center">
        <img
        class="rounded"
        src="${product.img}"
        alt=""
        style="max-width: 480px"
        />
    </div>
    <div>
        <h3 class="my-5">
            Ürünün Kategorisi: <span class="text-success"> ${
              product.category
            }</span>
        </h3>
        <h3>Ürünün Fiyatı: <span class="text-success">${calculatePrice(
          product.price
        )} ₺</span></h3>
    </div>
    <p class="lead fs-3">
        ${product.desc}
    </p>
`;
