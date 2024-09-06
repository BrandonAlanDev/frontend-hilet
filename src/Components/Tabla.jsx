
const Tabla = ({ headers, children }) => {
    return (
        <div className="lg:mt-0 lg:h-[18vh] lg:min-h-[250px] lg:w-[60vw] overflow-hidden rounded-3xl items-center">
            <div className="flex flex-row items-start justify-center w-full h-full">
                <table className="border border-slate-300 w-full h-full">
                    <thead className="bg-analista text-white border-b-2 border-stone-300">
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="py-3 px-5 text-center">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabla;
