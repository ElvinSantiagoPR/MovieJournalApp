import React from 'react';
import { View } from 'react-native';
import { Searchbar, Button, Text } from 'react-native-paper';
import { Dropdown } from 'react-native-paper-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchTerm,
  addSearchTermHistory,
  setResultsPerPage,
  setCurrentPage,
  setResults,
  setResultsCount,
} from '../appSlice';
import { entries } from '../constants/entries';
import EntryCard from './EntryCard';
import { StyleSheet, FlatList } from 'react-native';

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  searchbar: { flex: 1, marginRight: 8 },
  newButton: { marginVertical: 8 },
  list: { paddingBottom: 16 },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  pageInfo: { marginHorizontal: 12 },
});

const EntrySearchAndResults = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(state => state.app.searchTerm);
  const resultsPerPage = useSelector(state => state.app.resultsPerPage);
  const currentPage = useSelector(state => state.app.currentPage);
  const results = useSelector(state => state.app.results);
  const resultsCount = useSelector(state => state.app.resultsCount);

  // Filter entries by searchTerm
  const filteredEntries = entries.filter(entry => {
    const haystack = [
      entry.title,
      entry.year,
      entry.rating,
      entry.review,
      ...(entry.genres || []),
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(searchTerm.trim().toLowerCase());
  });

  // Pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEntries.length / resultsPerPage),
  );
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
  );

  // Update results and resultsCount in Redux
  React.useEffect(() => {
    dispatch(setResults(paginatedEntries));
    dispatch(setResultsCount(filteredEntries.length));
  }, [searchTerm, resultsPerPage, currentPage, entries]);

  const handleSearchChange = text => {
    dispatch(setSearchTerm(text));
    if (text && text !== searchTerm) {
      dispatch(addSearchTermHistory(text));
    }
    dispatch(setCurrentPage(1));
  };

  const handleResultsPerPageChange = value => {
    dispatch(setResultsPerPage(Number(value)));
    dispatch(setCurrentPage(1));
  };

  const handlePageChange = type => {
    if (type === 'first') dispatch(setCurrentPage(1));
    else if (type === 'prev' && currentPage > 1)
      dispatch(setCurrentPage(currentPage - 1));
    else if (type === 'next' && currentPage < totalPages)
      dispatch(setCurrentPage(currentPage + 1));
    else if (type === 'last') dispatch(setCurrentPage(totalPages));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Searchbar
          placeholder="Search"
          style={styles.searchbar}
          value={searchTerm}
          onChangeText={handleSearchChange}
        />
        <Button
          mode="contained"
          style={styles.newButton}
          onPress={() =>
            navigation.navigate('EntryFormScreen', { entry: null })
          }
        >
          New Entry
        </Button>
      </View>
      <Dropdown
        label="Results per Page"
        value={resultsPerPage.toString()}
        options={[
          { label: '10', value: '10' },
          { label: '20', value: '20' },
          { label: '50', value: '50' },
        ]}
        onValueChange={handleResultsPerPageChange}
      />
      <FlatList
        data={results}
        keyExtractor={(item, i) => item.id || i.toString()}
        renderItem={({ item }) => (
          <EntryCard navigation={navigation} entry={item} />
        )}
        contentContainerStyle={styles.list}
      />
      <View style={styles.pagination}>
        <Button mode="contained" onPress={() => handlePageChange('first')}>
          First
        </Button>
        <Button mode="contained" onPress={() => handlePageChange('prev')}>
          Previous
        </Button>
        <Text style={styles.pageInfo}>
          {currentPage} / {totalPages || 1}
        </Text>
        <Button mode="contained" onPress={() => handlePageChange('next')}>
          Next
        </Button>
        <Button mode="contained" onPress={() => handlePageChange('last')}>
          Last
        </Button>
      </View>
    </View>
  );
};

export default EntrySearchAndResults;
