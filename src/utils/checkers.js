const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((data) => {
    return Promise.reject(
      new Error(data.message || "Something went wrong, please try again later.")
    );
  });
};

const catchError = (err) => {
  if (err.message === "Failed to fetch") {
    throw new Error("Network error, please try again later.");
  }
  throw err;
};

const isFormComplete = (form) => {
  return Object.values(form).every((val) => val.trim() !== "");
};

export { _checkResponse, catchError, isFormComplete };