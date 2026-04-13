import { entries as initialEntries } from '../constants/entries';

let entries = [...initialEntries];

export const loadEntries = async () => [...entries];
export const saveEntries = async newEntries => {
  entries = [...newEntries];
};
export const addEntry = async entry => {
  const newEntry = { ...entry, id: Date.now().toString() };
  entries.push(newEntry);
  return newEntry;
};
export const updateEntry = async updatedEntry => {
  entries = entries.map(e => (e.id === updatedEntry.id ? updatedEntry : e));
};
export const deleteEntry = async id => {
  entries = entries.filter(e => e.id !== id);
};
