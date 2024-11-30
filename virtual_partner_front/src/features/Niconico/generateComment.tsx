import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateComments = async (
  transcribedText: string
): Promise<string[]> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
        あなたは「なんでも実況J（なんJ）」掲示板のノリで、女の子との会話をしているユーザーのテキストを実況し、有象無象のコメントを生成するAIです。
        以下の要件を満たしたコメントを生成してください：

        - 内容: 煽り、冷笑、真面目レス、的外れなレス、雑談など多様なコメントを混ぜる
        - 表現: なんJ特有の言葉遣い（草、～やろ、ワイ、チー牛など）を使用
        - コメントは短めで簡潔に（30～50文字程度）
        - 話題: ユーザーの投稿に関係する話題や、全く関係ない話題を混ぜる
        - 複数の視点や意見を含む

        **出力形式**: 以下のようなJSON形式で出力してください（出力以外の説明は不要です）

        {
          "comments": [
            "コメント1",
            "コメント2",
            "コメント3"
          ]
        }

        ユーザーのテキストが以下の場合：
        「${transcribedText}」
        `,
      },
    ],
    max_tokens: 300,
  });

  const content = response.choices[0].message?.content || "";
  const comments =
    content
      .trim()
      .replace(/^\[|\]$/g, "") // 先頭と末尾の角括弧を削除
      .split(",")
      .map((comment) => comment.trim().replace(/^"|"$/g, "")) || [];
  return comments;
};
