import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useRef } from "react";
import toast from "react-hot-toast";

const EditHolidayDialog = ({ isOpen, closeModal, selectedDate }) => {
  const savedItem = useMemo(() => {
    if (!selectedDate) return null;

    const saved = localStorage.getItem(selectedDate.toLocaleDateString());
    if (!saved) return null;

    return JSON.parse(saved);
  }, [selectedDate]);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const saveHoliday = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const description = descRef.current.value;

    localStorage.setItem(
      selectedDate.toLocaleDateString(),
      JSON.stringify({ title, description })
    );
    toast.success("Holiday edited successfully!");

    closeModal();
  };

  const handleDelete = () => {
    localStorage.removeItem(selectedDate.toLocaleDateString());
    toast.success("Holiday deleted successfully!");

    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                onSubmit={saveHoliday}
                as="form"
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="div" className="flex justify-between">
                  <p className="text-lg font-medium leading-6 text-gray-900">
                    Edit Holiday
                  </p>
                  <TrashIcon
                    onClick={handleDelete}
                    className="h-8 w-8 cursor-pointer hover:bg-red-200 stroke-red-500 rounded-md p-1 bg-red-100"
                  />
                </Dialog.Title>

                <div className="mt-4">
                  <input
                    defaultValue={savedItem?.title}
                    ref={titleRef}
                    required
                    className="rounded-md border px-4 py-2 outline-none w-full"
                    placeholder="Title"
                  />
                  <input
                    defaultValue={savedItem?.description}
                    ref={descRef}
                    required
                    className="mt-3 rounded-md border px-4 py-2 outline-none w-full"
                    placeholder="Description"
                  />
                </div>

                <div className="mt-8 flex gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full rounded-md border border-gray-200 px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-teal-500 text-black px-4 py-2"
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const TrashIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

export default EditHolidayDialog;
