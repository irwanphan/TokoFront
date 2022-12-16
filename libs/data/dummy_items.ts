export interface ItemInterface {
    id: string
    name: string
    description: string
    price: number
    image: string
}
export const dummyItems:ItemInterface[] = [
    {
        id: 1,
        name: "Something", 
        description: "It's something ain't Lorem Ipsum",
        price: 100000,
        image: "https://static.wixstatic.com/media/d51f38_06581f8dd35f412a90b2d4a33054880c~mv2.png/v1/fill/w_688,h_479,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BIG-NIGHT-IN-V2.png"
    },
    {
        id: 2,
        name: "Coffee", 
        description: "It's something ain't Lorem Ipsum",
        price: 15000,
        image: "https://static.wixstatic.com/media/d51f38_0d7a5d415c2a46ec9d42970a0b5656c5~mv2.png/v1/fill/w_688,h_479,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Spring-Baby-Event.png"
    },
    {
        id: 3,
        name: "Tea", 
        description: "It's something ain't Lorem Ipsum",
        price: 7000,
        image: "https://static.wixstatic.com/media/d51f38_98f586b21c614fa1bb3b8030f26b720b~mv2.png/v1/fill/w_688,h_475,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Halloween.png"
    },
    {
        id: 4,
        name: "Xmas Stuff", 
        description: "It's something ain't Lorem Ipsum",
        price: 123400,
        image: "https://static.wixstatic.com/media/d51f38_f9faae6bce6b4580a65d9739e66041b0~mv2.png/v1/fill/w_688,h_486,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Christmas.png"
    },
    {
        id: 5,
        name: "Another Item", 
        description: "It's something ain't Lorem Ipsum",
        price: 5000,
        image: "https://static.wixstatic.com/media/d51f38_65b6755aba5e46bdbc9f2b1ec3ffa275~mv2.png/v1/fill/w_688,h_486,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SUMMERV2.png"
    }
]