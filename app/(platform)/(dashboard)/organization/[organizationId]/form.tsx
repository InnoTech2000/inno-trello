"use client";


// import { Button } from "@/components/ui/button";
// import { useFormState } from "react-dom";
// import { FormInput } from "./form-input";
// import { FormButton } from "./form-button";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";

import { FormSubmit } from "@/components/form/form-submit";

export const Form = () => {
    // const initialState = { message:null, errors: {} };
    // const [state, dispatch] = useFormState(create, initialState);

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess(data) {
            console.log(data, "SUCCESS!")
        },
        onError(error) {
            console.log(error)
        },
    });
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;

        console.log({title})

        execute({ title })
    }


    return (
        <form action={onSubmit} >
            <div className="flex flex-col space-y-2" >

        {/* <input 
            id="title"
            name="title"
            required
            placeholder="Enter a board title"
            className="border-black border p-1"
            />
            {
                state?.errors?.title ? (
                    <div>
                        {state.errors.title.map((error: string)=>(
                            <p key={error} className="text-rose-500" >
                                {error}
                            </p>
                        ))}
                    </div>    
                ) : null

            } */}
            <FormInput 
            label="Board Title"
            id="title"
            errors={fieldErrors} />
            </div>
            <FormSubmit>
                Save
            </FormSubmit>
    </form>

    )
}