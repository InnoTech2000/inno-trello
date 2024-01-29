"use server";

import { auth } from "@clerk/nextjs"; 

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrder } from "./schema";

const handler = async ( data: InputType ) : Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if(!userId  ||  !orgId) {
        return {
            error: "Unauthorized",
        }
    }

    const { items, boardId } = data;
    let lists;

    try {

        // const board = await db.board.findUnique({
        //     where: {
        //         id: boardId,
        //         orgId,
        //     },
        // });

        // if (!board) {
        //     return{
        //         error: "Boar not found ",
        //     }
        // }

        // const lastList = await db.list.findFirst({
        //     where: {
        //         boardId : boardId
        //     },
        //     orderBy: {
        //         order: "desc"
        //     },
        //     select: {
        //         order: true
        //     }
        // })

        // const newOrder = lastList ? lastList.order + 1 : 1;

        // list = await db.list.create({
        //     data: {
        //         title,
        //         boardId,
        //         order: newOrder
        //     }
        // })
        const transaction = items.map((list) => 
            db.list.update({
                where:{
                    id: list.id,
                    board: {
                        orgId,
                    }
                },
                data:{
                    order: list.order
                }
            })
        )

        lists = await db.$transaction(transaction);
            
    } catch (error) {
        console.log(error)
        return {
            error: "Failed to reorder."
        }
    }
    revalidatePath(`/board/${boardId}`)
    return { data:lists };
}


export const updateListOrder = createSafeAction(UpdateListOrder, handler);