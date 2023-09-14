import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import toast from "react-hot-toast";

const AddHolidayDialog = ({ isOpen, closeModal, selectedDate }) => {
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

    toast.success("Holiday created successfully!");
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add Holiday
                </Dialog.Title>
                <div className="mt-4">
                  <input
                    ref={titleRef}
                    required
                    className="rounded-md border px-4 py-2 outline-none w-full"
                    placeholder="Title"
                  />
                  <input
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

export default AddHolidayDialog;
