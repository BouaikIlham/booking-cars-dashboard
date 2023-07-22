"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { useState } from "react";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/ui/image-upload";
import { Car, Category, Image } from "@prisma/client";

interface CarFormProps {
  initialData: Car & {
    images: Image[]
  } | null
  categories: Category[]
}

const formSchema = z.object({
  model: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  mileage: z.string().min(1),
  capicity: z.string().min(1),
  transmission: z.string().min(1),
  isAvailable: z.boolean().default(false).optional(),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1)

});

type CarFormValues = z.infer<typeof formSchema>



const CarForm:React.FC<CarFormProps> = ({
  initialData,
  categories
}) => {

  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CarFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price))
    } : {
      model: '',
      description: '',
      categoryId: '',
      mileage:'',
      capicity:'',
      transmission:'',
      price: 0,
      images: [],
      isAvailable: false
    }
  })

  const title = initialData ? "Edit car" : "Create car";
  const description = initialData ? "Edit a car" : "Add a new  car";
  const toastMessage = initialData
    ? " car updated."
    : " car created.";
  const action = initialData ? "Save changes" : "Create car";

  const onSubmit = () => {
    console.log("onSubmit")
  }

  const onDelete = () => {
    console.log("onDelete")
  }
  return (
<>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            disabled={loading}
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Images </FormLabel>
                    <FormControl>
                      <ImageUpload 
                        value={field.value.map((image) => image.url)} 
                        disabled={loading} 
                        onChange={(url) => field.onChange([...field.value, {url}])}
                        onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="md:grid md:grid-cols-3 gap-8">
              {/* <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="Billboard label" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
      </Form>
      <Separator />
    </>  )
}

export default CarForm