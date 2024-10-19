import { POST,GET,PUT,PATCH,DELETE } from "/fetch.js";
export async function getAlumnoByDni(dniParam){
    const data = {
        dni:dniParam
    }
    const rsp = await GET("api... ejemplo",{dni:dniParam});
    return rsp;
}