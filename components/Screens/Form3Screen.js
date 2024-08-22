import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FormContext } from './FormContext';

const Form3Screen = ({ route, navigation }) => {
    const { formData, setFormData } = useContext(FormContext);
    const { cartItems, totalCost } = route.params;

    const [cardNumber, setCardNumber] = useState(formData.cardNumber || '');
    const [expiryDate, setExpiryDate] = useState(formData.expiryDate || '');
    const [cvv, setCvv] = useState(formData.cvv || '');

    const formatExpiryDate = (text) => {
        // Remove non-numeric characters
        let formattedText = text.replace(/[^0-9]/g, '');

        // Add forward slash after 2 digits
        if (formattedText.length > 2) {
            formattedText = `${formattedText.slice(0, 2)}/${formattedText.slice(2, 4)}`;
        }

        return formattedText;
    };

    const handleSubmit = () => {
        // Validate card number and CVV
        if (cardNumber.length !== 16) {
            Alert.alert('Error', 'Card number must be 16 digits.');
            return;
        }
        if (cvv.length !== 3) {
            Alert.alert('Error', 'CVV must be 3 digits.');
            return;
        }

        setFormData({
            ...formData,
            cardNumber,
            expiryDate,
            cvv,
        });

        Alert.alert('Thank You', 'We will process your order.');
        navigation.navigate('ProfileScreen', { cartItems, totalCost });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Details</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                    placeholder="Enter your card number"
                    value={cardNumber}
                    onChangeText={text => setCardNumber(text.replace(/[^0-9]/g, '').slice(0, 16))}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={16} // Limit input to 16 digits
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Expiry Date (MM/YY)</Text>
                <TextInput
                    placeholder="Enter expiry date"
                    value={formatExpiryDate(expiryDate)}
                    onChangeText={text => setExpiryDate(formatExpiryDate(text))}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={5} // Limit input to 5 characters (MM/YY)
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                    placeholder="Enter CVV"
                    value={cvv}
                    onChangeText={text => setCvv(text.replace(/[^0-9]/g, '').slice(0, 3))}
                    style={styles.input}
                    secureTextEntry
                    maxLength={3} // Limit input to 3 digits
                />
            </View>
            <Button title="Submit" onPress={handleSubmit} />
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

export default Form3Screen;
