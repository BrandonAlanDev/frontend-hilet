import { POST,GET,PATCH,DELETE } from "./fetch.js";
import { backendurl } from "../env.jsx";

export async function UpdateCorreo(uid, correo) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}UsuarioController/UpdateCorreo`;

    try {
        const response = await fetch(fullUrl, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uid,
                new_correo: correo,
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return {
                success: false,
                message: errorResponse.message || 'Error en la solicitud.',
            };
        }

        const result = await response.json();
        return {
            success: true,
            message: result.message || 'Correo actualizado con éxito.',
        };
    } catch (err) {
        console.error('Error en la solicitud:', err.message);
        return {
            success: false,
            message: err.message || 'Error inesperado en la solicitud.',
        };
    }
}



export async function UpdatePassword(uid, password) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}UsuarioController/UpdatePassword`;

    try {
        const response = await fetch(fullUrl, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: uid,
                new_password: password,
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            return {
                success: false,
                message: errorResponse.message || 'Error en la solicitud.',
            };
        }

        const result = await response.json();
        return {
            success: true,
            message: result.message || 'Contraseña actualizada con éxito.',
        };
    } catch (err) {
        console.error('Error en la solicitud:', err.message);
        return {
            success: false,
            message: err.message || 'Error inesperado en la solicitud.',
        };
    }
}

export async function FetchMaterias(id_alumno) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}UsuarioController/GetMaterias?idAlumno=${id_alumno}`;

    try {
        const response = await fetch(fullUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || 'Error al obtener materias.');
        }

        const result = await response.json();
        return result.data || [];

    } catch (err) {
        console.error('Error en la solicitud:', err.message);
        throw err;
    }
}








