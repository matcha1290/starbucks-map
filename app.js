const map = L.map('map').setView([35.681236, 139.767125], 6);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// 現在地表示
if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;


            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("📍現在地")
                .openPopup();


            map.setView([lat, lng], 15);

        }
    );

}



// 下部メニュー

const navItems = document.querySelectorAll(".nav-item");


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;


        if (page === "map") {

    document.getElementById("map").style.display = "block";

    document.getElementById("search-page").style.display = "none";

}


       if (page === "search") {

    document.getElementById("map").style.display = "none";

    document.getElementById("search-page").style.display = "block";

}


        if (page === "favorite") {
            alert("お気に入り機能は準備中です");
        }


        if (page === "stats") {
            alert("統計機能は準備中です");
        }


        if (page === "search") {

    document.getElementById("map").style.display = "none";

    document.getElementById("search-page").style.display = "block";

}

    });

});


console.log("Starbucks Map 起動");
alert("app.js確認");
// 店舗ピン表示
// 店舗データ読み込み

let stores = [];

fetch("stores.json")
    .then(response => response.json())
    .then(data => {

        stores = data;

        stores.forEach(store => {

            L.marker([store.lat, store.lng])
                .addTo(map)
                .bindPopup(
                    `
                    <b>${store.name}</b><br>
                    📍${store.address}<br>
                    🕒${store.hours}<br>
                    🚗ドライブスルー：${store.driveThrough ? "あり" : "なし"}<br>
                    🏢タイプ：${store.type}
                    `
                );

        });

    });
// 店舗検索機能

const searchButton = document.getElementById("search-button");

function searchStores() {

    const keyword = document
        .getElementById("search-input")
        .value;


    const result = stores.filter(store => {

        return (
            store.name.includes(keyword) ||
            store.address.includes(keyword) ||
            store.prefecture.includes(keyword)
        );

    });


    const resultArea = document.getElementById("search-result");

    resultArea.innerHTML = "";


   result.forEach((store, index) => {

    resultArea.innerHTML += `
        <div class="store-result" data-index="${index}">
            <b>${store.name}</b><br>
            📍${store.address}<br>
            🕒${store.hours}
            <hr>
        </div>
    `;

});
}


// 検索ボタン
searchButton.addEventListener("click", searchStores);


// Enterキーでも検索
document
    .getElementById("search-input")
    .addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            searchStores();
        }

    });
    // 検索結果クリック

document
    .getElementById("search-result")
    .addEventListener("click", (event) => {

        const target = event.target.closest(".store-result");

        if (!target) {
            return;
        }


        const index = target.dataset.index;

        const store = stores[index];

// 地図画面へ戻る

document.getElementById("map").style.display = "block";
document.getElementById("search-page").style.display = "none";


// 店舗位置へ移動

map.setView(
    [store.lat, store.lng],
    16
);


// ポップアップ表示

L.popup()
    .setLatLng([store.lat, store.lng])
    .setContent(
        `
        <b>${store.name}</b><br>
        📍${store.address}<br>
        🕒${store.hours}<br>
        🚗ドライブスルー：${store.driveThrough ? "あり" : "なし"}
        `
    )
    .openOn(map);

    });