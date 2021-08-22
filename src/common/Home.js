import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Modal,
    Image,
} from 'react-native';

import { Header, Button, Left, Right, Item } from 'native-base';

import { Svg , Polygon } from 'react-native-svg';
import { BlurView } from '@react-native-community/blur';

import { IMAGES, ICONS, COLORS, FONTS, SIZES } from '../constants';

const listSaleTop = [
    {
        id: 1,
        image: IMAGES.nike1,
        bgColor: '#52237F',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 1',
        size: [40, 41, 42, 43]
    },
    {
        id: 2,
        image: IMAGES.nike2,
        bgColor: '#431A16',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 2',
        size: [40, 41, 42, 43]
    },
    {
        id: 3,
        image: IMAGES.nike3,
        bgColor: '#8C0C03',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 3',
        size: [40, 41, 42, 43]
    }
];

const listAllProduct = [

    {
        id: 4,
        image: IMAGES.nike5,
        bgColor: '#52237F',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 4',
        size: [40, 41, 42, 43]
    },
    {
        id: 5,
        image: IMAGES.nike5,
        bgColor: '#431A16',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 5',
        size: [40, 41, 42, 43]
    },
    {
        id: 6,
        image: IMAGES.nike6,
        bgColor: '#8C0C03',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 6',
        size: [40, 41, 42, 43]
    },
    {
        id: 7,
        image: IMAGES.nike7,
        bgColor: '#8C0C03',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 7',
        size: [40, 41, 42, 43]
    },
    {
        id: 8,
        image: IMAGES.nike8,
        bgColor: '#8C0C03',
        type: 'RUNNING',
        price: '$100',
        name: 'Nike 8',
        size: [40, 41, 42, 43]
    }

];

class Home extends React.Component {



    renderListSaleTop(item, index) {

         var trendingStyle = {};
         if(index == 1) {
             trendingStyle = {marginLeft: SIZES.padding}
         }

        return (
            <TouchableOpacity 
                style={{ 
                    height: 240,
                    width: 180,
                    justifyContent: 'center',
                    marginHorizontal: SIZES.base 
                 }}
            >
                <Text style={{ color: COLORS.gray, ...FONTS.h5, ...trendingStyle }}>{ item.type }</Text>
                <View 
                    style={[{
                        flex: 1,
                        justifyContent: 'flex-end',
                        marginTop: SIZES.base,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        borderBottomRightRadius: 10,
                        marginRight: SIZES.padding,
                        paddingLeft: SIZES.radius,
                        paddingRight: SIZES.padding,
                        paddingBottom: SIZES.radius,
                        backgroundColor: item.bgColor
                    }, styles.topSaleShadow]}
                >
                    <View style={{ height: '35%', justifyContent: 'space-between' }}>
                        <Text style={{ color: COLORS.white, ...FONTS.body4 }}>{ item.name }</Text>
                        <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{ item.price }</Text>
                    </View>
                </View>

                <View style={{ position: "absolute", top: 27, right: 0, width: '95%', height: '100%' }}>
                    <Svg height="100%" width="100%">
                    <Polygon
                        points="0,0 160,0 160,80"
                        fill="white"
                    />
                    </Svg>
                </View>

                <Image
                    source={item.image}
                    resizeMode='cover'
                    style={{
                        position: 'absolute',
                        top: 40,
                        left:0,
                        width: '98%',
                        height: 80,
                        transform: [
                            {
                                rotate: '-50deg'
                            }
                        ]

                    }}
                />
                
            </TouchableOpacity>
        )

    }

    renderListAllProduct(item, index) {
        return (
            <TouchableOpacity 
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    
                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={item.image}
                        resizeMode="contain"
                        style={{
                            width: 130,
                            height: 100,

                        }}
                    />
                </View>

                <View style={{ flex:1.5, marginLeft: SIZES.radius, justifyContent: 'center' }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body }}>{item.name}</Text>
                    <Text style={{...FONTS.h3}}>{item.price}</Text>
                </View>

            </TouchableOpacity>
        )
    }
   
       render () {
           return (
            <View style={styles.container}>
                <Header style={styles.header}>
                    <Left>
                        <Button transparent>
                            <Image style={{ width: 20, height: 20 }} source={ICONS.menu} />
                        </Button>
                    </Left>
                    <Item>
                        <Text>SHOP NIKE</Text>
                    </Item>
                    <Right>
                        <Image style={{ width: 20, height: 20 }} source={ICONS.search} />
                        <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={ICONS.cart} />
                    </Right>
                </Header>
            
            {/* Top sale */}
            <View>
                <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                data={listSaleTop}
                renderItem={({ item, index }) => this.renderListSaleTop(item, index)}

                />
            </View>

            {/* LIST ALL PRODUCT */}

            <View style={[{
                flex: 1,
                flexDirection: 'row',
                marginTop: SIZES.padding,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                backgroundColor: COLORS.white
            }, styles.listAllProductShadow]}>
                <View style={{
                    
                    width: 70,
                    marginLeft: SIZES.base

                }}>
                    <Image 
                    source={IMAGES.banner_left}
                    resizeMode="contain"
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                     />
                </View>
                
                <View style={{flex: 1, paddingBottom: SIZES.padding}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        data={listAllProduct}
                        renderItem={({item, index}) => this.renderListAllProduct(item, index)}
                    />

                </View>
            </View>

            </View>
           )
       }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.white,
    },
    topSaleShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    listAllProductShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 7
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15
    }
})


export default Home;