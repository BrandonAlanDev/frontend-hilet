import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProfesor = () => {
  const [nombre, setNombre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [newProfesor, setNewProfesor] = useState({});
  const [profesores, setProfesores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (!user || user !== "sandra2024") {
      navigate("/");
    } else {
      setNombre(user);
      setCarrera("Administración");
    }
  }, [navigate]);

  const addProfesor = () => {
    if (newProfesor.trim() === "") return;
    if (profesores.some((c) => c.toLowerCase() === newProfesor.toLowerCase())) {
      alert("El profesor ya existe.");
      return;
    }
    const updatedProfesores = [...profesores, newProfesor];
    setProfesores(updatedProfesores);
    sessionStorage.setItem("profesores", JSON.stringify(updatedProfesores));
    setNewProfesor("");
    setShowModal(false);
  };

  return (
    <div>
      <Navbar nombre={nombre} carrera={carrera} />
      <div
        className={`min-h-screen flex flex-col items-center justify-evenly bg-hilet py-20 lg:py-32`}
      >
        <div className="mt-5 gap-8 lg:mt-0">
          <h1 className="text-2xl font-bold mb-6 text-center text-titular gap-5">
            Agregar Profesores
          </h1>
        </div>
        {carrera === "Administración" && (
          <div className="flex flex-row flex-wrap gap-8 items-start justify-center lg:max-w-6xl">
            <div
              className="opacity-65 bg-green-300 p-8 rounded-lg flex flex-col items-center mosaicos shadow-2xl shadow-black cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <img
                className="flex-grow h-10 flex justify-center items-center activo aspect-square"
                src={agregar}
                alt="Signo de agregar"
              />
              <div>
                <h4
                  className={`text-2xl font-bold mt-4 text-center text-mosaico opacity-100`}
                >
                  Agregar
                </h4>
              </div>
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-analista">
                Agregar Nuevo Profesor
              </h2>
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Nombre del Profesor"
                value={newProfesor}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, nombre: e.target.value });
                }}
              />
              <input
                type="text"
                className="w-full p-2 border border-analista rounded mb-4"
                placeholder="Apellido"
                value={newProfesor}
                onChange={(e) => {
                  setNewProfesor({ ...newProfesor, apellido: e.target.value });
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
