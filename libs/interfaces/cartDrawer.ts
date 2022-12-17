export interface CartDrawerInterface {
    placement: string | any
    isOpen?: boolean
    onOpen?: () => void
    onClose?: () => void
    onToggle?: () => void
}