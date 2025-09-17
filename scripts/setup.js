#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚗 Setting up Lumara Auto...\n')

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local from template...')
  const envExample = fs.readFileSync(path.join(process.cwd(), 'env.example'), 'utf8')
  fs.writeFileSync(envPath, envExample)
  console.log('✅ Created .env.local - Please update with your actual values\n')
} else {
  console.log('✅ .env.local already exists\n')
}

// Install dependencies
console.log('📦 Installing dependencies...')
try {
  execSync('npm install', { stdio: 'inherit' })
  console.log('✅ Dependencies installed\n')
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message)
  process.exit(1)
}

// Generate Prisma client
console.log('🗄️  Generating Prisma client...')
try {
  execSync('npx prisma generate', { stdio: 'inherit' })
  console.log('✅ Prisma client generated\n')
} catch (error) {
  console.error('❌ Failed to generate Prisma client:', error.message)
  process.exit(1)
}

console.log('🎉 Setup complete!')
console.log('\nNext steps:')
console.log('1. Update .env.local with your database URL and API keys')
console.log('2. Run: npm run db:push (to create database tables)')
console.log('3. Run: npm run dev (to start development server)')
console.log('\nFor more information, see README.md')
