import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper'; // Swiper kütüphanesini import et
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen'; // Anasayfa ekranı
import SignupScreen from './screens/SignupScreen'; // Kayıt ekranı
import PageScreen from './screens/Page'; // Page ekranı

const Stack = createStackNavigator();

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null); // İlk açılış durumunu tutmak için state

  useEffect(() => {
    // AsyncStorage'dan ilk açılış durumunu kontrol et
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // İlk açılışta "true" olarak ayarla
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null; // İlk durum yüklenirken boş bir ekran göster
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isFirstLaunch ? 'Onboarding' : 'Home'}>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Page" component={PageScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// Onboarding bileşeni
const OnboardingScreen = ({ navigation }) => {
  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false} dotStyle={styles.dot} activeDotStyle={styles.activeDot}>
      {/* Sayfa 1 */}
      <View style={styles.slide1}>
        <Text style={styles.text}>Bewertung jetzt ganz einfach löschen lassen mit einem Klick</Text>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Sayfa 2 */}
      <View style={styles.slide2}>
        <Image source={require('./assets/tree.png')} style={styles.image} />
        <Text style={styles.title}>Hear from our experts</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut.</Text>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.buttonText}>→</Text>
        </TouchableOpacity>
      </View>

      {/* Sayfa 3 */}
      <View style={styles.slide3}>
        <Text style={styles.text}>Get advice on when to buy and sell</Text>
        <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut.</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    backgroundColor: '#432c6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide2: {
    flex: 1,
    backgroundColor: '#432c6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide3: {
    flex: 1,
    backgroundColor: '#432c6f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    textAlign: 'center',
  },
  description: {
    color: '#c1a3e3',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  nextButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  startButton: {
    marginTop: 30,
    backgroundColor: '#4e4b59',
    padding: 15,
    borderRadius: 25,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

//Deneme