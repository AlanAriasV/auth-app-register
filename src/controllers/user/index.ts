import { sql } from '@vercel/postgres';

import { hashPassword } from '@/src/common';

import { User } from '@/src/types';

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export default class UserController {
  static async register({ name, email, password }: RegisterProps) {
    try {
      const hashedPassword = await hashPassword(password!);

      const { rows } = await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${hashedPassword})
        RETURNING id, name, email
      `;

      const user = rows[0];

      return {
        status: 200,
        message: 'User created successfully',
        data: user as User,
      };
    } catch (error: any) {
      console.log('error', error);

      return {
        status: 500,
        message: error.message,
      };
    }
  }
}
