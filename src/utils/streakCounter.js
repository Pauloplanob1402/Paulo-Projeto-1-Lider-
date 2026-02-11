
import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'streak_counter';
const LAST_OPEN_KEY = 'last_open_date';

export const updateStreak = async () => {
  const now = new Date();
  const lastOpenString = await AsyncStorage.getItem(LAST_OPEN_KEY);

  if (lastOpenString) {
    const lastOpen = new Date(lastOpenString);
    const diff = now.getTime() - lastOpen.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours >= 48) {
      // Zera o contador se passaram mais de 48 horas
      await AsyncStorage.setItem(STREAK_KEY, '1');
    } else if (hours >= 24) {
      // Incrementa o contador se passaram mais de 24 horas
      const currentStreak = await AsyncStorage.getItem(STREAK_KEY);
      const newStreak = currentStreak ? parseInt(currentStreak, 10) + 1 : 1;
      await AsyncStorage.setItem(STREAK_KEY, newStreak.toString());
    }
  } else {
    // Primeiro uso
    await AsyncStorage.setItem(STREAK_KEY, '1');
  }

  await AsyncStorage.setItem(LAST_OPEN_KEY, now.toISOString());
};

export const getStreak = async () => {
  const streak = await AsyncStorage.getItem(STREAK_KEY);
  return streak ? parseInt(streak, 10) : 0;
};
