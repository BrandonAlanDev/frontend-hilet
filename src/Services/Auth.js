import { POST } from "/fetch.js";

export const Auth = async (dni, password) => {
    try {
        const response = POST("AuthController/Login", { dni, password });
        if (response) {
            return response;
        }
        throw new Error("No se recibio respuesta");
    }
    catch (error) {
        console.error("Error al autenticarse con la api: ",error);
        throw error;
    }
}
