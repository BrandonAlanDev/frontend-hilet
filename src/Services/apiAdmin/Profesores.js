import { POST, GET, PATCH, DELETE } from "../../Services/fetch";
import { backendurl } from "../../env";

export async function GetProfesores() {
  const token = sessionStorage.getItem('jwtToken');
  const fullUrl = `${backendurl}ProfesorController/Get`;

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
          throw new Error(errorResponse.message || 'Error al obtener profesores.');
      }

      const result = await response.json();
      return result.data || [];
  } catch (err) {
      console.error('Error en la solicitud:', err.message);
      throw err;
  }
}


export async function PostProfesor(profesorData) {
  const token = sessionStorage.getItem('jwtToken');
  const fullUrl = `${backendurl}ProfesorController/Create`;

  try {
      const response = await fetch(fullUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(profesorData),
      });

      if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Error al crear el profesor.');
      }

      const result = await response.json();
      return result;
  } catch (err) {
      console.error('Error en la solicitud:', err.message);
      throw err;
  }
}

export async function UpdateProfesor(profesorData) {
  const token = sessionStorage.getItem('jwtToken');
  const fullUrl = `${backendurl}ProfesorController/Update`;

  try {
      const response = await fetch(fullUrl, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(profesorData),
      });

      if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Error al actualizar el profesor.');
      }

      const result = await response.json();
      return result;
  } catch (err) {
      console.error('Error en la solicitud:', err.message);
      throw err;
  }
}

export async function DeleteProfesor(id) {
  const token = sessionStorage.getItem('jwtToken');
  const fullUrl = `${backendurl}ProfesorController/Delete/${id}`;

  try {
      const response = await fetch(fullUrl, {
          method: 'DELETE',
          mode: 'cors',
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json', 
          },
      });

      if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || 'Error al eliminar el profesor.');
      }

      const result = await response.json();
      return result;
  } catch (err) {
      console.error('Error en la solicitud:', err.message);
      throw err;
  }
}
