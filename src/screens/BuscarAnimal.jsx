import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../utils/styles';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-web';


const BuscarAnimal = () => {

    const [getNameAnimal, setNameAnimal] = useState('');
    const [getAnimal, setAnimal] = useState([]);
    const [getAllAnimals, setAllAnimals] = useState([]);
    
    async function queryAnimals(name = null) {
        try{
            const queryName = query(collection(db, 'BuscarAnimal'), where('nomeDoAnimal', '==', name));
            const queryResult = await getDocs(queryName);
            
            const animal = [];
            queryResult.forEach((doc) => {
                animal.push(doc.data());
            });

            setAnimal(animal);
        }catch (error) {
            console.log(error);
        }
    };

    async function queryAllAnimals() {
        try{
            const allList = query(collection(db, 'BuscarAnimal'));
            const queryAllResult = await getDocs(allList);

            const allNames = [];
            queryAllResult.forEach((doc) => {
                allNames.push(doc.data());
            });
            
            setAllAnimals(allNames);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        queryAnimals(getNameAnimal);
        queryAllAnimals()
    }, [getNameAnimal]);

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={[styles.bold, {marginBottom: '5px'}]}>Nome(s):</Text>
                <View style={styles.modalContent}>
                    <FlatList data={getAllAnimals} renderItem={({item}) => (
                        <Text style={styles.item}>• {item.nomeDoAnimal}</Text>
                    )} key={(item) => item.id} />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, styles.bold]}>Insira um nome listado a cima:</Text>
            </View>
            <View style={styles.content}>
                <TextInput label='Nome do Animal' value={getNameAnimal} onChangeText={setNameAnimal} />
            </View>
            <View style={styles.content}>
                <FlatList data={getAnimal} renderItem={({item}) => (
                    <View>
                        <Text style={styles.bold}>Nome: {item.nomeDoAnimal}</Text>
                        <Text style={styles.bold}>Espécie: {item.especieDoAnimal}</Text>
                    </View>
                )} key={(item) => item.id} />
            </View>
        </View>
    )
};
export default BuscarAnimal;