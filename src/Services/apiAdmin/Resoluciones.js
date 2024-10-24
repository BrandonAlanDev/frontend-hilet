import { POST, GET, PATCH, DELETE } from "../Services/fetch";

export const PostResolucion = async (nombre,resolucion,year) => {
  try {
    const response = await POST("ResolucionController/Create", { nombre,resolucion,year });
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer POST a resolución:", error);
    throw error;
  }
};

export const GetTodasLasResoluciones = async () => {
  try {
    const response = await GET(`ResolucionController/Get`);
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer GET a resolución:", error);
    throw error;
  }
};

/*export const PutResolucion = async (id, nombre) => {
  try {
    const response = await PATCH(`resolucion/${id}`, { nombre });
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer PUT a resolución:", error);
    throw error;
  }
};
*/

/*export const DeleteResolucion = async (id) => {
  try {
    const response = await DELETE(`resolucion/${id}`);
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer DELETE a resolución:", error);
    throw error;
  }
};
*/