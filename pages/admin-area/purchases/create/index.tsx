import { useEffect, useState } from "react"
import BlockContainer from "@elements/BlockContainer"
import FormInput from "@elements/FormInput"
import FormSubmitButton from "@elements/FormSubmit"
import MainLayout from "@libs/layouts/MainLayout"
import axios from "axios"
import { useForm, SubmitHandler } from "react-hook-form"
import LoadingOverlay from "@elements/LoadingOverlay"
import { Box, Flex, useToast, Img, Text, Divider, useDisclosure, NumberInput, Input, NumberInputField, List, ListItem } from "@chakra-ui/react"
import { FiBox, FiTrash, FiX } from "react-icons/fi"
import { useRecoilValue } from "recoil"
import { ItemInterface, PurchaseItemInterface } from "@interfaces//storeItem"
import { productsState } from "@contexts/products"
import LoadingBlock from "@elements/LoadingBlock"
import ModalPopup from "@units/ModalPopup"
import { UserInterface } from "@interfaces//user"
import { useRouter } from "next/router"
import { useAuth } from "@contexts/authContext"

interface IFormInput {
    warehouseId: string
    receivedBy: string
    receivedStatus: boolean
    total: number
    note: string
    orders: PurchaseItemInterface[]
    user: UserInterface
}

