import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data (optional - remove if you want to preserve data)
  console.log('🗑️  Clearing existing data...');
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.bookContent.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.passwordResetToken.deleteMany();

  // Create Users
  console.log('👤 Creating users...');
  
  const testUser = await prisma.user.create({
    data: {
      name: 'hasan.di@test.com',
      email: 'hasan.di@test.com',
      password: '$2y$12$NLugwAmC.T9GIpbT/VbUxOX60MC97WoQTypCap96IT8i1zyN0PDdO', // Original Laravel password
      role: 'user',
    },
  });

  const adminUser = await prisma.user.create({
    data: {
      name: 'MA Halim',
      email: 'hasan.test.1@gmail.com',
      password: '$2y$12$a/kU.YaRo/TwdOPwuRucG.kwIHOTZdgl6HItwK6yZmmsHvWjzyrG2', // Original Laravel password
      role: 'admin',
    },
  });

  console.log('✅ Created 2 users (1 admin, 1 regular)');

  // Create Categories
  console.log('📚 Creating categories...');
  
  const hadithCategory = await prisma.category.create({
    data: {
      title: 'Hadith',
      slug: 'hadith',
      menuOrder: 10,
      type: 'parent',
    },
  });

  const knowIslamCategory = await prisma.category.create({
    data: {
      title: 'Know Islam',
      slug: 'know-islam',
      menuOrder: 10,
      type: 'parent',
    },
  });

  console.log('✅ Created 2 categories');

  // Create Books
  console.log('📖 Creating books...');
  
  const book1 = await prisma.book.create({
    data: {
      title: 'Crisis in the muslim mind',
      author: 'Abdul Hamid Abu Sulayman',
        coverImage: 'covers/0KMTgyomCp2eArrmIwgHEIpAAOPQGbUitZg5bzM6.png',
      pdfFile: 'pdf/F5vZwNH6HIGhXNi4dxCLWgGAw1kdMP9PPuUR1Wef.pdf',
      type: 'text',
      publicationDate: new Date('2024-10-09'),
      createdAt: new Date('2024-10-08 11:24:28'),
      updatedAt: new Date('2024-10-08 11:24:28'),
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'To be a Muslim',
      author: 'Fathi Yakan',
        coverImage: 'covers/2zjl2W2XNluwXfD61iY351Ee1GvCPa9oVLYVgKmI.png',
      pdfFile: 'pdf/LkotDcgozFOBvas0Eaeon62YyhegkbYLx1AKZ127.pdf',
      type: 'text',
      publicationDate: new Date('2024-10-09'),
      createdAt: new Date('2024-10-08 11:29:42'),
      updatedAt: new Date('2024-10-08 11:29:42'),
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: 'Islam: Grundläggande Tro och Praktiker',
      author: 'Wisdom Publisher',
        coverImage: 'covers/Bpoc8umQh75zsq9C3GmczfjlyAvQRy1QxwWKmFkd.jpg',
      pdfFile: '',
      type: 'text',
      publicationDate: new Date('2024-11-24'),
      createdAt: new Date('2024-11-24 13:20:23'),
      updatedAt: new Date('2024-11-24 13:20:23'),
    },
  });

  console.log('✅ Created 3 books');

  // Create Chapter for Book 3
  console.log('📄 Creating chapters...');
  
  const chapter1 = await prisma.chapter.create({
    data: {
      bookId: book3.id,
      title: 'Förord',
      content: `<div class="flex max-w-full flex-col flex-grow" style="-webkit-text-stroke-width:0px;caret-color:rgb(0, 0, 0);color:rgb(0, 0, 0);font-style:normal;font-variant-caps:normal;font-weight:400;letter-spacing:normal;orphans:auto;text-align:start;text-decoration:none;text-indent:0px;text-transform:none;white-space:normal;widows:auto;word-spacing:0px;"><div class="min-h-8 text-message flex w-full flex-col items-end gap-2 whitespace-normal break-words [.text-message+&]:mt-5" data-message-author-role="assistant" data-message-id="16190026-61f2-4e63-b46d-42a3d18aba31" dir="auto" data-message-model-slug="gpt-4o"><div class="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]"><div class="markdown prose w-full break-words dark:prose-invert light"><p>I en tid av snabb globalisering och kulturellt utbyte är det viktigare än någonsin att förstå den mångfald av tro och praktiker som präglar mänskligheten. Denna bok, <i>Islam: Grundläggande Tro och Praktiker</i>, strävar efter att ge en kortfattad och lättillgänglig introduktion till islams grundläggande principer – en tro som omfattas av över en miljard människor världen över.</p><p>Islam, ofta beskriven som en religion av fred och underkastelse inför Guds vilja, har en rik historia och en djup andlig filosofi. Dess läror betonar enhet, rättvisa, medkänsla och personlig ansvar, och vägleder sina anhängare genom både individuella och kollektiva utmaningar. Kärnan i islam utgörs av de <i>fem pelarna</i>, vilka förkroppsligar livets praktiska och andliga dimensioner. Dessa pelare, tillsammans med trosprinciperna, formar den etiska och moraliska struktur som inspirerat generationer av muslimer.</p><p>Denna bok är utformad för att tjäna både den nyfikna läsaren som söker att förstå islam för första gången och den mer erfarna läraren som vill fördjupa sin kunskap. Med respekt för den tradition som den utforskar, går texten in på de centrala trosuppfattningarna, ritualerna och värderingarna som definierar islam, samtidigt som den reflekterar över dess bredare kulturella och historiska betydelse.</p><p>När du bläddrar genom dessa sidor börjar du en resa genom islams andliga kärna – en resa som strävar efter att bygga broar av förståelse och främja ömsesidig respekt. Vi hoppas att denna bok inte bara utbildar utan också inspirerar till reflektion över de universella värderingar av tro, mänsklighet och samlevnad som förenar oss alla.</p><p><strong>Wisdom Publishers</strong></p></div></div></div></div>`,
      order: 1,
      createdAt: new Date('2024-11-24 13:26:26'),
      updatedAt: new Date('2024-11-24 13:26:26'),
    },
  });

  console.log('✅ Created 1 chapter');

  // Create Post
  console.log('📝 Creating posts...');
  
  const post1 = await prisma.post.create({
    data: {
      userId: adminUser.id,
      categoryId: knowIslamCategory.id,
      title: 'Vad är islam?',
      slug: 'vad-ar-islam',
      body: `<p class="p1">Islam betyder att uppnå fred – fred med Gud, fred inom sig själv och fred med Guds skapelser – genom att helt underkasta sig Gud och acceptera Hans vägledning.</p><p class="p1">Termen "islam" härstammar från den trebokstaviga arabiska roten S (س) - L (ل) - M (م), som genererar ord med sammanhängande betydelser, såsom "underkastelse", "överlåtelse", "engagemang" och "fred". Vanligtvis syftar islam till den monoteistiska religionen som uppenbarades för Muhammad ibn (son av) Abdullah mellan år 610 och 632 enligt den vanliga eran.</p><p class="p1">Namnet "islam" etablerades av Koranen, den heliga skrift som uppenbarades för Muhammad. För troende är islam inte en ny religion. Snarare representerar det den sista upprepningen av det ursprungliga budskapet om Guds enhet, ett tema som återfinns i tidigare monoteistiska religiösa traditioner.</p><p class="p1">Även om islam kan beskrivas som en religion, ses det av dess anhängare – en femtedel av världens befolkning – i mycket bredare termer. Utöver tron på specifika doktriner och utövandet av viktiga rituella handlingar praktiseras islam som ett komplett och naturligt sätt att leva, utformat för att föra Gud till centrum av ens medvetande och därmed ens liv. I grunden är islam en världsbild som fokuserar på tron på den ende Guden och ett engagemang för Hans budord.</p>`,
      status: 'published',
      createdAt: new Date('2024-11-11 07:44:11'),
      updatedAt: new Date('2024-11-11 07:44:11'),
    },
  });

  console.log('✅ Created 1 post');

  // Summary
  console.log('\n🎉 Seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log('   - Users: 2 (1 admin, 1 regular)');
  console.log('   - Categories: 2');
  console.log('   - Books: 3');
  console.log('   - Chapters: 1');
  console.log('   - Posts: 1');
  
  console.log('\n🔐 Test Credentials:');
  console.log('   Admin:');
  console.log('   - Email: hasan.test.1@gmail.com');
  console.log('   - Password: (use original Laravel password)');
  console.log('\n   Regular User:');
  console.log('   - Email: hasan.di@test.com');
  console.log('   - Password: (use original Laravel password)');
  
  console.log('\n⚠️  Note: Passwords are Laravel bcrypt hashes.');
  console.log('   They will work if you update NextAuth to support bcrypt,');
  console.log('   or you can reset them via the password reset flow.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

