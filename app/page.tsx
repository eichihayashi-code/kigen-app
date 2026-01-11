type Status = "応募" | "書類" | "一次" | "二次" | "最終" | "内定" | "辞退";

type Company = {
  id: string;
  name: string;
  status: Status;
  nextMeeting?: string;
  todos: { id: string; text: string; done: boolean }[];
};

const companies: Company[] = [
  {
    id: "c1",
    name: "株式会社A",
    status: "一次",
    nextMeeting: "2026-01-15 19:00",
    todos: [
      { id: "t1", text: "求人票を読む", done: true },
      { id: "t2", text: "一次面談の準備", done: false },
    ],
  },
  {
    id: "c2",
    name: "株式会社B",
    status: "書類",
    nextMeeting: "2026-01-18 12:30",
    todos: [{ id: "t3", text: "職務経歴書を提出", done: false }],
  },
];

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <h1 style={{ fontSize: 28 }}>転職活動ダッシュボード</h1>

      {companies.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
          }}
        >
          <h2>{c.name}</h2>
          <p>ステータス：{c.status}</p>
          <p>次回面談：{c.nextMeeting ?? "未定"}</p>

          <ul>
            {c.todos.map((t) => (
              <li key={t.id}>
                {t.done ? "✅" : "⬜"} {t.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
