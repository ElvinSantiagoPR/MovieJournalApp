/**
 * PERSISTENCE_TYPE controls which backend is used for saving entries.
 *
 * Options:
 *   'memory'      - In-memory only (no persistence, resets on reload)
 *   'asyncStorage' - Uses @react-native-async-storage/async-storage (install with npm if needed)
 *   'sqlite'      - Uses react-native-sqlite-storage (install and link for bare React Native)
 *
 * To switch, change the value below and reload the app.
 * For 'sqlite', ensure you have installed and linked react-native-sqlite-storage:
 *   npm install react-native-sqlite-storage
 *   npx pod-install (for iOS)
 */
export const PERSISTENCE_TYPE = 'memory';
