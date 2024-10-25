import { POST, GET, PATCH, DELETE } from "../fetch";

/*-----------------------------------------------CARRERAS---------------------------------------------*/
export const PostCarrera = async (nombre) => {
    try {
        const response = await POST("CarrerasController/Create", { nombre });
        if (response) {
            return response;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer POST a carrera:", error);
        throw error;
    }
};

export const GetAllCarreras = async () => {
    try {
        const response = await GET(`CarrerasController/Get`);
        if (response) {
            return response;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer GET a carreras:", error);
        throw error;
    }
};

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

export const PutCarrera = async (id, nombre) => {
    try {
        const response = await PATCH(`CarrerasController/Update/${id}`, { nombre });
        if (response) {
            return response;
        }
        throw new Error("No se recibió respuesta");
    } catch (error) {
        console.error("Error al hacer PUT a carrera:", error);
        throw error;
    }
};

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
