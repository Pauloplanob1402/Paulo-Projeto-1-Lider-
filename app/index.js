import { Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import sparks from '../src/data/sparks.json';
import { scheduleDailyNotification } from '../src/services/notification';
import { getStreak, updateStreak } from '../src/utils/streakCounter';

export default function HomeScreen() {
  const [currentSpark, setCurrentSpark] = useState({ 
    id: 1,
    text: "Exemplo inspira mais que discurso.\nAção valida palavras.\nSeja o padrão." 
  });
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const initApp = async () => {
      try {
        await updateStreak();
        const s = await getStreak();
        setStreak(s || 0);
        scheduleDailyNotification();
      } catch (err) {
        console.log("Sistema pronto.");
      }
    };
    initApp();
  }, []);

  // Lógica Alpha: Sorteio de 3 sons para o Veredito
  const playVereditoSound = async () => {
    try {
      const sounds = [
        require('../assets/sounds/som1.mp3'),
        require('../assets/sounds/som2.mp3'),
        require('../assets/sounds/som3.mp3'),
      ];
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      const { sound } = await Audio.Sound.createAsync(randomSound);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.log("Som desativado ou arquivo não encontrado.");
    }
  };

  const generateSpark = () => {
    const sorteio = sparks[Math.floor(Math.random() * sparks.length)];
    setCurrentSpark(sorteio);
    Vibration.vibrate(100); 
    playVereditoSound(); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ alignItems: 'center', marginTop: 40 }}>
        <Text style={styles.headerTitle}>⚡ SPARK LÍDER ALPHA</Text>
        <View style={styles.streakBadge}>
           <Text style={styles.streakText}>🔥 {streak} DIAS SEGUIDOS</Text>
        </View>
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>{currentSpark.text}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={generateSpark} activeOpacity={0.8}>
          <Text style={styles.buttonText}>GERAR FAÍSCA ⚡</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E90FF', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20 },
  headerTitle: { color: '#FFF', opacity: 0.5, letterSpacing: 4, fontWeight: 'bold', fontSize: 10 },
  quoteCard: { backgroundColor: '#0066FF', borderRadius: 25, padding: 35, alignItems: 'center', justifyContent: 'center', width: '100%', minHeight: 320, borderColor: '#FFD700', borderWidth: 1.5 },
  quoteText: { fontSize: 22, color: '#FFF', textAlign: 'center', lineHeight: 38, fontStyle: 'italic' },
  streakBadge: { backgroundColor: 'rgba(255, 215, 0, 0.1)', paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#FFD700', marginTop: 10 },
  streakText: { color: '#FFD700', fontSize: 12, fontWeight: '900' },
  buttonContainer: { width: '100%', alignItems: 'center' },
  button: { backgroundColor: '#FFD700', borderRadius: 35, width: '90%', paddingVertical: 20, alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 18, fontWeight: '900', letterSpacing: 1 }
});