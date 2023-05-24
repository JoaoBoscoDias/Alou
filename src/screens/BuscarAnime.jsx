import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../utils/styles';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-web';


const BuscarAnime = () => {

    const [getNameAnimes, setNameAnimes] = useState('');
    const [getAnime, setAnime] = useState([]);
    const [getAllAnimes, setAllAnimes] = useState([]);
    
    async function queryAnimes(name = null) {
        try{
            const queryName = query(collection(db, 'BuscarAnime'), where('nomeDoAnime', '==', name));
            const queryResult = await getDocs(queryName);
            
            const anime = [];
            queryResult.forEach((doc) => {
                anime.push(doc.data());
            });

            setAnime(anime);
        }catch (error) {
            console.log(error);
        }
    };

    async function queryAllAnimes() {
        try{
            const allList = query(collection(db, 'BuscarAnime'));
            const queryAllResult = await getDocs(allList);

            const allNames = [];
            queryAllResult.forEach((doc) => {
                allNames.push(doc.data());
            });
            
            setAllAnimes(allNames);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        queryAnimes(getNameAnimes);
        queryAllAnimes()
    }, [getNameAnimes]);

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={[styles.bold, {marginBottom: '5px'}]}>Animes(s):</Text>
                <View style={styles.modalContent}>
                    <FlatList data={getAllAnimes} renderItem={({item}) => (
                        <Text style={styles.item}>• {item.nomeDoAnime}</Text>
                    )} key={(item) => item.id} />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, styles.bold]}>Insira um nome listado a cima:</Text>
            </View>
            <View style={styles.content}>
                <TextInput label='Nome do Anime' value={getNameAnimes} onChangeText={setNameAnimes} />
            </View>
            <View style={styles.content}>
                <FlatList data={getAnime} renderItem={({item}) => (
                    <View>
                        <Text style={styles.bold}>Nome: {item.nomeDoAnime}</Text>
                        <Text style={styles.bold}>Classificação do anime: {item.classificacaoDoAnime}</Text>
                    </View>
                )} key={(item) => item.id} />
            </View>
        </View>
    )
};
export default BuscarAnime;