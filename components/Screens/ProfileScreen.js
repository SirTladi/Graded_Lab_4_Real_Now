
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { UserContext } from './UserContext';
import { ThemeContext } from './ThemeContext';

const ProfileScreen = ({ route }) => {
    const { user, updateUser } = useContext(UserContext);
    const { theme, updateTheme } = useContext(ThemeContext);

    // Get user details from route params
    const { name, email, phone, address, city, state, zipCode, cardNumber, expiryDate, cvv } = route.params || {};

    // State variables to hold the profile information
    const [profileName, setProfileName] = useState(name || '');
    const [profileEmail, setProfileEmail] = useState(email || '');
    const [profilePhone, setProfilePhone] = useState(phone || '');
    const [profileAddress, setProfileAddress] = useState(address || '');
    const [profileCity, setProfileCity] = useState(city || '');
    const [profileState, setProfileState] = useState(state || '');
    const [profileZipCode, setProfileZipCode] = useState(zipCode || '');
    const [profileCardNumber, setProfileCardNumber] = useState(cardNumber || '');
    const [profileExpiryDate, setProfileExpiryDate] = useState(expiryDate || '');
    const [profileCvv, setProfileCvv] = useState(cvv || '');

    // Use effect to load user data from context
    useEffect(() => {
        if (user) {
            setProfileName(user.name || '');
            setProfileEmail(user.email || '');
            setProfilePhone(user.phone || '');
            setProfileAddress(user.address || '');
            setProfileCity(user.city || '');
            setProfileState(user.state || '');
            setProfileZipCode(user.zipCode || '');
            setProfileCardNumber(user.cardNumber || '');
            setProfileExpiryDate(user.expiryDate || '');
            setProfileCvv(user.cvv || '');
        }
    }, [user]);

  //this one is for handling to saving a profile
    const handleSaveProfile = () => {
        // Input validation
        const isValidInteger = (value, maxLength) => /^\d+$/.test(value) && value.length <= maxLength;
        const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
        const isValidExpiryDate = (date) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(date);
        
        if (!isValidEmail(profileEmail)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }
        if (!isValidInteger(profilePhone, 10)) {
            Alert.alert('Invalid Phone Number', 'Phone number must be numeric and up to 10 digits.');
            return;
        }
        if (!isValidInteger(profileCvv, 3)) {
            Alert.alert('Invalid CVV', 'CVV must be numeric and 3 digits.');
            return;
        }
        if (!isValidInteger(profileZipCode, 10)) {
            Alert.alert('Invalid Zip Code', 'Zip code must be numeric and up to 10 digits.');
            return;
        }
        if (!isValidInteger(profileCardNumber, 16)) {
            Alert.alert('Invalid Card Number', 'Card number must be numeric and 16 digits.');
            return;
        }
        if (!isValidExpiryDate(profileExpiryDate)) {
            Alert.alert('Invalid Expiry Date', 'Expiry date must be in MM/YY format.');
            return;
        }

        
        updateUser({
            name: profileName,
            email: profileEmail,
            phone: profilePhone,
            address: profileAddress,
            city: profileCity,
            state: profileState,
            zipCode: profileZipCode,
            cardNumber: profileCardNumber,
            expiryDate: profileExpiryDate,
            cvv: profileCvv,
        });
    };

    
    const handleThemeChange = (themeType) => {
        if (themeType === 'black') {
            updateTheme({ textColor: '#FFFFFF', backgroundColor: '#000000' });
        } else {
            updateTheme({ textColor: '#000000', backgroundColor: '#FFFFFF' });
        }
    };


    const formatExpiryDate = (text) => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 2) {
            return cleaned;
        } else {
            return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        }
    };

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.title, { color: theme.textColor }]}>Profile</Text>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Name:</Text>
                <TextInput
                    value={profileName}
                    onChangeText={setProfileName}
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Email:</Text>
                <TextInput
                    value={profileEmail}
                    onChangeText={setProfileEmail}
                    keyboardType="email-address"
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Phone:</Text>
                <TextInput
                    value={profilePhone}
                    onChangeText={(text) => setProfilePhone(text.replace(/\D/g, '').slice(0, 10))}
                    keyboardType="numeric"
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Address:</Text>
                <TextInput
                    value={profileAddress}
                    onChangeText={setProfileAddress}
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>City:</Text>
                <TextInput
                    value={profileCity}
                    onChangeText={setProfileCity}
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>State:</Text>
                <TextInput
                    value={profileState}
                    onChangeText={setProfileState}
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Zip Code:</Text>
                <TextInput
                    value={profileZipCode}
                    onChangeText={(text) => setProfileZipCode(text.replace(/\D/g, '').slice(0, 10))}
                    keyboardType="numeric"
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Card Number:</Text>
                <TextInput
                    value={profileCardNumber}
                    onChangeText={(text) => setProfileCardNumber(text.replace(/\D/g, '').slice(0, 16))}
                    keyboardType="numeric"
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>Expiry Date:</Text>
                <TextInput
                    value={formatExpiryDate(profileExpiryDate)}
                    onChangeText={setProfileExpiryDate}
                    maxLength={5} // MM/YY
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <View style={[styles.card, { backgroundColor: theme.backgroundColor }]}>
                <Text style={[styles.label, { color: theme.textColor }]}>CVV:</Text>
                <TextInput
                    value={profileCvv}
                    onChangeText={(text) => setProfileCvv(text.replace(/\D/g, '').slice(0, 3))}
                    keyboardType="numeric"
                    secureTextEntry
                    style={[styles.input, { borderColor: theme.textColor, color: theme.textColor }]}
                />
            </View>
            <Button title="Save Changes" onPress={handleSaveProfile} color={theme.textColor} />
            <View style={styles.themeContainer}>
                <Text style={[styles.label, { color: theme.textColor }]}>Select Theme</Text>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#000000' }]}
                    onPress={() => handleThemeChange('black')}
                >
                    <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Dark Mode</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#FFFFFF' }]}
                    onPress={() => handleThemeChange('white')}
                >
                    <Text style={[styles.buttonText, { color: '#000000' }]}>Light Mode</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    card: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        marginTop: 5,
    },
    button: {
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    themeContainer: {
        marginTop: 20,
    },
});

export default ProfileScreen;
