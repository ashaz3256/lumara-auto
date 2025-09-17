import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
    },
  })

  // Create a test vehicle
  const vehicle = await prisma.vehicle.upsert({
    where: { id: 'test-vehicle-1' },
    update: {},
    create: {
      id: 'test-vehicle-1',
      userId: user.id,
      make: 'Volkswagen',
      model: 'Golf',
      year: 2020,
      fuel: 'petrol',
    },
  })

  console.log('Seed data created:', { user, vehicle })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
