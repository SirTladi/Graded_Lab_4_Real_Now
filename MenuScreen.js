import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { CartContext } from './components/Screens/CartContext';

const menuItems = [
    { id: 1, name: 'Pizza', price: 100 },
    { id: 2, name: 'Burger', price: 50 },
    { id: 3, name: 'Pasta', price: 80 },
    { id: 4, name: 'Sushi', price: 120 },
    { id: 5, name: 'Salad', price: 40 },
    { id: 6, name: 'Ice Cream', price: 30 },
];

const MenuScreen = () => {
    const { addItemToCart } = useContext(CartContext);

    return (
        <View style={styles.container}>
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.name}</Text>
                        <Text>{item.price} ZAR</Text>
                        <Button title="Add to Cart" onPress={() => addItemToCart(item)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    item: {
        padding: 10,
        marginVertical: 8,
        borderColor: 'black',
        borderWidth: 1,
    },
});

export default MenuScreen;
