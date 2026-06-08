import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome to the Military Activity App</Text>
      <Button
        title="Go to Reports"
        onPress={() => navigation.navigate('Reports')}
      />
    </View>
  );
};

export default HomeScreen;
