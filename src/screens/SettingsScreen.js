import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, Button, Divider } from 'react-native-paper';
import { PERSISTENCE_TYPE } from '../persistence/persistenceConfig';

const persistenceOptions = [
  { label: 'In-Memory Only', value: 'memory' },
  { label: 'AsyncStorage', value: 'asyncStorage' },
  { label: 'SQLite', value: 'sqlite' },
];

export default function SettingsScreen({ navigation }) {
  const [selected, setSelected] = useState(PERSISTENCE_TYPE);

  const handleSave = () => {
    // Show instructions to user
    alert(
      `To switch persistence, open src/persistence/persistenceConfig.js and set PERSISTENCE_TYPE to '${selected}'.\n\nThen reload the app.\n\n(Currently, switching at runtime is not supported for safety.)`,
    );
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>
        Persistence Settings
      </Text>
      <Divider style={{ marginBottom: 16 }} />
      <RadioButton.Group onValueChange={setSelected} value={selected}>
        {persistenceOptions.map(opt => (
          <RadioButton.Item
            key={opt.value}
            label={opt.label}
            value={opt.value}
            status={selected === opt.value ? 'checked' : 'unchecked'}
          />
        ))}
      </RadioButton.Group>
      <Button mode="contained" style={{ marginTop: 24 }} onPress={handleSave}>
        Show Switch Instructions
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
});
