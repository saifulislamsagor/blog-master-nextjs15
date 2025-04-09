// db.js
const { PrismaClient } = require('@prisma/client');

// Global object to store Prisma instance in development
const globalForPrisma = global;

// Use the global Prisma instance in development, or create a new one
const prisma = globalForPrisma.prisma || new PrismaClient();

// In development, store the Prisma client in the global object
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = { prisma };
