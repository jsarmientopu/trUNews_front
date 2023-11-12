import { createEventType } from "@/dto/community"
import { imageType } from "@/dto/users";
import { imageReader } from "@/utils/Create_Article/file_Reader";
import { createEvent } from "@/utils/Events/fetchs";
import { alert } from "@/utils/alertHandeler";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure,Input, Textarea} from "@nextui-org/react";
import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io";


const FormEvent = ({community}:{community:number})=>{

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newEvent, setEvent] = useState<createEventType>({name:'',community_id:community, creator_id:-1, date:'', description:'', image_ancho:0, image_extension:'', image_ratio:'', image_url:'', place:''});
    const [file, setFile] = useState<String>('Upload image');
    const [infoImage, setInfoImage] = useState<imageType>();
    const imageInputRef = useRef<HTMLInputElement>(null);
    const closeRef = useRef<any>(null);

    const createEventHandle=async()=>{
        let data=({ ...newEvent, 'image_url': infoImage?.contenido, 'image_extension': infoImage?.extension?infoImage.extension:'', 'image_ancho': infoImage?.width?Number(infoImage.width):0, 'image_ratio':'1:1.15'});
        const event = await createEvent(data);
        if(!event.err){
            alert('error', event.err, 'Verify the data. All fields are required', ()=>{})
            setEvent({'name':'','community_id':community, 'creator_id':-1, 'date':'', 'description':'', 'image_ancho':0, 'image_extension':'', 'image_ratio':'', 'image_url':'', 'place':''});
            setInfoImage(undefined)
            setFile('Upload image')
            closeRef.current.click();
        }else{
            alert('success', 'Event created correctly', '', ()=>{})
        }
    }

    const getImageMeta = async (
        file: File
    ): Promise<{
        width: number,
        fileExtension: string|undefined,
    }> => {
        const { name } = file
        const fileExtension = name.split('.').pop()
        const localUrl = URL.createObjectURL(file)
        // reading a file to get height and width
        async function getImageParams(file: File) {
            return new Promise((resolve, reject) => {
                var reader = new FileReader()

                reader.onload = async (e: any) => {
                    var image = new Image()
                    image.src = e.target.result
                    await image.decode()
                    resolve({ width: image.width, height: image.height })
                }
                reader.readAsDataURL(file)
            })
        }
        const { width, height } = await getImageParams(file) as any

        return { width,  fileExtension}
    }

    const handleImageChange = async(event:any) => {
        const image = event.target.files[0];
        setFile(image.name)
        const data = await getImageMeta(image)
        if (image) {
            const reader = new FileReader();
            reader.onload = function(evt:any) { 
                const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, width: ${image}, contents:`;
                const contents = evt.target.result;
                setInfoImage({ ...infoImage, 'contenido':contents, 'extension': '.'+data.fileExtension, 'width': data.width, 'ratio':'1:1.15'});
            };
            reader.readAsDataURL(image);
        }
        console.log(infoImage)
    };

    const handleUpdate = (event:any) => {
        // console.log(event)
        // console.log(event.target.id)
        if(event.target.name == 'date'){
            const date = event.target.value.toString();
            setEvent({ ...newEvent, 'date':  date});
        }else{
            console.log({ ...newEvent,  [event.target.name]: event.target.value })
            setEvent({ ...newEvent,  [event.target.name]: event.target.value });
        }
    };

    return <>
        <Button
            color="primary"
            variant="shadow"
            className={`capitalize drop-shadow-2xl`}
            size="lg"
            aria-label="Post menu"
            onPress={onOpen}
        >
            New event
            <IoMdAdd size={'2em'}/>
        </Button>
        <Modal 
            backdrop="opaque" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            classNames={{
            backdrop: "blur"
            }}
            size="2xl"
        >
            <ModalContent>
            {(onClose) =>(
                <>
                <ModalHeader className="flex flex-col gap-1">New Event</ModalHeader>
                <ModalBody>
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col w-[80%] gap-4 justify-center items-center"> 
                            <Input name='name' type="text" variant="underlined" label="Name" placeholder="Enter the envent's name" onChange={handleUpdate}/>
                            <Textarea name='description' type="text" label="Description" labelPlacement='outside' placeholder="Enter the event description" onChange={handleUpdate}/>
                            <div className="flex flex-row gap-12 justify-between">
                                <Input fullWidth name='place' type="text" label="Place"  variant='underlined' labelPlacement='outside-left' placeholder="Enter the event place" onChange={handleUpdate}/>
                                <Input fullWidth name='date' type="date" min={new Date().toISOString().split('T')[0]} label="Date"  variant='underlined' labelPlacement='outside-left' onChange={handleUpdate}/>
                            </div>
                            <Button className='bg-gray-300' onClick={()=>{imageInputRef.current?.click()}}>
                                <FaFileUpload  /> {file}
                            </Button>
                            <input className='hidden' id='input_File' name='input_File' key='2' type='file' ref={imageInputRef} onChange={handleImageChange} accept='image/* '/>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" ref={closeRef} variant="light" onPress={onClose} onClick={()=>{setEvent({'name':'','community_id':community, 'creator_id':-1, 'date':'', 'description':'', 'image_ancho':0, 'image_extension':'', 'image_ratio':'', 'image_url':'', 'place':''});setInfoImage(undefined);setFile('Upload image')}}>
                    Close
                    </Button>
                    <Button color="primary" onClick={()=>{createEventHandle()}}>
                    Action
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    </>

}

export default FormEvent