import { useState } from "react";
import SelectWrapper from "../components/Inputs/SelectFormValue";
import Loader from "../components/Loader";
import Textfield from "../components/Inputs/TextField";
import Button from "../components/Buttons/Button";

import { useDispatch } from "react-redux";
import { updateSuccessNotification } from "../slicer/general/general.actions";

interface Props {
  loading: boolean;
  options: { value: string; title: string }[];
  refetch: any
}

const SelectWithPlus = ({ loading, options, refetch }: Props) => {
  const dispatch = useDispatch()
  const [input, setInput] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("")

  // const handleAddCollection = async () => {
  //   const newEntry = {
  //     value: inputValue.toLocaleLowerCase(),
  //     title: inputValue.charAt(0).toUpperCase() + inputValue.slice(1)
  //   };
  //   await addCollection(newEntry);
  //   dispatch(updateSuccessNotification("Collection Added"))
  //   setInputValue("");
  //   setInput(false);
  //   refetch()
  // };


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        >
          <div
            style={{ display: "flex", columnGap: "10px", alignItems: "end" }}
          >
            <SelectWrapper
              options={options}
              label='Collections'
              name='collections'
            />
            <div
              onClick={() => setInput(!input)}
              style={{
                border: "solid 2px grey",
                height: "57px",
                borderRadius: "10px",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              +
            </div>
          </div>
          {input && (
            <div style={{ display: "flex", columnGap: "10px" }}>
              <Textfield getValue={setInputValue} setValue={inputValue} />
              <Button label="Add"></Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SelectWithPlus;
