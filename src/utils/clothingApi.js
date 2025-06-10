import weatherApi from "./weatherApi";

const checkResponse = weatherApi()._checkResponse;

export default function clothingApi(url) {

    function fetchClothingItems() {
        return fetch(`${url}/items`).then(checkResponse)
    }

    function addClothingItem(item) {
        return fetch(`${url}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(checkResponse);
    }

    function deleteClothingItem(id) {
        return fetch(`${url}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).then(checkResponse);
    }

    return {fetchClothingItems, addClothingItem, deleteClothingItem}
}