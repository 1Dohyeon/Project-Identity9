// ListItem.tsx

import { ListItem, ListItemText } from "@mui/material";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface ArticleItemProps {
  id: number;
  text: string;
  index: number;
  moveArticle: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
  index: number;
}

const ArticleItem: FC<ArticleItemProps> = ({
  id,
  text,
  index,
  moveArticle,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "ARTICLE",
    item: { type: "ARTICLE", id, index } as DragItem,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "ARTICLE",
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.id !== id) {
        moveArticle(draggedItem.index, index);
      }
    },
    drop: () => moveArticle(-1, index),
  });

  // 미리보기 역할을 하는 더미를 생성
  preview(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ListItem ref={drag} button>
        <ListItemText primary={text} />
      </ListItem>
    </div>
  );
};

export default ArticleItem;
