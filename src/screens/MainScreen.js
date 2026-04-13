import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import EntrySearchAndResults from '../components/EntrySearchAndResults';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainScreen = ({ navigation, route }) => {
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
        <Appbar.Content title="My Movie Journal" />
        <Appbar.Action
          icon="cog"
          accessibilityLabel="Settings"
          onPress={() => navigation.navigate('SettingsScreen')}
        />
      </Appbar.Header>
      <EntrySearchAndResults navigation={navigation} route={route} />
    </View>
  );
};

export default MainScreen;
