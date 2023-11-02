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