import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RNShake from 'react-native-shake';

export default function HomeScreen() {
  const [currentSpark, setCurrentSpark] = useState({ 
    title: "Toque ou Chacoalhe", 
    content: "Para receber sua dose de liderança." 
  });

  // Função temporária enquanto a engine não volta
  const generateSpark = () => {
    const mensagens = [
      { title: "Lidere pelo Exemplo", content: "Sua equipe faz o que você faz, não o que você diz." },
      { title: "Decisão Alpha", content: "Mais vale uma decisão rápida do que uma dúvida eterna." },
      { title: "Foco Total", content: "Onde o foco vai, a energia flui." }
    ];
    const sorteio = mensagens[Math.floor(Math.random() * mensagens.length)];
    setCurrentSpark(sorteio);
    console.log("Veredito gerado!"); 
  };

  useEffect(() => {
    const subscription = RNShake.addListener(() => {
      generateSpark();
    });
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{currentSpark.title}</Text>
        <Text style={styles.content}>{currentSpark.content}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={generateSpark}>
        <Text style={styles.buttonText}>GERAR FAÍSCA ⚡</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', padding: 20 },
  card: { backgroundColor: '#333', padding: 30, borderRadius: 15, width: '100%', marginBottom: 30, borderWidth: 1, borderColor: '#444' },
  title: { color: '#E6F4FE', fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  content: { color: '#ccc', fontSize: 18, textAlign: 'center', lineHeight: 26 },
  button: { backgroundColor: '#E6F4FE', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: '#1a1a1a', fontWeight: 'bold', fontSize: 16 }
});