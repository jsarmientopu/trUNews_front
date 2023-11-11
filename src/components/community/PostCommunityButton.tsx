import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import {
  Dropdown,
  Link,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./CustomCheckBox";
import { LiaEditSolid } from "react-icons/lia";
import { returnArticlesCategory } from "@/dto/article";
import { deletePostArticle, getArticlesToAdd, getArticlesToDelete, postArticle } from "@/utils/Communities/fetch";
import { RiSurroundSoundLine } from "react-icons/ri";

const PostCommunityButton = ({ idCommunity }: {idCommunity: number}) => {
  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState(-1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const ref = useRef<HTMLButtonElement>(null);
  const refClose = useRef<HTMLButtonElement>(null);
  const [posiblePostArticle, setPosiblePostArticle] = useState<
    Array<returnArticlesCategory>
  >([]);
  const [groupSelected, setGroupSelected] = useState<Array<string>>([]);

  const getPosibbleNewArticle = async (mode:number) => {
    setGroupSelected([]);
    setPosiblePostArticle([]);
    let articles;
    if(mode==0){
      articles = await getArticlesToAdd(idCommunity.valueOf());
    }else{
      articles = await getArticlesToDelete(idCommunity.valueOf());
    }
    if (!articles.err) {
      setPosiblePostArticle(articles);
    }
  };

  const postArticleSelected = async (event:any)=>{
    let articles;
    if(mode==0){
      articles = await postArticle(parseInt(groupSelected[0]), idCommunity.valueOf());
      console.log(articles)
    }else{
      articles = await deletePostArticle(parseInt(groupSelected[0]), idCommunity.valueOf());
      console.log(articles)
    }
    if (articles){
        refClose.current?.click();
        setGroupSelected([]);
        setPosiblePostArticle([]);
      }
  }

  useEffect(()=>{
    let newSelect = groupSelected.at(groupSelected.length-1);
    if(newSelect==undefined){newSelect=""}
    setGroupSelected([newSelect])
  },[groupSelected])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Dropdown backdrop="blur" placement="left-end">
        <DropdownTrigger hidden>
          <Button
            color="primary"
            variant="shadow"
            className={`capitalize p-1.5 m-5 drop-shadow-2xl ${
              visible ? "" : "hidden"
            }`}
            size="lg"
            isIconOnly
            aria-label="Post menu"
          >
            <LiaEditSolid size={"30em"} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" variant="shadow">
          <DropdownItem
            key="new"
            onClick={async () => {
              setMode(0);
              ref.current?.click();
              await getPosibbleNewArticle(0);
            }}
          >
            New post
          </DropdownItem>
          {/* <DropdownItem key="copy">Copy link</DropdownItem>
          <DropdownItem key="edit">Edit file</DropdownItem> */}
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={async() => {
              setMode(1);
              ref.current?.click();
              await getPosibbleNewArticle(1);
            }}
          >
            Delete post
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Button ref={ref} onPress={onOpen} className="hidden"></Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        size={posiblePostArticle.length>0?`full`:'2xl'}
        className="w-full h-auto"
        scrollBehavior="inside"
        backdrop="opaque"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-5 w-full">
                  <CheckboxGroup
                    label="Select articles, which you can post in this community"
                    value={groupSelected}
                    onChange={(select) => setGroupSelected(select as string[])}
                    classNames={{
                      base: "w-full h-full",
                    }}
                  >
                    <div className="flex flex-row flex-wrap gap-4">
                      {posiblePostArticle.length > 0 ? (
                        posiblePostArticle?.map(
                          (item: returnArticlesCategory, index: number) => (
                            <CustomCheckbox article={item} key={index} />
                          )
                        )
                      ) : (
                        <>Your saves or written articles can´t post in this community (verify the categories)</>
                      )}
                    </div>
                  </CheckboxGroup>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" ref={refClose} variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={postArticleSelected}>
                  {mode==0?"Post":"Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostCommunityButton;
