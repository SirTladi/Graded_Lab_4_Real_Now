
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider } from './components/Screens/FormContext';
import { ThemeProvider } from './components/Screens/ThemeContext';
import { CartProvider } from './components/Screens/CartContext';
import { UserProvider } from './components/Screens/UserContext';
import MenuScreen from './components/Screens/MenuScreen';
import CartScreen from './components/Screens/CartScreen';
import ProfileScreen from './components/Screens/ProfileScreen';
import Form1Screen from './components/Screens/Form1Screen';
import Form2Screen from './components/Screens/Form2Screen';
import Form3Screen from './components/Screens/Form3Screen';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
    return (
        <UserProvider>
            <FormProvider>
                <ThemeProvider>
                    <CartProvider>
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName="MenuScreen">
                                <Stack.Screen
                                    name="MenuScreen"
                                    component={MenuScreen}
                                    options={({ navigation }) => ({
                                        headerRight: () => (
                                            <TouchableOpacity
                                                style={styles.headerButton}
                                                onPress={() => navigation.navigate('ProfileScreen')}
                                            >
                                                <Image
                                                    source={require('./components/Screens/Profile.jpeg')}
                                                    style={styles.profileImage}
                                                />
                                            </TouchableOpacity>
                                        ),
                                    })}
                                />
                                <Stack.Screen
                                    name="CartScreen"
                                    component={CartScreen}
                                    options={{ title: 'Your Cart' }}
                                />
                                <Stack.Screen
                                    name="ProfileScreen"
                                    component={ProfileScreen}
                                    options={{ title: 'Your Profile' }}
                                />
                                <Stack.Screen
                                    name="Form1Screen"
                                    component={Form1Screen}
                                    options={{ title: 'User Details' }}
                                />
                                <Stack.Screen
                                    name="Form2Screen"
                                    component={Form2Screen}
                                    options={{ title: 'Address Details' }}
                                />
                                <Stack.Screen
                                    name="Form3Screen"
                                    component={Form3Screen}
                                    options={{ title: 'Payment Details' }}
                                />
                            </Stack.Navigator>
                        </NavigationContainer>
                    </CartProvider>
                </ThemeProvider>
            </FormProvider>
        </UserProvider>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});

export default App;

