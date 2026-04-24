import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import SearchBar from '../components/SearchBar';
import SongCard from '../components/SongCard';
import {usePlayerStore} from '../store/usePlayerStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const {playlist, setCurrentSong} = usePlayerStore();

  const filtered = playlist.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <SearchBar value={query} onChange={setQuery} />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongCard
            title={item.title}
            artist={item.artist}
            coverUrl={item.cover}
            onPress={() => setCurrentSong(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', paddingTop: 20},
});
