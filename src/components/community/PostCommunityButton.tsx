import React, { useEffect, useRef, useState } from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import {Dropdown, Link, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";
import {CheckboxGroup} from "@nextui-org/react";
import {CustomCheckbox} from "./CustomCheckbox";

import { LiaEditSolid } from "react-icons/lia";

const PostCommunityButton = () => {

  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState(-1);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log(scrollTop>0)
      setVisible(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


    return <>
      <Dropdown backdrop="blur" placement="left-end">
        <DropdownTrigger hidden>
          <Button color="primary" variant="shadow" className={`capitalize p-1.5 m-5 drop-shadow-2xl ${visible?"":"hidden"}`} size="lg" isIconOnly aria-label="Post menu">
                <LiaEditSolid size={'30em'}/>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="shadow">
          <DropdownItem key="new" onClick={()=>{setMode(0);ref.current?.click()}}>New post</DropdownItem>
          {/* <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem> */}
          <DropdownItem key="delete" className="text-danger" color="danger" onClick={()=>{setMode(1);ref.current?.click()}}>
            Delete post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button ref={ref} onPress={onOpen} className="hidden"></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                 <div className="flex flex-col gap-1 w-full">
                  <CheckboxGroup
                    label="Select employees"
                    value={groupSelected}
                    onChange={setGroupSelected}
                    classNames={{
                      base: "w-full"
                    }}
                  >
                    <CustomCheckbox
                      article={{
                        name: "Junior Garcia",
                        avatar: "https://avatars.githubusercontent.com/u/30373425?v=4",
                        username: "jrgarciadev",
                        url: "https://twitter.com/jrgarciadev",
                        role: "Software Developer",
                        status: "Active",
                      }}
                    />
                    <CustomCheckbox
                      article={{
                        name: "John Doe",
                        avatar: "https://i.pravatar.cc/300?u=a042581f4e29026707d",
                        username: "johndoe",
                        url: "#",
                        role: "Product Designer",
                        status: "Vacation",
                      }}
                    />
                    <CustomCheckbox
                      article={{
                        name: "Zoey Lang",
                        avatar: "https://i.pravatar.cc/300?u=a042581f4e29026704d",
                        username: "zoeylang",
                        url: "#",
                        role: "Technical Writer",
                        status: "Out of office",
                      }}
                    />
                    <CustomCheckbox
                      article={{
                        name: "William Howard",
                        avatar: "https://i.pravatar.cc/300?u=a048581f4e29026701d",
                        username: "william",
                        url: "#",
                        role: "Sales Manager",
                        status: "Active",
                      }}
                    />
                  </CheckboxGroup>
                  <p className="mt-4 ml-1 text-default-500">
                    Selected: 
                    {/* {groupSelected.join(", ")} */}
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>

}

export default PostCommunityButton