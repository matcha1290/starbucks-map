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
            alert("地図を表示します");
        }


        if (page === "search") {
            alert("検索機能は準備中です");
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


console.log("Starbucks Map 起動");
alert("app.js確認");
// 店舗ピン表示
// 店舗データ読み込み

fetch("stores.json")
    .then(response => response.json())
    .then(stores => {

        stores.forEach(store => {

            L.marker([store.lat, store.lng])
                .addTo(map)
                .bindPopup(
                    `
                    <b>${store.name}</b><br>
                    ${store.address}
                    `
                );

        });

    });