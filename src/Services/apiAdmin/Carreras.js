import { POST, GET, PATCH, DELETE } from "../fetch";
import { backendurl } from "../../env.jsx";

/*-----------------------------------------------CARRERAS---------------------------------------------*/

export async function GetAllCarreras() {
    return await GET('CarrerasController/Get');
}


export async function CreateCarrera(nombreCarrera) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}CarrerasController/Create?nombreCarrera=${encodeURIComponent(nombreCarrera)}`;

    return await fetch(fullUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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
        throw err; // Asegúrate de lanzar el error de nuevo para manejarlo en el lugar donde se llama a CreateCarrera
    });
}


export const GetCarrera = async (id) => {
    try {
        const response = await GET(`CarrerasController/Get/${id}`);
        if (response) {
            return response;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer GET a carrera:", error);
        throw error;
    }
};

export const GetCarrerasActivas = async () => {
    try {
        const response = await GET(`CarrerasController/GetCarrerasActivas`);
        if (response.data) {
            return response.data;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer GET a carrera:", error);
        throw error;
    }
};
export const GetResolucionesActivas = async () => {
    try {
        const response = await GET(`ResolucionController/GetResolucionesActivas`);
        if (response.data) {
            return response.data;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer GET a resolucion:", error);
        throw error;
    }
};

export async function DeleteCarrera(id_carrera) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}CarrerasController/Delete?id_carrera=${id_carrera}&nombre_carrera=a&estado_carrera=1`;

    return await fetch(fullUrl, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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
        throw err; // Asegúrate de lanzar el error de nuevo para manejarlo en el lugar donde se llama a DeleteCarrera
    });
}


export async function UpdateCarrera(id_carrera, nombre_carrera) {
    const token = sessionStorage.getItem('jwtToken');
    const fullUrl = `${backendurl}CarrerasController/Update?id_carrera=${encodeURIComponent(id_carrera)}&nombre_carrera=${encodeURIComponent(nombre_carrera)}&estado_carrera=1`;

    return await fetch(fullUrl, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Authorization': `Bearer ${token}`
        }
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
        throw err;
    });
}

/*export const DeleteCarrera = async (id) => {
    try {
        const response = await DELETE(`CarrerasController/Delete/${id}`);
        if (response) {
            return response;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer DELETE a carrera:", error);
        throw error;
    }
};
*/
