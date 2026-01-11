"use client";

import { useMemo, useState } from "react";

type Status = "応募" | "書類" | "一次" | "二次" | "最終" | "内定" | "辞退";

type Todo = { id: string; text: string; done: boolean };
type Company = {
  id: string;
  name: string;
  status: Status;
  nextMeeting?: string; // "2026-01-15 19:00"
  todos: Todo[];
};

const initialCompanies: Company[] = [
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
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const toggleTodo = (companyId: string, todoId: string) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== companyId) return c;
        return {
          ...c,
          todos: c.todos.map((t) =>
            t.id === todoId ? { ...t, done: !t.done } : t
          ),
        };
      })
    );
  };

  const sorted = useMemo(() => {
    // 次回面談があるものを上、近い順に
    const toDate = (s?: string) => (s ? new Date(s.replace(" ", "T")) : null);
    return [...companies].sort((a, b) => {
      const da = toDate(a.nextMeeting);
      const db = toDate(b.nextMeeting);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return da.getTime() - db.getTime();
    });
  }, [companies]);

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <header style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>転職活動ダッシュボード</h1>
          <p style={{ color: "#555", marginTop: 8 }}>
            企業ごとの面談日程とToDoをまとめて管理
          </p>
        </div>
        <button style={{ padding: "10px 14px" }}>＋ 企業を追加（次で作る）</button>
      </header>

      <section style={{ marginTop: 24, display: "grid", gap: 12 }}>
        {sorted.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{c.name}</div>
                <div style={{ color: "#666", marginTop: 4 }}>ステータス：{c.status}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, color: "#666" }}>次回面談</div>
                <div style={{ fontWeight: 700 }}>{c.nextMeeting ?? "未設定"}</div>
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 13, color: "#666", marginBottom: 6 }}>ToDo</div>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.9 }}>
                {c.todos.map((t) => (
                  <li
                    key={t.id}
                    style={{
                      cursor: "pointer",
                      textDecoration: t.done ? "line-through" : "none",
                      color: t.done ? "#777" : "inherit",
                    }}
                    onClick={() => toggleTodo(c.id, t.id)}
                    title="クリックで完了/未完了を切り替え"
                  >
                    {t.done ? "✅" : "⬜"} {t.text}
                  </li>
                ))}
              </ul>
              <div style={{ fontSize: 12, color: "#888", marginTop: 8 }}>
                ※ToDoをクリックすると完了/未完了が切り替わります
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
