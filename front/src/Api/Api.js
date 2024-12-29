import { API_URL } from './constants.js'

const authKeyName = "user";

function getDefaultHeaders() {
    return {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem(authKeyName),
    };
}

export async function getAllUsers() {
    const response = await fetch(API_URL + '/users/', {
        headers: getDefaultHeaders(),
    })
    if (response.ok) {
        return await response.json();
    }
    throw Error("Failed to getAllUsers().");
}

export async function deleteUserRequest(id) {
    const response = await fetch(API_URL + `/users/${id}`, {
        headers: getDefaultHeaders(),
        method: 'DELETE',
    })
}

export async function blockUserRequest(id) {
    const response = await fetch(API_URL + `/users/${id}/block`, {
        headers: getDefaultHeaders(),
        method: 'POST',
    })
}

export async function unblockUserRequest(id) {
    const response = await fetch(API_URL + `/users/${id}/unblock`, {
        headers: getDefaultHeaders(),
        method: 'POST'
    })
}

export async function makeAdminRequest(id) {
    const response = await fetch(API_URL + `/users/${id}/grant`, {
        headers: getDefaultHeaders(),
        method: 'POST'
    })
}

export async function makeUserRequest(id) {
    const response = await fetch(API_URL + `/users/${id}/revoke`, {
        headers: getDefaultHeaders(),
        method: 'POST'
    })
}

// export async function registerRequest() {
//     const request = {
//         email: email,
//         password: password
//     }
//     const response = await fetch(API_URL + '/login', {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(request)
//     })
//     if (response.ok) {
//         const user = await response.json();
//         const encrypted = btoa(request.email + ':' + request.password);
//         localStorage.setItem('user', `Basic ${encrypted}`)
//         localStorage.setItem('current-user', JSON.stringify(user))
//         setUser(user)
//         navigate('/templates')
//     } else {
//         const json = await response.json();
//         console.log(json.message)
//     }
// }


export async function loginRequest(request) {
    const response = await fetch(API_URL + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })

    if (response.ok) {
        return await response.json();
    } else {
        const json = await response.json();
        throw new Error(json);
    }
}

export async function registerRequest(request) {
    const response = await fetch(API_URL + '/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request)
    })

    if (response.ok) {
        return await response.json();
    } else {
        const json = await response.json();
        throw new Error(json);
    }
}



export async function createTemplate(payload) {
    const response = await fetch(API_URL + '/templates/', {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        return;
    }

    throw Error("Failed to createTemplate().");
}

export async function updateTemplate(id, payload) {
    const response = await fetch(API_URL + '/templates/' + id, {
        method: "PATCH",
        headers: getDefaultHeaders(),
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
        headers: getDefaultHeaders()
    })

    if (response.ok) {
        return response.json();
    }

    throw Error("Failed to getTemplate().");
}

export async function deleteTemplate(id) {
    const response = await fetch(API_URL + '/templates/' + id, {
        method: "DELETE",
        headers: getDefaultHeaders()
    })

    if (response.ok) {
        return;
    }

    throw Error("Failed to deleteTemplate().");
}

export async function getAllTemplates() {
    const response = await fetch(API_URL + '/templates/', {
        headers: getDefaultHeaders(),
    })
    if (response.ok) {
        return await response.json();
    }
    throw Error("Failed to getAllTempaltes().")
}

export async function saveResponse(templateId, model) {
    const response = await fetch(API_URL + '/templates/' + templateId + '/answers', {
        method: "POST",
        headers: getDefaultHeaders(),
        body: JSON.stringify(model)
    })

    if (response.ok) {
        return;
    }

    throw Error("Failed to saveResponse().");
}


export async function getAnswer(templateId, answerId) {
    const response = await fetch(API_URL + `/templates/${templateId}/answers/${answerId}`, {
        method: "GET",
        headers: getDefaultHeaders()
    })

    if (response.ok) {
        return response.json();
    }

    throw Error("Failed to getAnswer().");

}