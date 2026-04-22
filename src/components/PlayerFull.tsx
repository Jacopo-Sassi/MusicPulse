import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface PlayerFullProps {
  visible: boolean;
  onClose: () => void;
  song: {
    title: string;
    artist: string;
    cover?: string;
  };
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  isPaused: boolean;
  onTogglePlay: () => void;
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
}: PlayerFullProps) => {
  // Calcolo della percentuale per la barra di progresso
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen">
      <View style={styles.container}>
        {/* Header: Pulsante chiudi e Titolo Playlist */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeIcon}>⌄</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>MUSIC PULSE</Text>
          <View style={{width: 40}} /> {/* Bilanciatore estetico */}
        </View>

        {/* Copertina Album */}
        <View style={styles.coverContainer}>
          <Image
            source={{
              uri:
                song.cover ||
                'https://placehold.co/600/282828/fff?text=MusicPulse',
            }}
            style={styles.albumArt}
          />
        </View>

        {/* Info Brano */}
        <View style={styles.songDetails}>
          <Text style={styles.title} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>

        {/* Timeline e Progress Bar */}
        <View style={styles.timelineArea}>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressLine, {width: `${progressPercent}%`}]}
            />
          </View>
          <View style={styles.timeLabels}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>

        {/* Controlli di riproduzione */}
        <View style={styles.controlsRow}>
          <TouchableOpacity>
            <Text style={styles.secondaryIcon}>shuffle</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.skipIcon}>⏮</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.playButton} onPress={onTogglePlay}>
            <Text style={styles.playPauseText}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.skipIcon}>⏭</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.secondaryIcon}>repeat</Text>
          </TouchableOpacity>
        </View>

        {/* Footer: Icone extra */}
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
  closeButton: {
    padding: 10,
  },
  closeIcon: {
    color: '#fff',
    fontSize: 35,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  coverContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  albumArt: {
    width: width - 60,
    height: width - 60,
    borderRadius: 8,
    backgroundColor: '#282828',
  },
  songDetails: {
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 18,
    marginTop: 4,
  },
  timelineArea: {
    width: '100%',
    marginTop: 20,
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#3e3e3e',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressLine: {
    height: '100%',
    backgroundColor: '#fff',
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 12,
  },
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
  playPauseText: {
    fontSize: 35,
    color: '#000',
  },
  skipIcon: {
    color: '#fff',
    fontSize: 35,
  },
  secondaryIcon: {
    color: '#1DB954',
    fontSize: 12,
    fontWeight: 'bold',
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  bottomIcon: {
    color: '#b3b3b3',
    fontSize: 20,
  },
});

export default PlayerFull;
