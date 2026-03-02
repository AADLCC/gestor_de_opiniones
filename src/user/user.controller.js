import User from "./user.model.js";
import bcrypt from "bcryptjs";

const UserController = {

    // =========================
    // OBTENER TODOS LOS USUARIOS
    // =========================
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener usuarios",
                error
            });
        }
    },

    // =========================
    // OBTENER USUARIO POR ID
    // =========================
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado"
                });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Error al buscar usuario",
                error
            });
        }
    },

    // =========================
    // REGISTRAR USUARIO
    // =========================
    registerUser: async (req, res) => {
        try {
            const { password } = req.body;

            // 🔐 Encriptar contraseña
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                ...req.body,
                password: hashedPassword
            });

            await newUser.save();

            res.status(201).json({
                message: "Usuario creado"
            });

        } catch (error) {
            res.status(400).json({
                message: "Error al registrar usuario",
                error
            });
        }
    },

    // =========================
    // ACTUALIZAR USUARIO
    // =========================
    modifyUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            res.status(200).json({
                message: "Usuario actualizado",
                updatedUser
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar",
                error
            });
        }
    },

    // =========================
    // ELIMINAR USUARIO
    // =========================
    removeUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: "Usuario eliminado"
            });
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar",
                error
            });
        }
    },

    // =========================
    // LOGIN
    // =========================
    login: async (req, res) => {
        try {
            const { identifier, password } = req.body;

            // Buscar por username o email
            const user = await User.findOne({
                $or: [
                    { username: identifier },
                    { email: identifier }
                ]
            });

            if (!user) {
                return res.status(404).json({
                    message: "Usuario no encontrado"
                });
            }

            // Comparar contraseñas
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Credenciales inválidas"
                });
            }

            res.status(200).json({
                message: "Login exitoso",
                user: {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    username: user.username,
                    email: user.email
                }
            });

        } catch (error) {
            res.status(500).json({
                message: "Error al iniciar sesión",
                error
            });
        }
    }
};

export default UserController;