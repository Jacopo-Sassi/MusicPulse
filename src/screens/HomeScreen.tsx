import React, {useEffect} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import SongCard from '../components/SongCard';
import {usePlayerStore} from '../store/usePlayerStore';

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

export default function HomeScreen() {
  const {setCurrentSong, setPlaylist} = usePlayerStore();

  useEffect(() => {
    setPlaylist(MOCK_DATA);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <SongCard
            title={item.title}
            artist={item.artist}
            coverUrl={item.cover}
            onPress={() => setCurrentSong(item)}
          />
        )}
        contentContainerStyle={{paddingBottom: 120, paddingTop: 20}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212', paddingHorizontal: 15},
});
