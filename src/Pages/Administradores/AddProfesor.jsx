import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import usuario from "../../Assets/Image/UserWhite.webp";
import InputField from "../../Components/InputField";
import usuarioSearch from "../../Assets/Image/user.png";
import buscando from "../../Assets/Image/buscando.png";
import Mosaico from "../../Components/Mosaico";
import { GetProfesores, PostProfesor, UpdateProfesor, DeleteProfesor } from "../../Services/apiAdmin/Profesores";

const AddProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [newProfesor, setNewProfesor] = useState({ nombre: "", apellido: "", email: "", telefono: "" });
  const [profesores, setProfesores] = useState([]);
  const [profesorBuscado, setProfesorBuscado] = useState("");
  const [profesoresEncontrados, setProfesoresEncontrados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalModify, setShowModalModify] = useState(false);
  const [profesorSeleccionado,setProfesorSeleccionado] = useState();
  const [newProfesorSeleccionado,setNewProfesorSeleccionado] = useState();
  const [showModalConfirmacion, setShowModalConfirmacion] = useState(false);

  const navigate = useNavigate();

  const refrescarProfesores = async () => {
          try {
              let response = await GetProfesores();
              if (response && response.length > 0) {
                  setProfesores(response);
                  sessionStorage.setItem('profesores', JSON.stringify(response));
              } else {
                  console.warn("La respuesta fue exitosa pero no se obtuvieron profesores.");
              }
          } catch (error) {
              console.error("Error al intentar obtener las carreras. Detalles:", error.message);
          }
      };
  
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!user || sessionStorage.getItem('carrera')!='Administracion') {
      navigate('/');
    } else {
      refrescarProfesores();
      setNombre(sessionStorage.getItem('nombre')+' '+sessionStorage.getItem('apellido'));
      setCarrera("Administracion");
    }
  }, [navigate]);

  const handleSearchChange = (e) => {
    const valorBuscado = e.target.value.toLowerCase();
    setProfesorBuscado(valorBuscado);

    if (valorBuscado === "") {
      setProfesoresEncontrados([]);
    } else {
      const resultados = profesores.filter((p) => {
        const nombreCompleto = `${p.apellido} ${p.nombre}`.toLowerCase();
        return nombreCompleto.includes(valorBuscado);
      });
      setProfesoresEncontrados(resultados);
    }
  };

  const addProfesor = async () => {
    if (!newProfesor.nombre || !newProfesor.apellido || !newProfesor.email || !newProfesor.telefono) {
      console.error("Faltan datos obligatorios");
      return;
    }
  
    try {
      const response = await PostProfesor({ nombre_profesor: newProfesor.nombre, apellido_profesor: newProfesor.apellido, correo_profesor: newProfesor.email, telefono: newProfesor.telefono});
      if (response) {
        setShowModal(false);
        setNewProfesor({ nombre: "", apellido: "", email: "", telefono: "" });
        await refrescarProfesores(); // Refresca la lista tras añadir
      } else {
        console.error("Error al agregar profesor:", response?.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al intentar agregar un profesor:", error.message);
    }
  };
  
  const updateProfesor = async () => {
    if (!newProfesorSeleccionado) return;
    console.log(newProfesorSeleccionado);
    try {
      const response = await UpdateProfesor({ id_profesor: newProfesorSeleccionado.id, nombre_profesor: newProfesorSeleccionado.nombre, apellido_profesor: newProfesorSeleccionado.apellido, correo_profesor: newProfesorSeleccionado.email, telefono: newProfesorSeleccionado.telefono});
      if (response) {
        setShowModalModify(false);
        setProfesorSeleccionado(null);
        setNewProfesorSeleccionado(null);
        await refrescarProfesores(); // Refresca la lista tras actualizar
      } else {
        console.error("Error al actualizar profesor:", response?.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al intentar actualizar un profesor:", error.message);
    }
  };
  
  // Modificar profesor al abrir el modal
  const modificarProfesor = (pid, pnombre, papellido, pemail, ptelefono) => {
    const profesor = { id: pid, nombre: pnombre, apellido: papellido, email: pemail, telefono: ptelefono };
    if (profesor) {
      setProfesorSeleccionado(profesor);
      setNewProfesorSeleccionado(profesor);
      setShowModalModify(true);
    } else {
      console.error("Profesor no encontrado.");
    }
  };
  
  const eliminarProfesor = async () => {
    if (!profesorSeleccionado) return;

    const idProfesor = profesorSeleccionado.id;  
  
    try {
      const response = await DeleteProfesor(idProfesor);
  
      if (response) {
        setShowModalConfirmacion(false);
        setShowModalModify(false);
        setProfesorSeleccionado(null);
        setNewProfesorSeleccionado(null);
        await refrescarProfesores();
      } else {
        console.error("Error al eliminar el profesor:", response?.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al intentar eliminar un profesor:", error.message);
    }
  };

  const confirmarEliminacion = () => {
    setShowModalConfirmacion(true);
  };

  
  return (
    <div>
      <Navbar nombre={nombre} carrera={carrera} />
      <div
        className={`min-h-screen select-none flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32`}
      >
        <div className="mt-5 gap-8 flex flex-col lg:flex-row lg:mt-0 justify-between items-center">
          <p className="text-2xl font-bold mb-6 text-center text-titular gap-5">
            Profesores
          </p>
          <div>
            <InputField
                id="nombrebuscar"
                label="Nombre"
                type="text"
                placeholder="Buscar profesor"
                value={profesorBuscado}
                onChange={handleSearchChange}
                icon={usuarioSearch}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
          {profesorBuscado ? (
            profesoresEncontrados.length === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <img src={buscando} alt="Imagen de busqueda de datos" width="100px" height="100px"/>
                <h1 className="text-2xl font-bold text-white">No se han encontrado profesores</h1>
              </div>
            ) : (
              profesoresEncontrados.map((p, index) => (
                <button key={index} onClick={()=>{modificarProfesor(p.id,p.nombre,p.apellido,p.email,p.telefono)}} className="bg-analista p-8 rounded-lg flex flex-col items-center mosaicos-profe shadow-2xl shadow-black">
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Nombre Completo :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{`${p.apellido} ${p.nombre} `}</p>
                  </div>
                  <img src={usuario} alt="Imagen de perfil" width="150px" height="auto"/>
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Correo electrónico :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{p.email}</p>
                  </div>
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Teléfono :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{p.telefono}</p>
                  </div>
                </button>
              ))
            )
          ) : (
            <>
              <Mosaico titulo={"Agregar"} ancho={"max-w-[400px]"} callback={() => setShowModal(true)} imagen={agregar} />
              {profesores.map((p, index) => (
                <button key={index} onClick={()=>{modificarProfesor(p.id,p.nombre,p.apellido,p.email,p.telefono)}} className="bg-analista p-8 rounded-lg flex flex-col items-center mosaicos-profe shadow-2xl shadow-black">
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Nombre Completo :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{`${p.apellido} ${p.nombre} `}</p>
                  </div>
                  <img src={usuario} alt="Imagen de perfil" width="150px" height="auto"/>
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Correo electrónico :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{p.email}</p>
                  </div>
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Teléfono :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{p.telefono}</p>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-analista">
                Agregar Nuevo Profesor
              </h2>
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Nombre del Profesor"
                value={newProfesor.nombre}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, nombre: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Apellido"
                value={newProfesor.apellido}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, apellido: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Correo electrónico"
                value={newProfesor.email}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, email: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Teléfono de contacto"
                value={newProfesor.telefono}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, telefono: e.target.value });
                }}
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="cancelar text-white px-4 py-2 rounded"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  className="aceptar text-white px-4 py-2 rounded"
                  onClick={addProfesor}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Modificar */}
        {showModalModify && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-analista">
                Modificar profesor
              </h2>
              <h4 className="text-md font-bold mb-4 text-gray-400">
                {"Modificando : "+profesorSeleccionado.apellido+" "+profesorSeleccionado.nombre}
              </h4>
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Nombre del Profesor"
                value={newProfesorSeleccionado.nombre}
                onChange={(e) => {
                  setNewProfesorSeleccionado({ ...newProfesorSeleccionado, nombre: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Apellido"
                value={newProfesorSeleccionado.apellido}
                onChange={(e) => {
                  setNewProfesorSeleccionado({ ...newProfesorSeleccionado, apellido: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Correo electrónico"
                value={newProfesorSeleccionado.email}
                onChange={(e) => {
                  setNewProfesorSeleccionado({ ...newProfesorSeleccionado, email: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Teléfono de contacto"
                value={newProfesorSeleccionado.telefono}
                onChange={(e) => {
                  setNewProfesorSeleccionado({ ...newProfesorSeleccionado, telefono: e.target.value });
                }}
              />
              <div className="flex justify-end space-x-4">
                <button
                  className="otro-button text-white px-4 py-2 rounded"
                  onClick={() => confirmarEliminacion(profesorSeleccionado)}
                >
                  Eliminar
                </button>
                <button
                  className="cancelar text-white px-4 py-2 rounded"
                  onClick={() => setShowModalModify(false)}
                >
                  Cancelar
                </button>
                <button
                  className="aceptar text-white px-4 py-2 rounded"
                  onClick={updateProfesor}
                >
                  Modificar
                </button>
              </div>
            </div>
          </div>
        )}
        {showModalConfirmacion && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-red-500">
                ¿Estás seguro de eliminar este profesor?
              </h2>
              <p className="text-md mb-4">Esta acción no se puede deshacer.</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="aceptar text-white px-4 py-2 rounded bg-red-500"
                  onClick={eliminarProfesor}
                >
                  Aceptar
                </button>
                <button
                  className="cancelar text-white px-4 py-2 rounded bg-gray-500"
                  onClick={() => setShowModalConfirmacion(false)} // Cierra el modal de confirmación
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProfesor;