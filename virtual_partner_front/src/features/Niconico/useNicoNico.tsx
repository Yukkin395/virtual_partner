import { useEffect, useState } from "react";

type Comment = {
  text: string;
  top: number;
};

export const useNicoNico = (commentsList: string[]) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [usedComments, setUsedComments] = useState<Set<string>>(new Set());
  const [usedPositions, setUsedPositions] = useState<Set<number>>(new Set());

  // ランダムな位置を取得し、重ならないようにする
  const getRandomPosition = (): number => {
    let position;
    do {
      position = Math.floor(Math.random() * 80); // 0から80の間でランダムな位置を生成
    } while (usedPositions.has(position));
    return position;
  };

  // ランダムなコメントを取得
  const getRandomComments = (availableComments: string[]): Comment[] => {
    const newComments: Comment[] = Array.from({
      length: Math.floor(Math.random() * 3) + 1, // 1から3個のコメントをランダムに生成
    }).map(() => {
      const randomIndex = Math.floor(Math.random()* 1000 + 500);
      const selectedComment = availableComments[randomIndex];
      availableComments.splice(randomIndex, 1); // 選択されたコメントをリストから削除

      return {
        text: selectedComment,
        top: getRandomPosition(), // ランダムな位置を計算
      };
    });

    return newComments;
  };

  // 使用済みのコメントと位置を更新
  const updateUsedCommentsAndPositions = (newComments: Comment[]) => {
    setUsedComments((prevUsedComments) => {
      const newUsedComments = new Set(prevUsedComments);
      newComments.forEach((comment) => newUsedComments.add(comment.text));
      return newUsedComments;
    });

    setUsedPositions((prevUsedPositions) => {
      const newUsedPositions = new Set(prevUsedPositions);
      newComments.forEach((comment) => newUsedPositions.add(comment.top));
      return newUsedPositions;
    });
  };

  useEffect(() => {
    const addComments = () => {
      // 使用済みのコメントを除外して、利用可能なコメントを取得
      const availableComments = commentsList.filter(
        (comment) => !usedComments.has(comment)
      );

      // 早期リターン
      if (availableComments.length === 0) return;

      // ランダムな数のコメントを選択
      const newComments = getRandomComments(availableComments);

      setComments((prevComments) => [...prevComments, ...newComments]);
      updateUsedCommentsAndPositions(newComments);
    };

    const interval = setInterval(addComments, Math.random() * 3000 + 2000); // 2秒から5秒の間でランダムにコメントを追加

    return () => clearInterval(interval);
  }, [commentsList, usedComments, usedPositions]);

  return comments;
};
