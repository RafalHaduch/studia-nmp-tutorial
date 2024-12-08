export const AuthQueries = {
  register: 'INSERT INTO accounts (email, password) VALUES (?, ?)',
  findByEmail: 'SELECT * FROM accounts WHERE email = ?',
  getUserLists: 'SELECT * FROM lists WHERE user_id = ?',
};
