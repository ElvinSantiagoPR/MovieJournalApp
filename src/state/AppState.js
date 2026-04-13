import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { entries as initialEntries } from '../constants/entries';
import { getPersistenceBackend } from '../persistence';
import { PERSISTENCE_TYPE } from '../persistence/persistenceConfig';

const persistence = getPersistenceBackend(PERSISTENCE_TYPE);

function sortEntries(entries) {
  return [...entries].sort((a, b) => b.year.localeCompare(a.year));
}

const AppStateContext = createContext(null);

export const AppStateProvider = ({ children }) => {
  const [entries, setEntries] = useState(sortEntries(initialEntries));
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermHistory, setSearchTermHistory] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const filteredEntries = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    if (!normalized) return entries;
    return entries.filter(entry => {
      const haystack = [
        entry.title,
        entry.year,
        entry.rating,
        entry.review,
        ...(entry.genres || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [entries, searchTerm]);

  const resultsCount = filteredEntries.length;
  const totalPages = Math.max(1, Math.ceil(resultsCount / resultsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEntries = useMemo(() => {
    const start = (safeCurrentPage - 1) * resultsPerPage;
    return filteredEntries.slice(start, start + resultsPerPage);
  }, [filteredEntries, resultsPerPage, safeCurrentPage]);

  const saveEntry = async entryData => {
    const normalizedEntry = {
      ...entryData,
      image: entryData.image.trim(),
      title: entryData.title.trim(),
      year: entryData.year.trim(),
      rating: entryData.rating.trim(),
      review: entryData.review.trim(),
      genres: [...entryData.genres].sort((a, b) => a.localeCompare(b)),
    };
    let createdEntry;
    if (normalizedEntry.id) {
      await persistence.updateEntry(normalizedEntry);
      setEntries(previous =>
        sortEntries(
          previous.map(entry =>
            entry.id === normalizedEntry.id ? normalizedEntry : entry,
          ),
        ),
      );
      createdEntry = normalizedEntry;
    } else {
      createdEntry = await persistence.addEntry(normalizedEntry);
      setEntries(previous => sortEntries([...previous, createdEntry]));
    }
    return createdEntry;
  };

  const deleteEntry = async id => {
    await persistence.deleteEntry(id);
    setEntries(previous => previous.filter(entry => entry.id !== id));
  };

  useEffect(() => {
    const load = async () => {
      try {
        if (persistence.initDatabase) await persistence.initDatabase();
        const loaded = await persistence.loadEntries();
        setEntries(loaded);
      } catch (e) {
        setEntries(initialEntries);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    if (!loading && persistence.saveEntries) {
      persistence.saveEntries(entries);
    }
  }, [entries, loading]);

  return (
    <AppStateContext.Provider
      value={{
        entries,
        setEntries,
        searchTerm,
        setSearchTerm,
        searchTermHistory,
        setSearchTermHistory,
        resultsPerPage,
        setResultsPerPage,
        currentPage,
        setCurrentPage,
        filteredEntries,
        resultsCount,
        totalPages,
        paginatedEntries,
        saveEntry,
        deleteEntry,
        loading,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
