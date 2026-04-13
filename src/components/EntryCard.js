import { StyleSheet } from 'react-native';
import { Card, Title, Text, Button } from 'react-native-paper';

const EntryCard = ({ navigation, entry }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: entry.image }} />
      <Card.Content>
        <Title>{`${entry.title} (${entry.year})`}</Title>
        <Text>Genres: {entry.genres.join(', ')}</Text>
        <Text>Rating: {entry.rating}</Text>
        <Text>
          {entry.review.length > 250
            ? `${entry.review.substring(0, 250)}...`
            : entry.review}
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          mode="text"
          onPress={() => navigation.navigate('EntryViewScreen', { entry })}
        >
          View
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('EntryFormScreen', { entry })}
        >
          Edit
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
});

export default EntryCard;
