import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';

const EntryView = ({ navigation, route }) => {
  const entry = route.params?.entry || null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Cover style={styles.image} source={{ uri: entry.image }} />
        <Card.Content>
          <Title>{`${entry.title} (${entry.year})`}</Title>
          <Text>Genres: {entry.genres.join(', ')}</Text>
          <Text>Rating: {entry.rating}</Text>
          <Text>{entry.review}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'contain',
  },
});

export default EntryView;
