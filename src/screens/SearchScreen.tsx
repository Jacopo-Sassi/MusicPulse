import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import { usePlayerStore } from '../store/usePlayerStore';
import { searchTracks } from '../services/spotifyApi';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { setCurrentSong, setPlaylist } = usePlayerStore();

  // Effetto che scatta quando cambia la query
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.length > 2) {
        setIsLoading(true);
        const tracks = await searchTracks(query);
        setResults(tracks);
        setPlaylist(tracks); // Aggiorniamo la playlist dello store per permettere il "Next"
        setIsLoading(false);
      } else {
        setResults([]);
      }
    }, 500); // Aspetta 500ms dall'ultima lettera digitata

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#1DB954" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SongCard 
              title={item.title} 
              artist={item.artist} 
              coverUrl={item.cover}
              onPress={() => setCurrentSong(item)}
            />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>
              {query.length > 2 ? "Nessun risultato trovato" : "Cerca i tuoi brani preferiti"}
            </Text>
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingTop: 10 },
  emptyText: { color: '#b3b3b3', textAlign: 'center', marginTop: 50, fontSize: 16 },
});