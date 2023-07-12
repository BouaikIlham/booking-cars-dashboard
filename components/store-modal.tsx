"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "../components/ui/Modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false)
  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await axios.post('/api/stores', values)
      console.log(response.data)
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Modal
      title="Create store"
      description="Add a new store to manage cars"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
        <div>
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} placeholder="Aype a Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="pt-6 space-x-2 flex items-center w-full justify-end">
                            <Button 
                                disabled={isLoading}
                                variant="outline"
                                onClick={storeModal.onClose}>
                                 Cancel
                            </Button>
                            <Button  
                                disabled={isLoading} 
                                type="submit"> 
                                 Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    </Modal>
  );
};
