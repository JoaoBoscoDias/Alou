import styles from '../utils/styles';
import { Button } from 'react-native-paper';
import { View, Text } from 'react-native';
import React from 'react';


const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, styles.bold]}>Procurar</Text>
            <View style={styles.content}>
                <Button style={{width: '50vw', background: '#8338ec'}} mode='contained' onPress={() => navigation.navigate('Buscar Anime')}>Procurar Anime</Button>
            </View>
            <View style={styles.content}>
                <Button style={{width: '50vw', background: '#8338ec'}} mode='contained' onPress={() => navigation.navigate('Buscar Manga')}>Procurar Manga</Button>
            </View>
            <View style={styles.content}>
                <Button style={{width: '50vw', background: '#8338ec'}} mode='contained' onPress={() => navigation.navigate('Buscar Pessoa')}>Procurar Pessoa</Button>
            </View>
            <View style={styles.content}>
                <Button style={{width: '50vw', background: '#8338ec'}} mode='contained' onPress={() => navigation.navigate('Buscar Filme')}>Procurar Filme</Button>
            </View>
            <View style={styles.content}>
                <Button style={{width: '50vw', background: '#8338ec'}} mode='contained' onPress={() => navigation.navigate('Buscar Animal')}>Procurar Animal</Button>
            </View>
        </View>
    );
};

export default HomeScreen;