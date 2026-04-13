import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Chip, Surface, Text } from 'react-native-paper';
import { genres as allGenres } from '../constants/genres';
import { entries } from '../constants/entries';
import { setResults, setResultsCount } from '../appSlice';

const EntryForm = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const entry = route.params?.entry || null;
  const [formState, setFormState] = useState(
    entry || {
      image: '',
      title: '',
      year: '',
      genres: [],
      rating: '',
      review: '',
    },
  );
  const [errors, setErrors] = useState({});

  const validateEntry = formState => {
    const errors = {};
    if (!formState.title.trim()) errors.title = 'Title is required.';
    if (!/^\d{4}$/.test(formState.year.trim()))
      errors.year = 'Year must be a 4-digit value.';
    const ratingValue = Number(formState.rating);
    if (
      formState.rating.trim() === '' ||
      Number.isNaN(ratingValue) ||
      ratingValue < 0 ||
      ratingValue > 10
    ) {
      errors.rating = 'Rating must be a number between 0 and 10.';
    }
    if (!formState.genres.length) errors.genres = 'Select at least one genre.';
    if (!formState.review.trim()) errors.review = 'Review is required.';
    return errors;
  };

  const handleSave = () => {
    const validationErrors = validateEntry(formState);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Save or update entry in entries array (simulate Redux logic)
      let updatedEntries;
      if (formState.id) {
        updatedEntries = entries.map(e =>
          e.id === formState.id ? { ...formState } : e,
        );
      } else {
        updatedEntries = [
          ...entries,
          { ...formState, id: Date.now().toString() },
        ];
      }
      dispatch(setResults(updatedEntries));
      dispatch(setResultsCount(updatedEntries.length));
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    if (entry && entry.id) {
      Alert.alert(
        'Delete Entry',
        'Are you sure you want to delete this entry?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              const updatedEntries = entries.filter(e => e.id !== entry.id);
              dispatch(setResults(updatedEntries));
              dispatch(setResultsCount(updatedEntries.length));
              navigation.goBack();
            },
          },
        ],
      );
    }
  };

  const handleReset = () => {
    setFormState(
      entry || {
        image: '',
        title: '',
        year: '',
        genres: [],
        rating: '',
        review: '',
      },
    );
    setErrors({});
  };

  const toggleGenre = genre => {
    setFormState(prev => {
      const alreadySelected = prev.genres.includes(genre);
      return {
        ...prev,
        genres: alreadySelected
          ? prev.genres.filter(item => item !== genre)
          : [...prev.genres, genre],
      };
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Image URL"
        mode="outlined"
        style={styles.input}
        value={formState.image}
        onChangeText={text => setFormState(prev => ({ ...prev, image: text }))}
      />
      <TextInput
        label="Title"
        mode="outlined"
        style={styles.input}
        value={formState.title}
        onChangeText={text => setFormState(prev => ({ ...prev, title: text }))}
        error={!!errors.title}
      />
      {errors.title && (
        <Text style={{ color: 'red', marginLeft: 15 }}>{errors.title}</Text>
      )}
      <TextInput
        label="Year"
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        value={formState.year}
        onChangeText={text => setFormState(prev => ({ ...prev, year: text }))}
        error={!!errors.year}
      />
      {errors.year && (
        <Text style={{ color: 'red', marginLeft: 15 }}>{errors.year}</Text>
      )}
      <Text variant="bodyLarge" style={{ marginBottom: 5, marginLeft: 15 }}>
        Genres
      </Text>
      <Surface style={styles.genreContainer}>
        {allGenres.map((genre, idx) => (
          <Chip
            key={idx}
            style={styles.chip}
            selected={formState.genres.includes(genre)}
            onPress={() => toggleGenre(genre)}
          >
            {genre}
          </Chip>
        ))}
      </Surface>
      {errors.genres && (
        <Text style={{ color: 'red', marginLeft: 15 }}>{errors.genres}</Text>
      )}
      <TextInput
        label="Rating"
        keyboardType="decimal-pad"
        mode="outlined"
        style={styles.input}
        value={formState.rating}
        onChangeText={text => setFormState(prev => ({ ...prev, rating: text }))}
        error={!!errors.rating}
      />
      {errors.rating && (
        <Text style={{ color: 'red', marginLeft: 15 }}>{errors.rating}</Text>
      )}
      <TextInput
        label="Review"
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.reviewInput}
        value={formState.review}
        onChangeText={text => setFormState(prev => ({ ...prev, review: text }))}
        error={!!errors.review}
      />
      {errors.review && (
        <Text style={{ color: 'red', marginLeft: 15 }}>{errors.review}</Text>
      )}
      <Surface style={styles.actions}>
        {entry && <Button onPress={handleDelete}>Delete</Button>}
        <Button onPress={handleReset}>Reset</Button>
        <Button onPress={handleSave}>Save</Button>
        <Button onPress={() => navigation.goBack()}>Cancel</Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { marginBottom: 12 },
  reviewInput: { marginBottom: 12, height: 120 },
  genreContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    padding: 8,
  },
  chip: { margin: 4 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default EntryForm;
