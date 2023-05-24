import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../utils/styles';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-web';


const BuscarFilme = () => {

    const [getNameFilmes, setNameFilmes] = useState('');
    const [getFilme, setFilme] = useState([]);
    const [getAllFilmes, setAllFilmes] = useState([]);
    
    async function queryFilmes(name = null) {
        try{
            const queryName = query(collection(db, 'BuscarFilme'), where('nomeDoFilme', '==', name));
            const queryResult = await getDocs(queryName);
            
            const filme = [];
            queryResult.forEach((doc) => {
                filme.push(doc.data());
            });

            setFilme(filme);
        }catch (error) {
            console.log(error);
        }
    };

    async function queryAllFilmes() {
        try{
            const allList = query(collection(db, 'BuscarFilme'));
            const queryAllResult = await getDocs(allList);

            const allNames = [];
            queryAllResult.forEach((doc) => {
                allNames.push(doc.data());
            });
            
            setAllFilmes(allNames);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        queryFilmes(getNameFilmes);
        queryAllFilmes()
    }, [getNameFilmes]);

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={[styles.bold, {marginBottom: '5px'}]}>Filme(s):</Text>
                <View style={styles.modalContent}>
                    <FlatList data={getAllFilmes} renderItem={({item}) => (
                        <Text style={styles.item}>• {item.nomeDoFilme}</Text>
                    )} key={(item) => item.id} />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, styles.bold]}>Insira um nome listado a cima:</Text>
            </View>
            <View style={styles.content}>
                <TextInput label='Nome do Filme' value={getNameFilmes} onChangeText={setNameFilmes} />
            </View>
            <View style={styles.content}>
                <FlatList data={getFilme} renderItem={({item}) => (
                    <View>
                        <Text style={styles.bold}>Nome: {item.nomeDoFilme}</Text>
                        <Text style={styles.bold}>Data de lançamento: {item.dataDeLancamento}</Text>
                    </View>
                )} key={(item) => item.id} />
            </View>
        </View>
    )
};
export default BuscarFilme;