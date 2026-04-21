import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

interface PlayerFullProps {
  visible: boolean;
  onClose: () => void;
  song: { title: string; artist: string; cover?: string };
  isPaused: boolean;
  onTogglePlay: () => void;
}

const PlayerFull = ({ visible, onClose, song, isPaused, onTogglePlay }: PlayerFullProps) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View style={styles.container}>
        {/* Pulsante per chiudere */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeText}>⌄</Text>
        </TouchableOpacity>

        {/* Copertina Grande */}
        <View style={styles.coverContainer}>
          <View style={styles.bigCover}>
            <Text style={styles.placeholderIcon}>🎵</Text>
          </View>
        </View>

        {/* Info Canzone */}
        <View style={styles.songInfo}>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>

        {/* Timeline (Placeholder) */}
        <View style={styles.timelineContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressLine, { width: '30%' }]} />
          </View>
          <View style={styles.timeInfo}>
            <Text style={styles.timeText}>0:45</Text>
            <Text style={styles.timeText}>-3:20</Text>
          </View>
        </View>

        {/* Controlli Principali */}
        <View style={styles.mainControls}>
          <Text style={styles.sideIcon}>Shuffle</Text>
          <Text style={styles.playIcon}>⏮</Text>
          <TouchableOpacity style={styles.bigPlayButton} onPress={onTogglePlay}>
            <Text style={{ fontSize: 30 }}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>
          <Text style={styles.playIcon}>⏭</Text>
          <Text style={styles.sideIcon}>Repeat</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
  },
  closeButton: {
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 40,
  },
  coverContainer: {
    alignItems: 'center',
  },
  bigCover: {
    width: 300,
    height: 300,
    backgroundColor: '#282828',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  placeholderIcon: { fontSize: 80 },
  songInfo: {
    alignItems: 'flex-start',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 20,
    marginTop: 5,
  },
  timelineContainer: {
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bigPlayButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: { color: '#fff', fontSize: 35 },
  sideIcon: { color: '#1DB954', fontSize: 12, fontWeight: 'bold' },
});

export default PlayerFull;