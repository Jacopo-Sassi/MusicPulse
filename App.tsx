import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';

import {usePlayerStore} from './src/store/usePlayerStore';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import MiniPlayer from './src/components/MiniPlayer';
import PlayerFull from './src/components/PlayerFull';

export default function App() {
  const videoRef = useRef<any>(null);
  const [activeTab, setActiveTab] = useState('Home'); // 'Home' o 'Search'
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);

  const {
    currentSong,
    isPaused,
    currentTime,
    duration,
    togglePlay,
    playNext,
    playPrevious,
    setDuration,
    setCurrentTime,
  } = usePlayerStore();

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* MOTORE AUDIO (Sempre attivo) */}
        {currentSong && (
          <Video
            ref={videoRef}
            source={{uri: currentSong.url}}
            paused={isPaused}
            playInBackground={true}
            style={{width: 0, height: 0}}
            onLoad={data => setDuration(data.duration)}
            onProgress={data => setCurrentTime(data.currentTime)}
            onEnd={playNext}
          />
        )}

        {/* CONTENUTO DINAMICO (Switch tra le schermate) */}
        <SafeAreaView style={{flex: 1}}>
          {activeTab === 'Home' ? <HomeScreen /> : <SearchScreen />}
        </SafeAreaView>

        {/* MINI PLAYER (Sopra la barra di navigazione) */}
        {currentSong && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsPlayerVisible(true)}>
            <MiniPlayer
              title={currentSong.title}
              artist={currentSong.artist}
              cover={currentSong.cover}
              isPaused={isPaused}
              currentTime={currentTime}
              duration={duration}
              onTogglePlay={e => {
                e.stopPropagation();
                togglePlay();
              }}
              onNext={e => {
                e.stopPropagation();
                playNext();
              }}
            />
          </TouchableOpacity>
        )}

        {/* BARRA DI NAVIGAZIONE MANUALE (Custom Tab Bar) */}
        <View style={styles.tabBar}>
          <TouchableOpacity
            onPress={() => setActiveTab('Home')}
            style={styles.tabItem}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Home' && styles.tabActive,
              ]}>
              🏠 Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Search')}
            style={styles.tabItem}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Search' && styles.tabActive,
              ]}>
              🔍 Cerca
            </Text>
          </TouchableOpacity>
        </View>

        {/* MODAL PLAYER FULL */}
        {currentSong && (
          <PlayerFull
            visible={isPlayerVisible}
            onClose={() => setIsPlayerVisible(false)}
            song={currentSong}
            currentTime={currentTime}
            duration={duration}
            formatTime={s => {
              const mins = Math.floor(s / 60);
              const secs = Math.floor(s % 60);
              return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }}
            isPaused={isPaused}
            onTogglePlay={togglePlay}
            onNext={playNext}
            onPrevious={playPrevious}
            onSeek={time => videoRef.current?.seek(time)}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#121212'},
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#181818',
    borderTopWidth: 1,
    borderTopColor: '#333',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {alignItems: 'center', justifyContent: 'center'},
  tabText: {color: '#b3b3b3', fontSize: 12, fontWeight: '600'},
  tabActive: {color: '#1DB954'},
});
