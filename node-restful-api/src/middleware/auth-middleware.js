import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unautorized"
        }).end();
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });
        if (!user) {
            return res.status(401).json({
                errors: "Unautorized"
            }).end();
        }

        req.user = user;
        next();
    }
}