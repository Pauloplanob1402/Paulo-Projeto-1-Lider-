
import PushNotification from 'react-native-push-notification';
import sparks from '../data/sparks.json';

// Function to get the first sentence of a text
const getFirstSentence = (text) => {
  if (!text) return '';
  const firstLine = text.split('\n')[0]; // Get the first line
  const sentenceMatch = firstLine.match(/[^.!?]*[.!?]/); // Get the first sentence
  return sentenceMatch ? sentenceMatch[0] : firstLine;
};

PushNotification.createChannel(
  {
    channelId: 'spark-daily', // (required)
    channelName: 'Spark Daily', // (required)
    channelDescription: 'A channel for daily sparks', // (optional) default: undefined.
    importance: 4, // (optional) default: 4. Defines whether a notification is of high importance or not.
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  (created) => console.log(`createChannel 'spark-daily' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

export const scheduleDailyNotification = () => {
  const randomSpark = sparks[Math.floor(Math.random() * sparks.length)];
  const notificationMessage = getFirstSentence(randomSpark.text);

  PushNotification.cancelAllLocalNotifications(); // Clear previous notifications
  PushNotification.localNotificationSchedule({
    channelId: 'spark-daily',
    title: '✨ Your Daily Spark ✨',
    message: notificationMessage,
    date: new Date(new Date().setHours(7, 0, 0, 0)), // 7:00 AM
    repeatType: 'day',
    vibrate: true,
    vibration: 300,
  });
};
