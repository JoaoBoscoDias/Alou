import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../utils/styles';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-web';


const BuscarManga = () => {

    const [getNameMangas, setNameMangas] = useState('');
    const [getManga, setManga] = useState([]);
    const [getAllMangas, setAllMangas] = useState([]);
    
    async function queryMangas(name = null) {
        try{
            const queryName = query(collection(db, 'BuscarManga'), where('nomeDoManga', '==', name));
            const queryResult = await getDocs(queryName);
            
            const manga = [];
            queryResult.forEach((doc) => {
                manga.push(doc.data());
            });

            setManga(manga);
        }catch (error) {
            console.log(error);
        }
    };

    async function queryAllMangas() {
        try{
            const allList = query(collection(db, 'BuscarManga'));
            const queryAllResult = await getDocs(allList);

            const allNames = [];
            queryAllResult.forEach((doc) => {
                allNames.push(doc.data());
            });
            
            setAllMangas(allNames);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        queryMangas(getNameMangas);
        queryAllMangas()
    }, [getNameMangas]);

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={[styles.bold, {marginBottom: '5px'}]}>Manga(s):</Text>
                <View style={styles.modalContent}>
                    <FlatList data={getAllMangas} renderItem={({item}) => (
                        <Text style={styles.item}>• {item.nomeDoManga}</Text>
                    )} key={(item) => item.id} />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, styles.bold]}>Insira um nome listado a cima:</Text>
            </View>
            <View style={styles.content}>
                <TextInput label='Nome do Manga' value={getNameMangas} onChangeText={setNameMangas} />
            </View>
            <View style={styles.content}>
                <FlatList data={getManga} renderItem={({item}) => (
                    <View>
                        <Text style={styles.bold}>Nome: {item.nomeDoManga}</Text>
                        <Text style={styles.bold}>Quantidade de capitulos: {item.quantidadeDeCapitulos}</Text>
                    </View>
                )} key={(item) => item.id} />
            </View>
        </View>
    )
};
export default BuscarManga;