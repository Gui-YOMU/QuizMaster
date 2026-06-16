import { createContext, useContext, useState } from "react";

interface EditorContextType {
  quizId: string | null;
  openEditor: (id: number) => void;
  closeEditor: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizId, setQuizId] = useState(localStorage.getItem("quizId"));

  const openEditor = (id: number) => {
    localStorage.setItem("quizId", id.toString());
    setQuizId(id.toString());
  };

  const closeEditor = () => {
    localStorage.removeItem("quizId");
    setQuizId(null);
  };

  return (
    <EditorContext.Provider value={{ quizId, openEditor, closeEditor }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctxt = useContext(EditorContext);
  if (!ctxt) throw new Error("La fonction useAuth a besoin d'un provider.")
  return ctxt;
}

