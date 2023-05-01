import SelectWrapper from "../components/Inputs/SelectFormValue";
import Loader from "../components/Loader";

interface Props {
  loading: boolean;
  options: { value: string; title: string }[];
}

const SelectWithPlus = ({ loading, options }: Props) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ display: "flex", columnGap: "10px", alignItems: "end" }}>
          <SelectWrapper
            options={options}
            label='Collections'
            name='collections'
          />
          <div
            style={{
              border: "solid 2px grey",
              height: "57px",
              borderRadius: "10px",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            +
          </div>
        </div>
      )}
    </>
  );
};

export default SelectWithPlus;
