import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, useDisclosure, FlexProps, Box } from "@chakra-ui/react"
import FormSubmitButton from "@elements/FormSubmit"
import { MouseEventHandler, ReactNode } from "react"
interface ModalProps extends FlexProps {
    modalProps: modalPropDetails
    children?: ReactNode
    isOpen: boolean
    onClose: void|any
    canCancel?: boolean
}
interface modalPropDetails {
    title: string
    texts?: string
    action?: MouseEventHandler<HTMLButtonElement> | any
    button?: string
    cancel?: string
}

const ModalPopup = ({modalProps, children, isOpen, onClose, canCancel, ...rest}: ModalProps) => {
    // const { isOpen, onOpen, onClose } = useDisclosure(pop) // passed in from parent
    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            size={"3xl"}
            motionPreset='slideInBottom'
        >
            <ModalOverlay />
            <ModalContent p={3} w={'50rem'} {...rest}>
                <ModalHeader
                    textAlign={'center'} fontWeight={800}
                >{modalProps.title}</ModalHeader>
                <ModalCloseButton border='1px solid black' />
                <ModalBody textAlign={'center'}>
                    <Box mb={2}>{modalProps.texts}</Box>
                    { children && <Box>{children}</Box>}
                </ModalBody>
                <ModalFooter justifyContent={'center'}>
                    { canCancel && 
                        <Button colorScheme='blue' mr={2} variant={'outline'} 
                        onClick={onClose}>{modalProps.cancel ?? 'Batal'}</Button>
                    }
                    { modalProps.button &&
                        <FormSubmitButton notLink
                            bgColor='orange.200'
                            onClick={modalProps.action}
                        >{modalProps.button}</FormSubmitButton>
                    }
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalPopup