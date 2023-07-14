"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {Check, ChevronsUpDown, PlusCircle, Store as StoreIcon} from "lucide-react"
import { cn } from "@/lib/utils";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "./ui/command";
import { Store } from "@prisma/client";
import { useParams, useRouter} from "next/navigation";
import { useState } from "react";
import { useStoreModal } from "@/hooks/useStoreModal";
type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}
  const StoreSwitcher = ({
    className,
    items = []
  }: StoreSwitcherProps) => {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const storeModal = useStoreModal()

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }))

  const currentstore = formattedItems.find((item) => item.value === params.storeId)

  const onStoreSelect = (store: {value: string, label: string}) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={open} 
            aria-label="Select a store"
            className={cn("w-[200px] justify-between", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4"/>
              {currentstore?.label}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50"/>
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
      <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading="stores">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  className="text-sm"
                  onSelect={() => onStoreSelect(store)}
                >
                  {store.label}
                  <Check
                    className={cn("ml-auto h-4 w-4", currentstore?.value === store.value ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
              <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      storeModal.onOpen()
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create store
                  </CommandItem>
              </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
