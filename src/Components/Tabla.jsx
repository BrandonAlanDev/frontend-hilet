import React from "react";
import { useState, useEffect } from "react";

const Tabla = ({ headers, children, color }) => {
    return (
        <div className="lg:mt-0 select-none lg:w-[75vw] overflow-hidden rounded-3xl items-center shadow-2xl shadow-gray-900 select-none">
            <div className="flex flex-row items-start justify-center w-full h-full">
                <table className="w-full h-full bg-white">
                    <thead className={`${color} text-white border-b-2 border-stone-300`}>
                        <tr>
                            {headers.map((header, index) => (
                                <th key={index} className="py-3 px-5 text-center">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="border border-slate-300 bg-white">{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Tabla;
