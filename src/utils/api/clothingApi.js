import { _checkResponse, catchError } from "../checkers";

export default function clothingApi(url) {
  function fetchClothingItems() {
    return fetch(`${url}/items`).then(_checkResponse).catch(catchError);
  }

  function addClothingItem(item) {
    return fetch(`${url}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(item),
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function deleteClothingItem(id) {
    return fetch(`${url}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({ _id: id }),
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function like(id) {
    return fetch(`${url}/items/${id}/likes`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  function dislike(id) {
    return fetch(`${url}/items/${id}/likes`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(_checkResponse)
      .catch(catchError);
  }

  return {
    fetchClothingItems,
    addClothingItem,
    deleteClothingItem,
    like,
    dislike,
  };
}
