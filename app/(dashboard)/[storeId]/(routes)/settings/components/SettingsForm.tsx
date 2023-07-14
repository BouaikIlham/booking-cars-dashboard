"use client"
 
import { useState } from "react";
import { Store } from "@prisma/client"
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
 interface SettingsFormProps {
    initialData: Store;
 }

 const formSchema = z.object({
  name: z.string().min(1),
});


const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {

  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:  initialData
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Settings"
          description="Manage store preferences"
        />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => {}}
        >
        <Trash className="h-4 w-4"/>
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className=" grid grid-cols-3 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input disabled={loading} placeholder="Store name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
                Save changes
          </Button>
        </form>
      </Form>
    </>
  )
}

export default SettingsForm