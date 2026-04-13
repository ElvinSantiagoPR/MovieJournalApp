# MovieJournalApp

MovieJournalApp is a cross-platform mobile app for journaling and tracking movies you have watched, built with React Native, React Navigation, and SQLite for persistent storage. Movie entries are stored locally and can be managed offline.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or later recommended)
- **Yarn** or **npm**
- **Android Studio** (for Android) or **Xcode** (for iOS)
- **CocoaPods** (for iOS: run `sudo gem install cocoapods`)

### Setup & Run Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd MovieJournalApp
   ```
2. **Install dependencies:**
   ```sh
   yarn install
   # or
   npm install
   ```
3. **iOS setup:**
   - Navigate to the `ios` folder and install pods:
     ```sh
     cd ios && pod install && cd ..
     ```
   - Requires a Mac with Xcode installed.
4. **Run the app:**
   - **Android:**
     ```sh
     yarn android
     # or
     npm run android
     ```
   - **iOS:**
     ```sh
     yarn ios
     # or
     npm run ios
     ```

---

## ✨ Features

- **View Entries:** Browse a list of all your movie journal entries with titles, genres, and ratings.
- **Add/Edit Entries:** Create new entries or update existing ones with title, genre, rating, review, and date watched.
- **Delete Entries:** Remove entries from your journal.
- **Entry Details:** View detailed information for each movie entry.
- **Offline Support:** All data is stored locally using SQLite. You can add, edit, or delete entries offline.
- **Modern UI:** Built with React Native Paper for a clean and modern look.

## 🖥️ Screens

- **Entry List:** Main screen showing all movie entries. Tap an entry to view details. Use the + button to add a new entry.
- **Entry View:** Shows full details for a movie entry, with options to edit or delete.
- **Entry Form:** Used for both adding and editing entries, with validation for required fields.

## 🔄 Offline Support

- The app tracks all changes locally using SQLite.
- No remote sync is implemented by default, but the architecture allows for future integration.
- All features work offline; your data is always available.

---

## 🛠️ Tech Stack

- **React Native** for cross-platform mobile development
- **React Navigation** for screen navigation
- **React Native Paper** for UI components
- **SQLite** for local database storage (see below)
- **Redux Toolkit** for state management

## 📁 Project Structure

- `src/components/` — Reusable UI components (EntryCard, EntryForm, etc.)
- `src/constants/` — Static data (genres, etc.)
- `src/persistence/` — Storage logic (SQLite, AsyncStorage, etc.)
- `src/screens/` — App screens for navigation
- `src/state/` — Redux state management
- `App.js` — Main entry point

---

## 🗄️ Database

- **Database Used:** SQLite (see `src/persistence/sqlite.js`)
- **Initialization:** No manual steps required; the database is created automatically on first app launch.
- **Schema:** See `src/persistence/sqlite.js` for table structure and fields.

---

## 📝 Special Considerations

- **iOS:** Requires Xcode and CocoaPods. See setup steps above.
- **Android:** Requires Android Studio or an Android device/emulator.
- **Sync/Cloud:** No remote sync is implemented, but you can extend the app to add cloud sync if needed.

---

## ⚠️ Known Issues & Limitations

- No remote/cloud sync: All data is local only.
- The app is designed for demo/educational use; not all edge cases are handled.
- No authentication is implemented.
- Tested on Android emulator. Some device-specific issues may exist.

---

- Modify the SQLite schema in `src/persistence/sqlite.js` if you need to store more fields.

## 📚 License

This project is for educational purposes only and is not licensed for commercial use.
