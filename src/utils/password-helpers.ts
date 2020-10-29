import bcrypt from 'bcrypt';

export const createHash = (password: string) =>
  bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

export const compareHash = (plainTextPassword: string, existingHash: string) =>
  bcrypt.compare(plainTextPassword, existingHash);