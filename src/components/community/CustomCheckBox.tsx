import React from "react";
import {Checkbox, Link, User, Chip, cn} from "@nextui-org/react";

export const CustomCheckbox = ({ article}: {article:any}) => {
  return (
    <Checkbox
      aria-label={article.name}
      classNames={{
        base: cn(
          "inline-flex max-w-md w-full bg-content1 m-0",
          "hover:bg-content2 items-center justify-start",
          "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
        label: "w-full",
      }}
    >
      <div className="w-full flex justify-between gap-2">
        <User
          avatarProps={{ size: "md", src: article.avatar }}
          description={
            <Link isExternal href={article.url} size="sm">
              @{article.articlename}
            </Link>
          }
          name={article.name}
        />
        <div className="flex flex-col items-end gap-1">
          <span className="text-tiny text-default-500">{article.role}</span>
          <Chip size="sm" variant="flat">
            {article.status}
          </Chip>
        </div>
      </div>
    </Checkbox>
  );
};