const tokenKey = "token";
const userKey = "user";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  const token = getFromStorage(tokenKey);
  return token;
}

export function saveUser(user) {
  saveToStorage(userKey, JSON.stringify(user));
}

export function getUsername() {
  const user = JSON.parse(getFromStorage(userKey));

  if (user) {
    return user.username;
  }

  return null;
}

export function clearStorage() {
  localStorage.clear();
}

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }
  return value;
}
