import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';

// I nostri componenti
import SongCard from './src/components/SongCard';
import MiniPlayer from './src/components/MiniPlayer';
import PlayerFull from './src/components/PlayerFull';
import SearchBar from './src/components/SearchBar';

// Dati di prova per MusicPulse
const MOCK_PLAYLIST = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    cover: 'https://placehold.co/300/282828/fff?text=M83',
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    cover: 'https://placehold.co/300/282828/fff?text=TW',
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://placehold.co/300/282828/fff?text=BL',
  },
  {
    id: '4',
    title: 'One More Time',
    artist: 'Daft Punk',
    cover: 'https://placehold.co/300/282828/fff?text=DP',
  },
];

export default function App() {
  // --- STATI ---
  const [currentSong, setCurrentSong] = useState(MOCK_PLAYLIST[0]);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- LOGICA ---
  const filteredPlaylist = MOCK_PLAYLIST.filter(
    song =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const playSong = (song: any) => {
    setCurrentSong(song);
    setIsPaused(false); // Fai partire la musica appena clicchi
  };

  const togglePlay = () => {
    setIsPaused(!isPaused);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* Motore Audio Invisibile */}
        <Video
          source={{
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          }}
          paused={isPaused}
          playInBackground={true}
          ignoreSilentSwitch={'ignore'}
          style={{width: 0, height: 0}}
          onLoad={() => console.log('Musica caricata! ✅')}
          onError={e => console.log('Errore audio:', e)}
        />

        {/* UI: Ricerca */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* UI: Lista Canzoni */}
        <FlatList
          data={filteredPlaylist}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <SongCard
              title={item.title}
              artist={item.artist}
              coverUrl={item.cover}
              onPress={() => playSong(item)}
            />
          )}
          contentContainerStyle={styles.listPadding}
        />

        {/* UI: MiniPlayer (cliccabile per aprire il PlayerFull) */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsPlayerVisible(true)}>
          <MiniPlayer title={currentSong.title} artist={currentSong.artist} />
        </TouchableOpacity>

        {/* UI: Player a tutto schermo (Modal) */}
        <PlayerFull
          visible={isPlayerVisible}
          onClose={() => setIsPlayerVisible(false)}
          song={currentSong}
          isPaused={isPaused}
          onTogglePlay={togglePlay}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  listPadding: {
    paddingBottom: 100, // Spazio per non far coprire l'ultima canzone dal MiniPlayer
  },
});
