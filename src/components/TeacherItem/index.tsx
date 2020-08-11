import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

import heartOutlineIcon from '../../assets/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/icons/unfavorite.png';
import whatsappIcon from '../../assets/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    whatsapp: string;
    subject: string;
    cost: number;
};

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
};

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhatsapp() {
        api.post('connections', {
            user_id: teacher.id,
        });

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
    };

    async function handleToggleFavorite() {
        const favorites = await AsyncStorage.getItem('favorites');
        let favoritedTeachers = [];

        if (favorites) {
            favoritedTeachers = JSON.parse(favorites);
        }

        if (isFavorited) {
            const favoriteIndex = favoritedTeachers.findIndex((favoritedTeacher: Teacher) =>
                favoritedTeacher.id === teacher.id
            );

            favoritedTeachers.splice(favoriteIndex, 1);

            setIsFavorited(false);
        } else {
            favoritedTeachers.push(teacher);

            setIsFavorited(true);
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritedTeachers));
    };

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handleToggleFavorite}
                        style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
                    >
                        <Image source={isFavorited ? unfavoriteIcon : heartOutlineIcon} />
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
};

export default TeacherItem;
