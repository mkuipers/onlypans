import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Comment = ({ comment }) => {

  return (
    <View style={styles.comment} key={comment.id}>
      <Text style={styles.author}>{comment.author}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  comment: {
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 10,
    width: '100%',

  },
  body: {
    fontSize: 12,
  },
  author: {
    color: 'gray',
    fontSize: 10,
  }
});

export default Comment;