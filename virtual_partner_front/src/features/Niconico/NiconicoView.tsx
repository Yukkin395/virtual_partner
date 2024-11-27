import { useState, useEffect } from "react";

type Comment = {
  text: string;
  top: number;
};

export const NiconicoView = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [usedComments, setUsedComments] = useState<Set<string>>(new Set());

  const mockComments = [
    "実家帰るんか？マッマ泣いてるぞ",
    "金ないなら近所の公園でええやろ",
    "ええなぁ、ワイはバイト漬けや…",
    "ぼっちがどこ行くんやw",
    "海行こうぜ、ナンパできんけど",
    "コスパ最強、図書館で過ごせ",
    "真夏の甲子園やろ！熱気ヤバいで",
    "彼女おるん？おらんなら家でゲームや",
    "お前ら揃ってBBQしようぜwww（絶対来ないやつ）",
    "夏休みは引きこもりが正解や",
    "地方の温泉ええぞ、安いし快適や",
    "キャンプで虫刺されて泣く未来しか見えん",
    "ワイのオススメ、昼間のショッピングモールや",
    "花火大会行く奴はリア充認定や",
    "避暑地とか言いながらカフェ巡りするんやろ",
    "ワイ、マジでどこも行く予定ないわ…",
    "旅行先の飯だけはちゃんと調べとけよ",
    "お前らまた帰りの新幹線で泣くんやろ",
    "夏休みは昼夜逆転から始まるで",
    "アニメの聖地巡礼とか興味ないん？",
    "バーベキューとかしたいけど準備がな…",
    "お土産は金沢のゴリラパンな",
    "夏休みって言ってもお前には毎日が夏休みやん",
    "オタク特有の秋葉原行っとけばいいって考えやめろ",
    "家で冷房最強にしてアイス食べるのが勝ち組",
    "コミケ参戦の準備はええんか？",
    "電車賃すらないワイ、高みの見物",
    "ワイ、どうせ今年もお盆休みゼロやで",
  ];

  useEffect(() => {
    const addComments = () => {
      // 使用済みのコメントを除外して、利用可能なコメントを取得
      const availableComments = mockComments.filter(
        (comment) => !usedComments.has(comment)
      );
      // 早期リターン
      if (availableComments.length === 0) return;

      // ランダムな数のコメントを選択
      const newComments: Comment[] = Array.from({
        length: Math.floor(Math.random() * 3) + 1,
      }).map(() => {
        const randomIndex = Math.floor(
          Math.random() * availableComments.length
        );
        const selectedComment = availableComments[randomIndex];
        availableComments.splice(randomIndex, 1); // 選択されたコメントをリストから削除

        return {
          text: selectedComment,
          top: Math.random() * 80, // ランダムな位置を計算
        };
      });

      setComments((prevComments) => [...prevComments, ...newComments]);
      setUsedComments((prevUsedComments) => {
        const newUsedComments = new Set(prevUsedComments);
        newComments.forEach((comment) => newUsedComments.add(comment.text));
        return newUsedComments;
      });
    };

    const interval = setInterval(addComments, Math.random() * 3000 + 2000); // 2秒から5秒の間でランダムにコメントを追加

    return () => clearInterval(interval);
  }, [usedComments]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {comments.map((comment, index) => (
        <div
          key={index}
          className="absolute whitespace-nowrap animate-niconico-scroll"
          style={{ top: `${comment.top}vh` }}
        >
          <p className="text-3xl font-bold text-white">{comment.text}</p>
        </div>
      ))}
    </div>
  );
};
