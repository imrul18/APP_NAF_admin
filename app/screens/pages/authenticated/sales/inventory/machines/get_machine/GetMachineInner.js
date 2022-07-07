import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MachineService from "../../../../../../services/MachineService";
import Test from "../../../Test";

const Tab = createMaterialTopTabNavigator();

const GetMachineInner = ({ id }) => {

    const [data, getData] = useState()

    const getMachines = async () => {
        getData(await MachineService.get(id));
    };

    useEffect(() => {
        getMachines()
    }, [])


    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarContentContainerStyle: {
                    backgroundColor: "#c0c98a",
                },
            }}
        >

            <Tab.Screen
                name="Model"
                component={Test}
            />
            <Tab.Screen
                name="Part Heading"
                component={Test}

            />
            <Tab.Screen
                name="Activities"
                component={Test}

            />
        </Tab.Navigator>
    )
}

export default GetMachineInner