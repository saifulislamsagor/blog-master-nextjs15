"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const { prisma } = require("./utils/db");


export async function handleSubmission(FormData) {

    const {getUser} = getKindeServerSession();
    const user = await getUser();

    if(!user) {
        return redirect("/api/auth/login");
    }

    const title = FormData.get("title");
    const content = FormData.get("content");
    const imgUrl = FormData.get("imgUrl");
    const data = await prisma.BlogPost.create({
        data:{
            title: title,
            content: content,
            imgUrl: imgUrl,
            authorId: user.id,
            authorImage:user.picture,
            authorName:user.given_name // Assuming you have a user ID from Kinde
        }
    })

    return redirect("/dashboard");
}
