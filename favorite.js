// ================================
// お気に入り機能
// ================================

function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function isFavorite(name) {
    return getFavorites().some(store => store.name === name);
}

function addFavorite(store) {

    const favorites = getFavorites();

    if (!isFavorite(store.name)) {
        favorites.push(store);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        alert(store.name + " をお気に入りに追加しました");
    }
}

function removeFavorite(name) {

    const favorites = getFavorites().filter(
        store => store.name !== name
    );

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );

    alert(name + " をお気に入りから削除しました");
}

console.log("favorite.js 読み込み完了");