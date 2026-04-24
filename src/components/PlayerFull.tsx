import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');

interface PlayerFullProps {
  visible: boolean;
  onClose: () => void;
  song: {title: string; artist: string; cover?: string};
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  isPaused: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
}

const PlayerFull = ({
  visible,
  onClose,
  song,
  currentTime,
  duration,
  formatTime,
  isPaused,
  onTogglePlay,
  onNext,
  onPrevious,
  onSeek,
}: PlayerFullProps) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const albumAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(albumAnim, {
      toValue: isPaused ? 0.8 : 1, // Si rimpicciolisce al 80% se in pausa
      useNativeDriver: true,
    }).start();
  }, [isPaused]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen">
      <View style={styles.container}>
        <View style={styles.backgroundGlow} />
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>⌄</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MUSIC PULSE</Text>
          <View style={{width: 40}} />
        </View>

        <View style={styles.coverContainer}>
          <Animated.Image
            source={{
              uri:
                song.cover ||
                'https://placehold.co/600/282828/fff?text=MusicPulse',
            }}
            style={[
              styles.albumArt,
              {transform: [{scale: albumAnim}]}, // Animazione di scala per effetto "pulsante"
            ]}
          />
        </View>

        <View style={styles.songDetails}>
          <Text style={styles.title} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>

        {/* Timeline e Progress Bar Interattiva */}
        <View style={styles.timelineArea}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.progressBarBg}
            onPress={e => {
              // Calcolo della posizione del tocco
              const touchX = e.nativeEvent.locationX; // Coordinata X del tocco sulla barra
              const barWidth = width - 50; // Larghezza totale della barra (calcolata dai padding)

              // Proporzione: (tocco / larghezza) * durata totale
              const newTime = (touchX / barWidth) * duration;

              if (newTime >= 0 && newTime <= duration) {
                onSeek(newTime);
              }
            }}>
            <View
              style={[styles.progressLine, {width: `${progressPercent}%`}]}
            />

            {/* Pallino dello slider (opzionale per estetica) */}
            <View
              style={[styles.progressKnob, {left: `${progressPercent}%`}]}
            />
          </TouchableOpacity>

          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <TouchableOpacity>
            <Text style={styles.secondaryIcon}>shuffle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPrevious}>
            <Text style={styles.skipIcon}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={onTogglePlay}>
            <Text style={styles.playPauseText}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onNext}>
            <Text style={styles.skipIcon}>⏭</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.secondaryIcon}>repeat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerIcons}>
          <Text style={styles.bottomIcon}>🎧</Text>
          <Text style={styles.bottomIcon}>📋</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {padding: 10},
  closeIcon: {color: '#fff', fontSize: 35},
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  coverContainer: {alignItems: 'center', marginVertical: 20},
  albumArt: {
    width: width - 60,
    height: width - 60,
    borderRadius: 8,
    backgroundColor: '#282828',
  },
  songDetails: {alignItems: 'flex-start', width: '100%'},
  title: {color: '#fff', fontSize: 26, fontWeight: 'bold'},
  artist: {color: '#b3b3b3', fontSize: 18, marginTop: 4},
  timelineArea: {width: '100%', marginTop: 20},
  progressBarBg: {
    height: 6, // Leggermente più alta per facilitare il tocco
    backgroundColor: '#3e3e3e',
    borderRadius: 3,
    justifyContent: 'center', // Centra la linea interna
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#1DB954', // Verde Spotify
    borderRadius: 3,
  },
  progressKnob: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginLeft: -6, // Centra il pallino sulla fine della linea
  },
  timeLabels: {
    flexDirection: 'row', // Mette i due testi sulla stessa riga
    justifyContent: 'space-between', // Spinge uno a sinistra e uno a destra
    marginTop: 10, // Distanza dalla barra di progresso
  },
  timeText: {color: '#b3b3b3', fontSize: 12},
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  playButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playPauseText: {fontSize: 35, color: '#000'},
  skipIcon: {color: '#fff', fontSize: 35},
  secondaryIcon: {color: '#1DB954', fontSize: 12, fontWeight: 'bold'},
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottomIcon: {color: '#b3b3b3', fontSize: 20},
  backgroundGlow: {
    position: 'absolute',
    top: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    backgroundColor: '#1DB954',
    opacity: 0.1,
    alignSelf: 'center',
  },
});

export default PlayerFull;
