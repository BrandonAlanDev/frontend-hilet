const Modal = (props) => {
    if (!props.open) return null; //para que no se renderize al pepe

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
                {/* Botón de cerrar arriba a la derecha */}
                <button onClick={props.onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                    ✕
                </button>

                {/* Contenido del modal */}
                <div className="mb-16">
                    {props.children}
                </div>

                {/* Contenedor de los botones */}
                <div className="absolute bottom-4 right-4 flex space-x-4">
                    <button className="aceptar px-4 py-2 rounded-lg">
                        Aceptar
                    </button>
                    <button onClick={props.onClose} className="cancelar px-4 py-2 rounded-lg">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )

}

export default Modal;