

import { handleSubmission } from "@/app/actions";
import SubmitButton from "@/components/general/submitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateBlogRoute() {

    return (
        <div>
            <Card className={"max-w-lg mx-auto"}>
                <CardHeader>
                    <CardTitle>Create Post</CardTitle>
                    <CardDescription>Create a new post to share with the world</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmission} className="flex flex-col">
                        <div className="flex flex-col gap-4 mb-4">
                            <Label htmlFor="title">Title</Label>
                            <Input name="title" required type={'text'} placeholder="Title" />
                        </div>
                        <div className="flex flex-col gap-4 mb-4">
                            <Label htmlFor="Content">Content</Label>
                            <Textarea name="content" required type='text' placeholder="..." />
                        </div>
                        <div className="flex flex-col gap-4 mb-4">
                            <Label >Image Url</Label>
                            <Input name="imgUrl" required type={'url'} placeholder="Image URL"/>
                        </div>
                        <SubmitButton />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}