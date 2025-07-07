import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface CreateUserData {
  nameUser: string;
  email: string;
  password: string;
}

export const createUser = async (userData: CreateUserData) => {
  const { nameUser, email, password } = userData;
  
  // Verificar se o email já existe
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });
  
  if (existingUser) {
    throw new Error('Email já está em uso');
  }
  
  // Hash da senha
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Criar usuário no banco
  const newUser = await prisma.user.create({
    data: {
      nameUser,
      email,
      password: hashedPassword
    },
    select: {
      id: true,
      nameUser: true,
      email: true,
      createdAt: true
    }
  });
  
  return newUser;
};
