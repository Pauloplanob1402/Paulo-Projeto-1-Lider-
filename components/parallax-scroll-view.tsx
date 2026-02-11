import { ScrollView, View } from 'react-native';
export default function ParallaxScrollView({ children, headerBackgroundColor, headerImage }: any) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: headerBackgroundColor.dark }}>
      <View style={{ height: 250, justifyContent: 'center', alignItems: 'center' }}>
        {headerImage}
      </View>
      {children}
    </ScrollView>
  );
}