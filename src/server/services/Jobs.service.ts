import { PrismaClient } from "@prisma/client";
import { ILinkedInJobs } from "../interfaces/linkedin.interfaces";
export default class JobsService {

    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getJobs() {
        return this.prisma.job.findMany();
    }

    async createJob(data: ILinkedInJobs) {
        return this.prisma.job.create({
            data: data
        });
    }

    async createManyJobs(data: ILinkedInJobs[]) {
        return this.prisma.job.createMany({
            data: data
        });
    }

}