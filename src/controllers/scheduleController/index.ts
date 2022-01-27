import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import moment from 'moment';
import momento from 'moment';

const prisma = new PrismaClient();

const ScheduleModel = {
    async indexById(req:Request, res:Response){
        try {
            const autoId = Number(req.params.autoId);

            const result = await prisma.schedule.findMany({
                where:{
                    autoId
                }
            });

            res.status(200).json({
                message:'Lista de agendamento',
                result
            });
        } catch (error) {
            throw error
        }
        finally {
            await prisma.$disconnect();
        }   
    },
    async create(req:Request, res:Response) {
        try {
            const autoId = Number(req.params.autoId);
            const {
                userId,
                start_date,
                end_date,
                price
            } = req.body;


             const result = await prisma.schedule.create({
                data:{
                    userId,
                    start_date: new Date(start_date),
                    end_date:new Date(end_date),
                    autoId,
                    price
                }
            });

            res.status(201).json({
                message:"Dias selecionados",
                data:result
            });


        } catch (error) {
            throw error
        }
        finally {
            await prisma.$disconnect();
        } 
    }
}

export default ScheduleModel;