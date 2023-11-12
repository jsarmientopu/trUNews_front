'use client'

import React, {useState, useEffect, useMemo, useRef} from "react";
import {Avatar, Divider, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Textarea } from '@nextui-org/react';
import CategoryChip from "@/components/CreateCommunity/CategoryChip";
import { getCategories, squareImage } from "@/utils/fetchs";
import { titleCase } from "@/utils/Navbar/utils";
import { imageType } from "@/dto/users";
import { set } from "zod";
import {Image as NextImage} from '@nextui-org/react' ;
import { createCommunityType } from "@/dto/community";
import { createCommunity } from "@/utils/Communities/fetch";
import { info } from "console";
import SetCommunityPage from "@/components/community-settings/SetCommunity";


export default function CreateCommunityPage() {
   
    return(
        <>
        <SetCommunityPage/>
        </>
        )    
    
}