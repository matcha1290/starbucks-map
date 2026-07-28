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



// ポップアップ作成

function createPopup(store) {

    return `
        <b>${store.name}</b><br>
        📍${store.address}<br>
        🕒${store.hours}<br>
        🚗ドライブスルー：${store.driveThrough ? "あり" : "なし"}<br>
        🏢タイプ：${store.type}<br><br>

        <button onclick='addFavorite(${JSON.stringify(store)})'>
        ⭐ お気に入り追加
        </button>
        <br><br>

        <a 
        href="https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}"
        target="_blank">
        🗺️ Googleマップで案内
        </a>
    `;

}



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



console.log("map.js 読み込み完了");