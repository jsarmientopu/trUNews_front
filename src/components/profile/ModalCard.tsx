import { getUserType, updatePasswordType} from "@/dto/users";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import {RiLockPasswordLine} from 'react-icons/ri';
import { useState, useRef} from "react";
import { updatePassword } from "@/utils/fetchs";
import { alert } from "@/utils/alertHandeler";


const ModalCard=({user}:{'user':getUserType})=>{

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [infoUpdatePassword, setUpdatePassword]= useState<updatePasswordType>({'username':user.username,'newPassword':'','currentPassword':''});
    const [confirm, setConfirm]= useState<string>("");
    const cancel = useRef<any>();

    const submitForm=async (event:any)=>{
        console.log(infoUpdatePassword)
        if(infoUpdatePassword.currentPassword && infoUpdatePassword.newPassword && infoUpdatePassword.newPassword==confirm){
            alert('question','Your password will change','',async()=>{
                const res = await updatePassword(infoUpdatePassword, user.id_user)
                // cancel.current.click()
                if(res.error||res.err){
                    alert('error','Change failed',res.error,()=>{})
                }
            });
            
        }else{
            alert('error','Data invalid','Confirm your current password and the new password',()=>{})
        }
        setUpdatePassword({'username':user.username,'newPassword':'','currentPassword':''})
    }

    return <>
        <Button className="bg-[#963ED9] text-[#F8F8F8] shadow-2xl" onPress={onOpen}>
            <RiLockPasswordLine size='1.5em' />
            Change Password 
        </Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            scrollBehavior='inside'
        >
            <ModalContent>
            {(onClose) => (
                <>
                <ModalHeader className="flex flex-col gap-1">
                    Change your password
                </ModalHeader>
                <ModalBody>
                    <p>Please complete the next form to update your password.</p>
                    <form className="gap-4" >
                        <p className='content-start text-sm my-2'>Old Password</p>
                        <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" name='password' type='password' radius = {"md"} placeholder='Password' onChange={(event)=>setUpdatePassword({...infoUpdatePassword,'currentPassword':event.target.value})} isRequired/>
                        <p className='content-start text-sm my-2'>New Password</p>
                        <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px] mb-4" name='newPassword' type='password' placeholder='New Password' onChange={(event)=>setUpdatePassword({...infoUpdatePassword,'newPassword':event.target.value})} isRequired/>
                        <Input className="w-[100%] mr-8 border-2 border-sky-600 rounded-[13px]" name='newPassword2' type='password' placeholder='Confirm Password' onChange={(event)=>setConfirm(event.target.value)} isRequired/>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button name="cancel" color="danger" variant="light"  ref={cancel} onPress={onClose} onClick={onClose}>
                    Cancel
                    </Button>
                    <Button name="save" color="primary" onPress={submitForm}>
                    Change
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>
}

export default ModalCard;