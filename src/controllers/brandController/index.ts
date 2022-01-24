import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const BrandController = {
    async index(req: Request, res: Response) {
        try {
            let page = Number(req.query.page);

            if (page === undefined || !page) {
                page = 1;
            }

            const limit = 10;
            const count = (page - 1) * limit;

            const automoviteBrands = await prisma.brand.findMany({
                skip: count,
                take: limit,
            });

            if (automoviteBrands) {
                return res.status(200).json({
                    message: 'Lista de marcas automotivas',
                    data: automoviteBrands
                });
            }

        } catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async create(req: Request, res: Response) {
        try {
            const { name } = req.body;

            const automoviteBrands = await prisma.brand.findFirst({
                where: { name }
            });

            if (automoviteBrands) {
                return res.status(401).json({
                    message: 'Marca com esse nome já existente',
                });
            }

            const newAutomotiveBrand = await prisma.brand.create({
                data: { name }
            });

            if (newAutomotiveBrand) {
                return res.status(201).json({
                    message: 'Marca automotiva cadastrada com sucesso',
                    data: newAutomotiveBrand
                });
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
            const { id, name } = req.body;

            const automoviteBrands = await prisma.brand.findFirst({
                where: { id }
            });

            if (!automoviteBrands) {
                return res.status(401).json({
                    message: 'Nenhum automóvel encontrado com este id'
                });
            }

            const updatedAutomotiveBrand = await prisma.brand.update({
                where: { id },
                data: { name }
            });

            if (updatedAutomotiveBrand) {
                res.status(200).json({
                    message: `Marca com id:${id} atualizada com sucesso`,
                    data: updatedAutomotiveBrand
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

            const automoviteBrands = await prisma.brand.findFirst({
                where: { id }
            });

            if (!automoviteBrands) {
                return res.status(401).json({
                    message: 'Nenhum automóvel encontrado com este id'
                });
            }

            const deletedAutomotiveBrand = await prisma.brand.delete({
                where: { id }

            });

            if (deletedAutomotiveBrand) {
                res.status(200).json({
                    message: `Marca com id:${id} deletada com sucesso`,
                });
            }

        } catch (error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    }

}

export default BrandController;