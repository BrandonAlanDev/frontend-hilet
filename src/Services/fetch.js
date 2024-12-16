import { backendurl } from "../env.jsx";

export async function POST(url, data) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = backendurl + url;

    return await fetch(fullUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('La respuesta no es un JSON válido');
        }
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || 'Error en la solicitud');
        }
        return result;
    })
    .catch((err) => {
        console.log('Error en la solicitud: ', err.message);
        window.alert(err.message); 
        throw err; // Asegúrate de lanzar el error de nuevo para manejarlo en el lugar donde se llama a POST
    });
};

export async function GET(url) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = backendurl + url;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Parsear el JSON correctamente
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error en la solicitud GET:", error);
        throw error; // Lanzar el error para manejarlo en el catch del que llama a la función
    }
}


export async function PATCH(url, data) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = backendurl + url;
    return await fetch(fullUrl, {
        method: 'PATCH', mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }, body: JSON.stringify(data)
    })
    .then(async (res) => {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new Error('La respuesta no es un JSON válido');
        }
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.message || 'Error en la solicitud');
        }
        return result;})
        .catch((err) => {
            console.log('Error en la solicitud: ', err.message);
        window.alert(err.message); throw err;
    });
}

export async function DELETE(url, data){
    const objString = '?' + new URLSearchParams(data).toString();
    const token = sessionStorage.getItem('jwtToken');
    return await fetch(backendurl + url + objString, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${token}`
        },
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => console.log(err));
}

export async function POSTU(url, file){
    const token = sessionStorage.getItem('jwtToken');
    let data = new FormData();
    data.append('file', file);

    return await fetch(backendurl + url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => { console.log(err)});
}