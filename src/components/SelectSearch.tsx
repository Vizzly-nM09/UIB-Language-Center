"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function SelectSearch({
  fieldName,
  placeholder,
  value,
  data,
  setValue,
  defaultEmptyValue,
  isLoading,
  searchQuery,
  setSearchQuery,
}: {
  fieldName: string;
  placeholder: string;
  value: string;
  setValue: (data: any) => void;
  defaultEmptyValue: {
    value: string;
    label: string;
  };
  data: { value: any; label: any }[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (data: any) => void;
}) {
  const [open, setOpen] = useState(false);
  const [localValue, setLocalValue] = useState({
    value: "",
    label: "",
  });

  useEffect(() => {
    if (!value) {
      setLocalValue({ value: "", label: "" });
      return;
    }

    const found = data.find((item) => String(item.value) === value);
    if (found) {
      setLocalValue(found);
    } else if (value === "0") {
      setLocalValue(defaultEmptyValue);
    }
  }, [value, data, defaultEmptyValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between text-xs font-normal"
        >
          {localValue.label || placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Cari ${fieldName}...`}
            className="h-8"
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          {isLoading ? (
            <CommandList>
              <CommandEmpty>Mencari {fieldName.toLowerCase()}...</CommandEmpty>
            </CommandList>
          ) : (
            <CommandList>
              <CommandEmpty>{fieldName} tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                {(data ?? []).map((item, index) => (
                  <CommandItem
                    key={index}
                    value={item.value}
                    className="text-xs hover:!bg-gray-100 !bg-white"
                    onSelect={() => {
                      setLocalValue(item);
                      setValue(item.value);
                      setOpen(false);
                    }}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
