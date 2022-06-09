import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { appleGreen, applePurple, appleRed, defaultGray, defaultWhite } from '../colours';
import { Feather } from '@expo/vector-icons';
import { rvIsLoading } from './loading';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';

const borderWidth = 2




export default function DisplayContacts() {
    const windowWidth = useWindowDimensions().width;
    const windowCondition = windowWidth > 700
    // local states
    const [contacts, setContacts] = useState<Contact[]>()
    const [firstname, setFirstName] = useState<string>('')
    const [lastname, setLastName] = useState<string>('')
    const [mobilenumber, setMobileNumber] = useState<string>('')
    const [showPopover, setShowPopover] = useState<boolean>(false)


    const apiUrl = 'https://adzke.pythonanywhere.com/contacts/'

    type Contact = {
        id: number;
        firstname: string;
        lastname: string;
        mobilenumber: string | null
    };

    type PostContact = {
        firstname: string;
        lastname: string;
        mobilenumber: string
    }

    const postObject = {
        firstname: firstname,
        lastname: lastname,
        mobilenumber: mobilenumber,
    }


    const getContacts = async () => {
        try {
            rvIsLoading(true)
            // 👇️ const response: Response
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            // 👇️ const result: GetUsersResponse
            const result = (await response.json()) as Contact[];

            setContacts(result)
            rvIsLoading(false)

        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                rvIsLoading(false)
                return error.message;
            } else {
                rvIsLoading(false)
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }

    }

    const postContacts = async () => {

        try {
            rvIsLoading(true)
            const confirmedPostObject = await contactChecker(postObject)
            clearFields()
            // 👇️ const response: Response
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(confirmedPostObject),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            // 👇️ const result: CreateUserResponse
            const result = (await response.json()) as Contact[];

            console.log('result is: ', JSON.stringify(result, null, 4));
            getContacts()
            rvIsLoading(false)
            return result;


        }
        catch (error) {

            if (error instanceof Error) {
                console.log('error message: ', error.message);
                rvIsLoading(false)
                return error.message;

            } else {
                console.log('unexpected error: ', error);
                rvIsLoading(false)
                return 'An unexpected error occurred';

            }


        }

    }

    const deleteContacts = async (id: number) => {
        try {
            // 👇️ const response: Response
            const response = await fetch(`${apiUrl}${id}/`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            console.log('User deleted successfully');
            getContacts()
            return 'user deleted successfully';

        }
        catch (error) {
            if (error instanceof Error) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    const contactChecker = async (contact: PostContact) => {
        if (postObject.mobilenumber === '') {
            return {
                firstname: postObject.firstname,
                lastname: postObject.lastname,
            }
        }
        return contact
    }

    const clearFields = () => {
        setFirstName('')
        setLastName('')
        setMobileNumber('')
    }

    useEffect(() => {
        getContacts()
    }, []);

    return (
        <View style={styles.container}>
            {showPopover && <View style={styles.popOver}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.commonStyleInput}
                        onChangeText={setFirstName}
                        value={firstname}
                        placeholder="First name"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.commonStyleInput}
                        onChangeText={setLastName}
                        value={lastname}
                        placeholder="Last name"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.commonStyleInput}
                        onChangeText={setMobileNumber}
                        value={mobilenumber}
                        placeholder="Mobile number"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={postContacts} style={styles.addContact}>
                        <Text>Add contact</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            <View style={styles.toolBox}>

                <View style={styles.tableHeader}>
                    <Text>
                        Contacts
                    </Text>
                    <TouchableOpacity onPress={() => setShowPopover(!showPopover)}>
                        <Feather name="plus" size={24} color="black" />
                    </TouchableOpacity>

                </View>
                <View style={styles.tableContainer}>
                    <View style={styles.firstNameLastNameTableitem}>
                        <Text style={styles.tableText}>Full name</Text>

                    </View>
                    {windowCondition &&
                        <>
                            <View style={styles.mobileTableItem}>
                                <Text style={styles.tableText}>Mobile</Text>
                            </View>
                            <View style={styles.iDTableItem}>
                                <Text style={styles.tableText}>ID</Text>
                            </View>
                        </>
                    }
                    <View style={styles.deleteTableItem}>
                        <Text style={styles.tableText}>Delete</Text>
                    </View>
                </View>
                <View style={styles.spacer}>

                </View>
                <ScrollView>
                    {contacts && contacts.map(i => (
                        <View style={styles.tableContainer} key={i.id}>
                            <View style={styles.firstNameLastNameTableitem}>
                                <Text style={styles.tableText}>{i.firstname}</Text>
                                <Text style={styles.tableText}>{i.lastname}</Text>
                            </View>
                            {windowCondition &&
                                <>
                                    <View style={styles.mobileTableItem}>
                                        <Text style={styles.tableText}>{i.mobilenumber}</Text>
                                    </View>
                                    <View style={styles.iDTableItem}>
                                        <Text style={styles.tableText}>{i.id}</Text>
                                    </View>
                                </>
                            }
                            <View style={styles.deleteTableItem}>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteContacts(i.id)}>
                                    <Ionicons name="ios-remove-circle" size={24} color={appleRed} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: defaultGray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableContainer: {
        marginVertical: 1,
        height: 40,
        backgroundColor: defaultGray,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    firstNameLastNameTableitem: {
        height: '100%',
        width: 200,
        flexDirection: 'row',
        borderLeftWidth: 5,
        borderLeftColor: appleGreen,
        borderRightWidth: borderWidth,
        borderRightColor: defaultWhite,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 5,
    },
    iDTableItem: {
        width: 50,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mobileTableItem: {
        width: 125,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: borderWidth,
        borderRightColor: defaultWhite
    },
    deleteTableItem: {
        width: 75,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: borderWidth,
        borderLeftColor: defaultWhite
    },
    tableText: {
        paddingHorizontal: 2,
        flex: 1,
        overflow: 'hidden',
        backgroundColor: 'purple',
        height: '100%'

    },
    addContact: {
        width: 100,
        height: 25,
        backgroundColor: defaultWhite,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
    },
    deleteButton: {
    },
    commonStyleInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    inputContainer: {
        backgroundColor: defaultWhite,
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolBox: {
        padding: 50,
        backgroundColor: defaultWhite
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    popOver: {
        backgroundColor: defaultGray,
        position: 'absolute',
        zIndex: 10,
        right: 100,
    },
    spacer: {
        paddingVertical: 10,
    }

});
