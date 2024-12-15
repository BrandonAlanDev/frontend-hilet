import React, { useState, useEffect } from "react";
import InputField from "../Components/InputField";
import Modal from "../Components/Modal";
import { GetCarrerasActivas, GetResolucionesActivas } from "../Services/apiAdmin/Carreras";
import { CreateAlumno } from "../Services/apiAdmin/Alumnos";

const AddAlumnoModal = ({ fetchAlumnos }) => {
  const userRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9._@-]{6,20}$/;
  const [newAlumno, setNewAlumno] = useState({
    nombre_usuario: "",
    apellido_usuario: "",
    dni: "",
    correo_usuario: "",
    usuario: "",
    password: "",
    fechasFinales: [20231231, 20241231],
    idResolucion: "",
  });

  const [carreras, setCarreras] = useState([]);
  const [resoluciones, setResoluciones] = useState([]);
  const [filteredResoluciones, setFilteredResoluciones] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const getCarreras = async () => {
    try {
      const response = await GetCarrerasActivas();
      setCarreras(response);
    } catch (error) {
      console.error("Error al obtener carreras:", error);
    }
  };

  const getResoluciones = async () => {
    try {
      const response = await GetResolucionesActivas();
      setResoluciones(response || []);
    } catch (error) {
      console.error("Error al obtener resoluciones:", error);
    }
  };

  useEffect(() => {
    getCarreras();
    getResoluciones();
  }, []);

  const handleCarreraChange = (e) => {
    const id_carrera = e.target.value;
    setNewAlumno({ ...newAlumno, idResolucion: "" });
    setFilteredResoluciones(resoluciones.filter((res) => res.id_carrera.toString() === id_carrera));
  };

  const validateFields = () => {
    const { nombre_usuario, apellido_usuario, dni, correo_usuario, idResolucion } = newAlumno;

    if (!nombre_usuario.trim() || !apellido_usuario.trim() || !dni.trim() || !correo_usuario.trim() || idResolucion==="") {
      alert("Por favor, complete todos los campos.");
      return false;
    }
    if (!userRegex.test(dni)) {
      alert("El DNI debe contener entre 6 y 20 caracteres permitidos.");
      return false;
    }
    if (!userRegex.test(correo_usuario)) {
      alert("El correo debe contener entre 6 y 20 caracteres permitidos.");
      return false;
    }
    return true;
  };

  const addAlumno = async () => {
    if (!validateFields()) return;

    const newAlumnoData = { ...newAlumno, usuario: newAlumno.dni, password: newAlumno.dni };

    try {
      const result = await CreateAlumno(newAlumnoData);
      if (result.succes) {
          setNewAlumno({
              nombre_usuario: "",
              apellido_usuario: "",
              dni: "",
              correo_usuario: "",
              usuario: "",
              password: "",
              fechasFinales: [20231231, 20241231],
              idResolucion: "",
            });
            alert("Alumno agregado correctamente");
            setShowModal(false);
            fetchAlumnos();
      } else {
        alert("Hubo un error al agregar el alumno.");
      }
    } catch (error) {
      console.error("Error al agregar alumno:", error);
      alert("Hubo un error al agregar el alumno.");
    }
  };

  const handleDniChange = (e) => {
    const value = e.target.value;
    setNewAlumno({
      ...newAlumno,
      dni: value,
      usuario: value,
      password: value,
    });
  };

  return (
    <>
      <button
        className="analista-button px-4 py-2 rounded-full select-none text-white w-48"
        onClick={() => setShowModal(true)}
      >
        <strong>Nuevo alumno</strong>
      </button>

      <Modal open={showModal} onClose={() => setShowModal(false)} onClick={addAlumno} cancelar={false} aceptar={false}>
        <h2 className="text-2xl font-bold mb-4 text-analista">Agregar Nuevo Alumno</h2>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">Nombre</label>
          <InputField
            type="text"
            placeholder=""
            value={newAlumno.nombre_usuario}
            onChange={(e) => setNewAlumno({ ...newAlumno, nombre_usuario: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">Apellido</label>
          <InputField
            type="text"
            placeholder=""
            value={newAlumno.apellido_usuario}
            onChange={(e) => setNewAlumno({ ...newAlumno, apellido_usuario: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">DNI</label>
          <InputField
            type="text"
            placeholder=""
            value={newAlumno.dni}
            onChange={handleDniChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">Correo</label>
          <InputField
            type="text"
            placeholder=""
            value={newAlumno.correo_usuario}
            onChange={(e) => setNewAlumno({ ...newAlumno, correo_usuario: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">Selecciona una carrera</label>
          <select
            className="w-full p-2 border border-analista rounded mb-4"
            value={newAlumno.id_carrera} // Asegúrate de que este valor coincida con el ID de la carrera
            onChange={handleCarreraChange}
          >
            <option value="">Seleccionar carrera</option>
            {carreras && carreras.map((carrera) => (
              <option key={carrera.id_carrera} value={carrera.id_carrera}>
                {carrera.nombre_carrera}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold text-analista">Selecciona una resolución</label>
          <select
            className="w-full p-2 border border-analista rounded mb-4"
            value={newAlumno.idResolucion} // Asegúrate de que este valor coincida con el ID de la resolución
            onChange={(e) => setNewAlumno({ ...newAlumno, idResolucion: parseInt(e.target.value, 10) })}
          >
            <option value="">Seleccionar resolución</option>
            {filteredResoluciones && filteredResoluciones.map((resolucion) => (
              <option key={resolucion.id_resolucion} value={resolucion.id_resolucion}>
                {resolucion.nombre_resolucion}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="analista-button px-4 py-2 rounded-full select-none text-white w-full mt-4"
          onClick={addAlumno}
        >
          Agregar Alumno
        </button>
      </Modal>
    </>
  );
};

export default AddAlumnoModal;
