import User from "./user.model.js";

const UserController = {
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

    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({
                message: "Usuario no encontrado"
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({
                message: "Error al buscar usuario",
                error
            });
        }
    },

    registerUser: async (req, res) => {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201).json({
                message: "Usuario creado",
                newUser
            });
        } catch (error) {
            res.status(400).json({
                message: "Error al registrar",
                error
            });
        }
    },

    modifyUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    }
};

export default UserController;