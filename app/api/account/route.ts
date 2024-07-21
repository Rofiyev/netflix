import Account from "@/database/account";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const dynamic = "force-dynamic";

// Create new account
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { name, uid, pin } = await req.json();

    const allAcounts = await Account.find({ uid });
    const isExist = await Account.findOne({ name });

    if (isExist)
      return NextResponse.json({
        success: false,
        message: "You already have an account",
      });

    if (allAcounts && allAcounts.length >= 3)
      return NextResponse.json({
        success: false,
        message: "You can only have 4 accounts",
      });

    const hashPin = await hash(pin, 10);
    const account = await Account.create({ name, uid, pin: hashPin });

    return NextResponse.json({ success: true, account });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// GET All accounts
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const uid = searchParams.get("uid");

    if (!uid)
      return NextResponse.json({
        success: false,
        message: "Account id is mandatory",
      });

    const accounts = await Account.find({ uid });

    return NextResponse.json({ success: true, accounts });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}

// Delete an account
export async function DELETE(req: Request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({
        success: false,
        message: "Account id is mandatory",
      });

    await Account.findOneAndDelete({ _id: id });

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
