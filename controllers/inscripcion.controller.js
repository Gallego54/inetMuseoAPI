import conexion from "../DB/DB.js";
import { VisitanteRegister } from "./visitante.contoller.js";


export const InscripcionCreate = async(req, res) =>{
    try {
        /************************************************************/
        const idVisitante = await VisitanteRegister(req);
        await conexion.query("INSERT INTO `inscripcion`(`idInscriptor`, `idVisitante`, `idVisitaGuiada`) VALUES (?, ?, ?)",
        {
            replacements: [4, idVisitante[0], req.body.idVisitaGuiada],
        });
        res.status(201).json({msg:"Inscripcion Registrado"});
        /************************************************************/
    } catch (error) {   
        console.log(error.message);
    }
}


export const InscripcionView = async(req, res) =>{
    try {
  
        const [response] = await conexion.query("SELECT I.idInscripcion,U.dni,V.cantPersonas,VG.fecha,VG.hora, I.fecha as fechaInscripcion  FROM `inscripcion` I LEFT OUTER JOIN `visitante` V ON I.idVisitante=V.idVisitante LEFT OUTER JOIN `visitaguiada` VG ON I.idVisitaGuiada=VG.idVisitaGuiada LEFT OUTER JOIN `usuario` U ON V.idUsuario=U.idUsuario WHERE I.estado=1");
		console.log(response)
        res.status(201).json(response);
        /************************************************************/
    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoInscripcion = async(req, res) =>{
    try{
    var IdInscripcion = req.body.idInscripcion;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `inscripcion` WHERE `idInscripcion`=(?)",
            {
                replacements: [IdInscripcion],
            });
            estado = response[0].estado;
            if(estado == 0){
                estado = 1;
            } else {
                estado = 0;
            }
        } catch (error) {
            console.log(error.message);
        }
        /************************************************************/
    
    await conexion.query("UPDATE `inscripcion` SET `estado`=(?) WHERE `idInscripcion`=(?) ",
    {
        replacements: [[estado], [IdInscripcion]],
    });
    res.status(200).json({msg: "State Updated"});
    
    }
    catch (error) {
    console.log(error.message);
    }
}
