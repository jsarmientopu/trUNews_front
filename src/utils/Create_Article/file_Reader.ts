import mammoth from 'mammoth';
import { alert } from '../alertHandeler';
import { createArticleType } from '@/dto/article';

export const fileReader=(file:any, setPlainText:any, setFile:any)=>{
    if(file){
        const reader = new FileReader();
        if(file.type.includes('text')||file.type==""){
            reader.readAsText(file);
            reader.onload = () => {
            const text = reader.result as string;
            setPlainText(text);
            }
        }else if(file.type.includes('application/vnd.openxmlformats-officedocument.wordproces')){
            reader.onload = async() => {
                const arrayBuffer  = reader.result as ArrayBuffer;
                const result =  await mammoth.convertToHtml({ arrayBuffer  });
                setPlainText(result.value);
            };
            reader.readAsArrayBuffer(file);
        }else{
            alert('error','File not compatible', '', ()=>{})
            return
        }
        setFile(file.name);
    }else{
        alert('error','Failed upload', 'The reader of the file has failed', ()=>{})
    }
}

export const imageReader=(image:any, setNameImage:any, setImage:any, setFormData:any, formData:createArticleType)=>{
    if(image){
        setNameImage(image.name)
        var _URL = window.URL || window.webkitURL;
        var img = new Image();                  
        img.src = _URL.createObjectURL(image);
        const reader = new FileReader();
        reader.onload = function(evt:any) { 
            const metadata = `name: ${image.name}, type: ${image.type}, size: ${image.size}, contents:`;
            const ext=image.name.split(".");
            const width = img.width;
            const contents = evt.target.result;
            setImage(contents);
            setFormData({ ...formData, 'image_extension': '.'+ext[1], 'ancho': width});
        };
        reader.readAsDataURL(image);
    }else{
        alert('error','Failed image upload', 'The reader of the image has failed', ()=>{})
    }
}