import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet, Text, Touchable, TouchableOpacity, View
} from 'react-native';
import StockButton from '../components/StockButton';

type Stock = {
    stockName: string,
    stockCode: string,
    StockPrice: string,
    stockChangePercent: string,
};
function StockApp(): JSX.Element {

    const [data, setData] = useState<Stock>({
        StockPrice: '',
        stockChangePercent: '',
        stockName: 'VIN GROUP',
        stockCode: 'VIN',
      });
    const [isLoading, setLoading] = useState(true);
    const handleSelectStock = (stockName: any, stockCode: any) => {
        setLoading(true);
        getStock(stockName, stockCode)
        setData({ ...data});
    }
    useEffect(()=>{
        setLoading(true);
        getStock(data.stockName, data.stockCode)
        setData({ ...data});
    }, [])
    const getStock = async ( a: any , b: any) => {
        try {
            const response = await fetch('https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo');
            const json = await response.json();
            const result = {
                StockPrice : json["Global Quote"]["05. price"],
                stockChangePercent : json["Global Quote"]["10. change percent"],
                stockName: a ,
                stockCode: b,
            } 
            setData(result)
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.text}>{data["stockName"]}</Text>
                <Text style={styles.codeText}>{data["stockCode"]}</Text>
                <Text style={styles.stockChangePercentText}>{data['StockPrice']} ({data['stockChangePercent']})</Text>
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.bottomContainerItem}>
                    <StockButton stockName="VIN GROUP" stockCode="VIN" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="FLC"  stockCode="FLC" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="VIETJET"  stockCode="VJC" onSelectStock={handleSelectStock}/>
                </View>

                <View style={styles.bottomContainerItem}>
                    <StockButton stockName="MASSAN" stockCode="MSN" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="VINAMILK" stockCode="VNM" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="SRC" stockCode="SRC" onSelectStock={handleSelectStock}/>
                </View>

                <View style={styles.bottomContainerItem}>
                    <StockButton stockName="HSBC" stockCode="HSBC" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="SAM HOLDING" stockCode="SAM" onSelectStock={handleSelectStock}/>
                    <StockButton stockName="PETROLIMEX" stockCode="PET" onSelectStock={handleSelectStock}/>
                </View>
            </View>
            {isLoading && (
                <View style={styles.loadingIndicator} >
                     <ActivityIndicator size={'large'}/>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    topContainer: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'pink',
        paddingHorizontal: 10,
        paddingTop: 15
    },
    bottomContainerItem: {
        flexDirection: 'row',
        marginBottom: 15
    },
    stockChangePercentText:{
        fontSize: 50,
        color: 'red',
        textAlign: 'center'
    }
    ,
    codeText: {
        fontSize: 80,
        color: 'black'
    },
    text: {
        fontSize: 50,
        color: 'black'
    },
    loadingIndicator:{
        position: 'absolute',
        zIndex: 15,
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'rgba(164, 93, 81, 0.08)',
        justifyContent: 'center'
    }
});

export default StockApp;
