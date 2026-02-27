import bcrypt from 'bcryptjs';

// 在实际应用中，应该使用环境变量
const ADMIN_PASSWORD_HASH = '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3iLkGJ8q8Z4tXe.5gG.7qF8eK4W'; // admin123

export async function verifyPassword(password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error('Password verification error:', error);
    return false;
  }
}
