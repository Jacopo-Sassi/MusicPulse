import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface SongProps {
  title: string;
  artist: string;
  coverUrl?: string; // Il '?' lo rende opzionale
  onPress: () => void;
}

const SongCard = ({ title, artist, coverUrl, onPress }: SongProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Immagine Album o Placeholder */}
      <View style={styles.albumArt}>
        {coverUrl ? (
          <Image source={{ uri: coverUrl }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderIcon}>🎵</Text>
        )}
      </View>

      {/* Testi */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>

      {/* Icona Opzioni (I tre puntini stile Spotify) */}
      <Text style={styles.moreIcon}>⋮</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
  },
  albumArt: {
    width: 55,
    height: 55,
    backgroundColor: '#282828',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  placeholderIcon: {
    fontSize: 24,
  },
  info: {
    flex: 1, // Prende tutto lo spazio centrale
    marginLeft: 15,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  artist: {
    color: '#B3B3B3',
    fontSize: 14,
    marginTop: 2,
  },
  moreIcon: {
    color: '#B3B3B3',
    fontSize: 20,
    padding: 10,
  },
});

export default SongCard;