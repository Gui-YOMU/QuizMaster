import { EditorLayout } from "../components/templates/EditorLayout/EditorLayout";
import { QuestionParamsPage } from "../pages/editor/QuestionParamsPage/QuestionParamsPage";
import { QuestionTypePage } from "../pages/editor/QuestionTypePage/QuestionTypePage";
import { QuestionViewPage } from "../pages/editor/QuestionViewPage/QuestionViewPage";
import { QuizMainPage } from "../pages/editor/QuizMainPage/QuizMainPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const EditorPrivateRoutes = [
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <EditorLayout />,
        children: [
          {
            path: "/quizMain/:quizId",
            element: <QuizMainPage />,
          },
          {
            path: "/questionView/:questionId",
            element: <QuestionViewPage />,
          },
          {
            path: "/questionType/:questionId",
            element: <QuestionTypePage />,
          },
          {
            path: "/questionParams/:questionId",
            element: <QuestionParamsPage />,
          },
        ],
      },
    ],
  },
];
