"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "../components/ui/Modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const formSchema = z.object({
    name: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
    },
  });

  console.log(form)

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage cars"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Future Create Store Form
    </Modal>
  );
};
