import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase(
  {
    name: 'movieJournal.db',
    location: 'default',
  },
  () => console.log('DB opened'),
  error => console.log('DB error', error),
);

const tableSQL = `CREATE TABLE IF NOT EXISTS entries (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  year TEXT,
  rating TEXT,
  review TEXT,
  imageUri TEXT,
  watchedDate TEXT,
  genres TEXT
);`;

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        tableSQL,
        [],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const loadEntries = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM entries ORDER BY title ASC;',
        [],
        (_, { rows }) => {
          const data = rows._array.map(row => ({
            ...row,
            genres: row.genres ? JSON.parse(row.genres) : [],
          }));
          resolve(data);
        },
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const addEntry = entry => {
  return new Promise((resolve, reject) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO entries (id, title, year, rating, review, imageUri, watchedDate, genres) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          newEntry.id,
          newEntry.title,
          newEntry.year || '',
          newEntry.rating || '',
          newEntry.review || '',
          newEntry.imageUri || '',
          newEntry.watchedDate || '',
          JSON.stringify(newEntry.genres || []),
        ],
        () => resolve(newEntry),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const updateEntry = entry => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE entries SET title = ?, year = ?, rating = ?, review = ?, imageUri = ?, watchedDate = ?, genres = ? WHERE id = ?;`,
        [
          entry.title,
          entry.year || '',
          entry.rating || '',
          entry.review || '',
          entry.imageUri || '',
          entry.watchedDate || '',
          JSON.stringify(entry.genres || []),
          entry.id,
        ],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};

export const deleteEntry = id => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM entries WHERE id = ?;',
        [id],
        () => resolve(),
        (_, error) => {
          reject(error);
          return false;
        },
      );
    });
  });
};
