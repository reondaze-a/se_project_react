import { _checkResponse, catchError } from "./constants";

export default function clothingApi(url) {
  function fetchClothingItems() {
    return fetch(`${url}/items`).then(_checkResponse);
  }

  function addClothingItem(item) {
    return fetch(`${url}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then(_checkResponse);
  }

  function deleteClothingItem(id) {
    return fetch(`${url}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    }).then(_checkResponse);
  }

  return { fetchClothingItems, addClothingItem, deleteClothingItem };
}
