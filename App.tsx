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

import SongCard from './src/components/SongCard';
import MiniPlayer from './src/components/MiniPlayer';
import PlayerFull from './src/components/PlayerFull';
import SearchBar from './src/components/SearchBar';

const MOCK_PLAYLIST = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    cover: 'https://placehold.co/600/282828/fff?text=M83',
  },
  {
    id: '2',
    title: 'Starboy',
    artist: 'The Weeknd',
    cover: 'https://placehold.co/600/282828/fff?text=TW',
  },
  {
    id: '3',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://placehold.co/600/282828/fff?text=BL',
  },
  {
    id: '4',
    title: 'One More Time',
    artist: 'Daft Punk',
    cover: 'https://placehold.co/600/282828/fff?text=DP',
  },
];

export default function App() {
  const [currentSong, setCurrentSong] = useState(MOCK_PLAYLIST[0]);
  const [isPaused, setIsPaused] = useState(true);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- NUOVI STATI PER IL TEMPO --- //
  const [currentTime, setCurrentTime] = useState(0); // <--- Secondi attuali
  const [duration, setDuration] = useState(0); // <--- Durata totale

  // Funzione per formattare i secondi (es. 125 -> 2:05)
  const formatTime = (seconds: number) => {
    // <--- Funzione helper
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const playSong = (song: any) => {
    setCurrentSong(song);
    setIsPaused(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Video
          source={{
            uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
          }}
          paused={isPaused}
          playInBackground={true}
          ignoreSilentSwitch={'ignore'}
          style={{width: 0, height: 0}}
          // GESTIONE TEMPO REALE //
          onLoad={data => setDuration(data.duration)} // <--- Prende la durata totale
          onProgress={data => setCurrentTime(data.currentTime)} // <--- Aggiorna il tempo ogni secondo
        />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FlatList
          data={MOCK_PLAYLIST.filter(s =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()),
          )}
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

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setIsPlayerVisible(true)}>
          <MiniPlayer title={currentSong.title} artist={currentSong.artist} />
        </TouchableOpacity>

        <PlayerFull
          visible={isPlayerVisible}
          onClose={() => setIsPlayerVisible(false)}
          song={currentSong}
          currentTime={currentTime} // <--- Passiamo il tempo attuale
          duration={duration} // <--- Passiamo la durata
          formatTime={formatTime} // <--- Passiamo la funzione di formattazione
          isPaused={isPaused}
          onTogglePlay={() => setIsPaused(!isPaused)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  listPadding: {paddingBottom: 100},
});
