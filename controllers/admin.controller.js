import conexion from "../DB/DB.js";

export const registrarUsuarioAdmin = async(req, res) =>{
    try {
        /************************************************************/
        let IdUsuario= null;
        const [response] = await conexion.query("SELECT  `idUsuario` FROM `usuario` WHERE `dni`=(?)",
        {
            replacements: [req.body.dni],
        })
        IdUsuario = response[0].idUsuario;
            if(IdUsuario == null){
                await conexion.query("INSERT INTO `usuario`(`dni`, `nombre`, `apellido`) VALUES (?,?,?)",
                {
                    replacements: [req.body.dni, req.body.nombre, req.body.apellido],
                })
                .then(function (idUsuario)
                    {
                        IdUsuario = idUsuario[0];
                    }
                );
                await conexion.query("INSERT INTO `administrador`(`idUsuario`, `username`, `password`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.username, req.body.password],
                })
            } else {
                await conexion.query("INSERT INTO `administrador`(`idUsuario`, `username`, `password`) VALUES (?,?,?)",
                {
                    replacements: [IdUsuario, req.body.username, req.body.password],
                })
            }
        /************************************************************/
        res.status(201).json({msg: "+"});
    } catch (error) {
        console.log(error.message);
    }
}

export const confirmarUsuarioAdmin = async(req, res) =>{
    try {
        const [response]= await conexion.query("SELECT  `token` FROM `administrador` WHERE `username`=(?) AND `password`=(?)",
        {
            replacements: [[req.body.username],[req.body.password]],
        });
        res.status(200).json(response);
        console.log(JSON.stringify(response, null,1))

    } catch (error) {
        console.log(error.message);
    }
}

export const cambiarEstadoAdmin = async(req, res) =>{
    try{
    var IdAdministrador = req.body.idAdministrador;
    let estado = 0;
    //
    /************************************************************/
        try  {
            
            const [response] = await conexion.query("SELECT  `estado` FROM `administrador` WHERE `idAdministrador`=(?)",
            {
                replacements: [IdAdministrador],
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
    
    await conexion.query("UPDATE `administrador` SET `estado`=(?) WHERE `idAdministrador`=(?)",
    {
        replacements: [[estado], [IdAdministrador]],
    });
    res.status(200).json({msg: "State Updated"});
    
    }
    catch (error) {
    console.log(error.message);
    }
}