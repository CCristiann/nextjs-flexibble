"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";


type Props = {
  title: string;
  filters: Array<string>;
  state: string;
  onChange: (value: string) => void;
  dispatch: ({ type, KEY, value } : any) => void;
  KEY: string;
};

const CategoryMenu = ({
  title,
  filters,
  state,
  onChange,
  dispatch,
  KEY
}: Props) => (
  <div className="flex items-start justify-start flex-col w-full gap-7 relative">
    <Menu as="div" className="self-start relative">
      <div className="flex flex-col gap-4 items-start">
        <label className="font-semibold text-lg">Category</label>
        <Menu.Button className="flex items-center gap-4 w-full rounded-md bg-gray-100 p-4 text-base outline-none capitalize">
          {state || "Category"}
          <Image
            src="/assets/icons/arrow-down.svg"
            width={13}
            height={13}
            alt="Arrow Down"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="flex flex-col absolute left-0 mt-2 xs:min-w-[300px] w-fit max-h-64 origin-top-right rounded-xl bg-white border border-nav-border shadow-menu overflow-y-auto">
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="text-left w-full px-5 py-2 text-sm hover:bg-light-white-100 self-start whitespace-nowrap capitalize"
                onClick={(e) => dispatch({
                  type: 'UPDATE_CATEGORY',
                  KEY: KEY,
                  value: e.currentTarget.value
                })}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  </div>
);
export default CategoryMenu;
