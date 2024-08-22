import React, { useContext } from 'react';
import { View, Text, Button, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext';

const MenuScreen = ({ navigation }) => {
    const { addToCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    const menuItems = [
        {
            name: 'Pizza',
            description: 'Cheesy, delicious, and topped with fresh ingredients.',
            price: 100,
            image: require('./Pizza.jpg')
        },
        {
            name: 'Burger',
            description: 'Juicy beef patty with fresh lettuce and tomatoes.',
            price: 80,
            image: require('./burger.jpg')
        },
        {
            name: 'Pasta',
            description: 'Creamy Alfredo sauce with tender chicken and herbs.',
            price: 120,
            image: require('./pasta.jpg')
        },
        {
            name: 'Salad',
            description: 'Crisp greens with a tangy vinaigrette dressing.',
            price: 50,
            image: require('./salad.jpg')
        },
        {
            name: 'Sushi',
            description: 'Freshly rolled sushi with a variety of fillings.',
            price: 150,
            image: require('./sushi.jpg')
        },
        {
            name: 'Steak',
            description: 'Grilled to perfection, served with a side of veggies.',
            price: 200,
            image: require('./steak.jpg')
        }
    ];

    return (
        <View style={styles.container}>
            {user && (
                <Text style={styles.welcomeText}>Welcome, {user.name}</Text>
            )}
            <FlatList
                data={menuItems}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.price}>R{item.price}</Text>
                            <Button title="Add to Cart" onPress={() => addToCart(item)} />
                        </View>
                    </View>
                )}
            />
            <Button title="Go to Cart" onPress={() => navigation.navigate('CartScreen')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        padding: 10,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    item: {
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 15,
        flexDirection: 'row',
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5,
    },
    price: {
        fontSize: 16,
        color: '#888',
    },
});

export default MenuScreen;



