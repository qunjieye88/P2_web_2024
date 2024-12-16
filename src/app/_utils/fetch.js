
export function GetData(path, token, json) {
    const dato = fetch(path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json', Authorization: `Bearer ${token}`
        },
        body: json
    }).then(respuesta => respuesta.json())
        .then(dato => {
            if (dato) {
                return dato;
            }
        })
    return dato;
}


export function fetchUtil(path, method, body) {
    const headers = {};

    if (path.includes("pdf")) {
        headers["Content-Type"] = "application/pdf";
    }
    if (!(body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
    }

    const result = fetch(path, {
        method: method,
        headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: body,
    })
        .then((respuesta) => {
            if (path.includes("pdf")) {
                return respuesta
            }
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
        })
        .then((dato) => {
            return dato;
        })
        .catch((error) => {
            return error;
        });
    return result;
}

export function deleteData(path, token) {
    const dato = fetch(path, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    }).then(respuesta => respuesta.json())
        .then(data => {
            if (data) {
                return true
            } else {
                return false
            }
        })

    return dato;
}




export function updateData(path, token, json) {
    const dato = fetch(path, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(json),
    }).then(respuesta => respuesta.json())
        .then(dato => {
            if (dato) {
                return true
            } else {
                return false
            }
        }
        )
    return dato
}

export function createJson(data, keys) {
    const json = {};
    keys.forEach((field) => {
        if (field === "street") {
            json["address"] = {}
            json["address"][field] = data[field];
        } else {
            json[field] = data[field];
        }
    });

    return json
}
