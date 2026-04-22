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
    title: 'Midnight Drive',
    artist: 'The Midnight',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Lofi Rain',
    artist: 'Chillhop Music',
    cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Neon Skyline',
    artist: 'Synthwave Express',
    cover: 'https://images.unsplash.com/photo-1518131672697-613becd4fab5?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Deep Space',
    artist: 'Tycho',
    cover: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
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
    setCurrentTime(0); // <--- Reset della barra quando cambi brano
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Video
          source={{uri: currentSong.url}} // <--- Ora è dinamico!
          paused={isPaused}
          playInBackground={true}
          style={{width: 0, height: 0}}
          onLoad={data => setDuration(data.duration)}
          onProgress={data => setCurrentTime(data.currentTime)}
          onEnd={() => {
            // SFIDA: Cosa succede quando finisce la canzone?
            // Per ora mettiamo in pausa, poi vedremo come passare alla prossima.
            setIsPaused(true);
          }}
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
