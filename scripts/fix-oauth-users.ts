import { prisma } from "@/lib/prisma";
import { generateBookingCode } from "@/lib/utils/slug";

async function fixOAuthUsers() {
  console.log("🔍 Buscando usuários sem bookingCode...");
  
  const usersWithoutBookingCode = await prisma.user.findMany({
    where: {
      bookingCode: null,
    },
  });

  console.log(`📊 Encontrados ${usersWithoutBookingCode.length} usuários sem bookingCode`);

  for (const user of usersWithoutBookingCode) {
    const bookingCode = generateBookingCode();
    await prisma.user.update({
      where: { id: user.id },
      data: { bookingCode },
    });
    console.log(`✅ bookingCode gerado para ${user.email}: ${bookingCode}`);
  }

  console.log("✨ Migração concluída!");
}

fixOAuthUsers()
  .catch((error) => {
    console.error("❌ Erro na migração:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
