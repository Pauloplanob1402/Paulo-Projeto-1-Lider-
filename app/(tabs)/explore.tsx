import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { ScrollView, StyleSheet } from 'react-native';

export default function TabTwoScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.text}>
        Área de expansão do Spark Líder Alpha. 
        Aqui você poderá configurar as notificações e sons futuramente.
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 8,
  },
  text: {
    color: '#ccc',
    fontSize: 16,
  }
});