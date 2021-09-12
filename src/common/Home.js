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
    AsyncStorage,
    ActivityIndicator,
} from 'react-native';
import { Header, Button, Left, Right, Item } from 'native-base';
import { Svg , Polygon } from 'react-native-svg';
import { BlurView } from '@react-native-community/blur';
import { IMAGES, ICONS, COLORS, FONTS, SIZES } from '../constants';


class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('http://localhost:8888/opencart_shop/index.php?route=api/app/getListProduct')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                latests: responseJson.latests,
                saleTops: responseJson.saleTops
            })
        })
    }

    setSelectItem(item, status){
        this.setState({
            showModal: status,
            item: item
        })
    }

    renderSize(items) {
        return(
            items.sizes[0].product_option_value.map((item, index) => {
                return(
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 35,
                            height: 25,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginHorizontal: 5,
                            marginBottom: 10,
                            borderWidth: 1,
                            borderColor: COLORS.white,
                            borderRadius: 5
                        }}
                    >
                        <Text style={{
                            color: COLORS.white
                        }}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )
            })
        )
    }

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
                 onPress={() => {
                     this.setSelectItem(item, true)
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
                    source={{uri: item.image}}
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
                onPress={() => {
                    this.setSelectItem(item, true)
                }}
            >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image
                        source={{uri: item.image}}
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
                data={this.state.saleTops}
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
                        data={this.state.latests}
                        renderItem={({item, index}) => this.renderListAllProduct(item, index)}
                    />

                </View>
            </View>

                
            {/* Modal */}
            { this.state.item &&
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.showModal}
            >
                <BlurView
                    blurType='light'
                    blurAmount={20}
                    reducedTransparencyFallbackColor='white'
                    style={{ 
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                     }}
                >
                    {/* Close modal */}
                    <TouchableOpacity 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                         }}
                         onPress={() => {
                             this.setSelectItem(this.state.item, false)
                         }}
                    >
                    </TouchableOpacity>
                
                {/* Modal content */}
                <View style={{
                    backgroundColor: this.state.item.bgColor,
                    justifyContent: 'center',
                    width: '85%'
                }}>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: -SIZES.padding*2
                    }}>
                         <Image
                            source={{uri: this.state.item.image}}
                            resizeMode="contain"
                            style={{
                                width: '90%',
                                height: 170,
                                transform: [
                                    {
                                        rotate: '-15deg'
                                    }
                                ]
                            }}
                         />
                    </View>

                        <Text style={{
                            marginTop: SIZES.padding,
                            marginHorizontal: SIZES.padding,
                            color: COLORS.white,
                            ...FONTS.body2
                        }}>
                        {this.state.item.name}
                        </Text>

                        <Text style={{
                            marginTop: SIZES.base/2,
                            marginHorizontal: SIZES.padding,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}>
                        {this.state.item.type}
                        </Text>

                        <Text style={{
                            marginTop: SIZES.radius,
                            marginHorizontal: SIZES.padding,
                            color: COLORS.white,
                            ...FONTS.h1
                        }}>
                        {this.state.item.price}
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            marginHorizontal: SIZES.padding,

                        }}>
                            <View>
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.body3
                                }}>Select Type</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                 marginLeft: SIZES.radius,
                            }}>
                                {this.renderSize(this.state.item)}
                            </View>
                        </View>

                            <TouchableOpacity style={{
                                width: '100%',
                                height: 70,
                                marginTop: SIZES.base,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0,0,0,0.5)',
                            }}
                            onPress={() => {
                                this.setSelectItem(null, false)
                            }}
                            >
                                <Text style={{
                                    color: COLORS.white,
                                    ...FONTS.largeTitleBold
                                }}>
                                    And To Cart
                                </Text>
                            </TouchableOpacity>
                       

                </View>


                </BlurView>
            </Modal>
       }



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