const CreateProductPage = () => {
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isDisabled, setDisabled ] = useState(false)

    const { session, isLoadingSession } = useAuth()
    // TODO: apply middleware to all admin-area
    const [ userCategory, setUserCategory ] = useState('admin')

    const store = useRecoilValue<ItemInterface[]|any>(productsState)
    // console.log(store)
    const [ isLoadingProducts, setIsLoadingProducts ] = useState<boolean>(true)
    const [ itemsPicked, setItemsPicked ] = useState<PurchaseItemInterface[]>([])
    // console.log('itemsPicked: ', itemsPicked)
    const [ total, setTotal ] = useState<number>(0)
    const toast = useToast()
    const router = useRouter()

    // handling add item modal
    const { isOpen: isOpenAddItem, onOpen: onOpenAddItem, onClose: onCloseAddItem } = useDisclosure()
    const handleAddItem = () => { onOpenAddItem() }
    const modalPropsForAddItem = { title: `Add Product` }
    const handlePickItem = (item:PurchaseItemInterface) => {
        const recentPickedItem = {...item, quantity:1, subtotal:0}
        setItemsPicked([...itemsPicked, recentPickedItem])
        // addToPurchaseCart(item)
        onCloseAddItem()
    }

    // handling delete item modal
    const { isOpen: isOpenDeleteItem, onOpen: onOpenDeleteItem, onClose: onCloseDeleteItem } = useDisclosure()
    const handleRemoveFromAddedItem = (scope:PurchaseItemInterface|any) => {
        const foundIndex = itemsPicked.findIndex((x:any) => x.id === scope.id)
        const newItemsPicked = [...itemsPicked]
        newItemsPicked.splice(foundIndex, 1)
        setItemsPicked(newItemsPicked)
        toast({title:`${scope.name} removed from your cart`, status:'info'})
    }
    const [ scope, setScope ] = useState<PurchaseItemInterface>()
    const modalPropsForDeleteItem = {
        title: `Remove ${scope?.name} From Procurement`,
        texts: 'Are you really OK with this decision?',
        button: 'OK',
        action: () => {
            handleRemoveFromAddedItem(scope)
            onCloseDeleteItem()
        }
    }

    // handling update qty
    const handleUpdateQty = (id:string, quantity:number) => {
        if (quantity === null) { quantity = 1 }
        // if (quantity.charAt(0) === '0') { quantity = quantity.slice(1) }
        const foundIndex = itemsPicked.findIndex((x:any) => x.id === id)
        const newItemsPicked = [...itemsPicked]
        // console.log('newItemsPicked: ', newItemsPicked)
        newItemsPicked[foundIndex].quantity = quantity
        if (!newItemsPicked[foundIndex].lastPurchasePrice) {
            newItemsPicked[foundIndex].lastPurchasePrice = 0
            const lastPurchasePrice = newItemsPicked[foundIndex].lastPurchasePrice!
            newItemsPicked[foundIndex].subtotal = updateSubtotal(quantity, lastPurchasePrice)
        } else {
            const lastPurchasePrice = newItemsPicked[foundIndex].lastPurchasePrice!
            newItemsPicked[foundIndex].subtotal = updateSubtotal(quantity, lastPurchasePrice)
        }
        setItemsPicked(newItemsPicked)
    }
    // handling update price
    const handleUpdatePrice = (id:string, price:number) => {
        // if (price === null) { price = 0 }
        // if (price.charAt(0) === 0) { price = price.slice(1) }
        const foundIndex = itemsPicked.findIndex((x:any) => x.id === id)
        const newItemsPicked = [...itemsPicked]
        // console.log('newItemsPicked: ', newItemsPicked)
        newItemsPicked[foundIndex].lastPurchasePrice = price
        if (!newItemsPicked[foundIndex].lastPurchasePrice) {
            newItemsPicked[foundIndex].lastPurchasePrice = 0
            const quantity = newItemsPicked[foundIndex].quantity!
            newItemsPicked[foundIndex].subtotal = updateSubtotal(quantity, price)
        } else {
            const quantity = newItemsPicked[foundIndex].quantity!
            newItemsPicked[foundIndex].subtotal = updateSubtotal(quantity, price)
        }
        setItemsPicked(newItemsPicked)
    }
    // handling update subtotal
    const updateSubtotal = (quantity:number, price:number) => {
        if (price === null) return 0
        if (price === 0) return 0
        return quantity * price
    }

    useEffect(() => {
        if (itemsPicked.length > 0) {
            const total = itemsPicked.reduce((counting:any, itemPicked:any) => {
                return counting + parseInt(itemPicked.subtotal)
            }, 0)
            setTotal(total)
        } else {
            setTotal(0)
        }
    }, [itemsPicked])

    const { control, handleSubmit, register } = useForm({
        defaultValues: {
            warehouseId: 'main',
            receivedBy: 'not defined',
            receivedStatus: false,
            total: 0,
            note: '',
            orders: [],
            // TODO: user here only need id, email, and name
            user: { id: '', email: '', name: '', emailVerified: false, image: '' }
        }
    })
    const createUserIfNotExist = (data:any) => axios.post('/api/users', data)
    const createPurchaseOrder = (data:IFormInput) => axios.post('/api/purchases', data);
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        // setIsLoading(true)
        // setDisabled
        toast({title:'Submitting...'})
        data.orders = itemsPicked
        data.total = total ?? 0
        // console.log(session!.user)
        data.user = {
            ...data.user,
            email: session?.user.email ?? '',
            name: session?.user.user_metadata.name ?? '',
            id: session?.user.id ?? '',
            emailVerified: session?.user?.identities?.[0].identity_data?.email_verified ?? false,
            image: session?.user.user_metadata.picture ?? ''
        }
        data.receivedStatus = true
        // console.log('data: ', data)

        const userData = {
            id: session!.user.id,
            email: session!.user.email,
            name: session!.user.user_metadata.name,
            image: session!.user.user_metadata.picture
        }
        const user = await createUserIfNotExist(userData)
        const purchase = await createPurchaseOrder(data)

        // // 
        setIsLoading(false)
        toast({title:'Saved', status:'success'})
        // router.push(`/admin-area/purchases/${purchase.data.id}`)
    }

    if (isLoading) {
        return (
            <MainLayout>
                <LoadingBlock />
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            {
                userCategory == 'admin' ?
                <Flex 
                    gap={2} maxW='full'
                    direction={{ base: 'column', md: 'row' }}
                >
                    <FormSubmitButton href="/admin-area">Dashboard</FormSubmitButton>
                    <FormSubmitButton href="/admin-area/products">Manage Products</FormSubmitButton>
                    <FormSubmitButton href="/admin-area/users">Manage Users</FormSubmitButton>
                </Flex>
                : <></>
            }
            <Box mt={4} />

            <BlockContainer>
                <Flex alignItems='center'>
                    <Box as={FiBox} mr={2} />
                    <Text fontWeight={600} >Purchasing</Text>
                </Flex>
                <Divider />
                <FormSubmitButton notLink buttonColor="green.100"
                    onClick={() => handleAddItem()}>
                    Add
                </FormSubmitButton>
                <Box rounded='md' border='1px solid lightgray' mt={4} p={4} shadow='sm'>
                    <List gap={2}>
                    {   itemsPicked.length > 0 ?
                        itemsPicked.map((item:PurchaseItemInterface) => {
                            return (
                                <ListItem key={item.id}>
                                    <Flex alignItems='center' gap={2}>
                                        <Box w={20} h={10} overflow='hidden'>
                                            <Img src={item.image} />
                                        </Box>
                                        <Flex alignItems='center' mb={1}>
                                            <Text>{item.name}</Text>
                                            <Box 
                                                ml={2} p={1} 
                                                borderWidth='1px'
                                                borderStyle='solid'
                                                borderColor='gray.600'
                                                cursor='pointer'
                                                fontSize={12}
                                                transition='0.3s ease all'
                                                _hover={{ bgColor: 'orange.200' }}
                                                onClick={() => {
                                                    setScope(item)
                                                    onOpenDeleteItem()
                                                }}
                                            ><FiTrash /></Box>
                                        </Flex>
                                    </Flex>
                                    <Flex color='gray.600' fontSize={12} my={2} justifyContent='space-between'>
                                        <Flex gap={2} alignItems='center'>
                                            <Flex gap={1.5} alignItems='center'>
                                                Qty: 
                                                <Input type='number'
                                                    fontSize={12} h={6} w={20} p={2} 
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        handleUpdateQty(item.id, parseInt(e.target.value))
                                                    }}
                                                />
                                            </Flex>
                                            <FiX />
                                            <Flex gap={1.5} alignItems='center'>
                                                IDR
                                                <Input type='number'
                                                    fontSize={12} h={6} w={20} p={2} 
                                                    defaultValue={item.lastPurchasePrice ?? 0}
                                                    value={item.lastPurchasePrice}
                                                    onChange={(e) => {
                                                        handleUpdatePrice(item.id, parseInt(e.target.value))
                                                    }}
                                                />
                                            </Flex>
                                        </Flex>
                                        <Box justifySelf='flex-end' >
                                            IDR {item.subtotal ? item.subtotal : 0}
                                        </Box>
                                    </Flex>
                                    <Divider />

                                    
                                </ListItem>
                            )
                        }) : <>Add to your purchase / procurement</>
                    }
                    </List>
                    <Flex flexDirection='column' textAlign='right' mt={4}>
                        {/* TODO: add currency */}
                        <Box fontSize={12}>Total (IDR)</Box>
                        <Box fontWeight={600}>{total}</Box>
                    </Flex>
                </Box>

                <Box mt={4} />
                <form>
                    <Box>
                        <FormInput 
                            name='warehouseId'
                            label='Warehouse' 
                            // TODO: selectable warehouse later
                            // value={}
                            isReadOnly
                            placeholder="received in which warehouse"
                            register={register} />
                    </Box>
                    <Divider mt={4} mb={4} />

                    <Flex gap={2} justifyContent='flex-end'>
                        <FormSubmitButton href="/admin-area/purchases" >Back</FormSubmitButton>
                        <FormSubmitButton notLink 
                            buttonColor="green.100"
                            isDisabled={isDisabled}
                            onClick={handleSubmit(onSubmit)} >
                            Proceed
                        </FormSubmitButton>
                    </Flex>
                </form>
            </BlockContainer>

            { isLoading && <LoadingOverlay isLoading={isLoading} /> }
            <ModalPopup modalProps={modalPropsForAddItem} isOpen={isOpenAddItem} onClose={onCloseAddItem} canCancel>
                <Flex gap={2} flexDirection='column'>
                    {
                        store.map((item:PurchaseItemInterface) => {
                            return (
                                <Box
                                    key={item.id}
                                    border='1px solid lightgray'
                                    borderRadius={4}
                                    padding={2}
                                    cursor='pointer'
                                    transition='0.3s ease all'
                                    _hover={{ bgColor: 'gray.100' }}
                                    onClick={() => handlePickItem(item)}
                                >
                                    <Flex key={item.id} justifyContent='space-between' alignItems='center'>
                                        <Flex gap={2} alignItems='center'>
                                            <Box w={20} h={10} overflow='hidden'>
                                                <Img src={item.image} />
                                            </Box>
                                            <Text>{item.name}</Text>
                                        </Flex>
                                        <Text color='gray.600' fontSize={12}>IDR: {item.lastPurchasePrice ? item.lastPurchasePrice : 0}</Text>
                                    </Flex>
                                </Box>
                            )
                        })
                    }
                </Flex>
            </ModalPopup>
            <ModalPopup modalProps={modalPropsForDeleteItem} isOpen={isOpenDeleteItem} onClose={onCloseDeleteItem} />
            
        </MainLayout>
    )
}

export default CreateProductPage