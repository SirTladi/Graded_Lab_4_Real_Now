import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';

const CartScreen = ({ navigation }) => {
    const { cartItems, removeFromCart, updateCartItem, clearCart } = useContext(CartContext);

    const totalCost = Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Alert.alert("Sorry", "There is nothing in your cart.");
            return;
        }

        
        Alert.alert(
            "Confirm Checkout",
            `Total: R${totalCost}. Do you want to proceed with the checkout?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        clearCart();
                        navigation.navigate('Form1Screen', { cartItems, totalCost });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text>Price: R{item.price}</Text>
                            <Text>Quantity: {item.quantity}</Text>
                            <View style={styles.quantityControls}>
                                <TouchableOpacity onPress={() => updateCartItem(index, item.quantity - 1)}>
                                    <Text style={styles.quantityButton}>-</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => updateCartItem(index, item.quantity + 1)}>
                                    <Text style={styles.quantityButton}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <Button title="Remove" onPress={() => removeFromCart(index)} color="red" />
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Your cart is empty.</Text>
                    </View>
                }
            />
            <Text style={styles.total}>Total: R{totalCost}</Text>
            <Button title="Checkout" onPress={handleCheckout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    item: { 
        marginBottom: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
        elevation: 3,
    },
    image: { 
        width: 80, 
        height: 80, 
        marginRight: 15 
    },
    info: { 
        flex: 1 
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    quantityButton: {
        fontSize: 24,
        paddingHorizontal: 10,
    },
    total: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginTop: 20 
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CartScreen;




