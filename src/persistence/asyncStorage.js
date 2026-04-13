import AsyncStorage from '@react-native-async-storage/async-storage';
import { entries as initialEntries } from '../constants/entries';

const STORAGE_KEY = '@movie_journal_entries';

export const loadEntries = async () => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialEntries));
      return [...initialEntries];
    }
  } catch (error) {
    console.log('Error loading entries:', error);
    return [...initialEntries];
  }
};

export const saveEntries = async entries => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.log('Error saving entries:', error);
  }
};

export const addEntry = async entry => {
  const entries = await loadEntries();
  const newEntry = { ...entry, id: Date.now().toString() };
  const updated = [...entries, newEntry];
  await saveEntries(updated);
  return newEntry;
};

export const updateEntry = async updatedEntry => {
  const entries = await loadEntries();
  const updated = entries.map(e =>
    e.id === updatedEntry.id ? updatedEntry : e,
  );
  await saveEntries(updated);
};

export const deleteEntry = async id => {
  const entries = await loadEntries();
  const updated = entries.filter(e => e.id !== id);
  await saveEntries(updated);
};
