export default function clothingApi(url) {

    function _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    }

    function fetchClothingItems() {
        return fetch(`${url}/items`).then(_checkResponse)
    }

    function addClothingItem(item) {
        return fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(checkResponse);
    }

    function deleteClothingItem(id) {
        return fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: id })
        }).then(checkResponse);
    }

    return {fetchClothingItems, addClothingItem, deleteClothingItem}
}