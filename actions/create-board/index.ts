"use server"

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types"
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
//import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType) : Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    // const canCreate = await hasAvailableCount();

    // if (!canCreate) {
    //     return {
    //         error: "you have reached your limit of free boards . Please upgrade to create more."
    //     }
    // }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
    ] = image.split("|");

//     console.log({
//         imageId,
//         imageThumbUrl,
//         imageFullUrl,
//         imageUserName,
//         imageLinkHTML,
// })

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return {
            error: "Missing fields. Failed to create board."
        }
    }

    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML,
            }
        });

        // await incrementAvailableCount();

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            action: ACTION.CREATE,
        })


    } catch (error) {
        console.log(error)
        // return {
        //     // error: "Failed to create."
            
        // }
        
    }
    revalidatePath(`/board/${board.id}`);
    return {data: board};

} 
export const  createBoard = createSafeAction(CreateBoard, handler)



// import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { type } from "os";
// import { z } from "zod";

// export type State = {
//     errors?:{
//         title?: string[];
//     },
//     message?: string | null;
// }

// const CreateBoard = z.object({
//     title: z.string().min(3,{
//         message: "Minimum length of 3 letters is required"
//     })

// });

    
//     export async function create(prevState: State ,formData: FormData) {
//         const validatedFields = CreateBoard.safeParse({
//             title: formData.get("title"),
//         })

//         if (!validatedFields.success) {
//             return {
//                 errors: validatedFields.error.flatten().fieldErrors,
//                 message: "Missing fields."
//             }
//         }

//         const { title } = validatedFields.data;

//         try {

//             await db.board.create({
//                 data: {
//                     title,
//                 }
//             })
        
//         } catch(error) {
//             return {
//                 message: "Database Error",
//             }
//         }

//         revalidatePath("/organization/org_2ZWWL6AqExuVmLne1fCJJHzUEFf");
//         redirect('/organization/org_2ZWWL6AqExuVmLne1fCJJHzUEFf')

//     }