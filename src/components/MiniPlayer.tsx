import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

interface MiniPlayerProps {
  title: string;
  artist: string;
  cover?: string;
  isPaused: boolean;
  currentTime: number; // Aggiunto per mostrare il tempo attuale
  duration: number; // Aggiunto per mostrare la durata totale
  formatTime?: (seconds: number) => string; // Aggiunto per formattare il tempo
  onTogglePlay?: (e: any) => void; // Aggiunto 'e' per lo stopPropagation
  onNext?: (e: any) => void;
  onPrevious?: (e: any) => void;
}

const MiniPlayer = ({
  title,
  artist,
  cover,
  isPaused,
  onTogglePlay,
  onNext,
  onPrevious,
  currentTime,
  duration,
  formatTime,
}: MiniPlayerProps) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <View style={styles.container}>
      {/* Ora la barra è dinamica! */}
      <View style={styles.progressBar}>
        <View style={[styles.progressLine, {width: `${progressPercent}%`}]} />
      </View>

      <View style={styles.content}>
        <View style={styles.songInfo}>
          {cover ? (
            <Image source={{uri: cover}} style={styles.albumArt} />
          ) : (
            <View style={styles.albumArtPlaceholder} />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {artist}
            </Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrevious} style={styles.controlBtn}>
            <Text style={styles.skipIcon}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={onTogglePlay}>
            <Text style={styles.playPauseIcon}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext} style={styles.controlBtn}>
            <Text style={styles.skipIcon}>⏭</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#282828',
    height: 75, // Leggermente più alto per respirare meglio
    borderTopWidth: 1,
    borderTopColor: '#333',
    elevation: 10, // Ombra per Android
  },
  progressBar: {
    height: 2,
    backgroundColor: '#444',
    width: '100%',
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#1DB954',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    flex: 1, // Prende tutto lo spazio sotto la barra
  },
  songInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Permette ai testi di occupare lo spazio disponibile
  },
  textContainer: {
    marginLeft: 12,
    maxWidth: '65%', // Evita che il testo finisca sopra i bottoni
  },
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  albumArtPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: '#444',
    borderRadius: 4,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
    marginTop: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  controlBtn: {
    padding: 8, // Area di tocco più grande
  },
  skipIcon: {
    color: '#fff',
    fontSize: 22, // Ridotto da 35 (troppo grande)
  },
  playButton: {
    backgroundColor: '#fff',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playPauseIcon: {
    fontSize: 18, // Ridotto da 35 per stare nel cerchio
    color: '#000',
    // Correzione ottica: il Play sembra sempre un po' a sinistra
    paddingLeft: 2,
  },
});

export default MiniPlayer;
