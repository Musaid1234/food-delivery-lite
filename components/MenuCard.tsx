import {Text, TouchableOpacity, Image, Platform, View} from 'react-native'
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";
import {useCartStore} from "@/store/cart.store";

const MenuCard = ({ item: { $id, image, name, price }}: { item: MenuItem}) => {
    const bucketId = "68be97ae002443912357";
    const imageUrl = `https://nyc.cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${image}/view?project=${appwriteConfig.projectId}`;
    const { addItem } = useCartStore();

    console.log('image ki url ', imageUrl)

    return (
        <TouchableOpacity 
            className="bg-white rounded-2xl mx-2 mb-4 overflow-hidden"
            style={[
                {
                    width: 160,
                    height: 200,
                },
                Platform.OS === 'android' 
                    ? { elevation: 6, shadowColor: '#000'} 
                    : {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                    }
            ]}
        >
            {/* Image Container with colored background */}
            <View style={{
                backgroundColor: '#F8F4F0', // Light peach background like in the image
                height: 120,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
            }}>
                <Image 
                    source={{ uri: imageUrl }} 
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                    resizeMode="cover"
                    onError={(error) => console.log('Image loading error:', error)}
                    onLoad={() => console.log('Image loaded successfully')}
                />
                
                {/* Small dots decoration */}
                <View style={{
                    position: 'absolute',
                    top: 15,
                    right: 15,
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: '#333',
                }} />
                <View style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 15,
                    width: 6,
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#333',
                }} />
            </View>
            
            {/* Content Container */}
            <View style={{
                padding: 12,
                flex: 1,
                justifyContent: 'space-between',
            }}>
                <View>
                    <Text 
                        style={{ 
                            color: '#333', 
                            fontSize: 16, 
                            fontWeight: '600',
                            marginBottom: 2,
                        }}
                        numberOfLines={1}
                    >
                        {name}
                    </Text>
                </View>
                
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text 
                        style={{ 
                            color: '#333', 
                            fontSize: 18, 
                            fontWeight: '700',
                        }}
                    >
                        ${price}
                    </Text>
                    <TouchableOpacity 
                        onPress={() => addItem({ id: $id, name, price, image_url: imageUrl, customizations: []})}
                        style={{
                            backgroundColor: '#333',
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text 
                            style={{ 
                                color: '#FFFFFF', 
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}
                        >
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default MenuCard