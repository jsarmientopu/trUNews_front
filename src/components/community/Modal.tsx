import React from 'react';
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure,
        Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import { leaveCommunity } from "@/utils/Communities/fetch"

interface ShowModalProps {
    user_id: number;
    community_id: number;
}

const ShowModal: React.FC<ShowModalProps> = ({user_id, community_id}) => {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // fetch dejar una comunidad
    function leaveACommunity() {
        if (user_id && community_id){
            leaveCommunity(user_id, community_id);
        }
        
    }

    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button className="material-symbols-outlined icon_button bg-white">
                        more_vert
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with description" onAction={onOpen}>
                    <DropdownItem
                        key="leave"
                        description="Leave the community"
                        startContent={<span className="material-symbols-outlined">logout</span>}>
                        Leave Community
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior='inside'>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalBody className=" p-8 pt-16">
                        <p className="text-center text-2xl font-bold">Do you want to leave this community?</p>
                    </ModalBody>
                    <ModalFooter className="flex justify-center gap-10">
                        <Button className="font-bold" color="danger" onPress={leaveACommunity}>
                            Confirm
                        </Button>
                        <Button className="font-bold text-white" color="success" onPress={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ShowModal;