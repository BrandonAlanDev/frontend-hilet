import { POST, GET, PATCH, DELETE } from "../Services/fetch";

export const PostProfesor = async (nombre,apellido) => {
  try {
    const response = await POST("ProfesorController/Create", { nombre, apellido});
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer POST a profesor:", error);
    throw error;
  }
};

export const GetDeTodosLosProfesores = async () => {
  try {
    const response = await GET(`ProfesorController/GetProfesor`);
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer GET a profesor:", error);
    throw error;
  }
};

export const PutProfesor = async (id, nombre, apellido, correo,telefono) => {
  try {
    const response = await PATCH(`ProfesorController/Update/${id}`, { nombre, apellido,correo,telefono});
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer PUT a profesor:", error);
    throw error;
  }
};

/*export const DeleteProfesor = async (id) => {
  try {
    const response = await DELETE(`profesor/${id}`);
    if (response) {
      return response;
    }
    throw new Error("No se recibió respuesta");
  } catch (error) {
    console.error("Error al hacer DELETE a profesor:", error);
    throw error;
  }
};
*/