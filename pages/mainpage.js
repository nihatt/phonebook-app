import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { FAB, Card, Title, Paragraph, Modal, TextInput, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import api from '../requests/api';



const HomePage = ({ route, navigation }) => {
  const [showFAB, setShowFAB] = useState(true);
  const [data,setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [contacts, setContacts] = useState(data);

  const handleFABPress = () => {
    setShowModal(true);
  }

  const handleModalClose = () => {
    setShowModal(false);
  }
  useEffect( () => {

      LoadData()
  },[]);
  const LoadData = async ()=>{
    try {

        
        const result = await api.getRecords()
        let tempFilter = result.filter(e => e.userid==id)

        setData(tempFilter)
        setIsLoading(false)

 
    } catch (error) {
        console.error(error);
      }
  }
  if(isLoading){
    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large"/>
        </View>
    );
}

  const handleAddPress = async () => {

        try {
            const result = await api.createRecord({userid:id,text:name,phone:number});
            
            if(result){
                setShowModal(false)
                LoadData()

                setNumber("")
                setName("")
            }
        else{
        }} catch (error) {
            console.error(error);
          }
    
  }

  const handleCardDelete = async (id) => {
    const result = await api.deleteRecord({idToDelete:id})
    LoadData()
  }

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.text}</Title>
        <Paragraph>{item.phone}</Paragraph>
        <IconButton
          icon="delete"
          color="#f44336"
          size={24}
          
          onPress={() => handleCardDelete(item._id)}
          style={styles.cardIcon}
        />
      </Card.Content>
    </Card>
  );

  const keyExtractor = item => item._id.toString();

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        ListEmptyComponent={<Text>Bir Şey bulamadık... (ya da bulundu da biz getiremedik)</Text>}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContent}
      />
      {showFAB && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={handleFABPress}
        />
      )}
      <Modal visible={showModal} onDismiss={handleModalClose}>
        <View style={styles.modalContainer}>
          <TextInput
            label="İsim"
            mode='outlined'
            value={name}
            onChangeText={text => setName(text)}
            style={styles.modalInput}
          />
          <TextInput
            label="Numara"
            mode='outlined'
            value={number}
            onChangeText={text => setNumber(text)}
            style={styles.modalInput}
            />
            <Button
            mode="contained"
            onPress={handleAddPress}
            style={styles.modalButton}
            labelStyle={styles.modalButtonLabel}
            theme={{ colors: { primary: '#fff' } }}
            >
            Ekle
            </Button>
            </View>
            </Modal>
            </View>
            );
            };
            
            const styles = StyleSheet.create({
            container: {
            flex: 1,
            backgroundColor: '#f5f5f5',
            paddingHorizontal: 16,
            paddingTop: 45,
            },
            flatListContent: {
            paddingBottom: 72,
            },
            card: {
            marginBottom: 16,
            },
            fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
            backgroundColor: '#006aff',
            },
            modalContainer: {
            backgroundColor: '#fff',
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            },
            modalInput: {
            width: '100%',
            marginBottom: 16,
            },
            modalButton: {
            width: '100%',
            height: 48,
            justifyContent: 'center',
            borderRadius: 24,
            backgroundColor: '#006aff',
            elevation: 0,
            },
            modalButtonLabel: {
            fontSize: 18,
            fontWeight: 'bold',
            },
            cardIcon: {
                position: 'absolute',
                top: 20,
                right: 0,
                },
            });
            
            export default HomePage;
