import * as Haptics from 'expo-haptics';
import sparksData from '../data/sparks.json';

export const sparkEngine = {
  // 1. Engenharia de Seleção: Pega uma frase aleatória
  getRandomSpark: () => {
    const total = sparksData.length;
    const randomIndex = Math.floor(Math.random() * total);
    return sparksData[randomIndex];
  },

  // 2. Engenharia de Impacto: Vibração e Futuros Sons
  triggerAction: async () => {
    // Vibração tátil (dá sensação de qualidade ao app)
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    
    // Aqui no futuro chamaremos playSound1, 2 ou 3 
    console.log("Ação disparada: Som e Vibração");
  }
};