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
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    return;
  }

  throw Error("Failed to createTemplate().");
}

export async function updateTemplate(id, payload){
  const response = await fetch(API_URL + '/templates/' + id, {
    method: "PATCH",
    headers: GetDefaultHeaders(),
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    return;
  }

  throw Error("Failed to updateTemplate().");
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

export async function deleteTemplate(id){
  const response = await fetch(API_URL + '/templates/' + id, {
    method: "DELETE",
    headers: GetDefaultHeaders()
  })

  if (response.ok) {
    return;
  }

  throw Error("Failed to deleteTemplate().");
}

export async function saveResponse(templateId, model) {
  const response = await fetch(API_URL + '/templates/' + templateId + '/answers', {
    method: "POST",
    headers: GetDefaultHeaders(),
    body: JSON.stringify(model)
  })

  if (response.ok) {
    return;
  }

  throw Error("Failed to saveResponse().");
}

export async function getAllTemplates() {
  const response = await fetch(API_URL + '/templates', {
    headers: GetDefaultHeaders(),
  })
  if (response.ok) {
    return await response.json();
  }
  throw Error("Failed to getAllTempaltes().")
}

export async function getAnswer(templateId, answerId) {
  const response = await fetch(API_URL + `/templates/${templateId}/answers/${answerId}`, {
    method: "GET",
    headers: GetDefaultHeaders()
  })

  if (response.ok) {
    return response.json();
  }

  throw Error("Failed to getAnswer().");
}