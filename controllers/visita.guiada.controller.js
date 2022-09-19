import conexion from "../DB/DB.js";

export const VisitaGuiadaRegister = async(req, res) =>{
    try {
        /************************************************************/
        
        /************************************************************/
        await conexion.query("INSERT INTO `visitaguiada`(`idRecorrido`, `idGuia`, `fecha`, `hora`) VALUES (?,?,?,?)",
        {
            replacements: [ req.body.idRecorrido , req.body.idGuia, req.body.fecha, req.body.hora],
        });
        res.status(201).json({msg:"Visita Guiada Registrado"});
        /************************************************************/
    } catch (error) {
        console.log(error.message);
    }
}

export const VisitaGuiadaView = async(req, res) =>{
    try {
        /************************************************************/
        const [response]= await conexion.query("SELECT VG.idVisitaGuiada, VG.fecha, VG.hora, U.nombre, U.apellido,I.idioma FROM `visitaguiada` VG LEFT OUTER JOIN `guia` G ON VG.idGuia=G.idGuia LEFT OUTER JOIN `usuario` U ON G.idUsuario=U.idUsuario LEFT OUTER JOIN `idiomaguia` IG ON G.idGuia=IG.idGuia LEFT OUTER JOIN `idioma` I ON IG.idIdioma=I.idIdioma WHERE VG.estado=1 ")
		res.status(201).json(response);
        /************************************************************/
    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoVisitaGuiada = async(req, res) =>{
    try{
    var IdVisitaGuiada = req.body.idVisitaGuiada;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `visitaguiada` WHERE `idVisitaGuiada`=(?)",
            {
                replacements: [IdVisitaGuiada],
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
    
    await conexion.query("UPDATE `visitaguiada` SET `estado`=(?) WHERE `idVisitaGuiada`=(?)",
    {
        replacements: [[estado], [IdVisitaGuiada]],
    });
    res.status(200).json({msg: "State Updated"});
    
    }
    catch (error) {
    console.log(error.message);
    }
}