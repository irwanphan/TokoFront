interface ItemInterface {
    id: number
    name: string
    price: number
}
export const dummyItems:ItemInterface[] = [
    {
        id: 1,
        name: "Something", 
        price: 100000
    },
    {
        id: 2,
        name: "Coffee", 
        price: 15000
    },
    {
        id: 3,
        name: "Tea", 
        price: 7000
    }
]