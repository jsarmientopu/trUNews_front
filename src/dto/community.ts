import { z } from 'zod'
import { createEventSchema} from '../schemas/schemas'

export type createEventType = z.infer<typeof createEventSchema>;

export interface communityInfo{
    id_community: Number,
    name: String,
    description: String,
    creator_id: Number,
    date: String,
    articlesCount: Number,
    avatar_url: String,
    banner_url: String,
    community_has_categories: Array<{category:{id_category:Number, cat_name:String}}>,
    isCreator: false,
    isMember: false,
    membersCount: 0
}

export interface createCommunityType{
    name: String,
    creator_id: Number,
    date: String,
    avatar_extension: String|undefined,
    avatar_ancho: Number|undefined,
    avatar_ratio: String|undefined,
    banner_extension: String|undefined,
    banner_ancho: Number|undefined,
    banner_ratio: String|undefined,
    description: String,
    avatar_url: String,
    banner_url: String,
    id_categories: Array<{id_category: Number}>,
}