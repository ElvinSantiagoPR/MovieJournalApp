import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import EntryForm from '../components/EntryForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EntryFormScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        marginRight: insets.right,
        marginBottom: insets.bottom,
        marginLeft: insets.left,
      }}
    >
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Entry Form" />
      </Appbar.Header>
      <EntryForm navigation={navigation} route={route} />
    </View>
  );
};

export default EntryFormScreen;
