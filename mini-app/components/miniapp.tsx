"use client";
import { useState, useEffect } from "react";

export function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");

  const analyzeSymptoms = () => {
    if (!symptoms.trim()) return;
    setAnalysis(`Based on symptoms: ${symptoms}. Consider consulting a healthcare professional.`);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [...prev, `You: ${chatInput}`]);
    setChatMessages((prev) => [...prev, `Bot: I received "${chatInput}".`]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <h1 className="text-2xl font-bold">Health Assistant</h1>
        <p className="text-sm">Your personal symptom checker and chatbot</p>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <section id="symptom" className="bg-card rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Symptom Checker</h2>
          <textarea
            className="w-full border rounded p-2 mb-2"
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          <button
            className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={analyzeSymptoms}
          >
            Analyze Symptoms
          </button>
        </section>

        {analysis && (
          <section id="analysis" className="bg-card rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Analysis Result</h2>
            <p>{analysis}</p>
          </section>
        )}

        <section id="chat" className="bg-card rounded-lg shadow p-4 flex flex-col h-64">
          <h2 className="text-lg font-semibold mb-2">Chatbot</h2>
          <div className="flex-1 overflow-y-auto mb-2">
            {chatMessages.map((msg, i) => (
              <p key={i} className="mb-1">
                {msg}
              </p>
            ))}
          </div>
          <div className="flex">
            <input
              className="flex-1 border rounded p-2"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="ml-2 bg-primary text-primary-foreground px-4 rounded hover:bg-primary/90 transition-colors"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-background text-foreground p-2 text-center text-sm">
        © 2025 Health Assistant
      </footer>
    </div>
  );
}

export default function MiniApp() {
  const [active, setActive] = useState<"schedule" | "grades" | "attendance" | "planner" | "quiz">("schedule");

  return (
    <div className="w-full max-w-4xl mx-auto p-2 sm:p-4">
      <nav className="flex flex-wrap justify-center gap-2 py-2">
        <button
          onClick={() => setActive("schedule")}
          className={active === "schedule" ? "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#3B82F6] text-white font-bold" : "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#E2E8F0] text-[#1E293B]"}
        >
          Schedule
        </button>
        <button
          onClick={() => setActive("grades")}
          className={active === "grades" ? "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#3B82F6] text-white font-bold" : "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#E2E8F0] text-[#1E293B]"}
        >
          Grades
        </button>
        <button
          onClick={() => setActive("attendance")}
          className={active === "attendance" ? "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#3B82F6] text-white font-bold" : "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#E2E8F0] text-[#1E293B]"}
        >
          Attendance
        </button>
        <button
          onClick={() => setActive("planner")}
          className={active === "planner" ? "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#3B82F6] text-white font-bold" : "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#E2E8F0] text-[#1E293B]"}
        >
          Planner
        </button>
        <button
          onClick={() => setActive("quiz")}
          className={active === "quiz" ? "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#3B82F6] text-white font-bold" : "px-3 py-1 text-xs sm:px-4 sm:py-2 text-sm font-medium transition-colors duration-200 hover:scale-105 bg-[#E2E8F0] text-[#1E293B]"}
        >
          Quiz
        </button>
      </nav>
      <div style={{ display: active === "schedule" ? "block" : "none" }}>
        <Schedule />
      </div>
      <div style={{ display: active === "grades" ? "block" : "none" }}>
        <Grades />
      </div>
      <div style={{ display: active === "attendance" ? "block" : "none" }}>
        <Attendance />
      </div>
      <div style={{ display: active === "planner" ? "block" : "none" }}>
        <Planner />
      </div>
      <div style={{ display: active === "quiz" ? "block" : "none" }}>
        <Quiz />
      </div>
    </div>
  );
}

