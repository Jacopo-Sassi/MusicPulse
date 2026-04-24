import { create } from 'zustand';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
}

interface PlayerState {
  currentSong: Song | null;
  isPaused: boolean;
  duration: number;
  currentTime: number;
  playlist: Song[];
  
  // Azioni
  setPlaylist: (list: Song[]) => void;
  setCurrentSong: (song: Song) => void;
  setPaused: (paused: boolean) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null,
  isPaused: true,
  duration: 0,
  currentTime: 0,
  playlist: [],

  setPlaylist: (list) => set({ playlist: list }),
  
  setCurrentSong: (song) => set({ 
    currentSong: song, 
    isPaused: false, 
    currentTime: 0 
  }),
  
  setPaused: (paused) => set({ isPaused: paused }),
  setDuration: (duration) => set({ duration }),
  setCurrentTime: (time) => set({ currentTime: time }),
  
  togglePlay: () => set((state) => ({ isPaused: !state.isPaused })),

  playNext: () => {
    const { playlist, currentSong } = get();
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    get().setCurrentSong(playlist[nextIndex]);
  },

  playPrevious: () => {
    const { playlist, currentSong } = get();
    if (!currentSong) return;
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    get().setCurrentSong(playlist[prevIndex]);
  },
}));