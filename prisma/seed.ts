import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedSettings = async () => {
  const settingBusinessName = await prisma.setting.create({
    data: {
      name: "settingBusinessName",
      description: "business name",
      value: "TokoFront",
      updatedBy: "Setup Event"
    }
  })
  const settingBusinessDescription = await prisma.setting.create({
    data: {
      name: "settingBusinessDescription",
      description: "business description",
      value: "A Place To Find Your Wonder Moment",
      updatedBy: "Setup Event"
    }
  })
  const settingSalesOrderingModeEnable = await prisma.setting.create({
    data: {
      name: "settingSalesOrderingModeEnable",
      description: "sales ordering mode enable",
      value: "no",
      updatedBy: "Setup Event"
    }
  })
  const settingMainPageMode = await prisma.setting.create({
    data: {
      name: "settingMainPageMode",
      description: "main page mode",
      value: "store",
      updatedBy: "Setup Event"
    }
  })
}

const seedWarehouse = async () => {
  const warehouse = await prisma.warehouse.create({
    data: {
      id: 'main',
      name: "Main Warehouse",
      address: "At Headquarter",
      city: "Jakarta",
      province: "DKI Jakarta",
      postal: "12345",
      note: "Main Warehouse"
    }
  })
  console.log({ warehouse })
}

const seedSampleProducts = async () => {
  const item1 = await prisma.product.create({
    data: {
      name: "Something", 
      refId: "Something",
      description: "It's something ain't Lorem Ipsum",
      price: 100000,
      unit: 'piece',
      currentStock: 20,
      image: "https://static.wixstatic.com/media/d51f38_06581f8dd35f412a90b2d4a33054880c~mv2.png/v1/fill/w_688,h_479,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BIG-NIGHT-IN-V2.png",
    }
  })
  const item2 = await prisma.product.create({
    data: {
      name: "Coffee", 
      refId: "Coffee", 
      description: "It's something ain't Lorem Ipsum",
      price: 15000,
      unit: 'piece',
      currentStock: 20,
      image: "https://static.wixstatic.com/media/d51f38_0d7a5d415c2a46ec9d42970a0b5656c5~mv2.png/v1/fill/w_688,h_479,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Spring-Baby-Event.png"
    }
  })
  const item3 = await prisma.product.create({
    data: {
      name: "Tea", 
      refId: "Tea", 
      description: "It's something ain't Lorem Ipsum",
      price: 7000,
      unit: 'piece',
      currentStock: 20,
      image: "https://static.wixstatic.com/media/d51f38_98f586b21c614fa1bb3b8030f26b720b~mv2.png/v1/fill/w_688,h_475,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Halloween.png"
    }
  })
  const item4 = await prisma.product.create({
    data: {
      name: "Xmas Stuff", 
      refId: "Xmas Stuff", 
      description: "It's something ain't Lorem Ipsum",
      price: 123400,
      unit: 'piece',
      currentStock: 20,
      image: "https://static.wixstatic.com/media/d51f38_f9faae6bce6b4580a65d9739e66041b0~mv2.png/v1/fill/w_688,h_486,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Christmas.png"
    }
  })
  const item5 = await prisma.product.create({
    data: {
      name: "Another Item", 
      refId: "Another Item", 
      description: "It's something ain't Lorem Ipsum",
      price: 5000,
      unit: 'piece',
      currentStock: 20,
      image: "https://static.wixstatic.com/media/d51f38_65b6755aba5e46bdbc9f2b1ec3ffa275~mv2.png/v1/fill/w_688,h_486,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SUMMERV2.png"
    }
  })
  console.log({ item1, item2, item3, item4, item5 })
}

async function main() {
  // seed business settings
  seedSettings()

  // seed main warehouse
  seedWarehouse()

  // seed sample products
  seedSampleProducts() 
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})