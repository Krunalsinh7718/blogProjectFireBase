import { useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import Button from "./Button";
import storageService from "appwrite/types/service";

function AddEditCategory() {
  const [categories, seCategories] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const cateRes = await storageService.AddEditCategory(categories);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="flex w-full items-center space-x-2">
          <input
            class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Category"
          />
          <button
            type="submit"
            class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default AddEditCategory;
