export const ListsQueries = {
  createList: 'INSERT INTO lists (user_id, name, content) VALUES (?, ?, ?)',
  deleteList: 'DELETE FROM lists WHERE user_id = ? AND id = ?',
  modifyList:
    'UPDATE lists SET name = ?, content = ? WHERE user_id = ? AND id = ?',
  getListContent: 'SELECT * FROM lists WHERE user_id = ? AND id = ?',
};
