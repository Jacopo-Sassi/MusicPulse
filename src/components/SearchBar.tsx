import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native'; // <--- Aggiungi Text qui

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        {/* Usa il Text di React Native con la T maiuscola */}
        <Text style={styles.icon}>🔍</Text> 
        <TextInput
          style={styles.input}
          placeholder="Cerca brani o artisti..."
          placeholderTextColor="#b3b3b3"
          value={value}
          onChangeText={onChange}
          selectionColor="#1DB954"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#121212',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff', // Colore messo qui nello stile
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    height: '100%',
  },
});

export default SearchBar;