import prisma from "@/lib/db";
import crypto from "node:crypto";
import slugify from "slugify";
/** Generate a random token of the specified length, using crypto.randomBytes function
 * that first creates a buffer of random bytes and then converts it to a hex string.
 * @param length The length of the token to generate.
 */
export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T extends typeof prisma>(
  cb: (trx: T) => void
) {
  await prisma.$transaction(cb as any);
}

export async function generateUniqueSlug(name: string): Promise<string> {
  let slug = slugify(name, { lower: true, strict: true });
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const existingUser = await prisma.user.findUnique({
      where: { slug: uniqueSlug },
    });

    if (!existingUser) {
      return uniqueSlug;
    }

    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
}
