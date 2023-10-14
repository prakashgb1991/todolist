import { Link, styled, TextField } from "@material-ui/core";
import { useState } from "react";

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: React.SyntheticEvent<Element, Event>) => {
        // @ts-ignore
        setValue(event.target.value);
      },
      required: true,
    },
  };
};

export const Field = styled(TextField)({
  margin: "10px 0",
});

export const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});
