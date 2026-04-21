import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// Aggiungi l'interfaccia per le Props
interface MiniPlayerProps {
  title: string;
  artist: string;
}

const MiniPlayer = ({ title, artist }: MiniPlayerProps) => {
  return (
    <View style={styles.container}>
      {/* Barra di progresso (sottile in alto) */}
      <View style={styles.progressBar}>
        <View style={[styles.progressLine, { width: '40%' }]} />
      </View>

      <View style={styles.content}>
        <View style={styles.songInfo}>
          <View style={styles.albumArtPlaceholder} />
          <View>
            <Text style={styles.title}>{title}</Text>
      <Text style={styles.artist}>{artist}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.icon}>⏮</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <Text style={styles.icon}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Esce dal flusso della lista e si ancora allo schermo
    bottom: 0,            // Si attacca al fondo
    width: '100%',
    backgroundColor: '#282828',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  progressBar: {
    height: 2,
    backgroundColor: '#555',
    width: '100%',
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#1DB954', // Verde MusicPulse
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: '100%',
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumArtPlaceholder: {
    width: 45,
    height: 45,
    backgroundColor: '#444',
    borderRadius: 4,
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 10,
  },
  playButton: {
    backgroundColor: '#fff',
    width: 35,
    height: 35,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  icon: {
    color: '#fff',
    fontSize: 18,
  },
  playIcon: {
    color: '#000',
    fontSize: 14,
    marginLeft: 2, // Piccola correzione ottica per centrare il triangolo
  },
});

export default MiniPlayer;