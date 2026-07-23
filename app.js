// 地図作成

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



// 店舗データ

let stores = [];



// 店舗読み込み

fetch("stores.json")
    .then(response => response.json())
    .then(data => {

        stores = data;


        stores.forEach(store => {

            L.marker([store.lat, store.lng])
                .addTo(map)
                .bindPopup(createPopup(store));

        });

    });



// ポップアップ作成

function createPopup(store) {

    return `
        <b>${store.name}</b><br>
        📍${store.address}<br>
        🕒${store.hours}<br>
        🚗ドライブスルー：${store.driveThrough ? "あり" : "なし"}<br>
        🏢タイプ：${store.type}<br><br>

        <a 
        href="https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}"
        target="_blank">
        🗺️ Googleマップで案内
        </a>
    `;

}



// ページ切替

const navItems = document.querySelectorAll(".nav-item");

const mapPage = document.getElementById("map");
const searchPage = document.getElementById("search-page");


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const page = item.dataset.page;


        if (page === "map") {

            mapPage.style.display = "block";
            searchPage.style.display = "none";

        }


        if (page === "search") {

            mapPage.style.display = "none";
            searchPage.style.display = "block";

        }


        if (page === "favorite") {

            alert("お気に入り機能は準備中です");

        }


        if (page === "stats") {

            alert("統計機能は準備中です");

        }


        if (page === "settings") {

            alert("設定画面は準備中です");

        }

    });

});



// 検索処理

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultArea = document.getElementById("search-result");



function searchStores() {


    const keyword = searchInput.value;


    const result = stores.filter(store => {

        return (
            store.name.includes(keyword) ||
            store.address.includes(keyword) ||
            store.prefecture.includes(keyword)
        );

    });



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



// ボタン検索

searchButton.addEventListener(
    "click",
    searchStores
);



// Enter検索

searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            searchStores();

        }

    }
);



// 検索結果クリック

resultArea.addEventListener(
    "click",
    (event) => {


        const target =
            event.target.closest(".store-result");


        if (!target) {
            return;
        }



        const index = target.dataset.index;


        const store = stores[index];



        // 地図へ戻る

        mapPage.style.display = "block";
        searchPage.style.display = "none";



        // 移動

        map.setView(
            [store.lat, store.lng],
            16
        );



        // 表示

        L.popup()
            .setLatLng(
                [store.lat, store.lng]
            )
            .setContent(
                createPopup(store)
            )
            .openOn(map);


    }
);



console.log("Starbucks Map 起動");