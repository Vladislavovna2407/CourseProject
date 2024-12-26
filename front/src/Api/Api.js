import { API_URL } from './constants.js'

const authKeyName = "user";

function GetDefaultHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem(authKeyName),
  };
}

export async function createTemplate(payload) {
  const response = await fetch(API_URL + '/templates', {
    method: "POST",
    headers: GetDefaultHeaders(),
    body: payload
  })

  if (response.ok) {
    return;
  }

  throw Error("Failed to createTemplate().");
}

export async function getTemplate(id) {
  const response = await fetch(API_URL + '/templates/' + id, {
    method: "GET",
    headers: GetDefaultHeaders()
  })

  if (response.ok) {
    return response.json();
  }

  throw Error("Failed to getTemplate().");
}