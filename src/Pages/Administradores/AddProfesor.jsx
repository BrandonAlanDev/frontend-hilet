import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import agregar from "../../Assets/Image/signomas.png";
import usuario from "../../Assets/Image/UserWhite.webp";
import InputField from "../../Components/InputField";
import usuarioSearch from "../../Assets/Image/user.png";
import buscando from "../../Assets/Image/buscando.png";

const AddProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [newProfesor, setNewProfesor] = useState({ nombre: "", apellido: "", email: "", telefono: "" });
  const [profesores, setProfesores] = useState([]);
  const [profesorBuscado, setProfesorBuscado] = useState("");
  const [profesoresEncontrados, setProfesoresEncontrados] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user || user !== "sandra2024") {
      navigate("/");
    } else {
      setNombre(user);
      const storedProfesores = sessionStorage.getItem("profesores");
      setProfesores(storedProfesores ? JSON.parse(storedProfesores) : []);
      setCarrera("Administración");
    }
  }, [navigate]);

  const handleSearchChange = (e) => {
    const valorBuscado = e.target.value.toLowerCase();
    setProfesorBuscado(valorBuscado);

    if (valorBuscado === "") {
      setProfesoresEncontrados([]);
    } else {
      const resultados = profesores.filter((p) => {
        const nombreCompleto = `${p.nombre} ${p.apellido}`.toLowerCase();
        return nombreCompleto.includes(valorBuscado);
      });
      setProfesoresEncontrados(resultados);
    }
  };

  const addProfesor = () => {
    if (newProfesor.nombre.trim() === "" || newProfesor.apellido.trim() === "") return;

    // Comparar nombre y apellido del profesor
    if (profesores.some((profesor) => 
        profesor.nombre.toLowerCase() === newProfesor.nombre.toLowerCase() && 
        profesor.apellido.toLowerCase() === newProfesor.apellido.toLowerCase())) {
      alert("El profesor ya existe.");
      return;
    }

    const updatedProfesores = [...profesores, newProfesor];
    setProfesores(updatedProfesores);
    sessionStorage.setItem("profesores", JSON.stringify(updatedProfesores));
    setNewProfesor({ nombre: "", apellido: "", email: "", telefono: "" });
    setShowModal(false);
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
                <div key={index} className="bg-analista p-8 rounded-lg flex flex-col items-center mosaicos-profe shadow-2xl shadow-black">
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Nombre Completo :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{`${p.nombre} ${p.apellido}`}</p>
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
                </div>
              ))
            )
          ) : (
            <>
              <div
                className="opacity-85 bg-slate-100 p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black cursor-pointer"
                onClick={() => setShowModal(true)}
              >
                <img
                  className="flex-grow h-10 flex justify-center items-center activo aspect-square"
                  src={agregar}
                  alt="Signo de agregar"
                />
                <div>
                  <h4 className="text-2xl font-bold mt-4 text-center text-mosaico-profe opacity-100 text-analista">
                    Agregar
                  </h4>
                </div>
              </div>
              {profesores.map((p, index) => (
                <div key={index} className="bg-analista p-8 rounded-lg flex flex-col items-center mosaicos-profe shadow-2xl shadow-black">
                  <div className="text-mosaico-profe">
                    <p className="text-center text-[13px] text-white">{"Nombre Completo :"}</p>
                    <p className="font-bold text-center text-mosaico-profe text-white">{`${p.nombre} ${p.apellido}`}</p>
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
                </div>
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
      </div>
    </div>
  );
};

export default AddProfesor;