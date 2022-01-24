import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

const UserController = {
    async index(req: Request, res: Response) {
        try {
            const  id  = Number(req.params.id);

            const user = await prisma.user.findUnique({ where:{ id } });

            if (!user) {
                return res.status(404).json({
                    message: 'Nenhum usuário encontrado com este id'
                });
            }

            return res.status(200).json({
                message: `Usuário ${user.username} listado com sucesso`,
                data: user
            });
        } catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async create(req: Request, res: Response) {
        try {
            const {
                username,
                email,
                password
            } = req.body;

            const findUser = await prisma.user.findFirst({
                where: { email }
            });

            if (findUser) {
                return res.status(401).json({
                    message: 'Usuário já existente',
                });
            }

            const hash = await bcrypt.hash(password, 10);

            const result = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hash
                }
            });

            if(result) {
                const token = jwt.sign({
                    name:username
                }, process.env.JWT_KEY,{ expiresIn:'1h'});

                const user = {
                    username,
                    email
                }

                if (user) {
                    return res.status(201).json({
                        message: 'Usuário cadastrado com sucesso',
                        token,
                        user

                    });
                }
            }
        } catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async update(req: Request, res: Response) {
        try {
            const {
                id,
                username,
                address,
                cpf,
                cep,
                phone,
                cellPhone
            } = req.body;

            const findUser = await prisma.user.findUnique(id);

            if (findUser) {
                return res.status(401).json({
                    message: 'Nenhum usuário encontrado com este id'
                });
            }

            const updatedUser = await prisma.user.update({
                where: { id },
                data: {
                    username,
                    address,
                    cpf,
                    cep,
                    phone,
                    cellPhone
                }
            });

            if (updatedUser) {
                return res.status(200).json({
                    message: 'Dados atualizados com sucesso'
                });
            }
        } catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            const findUser = await prisma.user.findUnique({ where: { id } });

            if (!findUser) {
                return res.status(401).json({
                    message: `Usuário com ${id} não encontrado`
                });
            }

            const deletedUser = await prisma.user.delete({
                where: { id }
            });

            if (!deletedUser) {
                return res.status(401).json({
                    message: 'Não foi possível deletar o usuário'
                });
            }
            else {
                return res.status(200).json({
                    message: `Usuário de id:${id} foi excluído com sucesso`,
                });
            }
        } catch (error) {
            throw error
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async login(req: Request, res: Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const findUser = await prisma.user.findFirst({
                where: { email }
            });

            if (!findUser) {
                return res.status(401).json({
                    message: 'Credenciais inválidas 😑',
                }).sendStatus;
            }

            const decrypt = await bcrypt.compare(password, findUser.password);

            if (decrypt) {
                const { username, email } = findUser;

                const user = {
                    username,
                    email
                }

                const token = jwt.sign({
                    id: findUser.id,
                    name: findUser.username
                }, process.env.JWT_KEY, { expiresIn: '1h' });

                return res.status(200).json({
                    message: "Usuário logado com sucesso",
                    user,
                    token
                });
            }
            else {
                return res.status(401).json({ message: "Falha na autenticação" });
            }

        }
        catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    }
}

export default UserController;