function Schedule(props: {className?: string}) {
  const [subjects, setSubjects] = useState<
    { id: number; name: string; day: string; time: string; room: string }[]
  >([]);
  const [form, setForm] = useState({
    name: "",
    day: "",
    time: "",
    room: "",
  });

  const addSubject = () => {
    if (!form.name || !form.day || !form.time || !form.room) return;
    setSubjects((prev) => [
      ...prev,
      { id: Date.now(), ...form },
    ]);
    setForm({ name: "", day: "", time: "", room: "" });
  };

  const deleteSubject = (id: number) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAll = () => setSubjects([]);

  return (
    <div className={`space-y-4 sm:space-y-6 ${props.className ?? ''}`}>
      <h2 className="text-xl font-semibold">Class Schedule Builder</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          placeholder="Subject Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Day"
          value={form.day}
          onChange={(e) => setForm({ ...form, day: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Room"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={addSubject}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>
      {subjects.length > 0 && (
        <div className="overflow-x-auto"><table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Day</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Room</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((s) => (
              <tr key={s.id}>
                <td className="border p-2 transition-colors duration-200">{s.name}</td>
                <td className="border p-2 transition-colors duration-200">{s.day}</td>
                <td className="border p-2 transition-colors duration-200">{s.time}</td>
                <td className="border p-2 transition-colors duration-200">{s.room}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteSubject(s.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table></div>
      )}
    </div>
  );
}

function Grades(props: {className?: string}) {
  const [entries, setEntries] = useState<
    { id: number; subject: string; score: number }[]
  >([]);
  const [form, setForm] = useState({ subject: "", score: "" });

  const addEntry = () => {
    const score = Number(form.score);
    if (!form.subject || isNaN(score)) return;
    setEntries((prev) => [
      ...prev,
      { id: Date.now(), subject: form.subject, score },
    ]);
    setForm({ subject: "", score: "" });
  };

  const deleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const average = entries.reduce((sum, e) => sum + e.score, 0) / (entries.length || 1);
  const grade =
    average >= 90
      ? "Excellent"
      : average >= 80
      ? "Good"
      : average >= 70
      ? "Average"
      : average >= 60
      ? "Pass"
      : "Fail";
  const passFail = average >= 60 ? "Pass" : "Fail";

  return (
    <div className={`space-y-4 ${props.className ?? ''}`}>
      <h2 className="text-xl font-semibold">Grade Calculator</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Score"
          type="number"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={addEntry}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Entry
      </button>
      {entries.length > 0 && (
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Results</h3>
          <p>Average: {average.toFixed(2)}</p>
          <p>Grade: {grade}</p>
          <p>Pass/Fail: {passFail}</p>
          <div className="overflow-x-auto"><table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className="border p-2">Subject</th>
                <th className="border p-2">Score</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id}>
                  <td className="border p-2 transition-colors duration-200">{e.subject}</td>
                  <td className="border p-2 transition-colors duration-200">{e.score}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => deleteEntry(e.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      )}
    </div>
  );
}

function Attendance(props: {className?: string}) {
  const [students, setStudents] = useState<
    { name: string; present: number; absent: number; late: number }[]
  >([]);
  const [name, setName] = useState("");

  const addOrUpdate = (status: "present" | "absent" | "late") => {
    if (!name.trim()) return;
    setStudents((prev) => {
      const idx = prev.findIndex((s) => s.name === name.trim());
      if (idx === -1) {
        const newStudent = {
          name: name.trim(),
          present: status === "present" ? 1 : 0,
          absent: status === "absent" ? 1 : 0,
          late: status === "late" ? 1 : 0,
        };
        return [...prev, newStudent];
      } else {
        const updated = { ...prev[idx] };
        if (status === "present") updated.present += 1;
        if (status === "absent") updated.absent += 1;
        if (status === "late") updated.late += 1;
        const newArr = [...prev];
        newArr[idx] = updated;
        return newArr;
      }
    });
  };

  const resetStudent = (nameToReset: string) => {
    setStudents((prev) => prev.filter((s) => s.name !== nameToReset));
  };

  const clearAll = () => setStudents([]);

  return (
    <div className={`space-y-4 ${props.className ?? ''}`}>
      <h2 className="text-xl font-semibold">Attendance Tracker</h2>
      <div className="flex space-x-2">
        <input
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => addOrUpdate("present")}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Present
        </button>
        <button
          onClick={() => addOrUpdate("absent")}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Absent
        </button>
        <button
          onClick={() => addOrUpdate("late")}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Late
        </button>
      </div>
      {students.length > 0 && (
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Summary</h3>
          <div className="overflow-x-auto"><table className="w-full border-collapse mt-2">
            <thead>
              <tr>
                <th className="border p-2">Name</th>
                <th className="border p-2">Present</th>
                <th className="border p-2">Absent</th>
                <th className="border p-2">Late</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.name}>
                  <td className="border p-2 transition-colors duration-200">{s.name}</td>
                  <td className="border p-2 transition-colors duration-200">{s.present}</td>
                  <td className="border p-2 transition-colors duration-200">{s.absent}</td>
                  <td className="border p-2 transition-colors duration-200">{s.late}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => resetStudent(s.name)}
                      className="text-red-600"
                    >
                      Reset
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
          <button
            onClick={clearAll}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

function Planner(props: {className?: string}) {
  const [tasks, setTasks] = useState<
    { id: number; name: string; category: string; completed: boolean }[]
  >([]);
  const [form, setForm] = useState({ name: "", category: "School" });

  const addTask = () => {
    if (!form.name) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), name: form.name, category: form.category, completed: false },
    ]);
    setForm({ name: "", category: "School" });
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const clearAll = () => setTasks([]);

  const categories = ["School", "Personal", "Exams"];

  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = tasks.filter((t) => t.category === cat && !t.completed);
    return acc;
  }, {} as Record<string, typeof tasks>);

  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className={`space-y-4 ${props.className ?? ''}`}>
      <h2 className="text-xl font-semibold">Study Planner / To-Do List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <input
          placeholder="Task Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={addTask}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Task
      </button>
      {categories.map((cat) => (
        <div key={cat} className="mt-4">
          <h3 className="font-semibold">{cat}</h3>
          <ul className="list-disc pl-5">
            {grouped[cat].map((t) => (
              <li key={t.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
                <span>{t.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {completedTasks.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Completed Tasks</h3>
          <ul className="list-disc pl-5">
            {completedTasks.map((t) => (
              <li key={t.id}>{t.name}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={clearCompleted}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Clear Completed
        </button>
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

function Quiz(props: {className?: string}) {
  const [topic, setTopic] = useState("");
  const [itemsText, setItemsText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setShowResult(true);
    }
  }, [timeLeft, showResult]);

  const startQuiz = () => {
    const items = itemsText
      .split("\n")
      .map((i) => i.trim())
      .filter((i) => i);
    if (items.length < 5) return;
    const shuffled = items.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(10, items.length));
    setQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
  };

  const answer = (isCorrect: boolean) => {
    if (isCorrect) setScore((s) => s + 1);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className={`space-y-4 ${props.className ?? ''}`}>
      <h2 className="text-xl font-semibold">Random Quiz Generator</h2>
      {!showResult && questions.length === 0 && (
        <div className="space-y-2">
          <input
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Enter items, one per line"
            value={itemsText}
            onChange={(e) => setItemsText(e.target.value)}
            className="border p-2 rounded w-full h-32"
          />
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Quiz
          </button>
        </div>
      )}
      {questions.length > 0 && !showResult && (
        <div className="border p-4 rounded">
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>
          <p className="my-2">{questions[currentIndex]}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => answer(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Correct
            </button>
            <button
              onClick={() => answer(false)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Incorrect
            </button>
          </div>
          <p className="mt-2">Time left: {timeLeft}s</p>
        </div>
      )}
      {showResult && (
        <div className="border p-4 rounded">
          <h3 className="font-semibold">Quiz Result</h3>
          <p>
            You scored {score} out of {questions.length}
          </p>
          <button
            onClick={startQuiz}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
