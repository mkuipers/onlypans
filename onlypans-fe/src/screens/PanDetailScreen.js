import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Image } from 'react-native';

import * as SecureStore from 'expo-secure-store';

const PanDetailScreen = ({ route }) => {
  const [commentBody, setCommentBody] = useState('');
  const [pan, setPan] = useState(null);
  const [loading, setLoading] = useState(true);

  const { pan_id } = route.params;

  const fetchPan = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    const response = await fetch(`http://192.168.1.96:4000/api/v1/pans/${pan_id}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const data = await response.json();
    setPan(data);
    setLoading(false);
  };
  
  useEffect(() => {
    fetchPan();
  }, []);

  const handleSubmit = async () => {
    const userToken = await SecureStore.getItemAsync('userToken');
    try {
      const response = await fetch(`http://192.168.1.96:4000/api/v1/pans/${pan_id}/comments`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          comment: {
            body: commentBody,
            pan_id: pan_id,
          },
        }),
      });
      const json = await response.json();
      console.log('comment created:', json);
      await fetchPan();
      setCommentBody('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : <>
        <Image source={{ url: "http://192.168.1.96:4000" + pan.image_url }} style={styles.panImage} />
        <Text style={styles.title}>{pan.name}</Text>
        <Text style={styles.rating}>{pan.rating}</Text>
        <Text style={styles.description}>{pan.description}</Text>
        {console.log(pan)}
        {pan.comments && pan.comments.map((comment) => (
          <View style={styles.comment} key={comment.id}>
            <Text>{comment.body}</Text>
          </View>
        ))}
        <TextInput
          style={styles.input}
          placeholder="Enter your comment"
          value={commentBody}
          onChangeText={(text) => setCommentBody(text)}
        />
        <Button title="Submit Comment" onPress={handleSubmit} />
      </> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    fontSize: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  comment: {
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  panImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default PanDetailScreen;
