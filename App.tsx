import React, { useRef, useEffect } from 'react';
import { StyleSheet, FlatList, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';

// Hooks e Store
import { usePlayerStore } from './src/store/usePlayerStore';

// Componenti
import SongCard from './src/components/SongCard';
import MiniPlayer from './src/components/MiniPlayer';
import PlayerFull from './src/components/PlayerFull';
import SearchBar from './src/components/SearchBar';

const MOCK_DATA = [
  {
    id: '1',
    title: 'Midnight Drive',
    artist: 'The Midnight',
    cover:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Lofi Rain',
    artist: 'Chillhop Music',
    cover:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Neon Skyline',
    artist: 'Synthwave Express',
    cover:
      'https://images.unsplash.com/photo-1518131672697-613becd4fab5?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Deep Space',
    artist: 'Tycho',
    cover:
      'https://images.unsplash.com/photo-1462332420958-a05d1e002413?q=80&w=500&auto=format',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
];
export default function App() {
  const videoRef = useRef<React.ElementRef<typeof Video>>(null);
  
  // Estraiamo tutto quello che ci serve dallo Store
  const { 
    currentSong, isPaused, currentTime, duration,
    setCurrentSong, setPaused, setDuration, setCurrentTime,
    togglePlay, playNext, playPrevious, setPlaylist
  } = usePlayerStore();

  const [isPlayerVisible, setIsPlayerVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  // Inizializziamo la playlist nello store al caricamento
  useEffect(() => {
    setPlaylist(MOCK_DATA);
    if (!currentSong) setCurrentSong(MOCK_DATA[0]);
  }, []);

  const filteredPlaylist = MOCK_DATA.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {currentSong && (
          <Video
            ref={videoRef}
            source={{ uri: currentSong.url }}
            paused={isPaused}
            playInBackground={true}
            style={{ width: 0, height: 0 }}
            onLoad={(data) => setDuration(data.duration)}
            onProgress={(data) => setCurrentTime(data.currentTime)}
            onEnd={playNext}
          />
        )}

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        <FlatList
          data={filteredPlaylist}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongCard 
              title={item.title} 
              artist={item.artist} 
              coverUrl={item.cover}
              onPress={() => setCurrentSong(item)}
            />
          )}
          contentContainerStyle={styles.listPadding}
        />

        {currentSong && (
          <TouchableOpacity activeOpacity={0.9} onPress={() => setIsPlayerVisible(true)}>
            <MiniPlayer 
              title={currentSong.title} 
              artist={currentSong.artist}
              cover={currentSong.cover}
              isPaused={isPaused}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={(e) => { e.stopPropagation(); togglePlay(); }}
              onNext={(e) => { e.stopPropagation(); playNext(); }}
            />
          </TouchableOpacity>
        )}

        {currentSong && (
          <PlayerFull 
            visible={isPlayerVisible} 
            onClose={() => setIsPlayerVisible(false)} 
            song={currentSong}
            currentTime={currentTime}
            duration={duration}
            formatTime={(s) => {
              const mins = Math.floor(s / 60);
              const secs = Math.floor(s % 60);
              return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }}
            isPaused={isPaused}
            onTogglePlay={togglePlay}
            onNext={playNext}
            onPrevious={playPrevious}
            onSeek={(time) => videoRef.current?.seek(time)}
          />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  listPadding: { paddingBottom: 100 },
});