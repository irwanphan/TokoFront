import { useState, useEffect } from "react"
import { Box, useDisclosure, useToast, Flex, Text } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import ModalPopup from "@units/ModalPopup"
import { FcGoogle } from "react-icons/fc"
import { RxExit } from "react-icons/rx"
import SessionProfile from "@units/SessionProfile"
import { supabase } from "@libs/connections/supabase"
import { LoadingBlockList } from "@elements/LoadingBlock"
import { signInWithGoogle } from "@libs/connections/signIn"
import { useAuth } from "@contexts/authContext"
import { useRecoilState, useSetRecoilState } from "recoil"
import { sessionState } from "@contexts/session"
import { type Session } from '@supabase/gotrue-js/src/lib/types'

const TokoAuth = () => {
    const { session, user, isLoadingSession } = useAuth()
    const setSession = useSetRecoilState(sessionState)
    console.log('session in TokoAuth:', session)
    // console.log ('user', user)

    // handling logout modal
    const { isOpen:isModalOpen, onOpen:onModalOpen, onClose:onModalClose } = useDisclosure()
    const modalProps = {
        title: `Logging Out?`,
        texts: 'Come back safely',
        button: 'See You',
        action: () => {
            onModalClose(),
            setSession(null),
            supabase.auth.signOut()
        }
    }

    // handle signinWithGoogle
    const toast = useToast()
    // const signInWithGoogle = () => {
    //     toast({title:'Redirecting...'})
    //     // Perform sign in
    //     signIn('google', {
    //         callbackUrl: window.location.href,
    //     })
    // }

    if (isLoadingSession) {
        return (
            <LoadingBlockList />
        )
    }

    if (session) {
        return (
            <Box>
                <Text fontSize={12}>
                    Hi there,
                </Text>
                <Box mt={1} mb={3}
                    borderLeftColor='blue.300'
                    borderLeftWidth='0.5rem'
                    borderLeftStyle='solid'
                    paddingLeft={2}>
                    <SessionProfile session={user}/>
                </Box>
                <FormSubmitButton href="/admin-area" mr={2} px={3} >
                    Admin Area
                </FormSubmitButton>
                <FormSubmitButton notLink px={3}
                    onClick={() => onModalOpen()}>
                    <Box as={RxExit} mr={2} /> Logout
                </FormSubmitButton>

                <ModalPopup modalProps={modalProps} isOpen={isModalOpen} onClose={onModalClose} canCancel />
            </Box>
        )
    }

    return (
        <Box>               
            <Text fontSize={12}>
                You're not login yet
            </Text>
            <Flex gap={2}>
                {/* <FormSubmitButton href="/register">
                    <Box as={GiNewBorn} mr={1} fontSize={20} />register
                </FormSubmitButton> */}
                <FormSubmitButton notLink
                    onClick={() => signInWithGoogle()} >
                    <Box as={FcGoogle} mr={1} fontSize={20} />Login
                </FormSubmitButton>
            </Flex>
        </Box>
    )
}

export default TokoAuth