import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { FormContext } from './FormContext';

const Form2Screen = ({ route, navigation }) => {
    const { formData, setFormData } = useContext(FormContext);
    const { userDetails, cartItems, totalCost } = route.params;

    const [address, setAddress] = useState(formData.address || '');
    const [city, setCity] = useState(formData.city || '');
    const [state, setState] = useState(formData.state || '');
    const [zipCode, setZipCode] = useState(formData.zipCode || '');

    const handleNext = () => {
        if (!address || !city || !state || !zipCode) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
        setFormData({
            ...formData,
            ...userDetails,
            address,
            city,
            state,
            zipCode,
        });
        navigation.navigate('Form3Screen', { cartItems, totalCost });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Address Details</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    placeholder="Enter your address"
                    value={address}
                    onChangeText={setAddress}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>City</Text>
                <TextInput
                    placeholder="Enter your city"
                    value={city}
                    onChangeText={setCity}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>State</Text>
                <TextInput
                    placeholder="Enter your state"
                    value={state}
                    onChangeText={setState}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Zip Code</Text>
                <TextInput
                    placeholder="Enter your zip code"
                    value={zipCode}
                    onChangeText={setZipCode}
                    style={styles.input}
                    keyboardType="numeric"
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

export default Form2Screen;


