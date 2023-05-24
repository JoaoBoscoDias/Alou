import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../utils/styles';
import { TextInput } from 'react-native-paper';
import { FlatList } from 'react-native-web';
const BuscarPessoa = () => {

    const [getNamePerson, setNamePerson] = useState('');
    const [getPerson, setPerson] = useState([]);
    const [getAllPersons, setAllPersons] = useState([]);
  
    async function queryPerson(name = null) {
        try{
            const queryList = query(collection(db, 'BuscarPessoa'), where('nomeDaPessoa', '==', name));
            const queryResult = await getDocs(queryList);
            
            const person = [];
            queryResult.forEach((doc) => {
                person.push(doc.data());
            });

            setPerson(person);
        }catch (error) {
            console.log(error);
        }
    };

    async function queryAllPersons() {
        try{
            const allList = query(collection(db, 'BuscarPessoa'));
            const queryAllResult = await getDocs(allList);

            const allNames = [];
            queryAllResult.forEach((doc) => {
                allNames.push(doc.data());
            });
            
            setAllPersons(allNames);
        }catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        queryPerson(getNamePerson);
        queryAllPersons();
    }, [getNamePerson]);

    return (
        <View style={styles.container}>
            <View style={styles.modalContainer}>
                <Text style={[styles.bold, {marginBottom: '5px'}]}>Nome(s):</Text>
                <View style={styles.modalContent}>
                    <FlatList data={getAllPersons} renderItem={({item}) => (
                        <Text style={styles.item}>• {item.nomeDaPessoa}</Text>
                    )} key={(item) => item.id} />
                </View>
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, styles.bold]}>Insira um nome listado a cima:</Text>
            </View>
            <View style={styles.content}>
                <TextInput label='Nome da Pessoa' value={getNamePerson} onChangeText={setNamePerson} />
            </View>
            <View style={styles.content}>
                <FlatList data={getPerson} renderItem={({item}) => (
                    <View>
                        <Text style={styles.bold}>Nome: {item.nomeDaPessoa}</Text>
                        <Text style={styles.bold}>Idade: {item.idadeDaPessoa}</Text>
                    </View>
                )} key={(item) => item.id} />
            </View>
        </View>
    )
};

export default BuscarPessoa;