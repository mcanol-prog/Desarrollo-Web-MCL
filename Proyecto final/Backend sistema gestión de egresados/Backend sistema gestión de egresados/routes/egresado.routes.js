const express = require("express");

const router = express.Router();

const Egresado = require("../models/egresado.model");


// ======================================
// POST /egresados
// CREAR UN NUEVO EGRESADO
// ======================================

router.post("/", async (req, res) => {

    try {

        const {
            identificacion,
            nombre,
            correo,
            telefono,
            carrera,
            fecha,
            empresa
        } = req.body;


        // Validar campos obligatorios

        if (
            !identificacion ||
            !nombre ||
            !correo ||
            !telefono ||
            !carrera ||
            !fecha ||
            !empresa
        ) {

            return res.status(400).json({

                mensajeError:
                    "Todos los campos son obligatorios."

            });

        }


        // Verificar si ya existe un egresado
        // con esa identificación

        const existente = await Egresado.findOne({

            identificacion: identificacion

        });


        if (existente) {

            return res.status(400).json({

                mensajeError:
                    "Ya existe un egresado con esa identificación."

            });

        }


        // Crear el nuevo egresado

        const nuevoEgresado = new Egresado({

            identificacion: identificacion,

            nombre: nombre,

            correo: correo,

            telefono: telefono,

            carrera: carrera,

            fecha: fecha,

            empresa: empresa

        });


        // Guardar en MongoDB

        await nuevoEgresado.save();


        // Respuesta exitosa

        res.status(201).json({

            mensaje:
                "Egresado registrado correctamente.",

            egresado:
                nuevoEgresado

        });


    } catch (error) {

        console.error(error);


        res.status(500).json({

            mensajeError:
                "Error al crear el egresado."

        });

    }

});


// ======================================
// GET /egresados
// OBTENER TODOS LOS EGRESADOS
// ======================================

router.get("/", async (req, res) => {

    try {

        const egresados = await Egresado.find();

        res.json(egresados);

    } catch (error) {

        res.status(500).json({

            mensajeError:
                "Error al obtener los egresados."

        });

    }

});


module.exports = router;