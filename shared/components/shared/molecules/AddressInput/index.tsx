import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface AddressInputProps {
  value: any;
  onChange?: (value?: string) => void;
}

const AddressInput: React.FC<AddressInputProps> = ({ value, onChange }) => {
  return (
    <AddressSuggestions
      token="85353d709d4c8592e1f4528ec02e2ae3ce377ae8"
      value={value}
      delay={500}
      inputProps={{
        onChange: (e) => {
          if (e.currentTarget.value == "") onChange?.("");
        },
        placeholder: "Enter your address here...",
        className:
          "transition-all duration-200 flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      }}
      onChange={(data) => {
        console.log(data);
        onChange?.(data?.value);
      }}
    />
  );
};

export default AddressInput;
