import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, ScrollView, ImageBackground, Dimensions } from 'react-native'
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper'
import ElementType, { TYPE } from '../../../Types/ElementType'
import { useFormik } from 'formik'
import * as yup from 'yup'
import capitalCase from '../../../util/CapitalCase'
import PokemonType from '../../../Types/PokemonType'
import PokemonService from '../../../services/PokemonService'
import { AxiosError, AxiosResponse } from 'axios'
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import { POKEDEX_PAGE } from '../../../util/ScreenRouterLinks'

/**
 * Return a Edit or create Page, given the provided information
 * @param buttonText string to label the submit button
 * @param pokemonId number to make it an edit page, if undefined, then make it a create page
 * @returns CreateEditPage component
 */
export default function CreateEditPage() {
    const route = useRoute<any>()
    const navigation = useNavigation<any>();
    const { buttonText, pokemonId } = route.params

    useEffect(() => {
        console.log("inside useEffect")
        if (pokemonId !== undefined) {
            PokemonService().getById(pokemonId).then((value: AxiosResponse<PokemonType>) => { 
                formik.setValues({ 
                    name: value.data.name.english,
                    type: value.data.type[0],
                    secondType: value.data.type.at(1) || "",
                    hp: value.data.base.HP.toString(),
                    attack: value.data.base.Attack.toString(),
                    defense: value.data.base.Defense.toString(),
                    spAttack: value.data.base['Sp. Attack'].toString(),
                    spDefense: value.data.base['Sp. Defense'].toString(),
                    speed: value.data.base.Speed.toString(),
                }) 
            }
            ).catch((error: AxiosError) => {
                console.log(error)
            })
        }
    }, [])

    const navigateBackToPage = () => {
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { name: POKEDEX_PAGE }, 
              ],
            })
          );
    }

    const onSubmit = (values: formikValues) => {
        const types: ElementType[] = []
        types.push(values.type as ElementType)
        if (values.secondType !== "") {
            types.push(values.secondType as ElementType)
        }
        const newPokemon: PokemonType = {
            type: types,
            name: {
                english: values.name,
                japanese: "",
                chinese: "",
                french: ""
            },
            base: {
                HP: parseInt(values.hp),
                Attack: parseInt(values.attack),
                Defense: parseInt(values.defense),
                "Sp. Attack": parseInt(values.spAttack),
                "Sp. Defense": parseInt(values.spDefense),
                Speed: parseInt(values.speed)
            },
        }
        console.log(newPokemon)

        if (pokemonId === undefined) {
            PokemonService().create(newPokemon).then((value) => {
                console.log(value.data)
                navigateBackToPage();
                navigation.goBack()
            }
            ).catch((error: AxiosError) => console.log(error.message))
        } else {
            newPokemon.id = pokemonId
            PokemonService().update(pokemonId, newPokemon).then((value) => {
                console.log(value.data)
                navigateBackToPage();
                navigation.goBack()
            })
            .catch((error: AxiosError) => {console.log(error.message)})
        }
        
    }

    const formik = useFormik<formikValues>({
        initialValues: {
            name: '',
            type: '',
            secondType: '',
            hp: '',
            attack: '',
            defense: '',
            spAttack: '',
            spDefense: '',
            speed: ''
        },
        validationSchema: formikSchema,
        onSubmit(values, { setSubmitting }) {
            setTimeout(() => {
                onSubmit(values)
                setSubmitting(false)
            }, 400)
        },
    })

    return (
        <ImageBackground source={require('../../../../assets/wp10311654.png')} style={styles.backgroundImage} blurRadius={8}>
            <SafeAreaView style={[styles.screen]}>
            <Appbar.Header style={[ styles.topAppBar ]}>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
            </Appbar.Header>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={[styles.listScreen]}>
                    <Image
                        style={[styles.image]}
                        resizeMode='contain'
                        source={require('../../../../assets/International_Pokémon_logo.svg.png')}
                    />
                    <TextInput
                        id='name'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Name"
                        mode='outlined'
                        value={formik.values.name}
                        error={formik.errors.name !== undefined}
                        onChangeText={(name: string) => {
                            formik.setFieldValue('name', name).then((_) => { formik.validateField('name') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.name ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.name}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='type'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Type"
                        mode='outlined'
                        value={formik.values.type}
                        error={formik.errors.type !== undefined}
                        onChangeText={(type: string) => {
                            formik.setFieldValue('type', capitalCase(type)).then((_) => { formik.validateField('type') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.type ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.type}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='secondaryType'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Secondary Type"
                        mode='outlined'
                        value={formik.values.secondType}
                        error={formik.errors.secondType !== undefined}
                        onChangeText={(type: string) => {
                            formik.setFieldValue('secondType', capitalCase(type)).then((_) => { formik.validateField('secondType') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.secondType ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.secondType}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='hp'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="HP"
                        mode='outlined'
                        value={formik.values.hp}
                        error={formik.errors.hp !== undefined}
                        onChangeText={(hp: string) => {
                            formik.setFieldValue('hp', hp).then((_) => { formik.validateField('hp') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.hp ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.hp}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='attack'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Attack"
                        mode='outlined'
                        value={formik.values.attack}
                        error={formik.errors.attack !== undefined}
                        onChangeText={(attack: string) => {
                            formik.setFieldValue('attack', attack).then((_) => { formik.validateField('attack') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.attack ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.attack}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='defense'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Defense"
                        mode='outlined'
                        value={formik.values.defense}
                        error={formik.errors.defense !== undefined}
                        onChangeText={(defense: string) => {
                            formik.setFieldValue('defense', defense).then((_) => { formik.validateField('defense') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.defense ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.defense}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='spAttack'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Sp. Attack"
                        mode='outlined'
                        value={formik.values.spAttack}
                        error={formik.errors.spAttack !== undefined}
                        onChangeText={(spAttack: string) => {
                            formik.setFieldValue('spAttack', spAttack).then((_) => { formik.validateField('spAttack') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.spAttack ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.spAttack}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='spDefense'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Sp. Defense"
                        mode='outlined'
                        value={formik.values.spDefense}
                        error={formik.errors.spDefense !== undefined}
                        onChangeText={(spDefense: string) => {
                            formik.setFieldValue('spDefense', spDefense).then((_) => { formik.validateField('spDefense') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.spDefense ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.spDefense}
                        </HelperText> : <></>
                    }
                    <TextInput
                        id='speed'
                        style={[styles.textField]}
                        textColor='#fff'
                        label="Speed"
                        mode='outlined'
                        value={formik.values.speed}
                        error={formik.errors.speed !== undefined}
                        onChangeText={(speed: string) => {
                            formik.setFieldValue('speed', speed).then((_) => { formik.validateField('speed') })
                        }}
                        theme={{
                            colors: {
                                onSurfaceVariant: '#fff',
                                primary: '#fff'
                            }
                        }}
                    />
                    {formik.errors.speed ?
                        <HelperText type="error" visible={true}>
                            {formik.errors.speed}
                        </HelperText> : <></>
                    }
                    <Button
                        style={styles.button}
                        theme={{
                            colors: {
                                primary: '#000'
                            }
                        }}
                        onPress={(_) => { formik.handleSubmit() }}
                    >
                        {buttonText}
                    </Button>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    listScreen: {
        paddingHorizontal: 64,
    },
    topAppBar: {
        backgroundColor: "rgba(255, 255, 255, 0.0)"
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 100,
    },
    image: {
        width: '100%',
        height: 100,
        marginTop: 64,
        marginBottom: 32,
    },
    textField: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginBottom: 16
    },
    button: {
        backgroundColor: '#FFCB05',
        borderColor: '#3368B1',
        borderWidth: 1,
        width: 150,
        borderRadius: 12,
        alignSelf: 'center',
        marginBottom: 32
    }
})

type formikValues = {
    name: string,
    type: string,
    secondType: string,
    hp: string,
    attack: string,
    defense: string,
    spAttack: string,
    spDefense: string,
    speed: string
}

const formikSchema = yup.object().shape({
    name: yup.string().required("Required"),
    type: yup.mixed<ElementType>().oneOf(Object.values(TYPE), "Has to be a valid Pokemon Type").required("Required"),
    secondType: yup.mixed<ElementType | "">().oneOf([...Object.values(TYPE), ""], "Has to be a valid Pokemon Type"),
    hp: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
    attack: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
    defense: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
    spAttack: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
    spDefense: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
    speed: yup.number().typeError("Please Enter a Valid Number").integer("Please Enter a whole number ").positive("Enter a Positive Number"),
})
