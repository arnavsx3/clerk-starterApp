import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server";
import { Webhook } from "svix";
import { db } from "@/src/lib/db";
import { userModel } from "@/src/db/schema";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      return NextResponse.json(
        { message: "No webhook secret found" },
        { status: 404 },
      );
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { error: "Missing svix headers" },
        { status: 400 },
      );
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    if (evt.type === "user.created") {
      const { id, email_addresses, username } = evt.data;
      const newUser = await db.insert(userModel).values({
        id: id,
        email: email_addresses[0].email_address,
        username: username ?? email_addresses[0].email_address.split("@")[0],
      });
      return NextResponse.json(
        { message: "User created successfully", user: newUser },
        { status: 201 },
      );
    }
    return NextResponse.json({ message: "Event ignored" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
