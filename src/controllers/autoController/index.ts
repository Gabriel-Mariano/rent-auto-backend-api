import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

const AutoController = {
    async index(req:Request, res:Response){
        try{
            const automobiles = await prisma.automobile.findMany({
                include:{
                    brand:true
                }
            });


            return res.status(200).json({
                message:"Listagem de automóveis",
                data:automobiles
            });

        } catch(error) {
            throw error;
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async create(req:Request, res:Response){
        try {
            const { path } = req.file;
            const { 
                name,
                describe,
                year,
                price,
                fuel,
                exchange,
                km,
                renavam,
                chassis,
                licensePlate,
            } = req.body;

            const renavamExists = await prisma.automobile.findUnique({ where: { renavam }});
            
            if(renavamExists){
                return res.status(401).json({
                    message:'Automóvel já existente',
                });
            }

            const automobile = await prisma.automobile.create({
                data:{
                    name,
                    describe,
                    year,
                    price,
                    fuel,
                    exchange,
                    photo:path,
                    km,
                    renavam,
                    chassis,
                    licensePlate,
                }
            });

            if(automobile){
                return res.status(201).json({
                    message:'Automóvel cadastrado com sucesso',
                    data:automobile
                });
            }
        } catch (error) {
            throw error
        }
        finally {
            await prisma.$disconnect();
        }
    },
    async update(req:Request, res:Response) {
        try{
            const { 
                id,
                name,
                describe,
                year,
                price,
                fuel,
                exchange,
                km,
                renavam,
                chassis,
                licensePlate,
                brandId,
                carModelId
            } = req.body; 

            const autoExists = await prisma.automobile.findUnique({ where: { id }});
            
            if(!autoExists){
                return res.status(401).json({
                    message:`Carro com id:${id} é inexistente`,
                });
            }

            const updatedAuto = await prisma.automobile.update({
                where:{ id },
                data:{
                    name,
                    describe,
                    year,
                    price,
                    fuel,
                    exchange,
                    km,
                    renavam,
                    chassis,
                    licensePlate,
                    brandId,
                    carModelId
                }
            });

            if(updatedAuto){
                return res.status(200).json({
                    message:"Dados atualizados com sucesso",
                });
            }
        } catch(error) {
            throw error;
        }
        finally { 
            await prisma.$disconnect();
        }
    },
    async delete(req:Request, res:Response) {
        try {
            const id = Number(req.params.id);

            const idExists = await prisma.automobile.findFirst({ where:{ id }} );

            if(!idExists){
                return res.status(401).json({
                    message:`Nenhum automóvel com este id${id} encontrado`
                });
            }

            const deletedAutomobile = await prisma.automobile.delete({ where:{ id } });

            if(deletedAutomobile){
                return res.status(200).json({
                    message:'Automóvel excluído com sucesso'
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

export default AutoController;