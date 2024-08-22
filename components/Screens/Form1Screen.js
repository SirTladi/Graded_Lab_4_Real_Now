import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Form1Screen = ({ route, navigation }) => {
    const { cartItems, totalCost } = route.params;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^[0-9]{10}$/;
        return phonePattern.test(phone);
    };

    const handleNext = () => {
        if (!name || !email || !phone) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }
        if (!isValidPhone(phone)) {
            Alert.alert('Error', 'Phone number must be 10 digits.');
            return;
        }
        navigation.navigate('Form2Screen', { cartItems, totalCost, userDetails: { name, email, phone } });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Details</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your phone number"
                    value={phone}
                    onChangeText={text => setPhone(text.replace(/[^0-9]/g, ''))}
                    keyboardType="phone-pad"
                    maxLength={10} // Limit input to 10 digits
                />
            </View>
            <Button title="Next" onPress={handleNext} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default Form1Screen;
