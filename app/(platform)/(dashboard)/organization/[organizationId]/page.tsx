// import { OrganizationSwitcher, auth } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { Info } from "./_components/info";
import { BoardList } from "./_components/board-list";
import { Suspense } from "react";



// "use client"

//  import { db } from "@/lib/db"; 
// import { Board } from "./board";
// import { Form } from "./form";


const OrganizationIdPage = async () => {

    // const boards = await db.board.findMany();

    // const { userId, orgId } = auth();

    // async function create(formData: FormData) {
    //     "use server"

    //     const title = formData.get("title") as string;

    //     await db.board.create({
    //         data: {
    //             title,
    //         }
    //     })

    // }

    // return (
    //     <div className="flex flex-col space-y-4">
    //             <Form />
    //         <div className="space-y-2">
    //             {boards.map((board) => (
    //                 <Board  key={board.id} title={board.title} id={board.id} />
    //             ))}
    //         </div>
    //     </div>
    // )


    return (
        <div className="w-full mb-20">
            <Info />
            <Separator className="my-4" />
            <div className="px-2 md:px-4" >
                <Suspense  fallback={<BoardList.Skeleton/>}>
                <BoardList />

                </Suspense>
            </div>
        </div>
    )


}

export default OrganizationIdPage;