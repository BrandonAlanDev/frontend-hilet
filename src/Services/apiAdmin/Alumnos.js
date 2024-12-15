import { POST, GET, PATCH, DELETE } from "../../Services/fetch";
import { backendurl } from "../../env";

export async function GetAllAlumnos() {
    const token = sessionStorage.getItem('jwtToken'); // Obtener el token JWT
    const fullUrl = `${backendurl}UsuarioController/GetAlumnos`; // URL del endpoint

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json',
            },
        });

        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al obtener los alumnos.');
        }

        // Parsear la respuesta JSON
        const result = await response.json();
        // Obtener el arreglo de alumnos
        const alumnos = result.ALUMNOS || [];

        return alumnos;

    } catch (err) {
        console.error('Error en la solicitud:', err.message);
        throw err;
    }
}

export async function CreateAlumno(alumnoData) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}UsuarioController/Create`;

    return await fetch(fullUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(alumnoData)
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
        console.error('Error en la solicitud: ', err.message);
        window.alert(err.message); 
        throw err; // Lanza el error para manejarlo en el lugar donde se llama a CreateAlumno
    });
}
