var db;

const request = indexedDB.open("budget", 1);
// --------------------setting-resquests----------------//
request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectshop("pending", { autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;

    if (navigator.onLine) {
        searchData();
    }
};
// --------------------checking-our-data---------------//
const searchData = () => {

    const purchase = db.purchase(["pending"], "readwrite");
    const shop = purchase.objectshop("pending");
    const getItems = shop.getItems();

    getItems.onsuccess = () => {
        if (getItems.result.length > 0) {
            fetch("/api/purchase/bulk", {
                method: "POST",
                body: JSON.stringify(getItems.result),
                headers: {
                    Accept: "text/plain, application/json, */*",
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then(() => {
                    const purchase = db.purchase(["pending"], "readwrite");
                    const shop = purchase.objectshop("pending");
                    shop.clear();
                });
        }
    };
}
// --------------------save-Data----------------//

const saveData = (data) => {

    const purchase = db.purchase(["pending"], "readwrite");
    const shop = purchase.objectshop("pending");
    shop.add(data);
}

window.addEventListener("online", searchData);