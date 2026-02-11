
import React, { useEffect, useState } from 'react';
import { Share, StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';
import { scheduleDailyNotification } from '../src/services/notification';
import { getStreak, updateStreak } from '../src/utils/streakCounter';

import sparks from '../src/data/sparks.json';

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
        console.log("Erro na inicialização nativa, mas o app segue...");
      }
    };
    initApp();
  }, []);

  const generateSpark = () => {
    const sorteio = sparks[Math.floor(Math.random() * sparks.length)];
    setCurrentSpark(sorteio);
    Vibration.vibrate(100); 
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${currentSpark.text}\n\n— Spark • Líder Alpha ⚡`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.topInfo}>
        <Text style={styles.header}>⚡ SPARK LÍDER ALPHA</Text>
        <Text style={styles.counter}>#{currentSpark.id}/{sparks.length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.quoteMark}>“</Text>
        <Text style={styles.content}>{currentSpark.text}</Text>
        <Text style={[styles.quoteMark, { textAlign: 'right' }]}>”</Text>
      </View>

      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {streak} DIAS SEGUIDOS</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={generateSpark}>
          <Text style={styles.buttonText}>GERAR FAÍSCA ⚡</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>COMPARTILHAR 🔗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 60, paddingHorizontal: 25 },
  topInfo: { alignItems: 'center' },
  header: { color: '#fff', fontSize: 14, fontWeight: '900', letterSpacing: 4, opacity: 0.4 },
  counter: { color: '#2E86DE', fontSize: 12, fontWeight: 'bold', marginTop: 5 },
  card: { backgroundColor: '#111', padding: 30, borderRadius: 30, width: '100%', minHeight: 280, justifyContent: 'center', borderWidth: 1, borderColor: '#222' },
  quoteMark: { color: '#2E86DE', fontSize: 50, fontWeight: 'bold', opacity: 0.3, height: 40 },
  content: { color: '#E6F4FE', fontSize: 22, textAlign: 'center', lineHeight: 36, fontWeight: '600' },
  streakBadge: { backgroundColor: 'rgba(255, 165, 0, 0.1)', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255, 165, 0, 0.3)' },
  streakText: { color: '#FFA500', fontSize: 14, fontWeight: '900' },
  buttonContainer: { width: '100%', alignItems: 'center', gap: 15 },
  button: { backgroundColor: '#2E86DE', paddingVertical: 20, width: '90%', borderRadius: 40 },
  buttonText: { color: '#fff', fontWeight: '900', fontSize: 18, textAlign: 'center' },
  shareButton: { paddingVertical: 10 },
  shareText: { color: '#2E86DE', fontWeight: 'bold', fontSize: 14, opacity: 0.8 }
});
