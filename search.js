// ================================
// 検索機能
// ================================

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const resultArea = document.getElementById("search-result");

function searchStores() {

    const keyword = searchInput.value.trim();

    resultArea.innerHTML = "";

    if (keyword === "") {
        return;
    }

    const result = stores.filter(store => {

        return (
            store.name.includes(keyword) ||
            store.address.includes(keyword) ||
            store.prefecture.includes(keyword)
        );

    });

    if (result.length === 0) {

        resultArea.innerHTML = `
            <p>該当する店舗はありません。</p>
        `;

        return;

    }

    result.forEach(store => {

        resultArea.innerHTML += `

            <div class="store-result"
                 data-name="${store.name}">

                <b>${store.name}</b><br>
                📍${store.address}<br>
                🕒${store.hours}

                <hr>

            </div>

        `;

    });

}



// 検索ボタン

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

        const target = event.target.closest(".store-result");

        if (!target) {
            return;
        }

        const name = target.dataset.name;

        const store = stores.find(
            s => s.name === name
        );

        if (!store) {
            return;
        }

        // 地図へ戻る

        document.getElementById("map").style.display = "block";
        document.getElementById("search-page").style.display = "none";

        // 地図移動

        map.setView(
            [store.lat, store.lng],
            16
        );

        // ポップアップ

        store.marker
            .bindPopup(createPopup(store))
            .openPopup();

    }
);

console.log("search.js 読み込み完了");