import React from "react";
import {
  useCheckbox,
  VisuallyHidden,
  Chip,
  tv,
  Checkbox,
  cn,
} from "@nextui-org/react";
import { getArticleType, returnArticlesCategory } from "@/dto/article";
import { CheckIcon } from "../CheckIcon";
import ArticleCard from "../search/ArticleCard";

export const CustomCheckbox = ({
  article,
}: {
  article: returnArticlesCategory;
}) => {
  const format = (): getArticleType => {
    return {
      title: article.title ? article.title : "",
      date: new Date(article.date).toISOString(),
      text: article.text,
      id_article: article.id_article,
      writer: { id_user: article.id_writer, username: article.username },
      category: article.article_has_categories,
      views: article.views,
      image_url: article.image_url,
    };
  };

  return (
    <Checkbox
      className="w-[30%]"
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
      value={article.id_article.toString()}
    >
      <ArticleCard article={format()}></ArticleCard>
    </Checkbox>
  );
};
