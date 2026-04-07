import { NextResponse, NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/db";
import { userModel } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await req.json();
    const [updatedUser] = await db
      .update(userModel)
      .set({ username: username, updatedAt: new Date() })
      .where(eq(userModel.id, userId))
      .returning();

    return NextResponse.json(
      { message: "Username updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
