
import { useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import CreatableSelect from 'react-select/creatable';
import makeAnimated from "react-select/animated";
import Button from "./Button";

const animatedComponents = makeAnimated();

function AddEditCategory() {
  const [categoryModal, setCategoryModal] = useState(false);
  

  const options = [{ value: "uncategorized", label: "Uncategorized" }];

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleOnchange = (value) => {
    console.log(value);
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80 mt-5"
        onClick={() => setCategoryModal((state) => !state)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Add Category
      </button>
      {categoryModal && (
        <Modal
          modalActive={categoryModal}
          setCategoryModal={setCategoryModal}
          title="Add Category"
        >
          <form submit={handleSubmit}>
            <div className="flex gap-2">
                <CreatableSelect 
                components={animatedComponents}
                closeMenuOnSelect={false}
                defaultValue={options[0]}
                isMulti
                options={options}
                className="flex-1"
                onChange={handleOnchange}
                />
                <Button type={"submit"}>
                    Submit
                </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

export default AddEditCategory;
