import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ChatBubble = ({item: {msg, isSent, timestamp}}) => {
  const date = new Date(timestamp).toLocaleString('en-in', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return isSent ? (
    <View
      style={{
        alignSelf: 'flex-end',
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#F0C0A7',
          backgroundColor: '#F0C0A7',
          borderRadius: 25,
          alignSelf: 'flex-end',
          margin: 8,
          padding: 8,
          paddingHorizontal: 18,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: 'white',
          }}>
          {msg}
        </Text>
      </View>
      <View
        style={{
          // margin: 8,
          // padding: 8,
          // borderWidth: 1,
          // borderColor: '#F0C0A7',
          paddingHorizontal: 18,
          alignSelf: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 12,
          }}>
          {date}
        </Text>
      </View>
    </View>
  ) : (
    <View
      style={{
        alignSelf: 'flex-start',
      }}>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#DDDBAB',
          backgroundColor: '#DDDBAB',
          borderRadius: 25,
          alignSelf: 'flex-start',
          margin: 8,
          padding: 8,
          paddingHorizontal: 18,
        }}>
        <Text
          style={{
            fontSize: 15,
          }}>
          {msg}
        </Text>
      </View>
      <View
        style={{
          // margin: 8,
          // padding: 8,
          // borderWidth: 1,
          // borderColor: '#F0C0A7',
          paddingHorizontal: 18,
          alignSelf: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 12,
          }}>
          {date}
        </Text>
      </View>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({});
