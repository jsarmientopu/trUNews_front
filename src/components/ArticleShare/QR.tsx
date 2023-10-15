import React , {useState, useEffect} from 'react'
import {MdOutlineQrCode} from 'react-icons/md'
import Image from 'next/image';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { getQR } from '@/utils/Articles/fetch';

const QR=({path}:{path:string})=>{

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [qr, setQr]=useState<string>('');

    useEffect(()=>{
      (async()=>{ 
        const qrCode = await getQR(path);
        setQr(qrCode);
      })()
    },[]);

    return (<>
    <Button className='flex flex-col justify-center items-center' onClick={onOpen} isIconOnly radius='full' size='sm'><MdOutlineQrCode/></Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Share - QR Code</ModalHeader>
              <ModalBody className='flex flex-row justify-center'>
                <Image
                        src={qr}
                        alt="QR-Code"
                        width={250}
                        height={250}
                  />
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
  ) 
}


export default QR;