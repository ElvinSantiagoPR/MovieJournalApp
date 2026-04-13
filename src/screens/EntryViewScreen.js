import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import EntryView from '../components/EntryView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const EntryViewScreen = ({ navigation, route }) => {
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
        <Appbar.Content title="View Entry" />
      </Appbar.Header>
      <EntryView navigation={navigation} route={route} />
    </View>
  );
};

export default EntryViewScreen;
