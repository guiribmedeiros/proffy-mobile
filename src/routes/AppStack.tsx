import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StudyTabs from './StudyTabs';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => (
    <NavigationContainer>
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Landing" component={Landing} />
            <Screen name="GiveClasses" component={GiveClasses} />
            <Screen name="StudyTabs" component={StudyTabs} />
        </Navigator>
    </NavigationContainer>
);

export default AppStack;
